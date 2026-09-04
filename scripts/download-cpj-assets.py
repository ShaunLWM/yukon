#!/usr/bin/env python3
"""
Download CPJ room assets from CDN for yukon.

Parses CPJ's webpack chunks to find the exact pack file paths each room
loads, downloads them from CDN, then downloads all referenced assets
(atlases, physics, textures, audio, music).

No hardcoding — everything is derived from:
  1. CPJ's deobfuscated source (chunk mappings)
  2. CPJ's webpack chunk files (pack paths, music keys)
  3. CDN (actual asset files)
  4. Crumbs (music format: ogg vs mp3)

Idempotent: skips files that already exist with non-zero size.
Use --force to re-download all files.

Usage:
    python3 scripts/download-cpj-assets.py [--force] [--cpj-dir /path/to/cpjourney-downloader]
"""

import argparse
import json
import os
import re
import sys
import glob
import urllib.request
import urllib.error

CDN_BASE = "https://cdn.cpjourney.net"
VERSION = "?v=0849990"


def fetch(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read()
    except Exception:
        return None


def download_file(url, dest, force=False):
    if not force and os.path.exists(dest) and os.path.getsize(dest) > 0:
        return "exists"
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    data = fetch(url)
    if data:
        with open(dest, "wb") as f:
            f.write(data)
        return "downloaded"
    return "failed"


def parse_cpj_chunks(cpj_dir):
    """
    Parse CPJ's deobfuscated source and chunk files to extract:
    - Pack paths for each room
    - Music keys for each room
    Returns dict: {room_class_name: {"packs": [path, ...], "music": str|None}}
    """
    deob_path = os.path.join(cpj_dir, "yukon-deobfuscated.js")
    chunks_dir = os.path.join(cpj_dir, "build/assets/scripts/client")

    if not os.path.exists(deob_path):
        print(f"Error: deobfuscated source not found at {deob_path}")
        sys.exit(1)

    with open(deob_path) as f:
        src = f.read()

    # Room path -> chunk ID (last in array)
    room_chunks = {}
    for m in re.finditer(r'"\.\/rooms\/([^"]+)":\s*\["(\d+)",\s*"(\d+)"\]', src):
        path = m.group(1)
        if path.endswith(".js"):
            path = path[:-3]
        room_chunks[path] = m.group(3)

    # Chunk ID -> hash
    chunk_hashes = {}
    for m in re.finditer(r'(\d+):\s*"([0-9a-f]{16})"', src):
        chunk_hashes[m.group(1)] = m.group(2)

    # Parse each chunk to extract pack paths and music keys
    rooms = {}
    seen_chunks = set()

    for path in sorted(room_chunks.keys()):
        chunk_id = room_chunks[path]
        h = chunk_hashes.get(chunk_id)
        if not h:
            continue

        chunk_file = os.path.join(chunks_dir, f"1788318901871.{h}.min.js")
        if not os.path.exists(chunk_file):
            continue

        room_name = path.split("/")[-1]

        # Skip non-room components
        if any(skip in room_name for skip in [
            "Editor", "Pin", "Robot", "Alarm", "Puck", "Ball",
            "Pickup", "Decoration", "Enemy", "Projectile",
            "Switchbox", "Shadows", "Waddle", "Game", "Seat",
            "mat", "NormanSwarm", "Underground",
        ]):
            continue

        if chunk_id in seen_chunks:
            continue
        seen_chunks.add(chunk_id)

        with open(chunk_file) as f:
            chunk = f.read()

        # Extract pack paths from string literals
        pack_paths = re.findall(
            r"'(assets/media/rooms/[^']*-pack\.json)'", chunk
        )

        # Extract music key: look for string assignment to music property
        # Pattern: this.music = 'key' or ].music = 'key'
        # Works for readable code; obfuscated chunks use bracket notation
        # which this regex misses — those are caught by scanning yukon scene
        # files below.
        music_matches = re.findall(
            r"\.music\s*=\s*'([^']+)'", chunk
        )
        music_key = music_matches[0] if music_matches else None

        # Filter to only the room's own packs (not mission/event variants)
        # The first pack that matches the room's directory is usually the main one
        room_dir_name = path.split("/")[0] if "/" not in path else path.rsplit("/", 1)[0].split("/")[-1]

        entry = {
            "path": path,
            "packs": pack_paths,
            "music": music_key,
        }
        # Use full path as key to avoid collisions (e.g., multiple Rink variants)
        # but also store by class name for easy lookup
        rooms[path] = entry

    return rooms


def get_yukon_rooms(scenes_dir):
    """Get list of room directories in yukon."""
    rooms = {}
    for jsfile in sorted(glob.glob(os.path.join(scenes_dir, "*", "*.js"))):
        room_dir = os.path.basename(os.path.dirname(jsfile))
        if room_dir.startswith("_"):
            continue
        rooms[room_dir] = jsfile
    return rooms


def fix_pack_keys(pack_path, scene_file, yukon_root):
    """
    If a downloaded pack's atlas keys don't match what the scene expects,
    rename them to match. Derived by finding texture keys used in the scene
    and matching them to atlas keys in the pack.
    """
    pack_full = os.path.join(yukon_root, pack_path)
    if not os.path.exists(pack_full) or not scene_file:
        return False

    with open(pack_full) as f:
        pack = json.load(f)
    with open(scene_file) as f:
        scene = f.read()

    # Find all texture keys used in scene: this.add.image(x, y, "KEY", ...) or sprite(...)
    scene_keys = set(re.findall(
        r'(?:image|sprite)\([^)]*["\']([a-zA-Z0-9_-]+)["\']', scene
    ))

    modified = False
    for section_key, section in pack.items():
        if section_key == "meta":
            continue
        for entry in section.get("files", []):
            if entry.get("type") != "multiatlas":
                continue
            atlas_key = entry.get("key", "")
            if atlas_key in scene_keys:
                continue
            # Atlas key not used in scene — find a scene key that matches
            atlas_base = os.path.basename(entry.get("url", "")).replace(".json", "")
            for sk in scene_keys:
                if sk in atlas_base or atlas_base.startswith(sk):
                    entry["key"] = sk
                    modified = True
                    break

    if modified:
        with open(pack_full, "w") as f:
            json.dump(pack, f, indent=4)
    return modified


def download_pack_and_assets(pack_url_path, yukon_root, force=False):
    """Download a pack from CDN and all assets it references."""
    results = {"downloaded": [], "exists": [], "failed": []}

    dest = os.path.join(yukon_root, pack_url_path)
    cdn_url = f"{CDN_BASE}/{pack_url_path}{VERSION}"

    status = download_file(cdn_url, dest, force)
    results[status].append(os.path.basename(pack_url_path))

    if status == "failed":
        return results

    # Parse the pack and download referenced assets
    try:
        with open(dest) as f:
            pack = json.load(f)
    except (json.JSONDecodeError, Exception):
        return results

    for section_key, section in pack.items():
        if section_key == "meta":
            continue
        for entry in section.get("files", []):
            raw_url = entry.get("url", "")
            urls = raw_url if isinstance(raw_url, list) else ([raw_url] if raw_url else [])

            for file_url in urls:
                filename = os.path.basename(file_url)
                file_dest = os.path.join(yukon_root, file_url)
                file_cdn = f"{CDN_BASE}/{file_url}{VERSION}"

                file_status = download_file(file_cdn, file_dest, force)
                results[file_status].append(filename)

                if file_status == "failed":
                    continue

                # For multiatlas, download texture images
                if entry.get("type") == "multiatlas":
                    try:
                        with open(file_dest) as f:
                            atlas = json.load(f)
                        atlas_dir = os.path.dirname(file_url)
                        for tex in atlas.get("textures", []):
                            img = tex.get("image", "")
                            if img:
                                img_path = f"{atlas_dir}/{img}"
                                img_dest = os.path.join(yukon_root, img_path)
                                img_cdn = f"{CDN_BASE}/{img_path}{VERSION}"
                                img_status = download_file(img_cdn, img_dest, force)
                                results[img_status].append(img)
                    except (json.JSONDecodeError, Exception):
                        pass

    return results


def update_scene_pack_path(scene_file, old_pack_key, new_pack_key, new_pack_path):
    """Update a scene JS file's pack loading to use the correct path."""
    with open(scene_file) as f:
        content = f.read()

    # Find current pack loading line
    pack_pattern = re.compile(
        r'this\.load\.pack\(["\']' + re.escape(old_pack_key) + r'["\'],\s*["\'][^"\']*["\']\)'
    )
    new_line = f'this.load.pack("{new_pack_key}", "{new_pack_path}")'

    if pack_pattern.search(content):
        new_content = pack_pattern.sub(new_line, content)
        if new_content != content:
            with open(scene_file, "w") as f:
                f.write(new_content)
            return True
    return False


def main():
    parser = argparse.ArgumentParser(description="Download CPJ room assets from CDN")
    parser.add_argument("--force", action="store_true", help="Re-download all files")
    parser.add_argument(
        "--cpj-dir",
        default="/Users/shaun/Desktop/Projects/cpjourney-downloader",
        help="Path to cpjourney-downloader directory",
    )
    args = parser.parse_args()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    yukon_root = os.path.dirname(script_dir)
    scenes_dir = os.path.join(yukon_root, "src", "scenes", "rooms")

    os.chdir(yukon_root)

    if not os.path.isdir(scenes_dir):
        print(f"Error: scenes directory not found at {scenes_dir}")
        sys.exit(1)

    print("CPJ Asset Downloader")
    print(f"  Yukon root: {yukon_root}")
    print(f"  CPJ source: {args.cpj_dir}")
    print(f"  CDN: {CDN_BASE}")
    print()

    # Step 1: Parse CPJ chunks to find what each room actually loads
    print("Parsing CPJ webpack chunks...")
    cpj_rooms = parse_cpj_chunks(args.cpj_dir)
    print(f"  Found {len(cpj_rooms)} room definitions\n")

    # Step 2: Get yukon room directories
    yukon_rooms = get_yukon_rooms(scenes_dir)

    # Step 3: Match and download
    total_dl = 0
    total_exist = 0
    total_fail = 0

    print("=== Downloading Room Assets ===")
    for room_dir, scene_file in sorted(yukon_rooms.items()):
        # Find matching CPJ room — match by class name, prefer the variant
        # whose path best matches yukon's directory structure
        candidates = []
        for path, data in cpj_rooms.items():
            class_name = path.split("/")[-1]
            if class_name.lower() == room_dir.lower():
                candidates.append(data)
            elif path.split("/")[0].lower() == room_dir.lower():
                candidates.append(data)

        if not candidates:
            continue

        # If multiple variants (e.g., rink/ice_rink, rink/baseball),
        # prefer the one with packs referencing a standard room pack
        cpj_room = candidates[0]
        if len(candidates) > 1:
            for c in candidates:
                for p in c["packs"]:
                    if f"/{room_dir}/" in p or f"/{room_dir}-" in p:
                        cpj_room = c
                        break

        room_dl = 0
        room_fail = 0

        # Filter packs: only download packs that are for this room's normal gameplay
        # (skip mission/event/medieval variants)
        for pack_path in cpj_room["packs"]:
            # Skip event/mission-specific packs
            if any(skip in pack_path for skip in [
                "/_mission", "/_mayday/shared", "/_medieval",
                "/_3rdanniversary", "/_aprilfools", "/_puffle26",
                "/_summer26", "/_tempepf", "/_scav",
                "/caretaker/",
            ]):
                continue

            results = download_pack_and_assets(pack_path, yukon_root, args.force)
            room_dl += len(results["downloaded"])
            room_fail += len(results["failed"])
            total_dl += len(results["downloaded"])
            total_exist += len(results["exists"])
            total_fail += len(results["failed"])

            # Fix atlas keys if they don't match what the scene expects
            if fix_pack_keys(pack_path, scene_file, yukon_root):
                print(f"  {room_dir}: fixed atlas keys in {os.path.basename(pack_path)}")

            # Update scene file if pack path differs from what it currently loads
            with open(scene_file) as f:
                scene_content = f.read()
            current_packs = re.findall(
                r'this\.load\.pack\(["\']([^"\']*)["\'],\s*["\']([^"\']*)["\']',
                scene_content,
            )
            pack_key = os.path.basename(pack_path).replace(".json", "")
            for cur_key, cur_path in current_packs:
                # Match by pack base name (e.g. "rink-pack" matches "rink-pack")
                cur_base = os.path.basename(cur_path).replace(".json", "")
                new_base = os.path.basename(pack_path).replace(".json", "")
                if cur_base == new_base and cur_path != pack_path:
                    if update_scene_pack_path(scene_file, cur_key, pack_key, pack_path):
                        print(f"  {room_dir}: updated pack path -> {pack_path}")

        if room_dl > 0 or room_fail > 0:
            status = "OK" if room_fail == 0 else "PARTIAL"
            print(f"  {room_dir}: {room_dl} downloaded [{status}]")
            if room_fail > 0:
                for f_name in results["failed"]:
                    print(f"    missing: {f_name}")

    # Step 4: Download music
    print("\n=== Downloading Music ===")
    music_crumbs_path = os.path.join(yukon_root, "assets/media/crumbs/en/music.json")
    ogg_files = set()
    if os.path.exists(music_crumbs_path):
        with open(music_crumbs_path) as f:
            ogg_files = set(json.load(f).get("ogg_files", []))

    music_keys = set()
    for data in cpj_rooms.values():
        if data.get("music"):
            music_keys.add(data["music"])

    # Also scan yukon scene files for music keys (catches obfuscated chunks
    # where the CPJ regex missed the music assignment)
    for scene_file in sorted(glob.glob(os.path.join(scenes_dir, "*", "*.js"))):
        with open(scene_file) as f:
            scene_src = f.read()
        for m in re.finditer(r"this\.music\s*=\s*['\"]([^'\"]+)['\"]", scene_src):
            music_keys.add(m.group(1))

    music_dir = os.path.join(yukon_root, "assets/media/music")
    for key in sorted(music_keys):
        ext = ".ogg" if key in ogg_files else ".mp3"
        dest = os.path.join(music_dir, f"{key}{ext}")
        cdn_url = f"{CDN_BASE}/assets/media/music/{key}{ext}{VERSION}"
        status = download_file(cdn_url, dest, args.force)
        if status == "downloaded":
            print(f"  downloaded: {key}{ext}")
            total_dl += 1
        elif status == "failed":
            print(f"  failed: {key}{ext}")
            total_fail += 1
        else:
            total_exist += 1

    print(f"\n{'='*40}")
    print(f"Downloaded: {total_dl} files")
    print(f"Already existed: {total_exist} files")
    print(f"Failed: {total_fail} files")
    if total_fail == 0 and total_dl == 0:
        print("Everything up to date!")
    elif total_fail == 0:
        print("All downloads successful!")


if __name__ == "__main__":
    main()
