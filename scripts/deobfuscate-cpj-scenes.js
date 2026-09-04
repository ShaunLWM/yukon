#!/usr/bin/env node
/**
 * Deobfuscate CPJ webpack chunks and generate clean yukon scene files.
 *
 * For each yukon room, finds the CPJ webpack chunk, deobfuscates it,
 * extracts the scene class code, and writes a clean yukon-compatible scene JS.
 *
 * Usage: node scripts/deobfuscate-cpj-scenes.js [--cpj-dir PATH] [--dry-run] [--room NAME]
 */

const fs = require('fs');
const path = require('path');

const CPJ_DIR = process.argv.includes('--cpj-dir')
    ? process.argv[process.argv.indexOf('--cpj-dir') + 1]
    : '/Users/shaun/Desktop/Projects/cpjourney-downloader';
const DRY_RUN = process.argv.includes('--dry-run');
const SINGLE_ROOM = process.argv.includes('--room')
    ? process.argv[process.argv.indexOf('--room') + 1]
    : null;

const YUKON_ROOT = path.resolve(__dirname, '..');
const SCENES_DIR = path.join(YUKON_ROOT, 'src', 'scenes', 'rooms');
const DEOB_PATH = path.join(CPJ_DIR, 'yukon-deobfuscated.js');
const CHUNKS_DIR = path.join(CPJ_DIR, 'build', 'assets', 'scripts', 'client');

const EVENT_PACK_PATTERNS = [
    '/_mission', '/_mayday', '/_medieval', '/_3rdanniversary',
    '/_aprilfools', '/_puffle26', '/_summer26', '/_tempepf',
    '/_scav', '/caretaker/'
];

function parseCpjChunks() {
    const src = fs.readFileSync(DEOB_PATH, 'utf-8');
    const roomChunks = {};
    let m;
    const re1 = /"\.\/rooms\/([^"]+)":\s*\["(\d+)",\s*"(\d+)"\]/g;
    while (m = re1.exec(src)) {
        let p = m[1];
        if (p.endsWith('.js')) p = p.slice(0, -3);
        roomChunks[p] = m[3];
    }
    const chunkHashes = {};
    const re2 = /(\d+):\s*"([0-9a-f]{16})"/g;
    while (m = re2.exec(src)) chunkHashes[m[1]] = m[2];
    return { roomChunks, chunkHashes };
}

function getChunkFile(chunkId, chunkHashes) {
    const h = chunkHashes[chunkId];
    if (!h) return null;
    const f = path.join(CHUNKS_DIR, `1788318901871.${h}.min.js`);
    return fs.existsSync(f) ? f : null;
}

function deobfuscateChunk(chunkFile) {
    const code = fs.readFileSync(chunkFile, 'utf-8');
    const savedSelf = globalThis.self;
    globalThis.self = { webpackChunkyukon: [] };

    try { eval(code.replace("'use strict';", '')); } catch (e) {}

    const mainFnMatch = code.match(/function\s+(a\w+_0x\w+)\(_0x\w+,_0x\w+\)\{_0x\w+=_0x\w+-(0x[0-9a-f]+)/);
    if (!mainFnMatch) { globalThis.self = savedSelf; return null; }

    let lookupFn;
    try { lookupFn = eval(mainFnMatch[1]); } catch (e) { globalThis.self = savedSelf; return null; }

    const baseOffset = parseInt(mainFnMatch[2]);
    const strings = {};
    for (let i = baseOffset; i < baseOffset + 300; i++) {
        try { strings[i] = lookupFn(i); } catch (e) { break; }
    }

    globalThis.self = savedSelf;

    let deob = code;
    // Replace all obfuscated function calls with their string values
    deob = deob.replace(/(?:_0x[0-9a-f]+|a\w+_0x[0-9a-f]+)\((0x[0-9a-f]+)\)/g, (match, hex) => {
        const idx = parseInt(hex);
        return strings[idx] !== undefined ? JSON.stringify(strings[idx]) : match;
    });
    // Convert hex numbers to decimal
    deob = deob.replace(/(?<![a-zA-Z_$])0x([0-9a-f]+)(?![0-9a-f])/g, (m, h) => String(parseInt(h, 16)));
    // Clean up boolean shorthand
    deob = deob.replace(/!0\b/g, 'true');
    deob = deob.replace(/!1\b/g, 'false');
    // Bracket notation to dot notation for simple identifiers
    deob = deob.replace(/\["(\w+)"\]/g, '.$1');
    deob = deob.replace(/\['(\w+)'\]/g, '.$1');

    return deob;
}

function extractSceneInfo(deobCode) {
    // Pack paths (prefer non-event)
    const packs = [...deobCode.matchAll(/'(assets\/media\/rooms\/[^']*-pack\.json)'/g)]
        .map(m => m[1])
        .filter(p => !EVENT_PACK_PATTERNS.some(ep => p.includes(ep)));
    const packPath = packs[0] || null;
    const packKey = packPath ? path.basename(packPath, '.json') : null;

    // Music
    const musicMatch = deobCode.match(/\.music\s*=\s*'([^']+)'/);
    const musicKey = musicMatch ? musicMatch[1] : null;

    // Room triggers
    const triggers = {};
    let tm;
    const trigRoomRe = /'(\w+)'\s*:\s*\(\)\s*=>\s*this\.triggerRoom\((\d+),\s*(\d+),\s*(\d+)\)/g;
    while (tm = trigRoomRe.exec(deobCode))
        triggers[tm[1]] = `() => this.triggerRoom(${tm[2]}, ${tm[3]}, ${tm[4]})`;
    const trigGameRe = /'(\w+)'\s*:\s*\(\)\s*=>\s*this\.triggerGame\((\d+)\)/g;
    while (tm = trigGameRe.exec(deobCode))
        triggers[tm[1]] = `() => this.triggerGame(${tm[2]})`;
    // Special method triggers (like checkCoffeeTutorial)
    const trigMethodRe = /'(\w+)'\s*:\s*\(\)\s*=>\s*this\.(\w+)\(\)/g;
    while (tm = trigMethodRe.exec(deobCode)) {
        if (!triggers[tm[1]] && tm[2] !== 'triggerRoom' && tm[2] !== 'triggerGame')
            triggers[tm[1]] = `() => this.${tm[2]}()`;
    }

    // Detect needed components
    const components = new Set();
    if (/\.Animation\b/.test(deobCode) || /"Animation"/.test(deobCode)) components.add('Animation');
    if (/\.Button\b/.test(deobCode) || /"Button"/.test(deobCode)) components.add('Button');
    if (/\.MoveTo\b/.test(deobCode) || /"MoveTo"/.test(deobCode)) components.add('MoveTo');
    if (/\.SimpleButton\b/.test(deobCode) || /"SimpleButton"/.test(deobCode)) components.add('SimpleButton');
    if (/\.DraggableContainer\b/.test(deobCode)) components.add('DraggableContainer');

    // Extract image/sprite calls
    const images = [];
    const imgRe = /this\.add\.(image|sprite)\(([^)]+)\)/g;
    while (tm = imgRe.exec(deobCode)) {
        const args = parseArgs(tm[2]);
        if (args.length >= 4 && typeof args[2] === 'string' && typeof args[3] === 'string') {
            const entry = { type: tm[1], x: args[0], y: args[1], atlas: args[2], frame: args[3] };
            const after = deobCode.substring(tm.index + tm[0].length, tm.index + tm[0].length + 300);
            const originMatch = after.match(/^\.setOrigin\(([^)]+)\)/);
            if (originMatch) {
                const oa = parseArgs(originMatch[1]);
                if (oa.length >= 2) { entry.originX = oa[0]; entry.originY = oa[1]; }
            }
            images.push(entry);
        }
    }

    return { packPath, packKey, musicKey, triggers, components, images };
}

function parseArgs(s) {
    const args = [];
    let depth = 0, current = '';
    for (const c of s) {
        if (c === '(' || c === '[') depth++;
        else if (c === ')' || c === ']') depth--;
        else if (c === ',' && depth === 0) { args.push(parseVal(current.trim())); current = ''; continue; }
        current += c;
    }
    if (current.trim()) args.push(parseVal(current.trim()));
    return args;
}

function parseVal(s) {
    if (s.startsWith("'") || s.startsWith('"')) return s.slice(1, -1);
    const n = Number(s);
    return isNaN(n) ? s : n;
}

function getYukonRooms() {
    const rooms = {};
    for (const dir of fs.readdirSync(SCENES_DIR)) {
        if (dir.startsWith('_')) continue;
        const dirPath = path.join(SCENES_DIR, dir);
        if (!fs.statSync(dirPath).isDirectory()) continue;
        const jsFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.js'));
        if (jsFiles.length > 0) rooms[dir] = path.join(dirPath, jsFiles[0]);
    }
    return rooms;
}

function varName(frame) {
    let n = frame.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^(\d)/, '_$1');
    // Strip trailing animation numbers for cleaner names
    n = n.replace(/_?\d{3,}$/, '');
    return n || 'sprite';
}

function buildCreateBody(info) {
    const lines = [];
    const usedNames = new Set();

    for (const img of info.images) {
        if (typeof img.x !== 'number' || typeof img.y !== 'number') continue;
        let name = varName(img.frame);
        if (usedNames.has(name)) name = name + '_' + usedNames.size;
        usedNames.add(name);

        const method = img.type === 'sprite' ? 'sprite' : 'image';
        let line = `        const ${name} = this.add.${method}(${img.x}, ${img.y}, "${img.atlas}", "${img.frame}");`;
        lines.push(line);

        if (img.originX !== undefined && (img.originX !== 0.5 || img.originY !== 0.5)) {
            lines.push(`        ${name}.setOrigin(${img.originX}, ${img.originY});`);
        }
        lines.push('');
    }

    return lines.join('\n');
}

function generateScene(roomDir, sceneFile, deobCode, info) {
    const className = path.basename(sceneFile, '.js');

    const componentImports = info.components.size > 0
        ? `\nimport { ${[...info.components].sort().join(', ')} } from '@components/components'\n`
        : '';

    let triggersCode = '';
    if (Object.keys(info.triggers).length > 0) {
        const entries = Object.entries(info.triggers)
            .map(([k, v]) => `            '${k}': ${v}`);
        triggersCode = `\n        this.roomTriggers = {\n${entries.join(',\n')}\n        }\n`;
    }

    const musicCode = info.musicKey ? `        this.music = '${info.musicKey}'\n` : '';
    const createBody = buildCreateBody(info);

    return `import RoomScene from '../RoomScene'
${componentImports}

/* START OF COMPILED CODE */

export default class ${className} extends RoomScene {

    constructor() {
        super("${className}");

        /* START-USER-CTR-CODE */
${triggersCode}${musicCode ? '        ' + musicCode : ''}
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
${info.packPath ? `        this.load.pack("${info.packKey}", "${info.packPath}");` : ''}
    }

    /** @returns {void} */
    _create() {

${createBody}
        this.events.emit("scene-awake");
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
`;
}

function main() {
    console.log('CPJ Scene Deobfuscator');
    console.log(`  CPJ: ${CPJ_DIR}`);
    console.log(`  Scenes: ${SCENES_DIR}`);
    console.log(`  Dry run: ${DRY_RUN}`);
    if (SINGLE_ROOM) console.log(`  Room: ${SINGLE_ROOM}`);
    console.log();

    const { roomChunks, chunkHashes } = parseCpjChunks();
    const yukonRooms = getYukonRooms();
    let updated = 0, skipped = 0, failed = 0;

    for (const [roomDir, sceneFile] of Object.entries(yukonRooms).sort()) {
        if (SINGLE_ROOM && roomDir !== SINGLE_ROOM) continue;

        // Find matching CPJ chunk — exclude mission/event paths
        const candidates = [];
        const seenChunks = new Set();
        for (const [chunkPath, chunkId] of Object.entries(roomChunks)) {
            if (seenChunks.has(chunkId)) continue;
            if (chunkPath.startsWith('_')) continue;
            const parts = chunkPath.split('/');
            const cn = parts[parts.length - 1].toLowerCase();
            const dn = parts[0].toLowerCase();
            if (cn === roomDir.toLowerCase() || dn === roomDir.toLowerCase()) {
                const chunkFile = getChunkFile(chunkId, chunkHashes);
                if (chunkFile) {
                    seenChunks.add(chunkId);
                    candidates.push({ path: chunkPath, chunkId, chunkFile });
                }
            }
        }

        if (candidates.length === 0) continue;

        // Skip non-room chunks
        const skipNames = ['Editor','Pin','Robot','Alarm','Ball','Pickup','Decoration',
            'Enemy','Projectile','Switchbox','Shadows','Waddle','Game','Seat','NormanSwarm'];
        let best = candidates.find(c => {
            const cn = c.path.split('/').pop();
            return !skipNames.some(s => cn.includes(s));
        }) || candidates[0];

        // Prefer variant whose path contains the room dir name
        for (const c of candidates) {
            if (c.path.includes(`${roomDir}/`) && !skipNames.some(s => c.path.split('/').pop().includes(s))) {
                best = c;
                break;
            }
        }

        const deob = deobfuscateChunk(best.chunkFile);
        if (!deob) { console.log(`  ${roomDir}: FAILED to deobfuscate`); failed++; continue; }

        const info = extractSceneInfo(deob);
        if (!info.packPath) { console.log(`  ${roomDir}: no pack found, skip`); skipped++; continue; }
        if (info.images.length === 0) { console.log(`  ${roomDir}: no images, skip`); skipped++; continue; }

        // Check if frames already match
        const existing = fs.readFileSync(sceneFile, 'utf-8');
        const existingFrames = [...existing.matchAll(/(?:image|sprite)\([^,]+,\s*[^,]+,\s*["']([^"']+)["'],\s*["']([^"']+)["']/g)]
            .map(m => m[2]);
        const cpjFrames = new Set(info.images.map(i => i.frame));
        const matchCount = existingFrames.filter(f => cpjFrames.has(f)).length;
        if (matchCount === existingFrames.length && existingFrames.length > 2) {
            skipped++;
            continue;
        }

        const newCode = generateScene(roomDir, sceneFile, deob, info);

        if (DRY_RUN) {
            console.log(`  ${roomDir}: would update (${info.images.length} images, pack: ${path.basename(info.packPath)})`);
        } else {
            fs.writeFileSync(sceneFile, newCode);
            console.log(`  ${roomDir}: UPDATED (${info.images.length} images, pack: ${path.basename(info.packPath)})`);
        }
        updated++;
    }

    console.log(`\nDone: ${updated} updated, ${skipped} skipped, ${failed} failed`);
}

main();
