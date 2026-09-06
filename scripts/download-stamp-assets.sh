#!/bin/bash
# Download missing stamp assets from CPJ
BASE="https://play.cpjourney.net/assets/media/interface/game/stampbook"
DEST="/Users/shaun/Desktop/Projects/yukon/assets/media/interface/game/stampbook"

echo "=== Downloading missing stamp assets from CPJ ==="

# 1. Missing stamp image (717)
echo "--- Missing stamp image ---"
curl -sf "$BASE/stamps/717.png" -o "$DEST/stamps/717.png" && echo "  Downloaded stamp 717" || echo "  Failed stamp 717"

# 2. Missing category header (10000)
echo "--- Missing category header ---"
curl -sf "$BASE/categoryHeader/10000.png" -o "$DEST/categoryHeader/10000.png" && echo "  Downloaded header 10000" || echo "  Failed header 10000"

# 3. Missing page background (62)
echo "--- Missing page background ---"
curl -sf "$BASE/insidePagesBackground/62.png" -o "$DEST/insidePagesBackground/62.png" && echo "  Downloaded bg 62" || echo "  Failed bg 62"

# 4. Category active/inactive icons for tabs
# These are the tab icons CPJ uses (discovered via network sniffing)
# All group IDs from crumbs
ALL_GROUPS="0 5 6 7 8 9 10 11 12 13 14 15 16 19 23 28 32 38 48 52 54 56 57 58 62 9001 10000"

mkdir -p "$DEST/category/active"
mkdir -p "$DEST/category/inactive"

echo "--- Category active/inactive icons ---"
for gid in $ALL_GROUPS; do
    curl -sf "$BASE/category/active/${gid}.png" -o "$DEST/category/active/${gid}.png" && echo "  Downloaded active/$gid" || echo "  No active/$gid"
    curl -sf "$BASE/category/inactive/${gid}.png" -o "$DEST/category/inactive/${gid}.png" && echo "  Downloaded inactive/$gid" || echo "  No inactive/$gid"
done

# 5. Try cover/clasp/highlight assets
mkdir -p "$DEST/coverBackground"
mkdir -p "$DEST/clasp"
mkdir -p "$DEST/highlight"

echo "--- Cover/clasp/highlight ---"
for i in 1 2 3; do
    curl -sf "$BASE/coverBackground/${i}_0.png" -o "$DEST/coverBackground/${i}_0.png" && echo "  Downloaded coverBackground/${i}_0" || echo "  No coverBackground/${i}_0"
    curl -sf "$BASE/clasp/${i}.png" -o "$DEST/clasp/${i}.png" && echo "  Downloaded clasp/$i" || echo "  No clasp/$i"
    curl -sf "$BASE/highlight/${i}.png" -o "$DEST/highlight/${i}.png" && echo "  Downloaded highlight/$i" || echo "  No highlight/$i"
done

echo ""
echo "=== Done ==="
echo "Stamp images: $(ls "$DEST/stamps/" | wc -l)"
echo "Category headers: $(ls "$DEST/categoryHeader/" | wc -l)"
echo "Page backgrounds: $(ls "$DEST/insidePagesBackground/" | wc -l)"
echo "Active icons: $(ls "$DEST/category/active/" 2>/dev/null | wc -l)"
echo "Inactive icons: $(ls "$DEST/category/inactive/" 2>/dev/null | wc -l)"
