#!/usr/bin/env node
/**
 * V2: Extract FULL scene class code from CPJ webpack chunks.
 * Preserves containers, setOrigin, visible, animations, buttons, custom methods, depth sorting.
 *
 * Usage: node scripts/deobfuscate-cpj-scenes-v2.js [--cpj-dir PATH] [--dry-run] [--room NAME]
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

const KNOWN_COMPONENTS = [
    'Animation', 'Button', 'Draggable', 'DraggableContainer', 'HoverAnimation',
    'Interactive', 'MoveTo', 'NineSlice', 'ShowHint', 'SimpleButton', 'Zone'
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
    for (let i = baseOffset; i < baseOffset + 500; i++) {
        try { strings[i] = lookupFn(i); } catch (e) { break; }
    }
    globalThis.self = savedSelf;

    let deob = code;
    deob = deob.replace(/(?:_0x[0-9a-f]+|a\w+_0x[0-9a-f]+)\((0x[0-9a-f]+)\)/g, (match, hex) => {
        const idx = parseInt(hex);
        return strings[idx] !== undefined ? JSON.stringify(strings[idx]) : match;
    });
    deob = deob.replace(/(?<![a-zA-Z_$])0x([0-9a-f]+)(?![0-9a-f])/g, (m, h) => String(parseInt(h, 16)));
    // Fix return!0 → return true (add space when preceded by a letter)
    deob = deob.replace(/([a-zA-Z])!0\b/g, '$1 true');
    deob = deob.replace(/!0\b/g, 'true');
    deob = deob.replace(/([a-zA-Z])!1\b/g, '$1 false');
    deob = deob.replace(/!1\b/g, 'false');
    // Handle [("name")] bracket notation (with parens)
    deob = deob.replace(/\[\("(\w+)"\)\]/g, '.$1');
    deob = deob.replace(/\[\('(\w+)'\)\]/g, '.$1');
    // Standard bracket notation
    deob = deob.replace(/\["(\w+)"\]/g, '.$1');
    deob = deob.replace(/\['(\w+)'\]/g, '.$1');

    return deob;
}

function findMatchingBrace(code, openIndex) {
    let depth = 0;
    for (let i = openIndex; i < code.length; i++) {
        if (code[i] === '{') depth++;
        else if (code[i] === '}') { depth--; if (depth === 0) return i; }
    }
    return -1;
}

function extractSceneClass(deobCode) {
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Find ALL class extends patterns: class X extends Y.default {
    const classRe = /class\s+(_0x\w+)\s+extends\s+(_0x\w+)\.default\s*\{/g;
    const candidates = [];
    let m;
    while (m = classRe.exec(deobCode)) {
        const className = m[1];
        const parentVar = m[2];

        const braceIdx = deobCode.indexOf('{', m.index + m[0].length - 1);
        const classEnd = findMatchingBrace(deobCode, braceIdx);
        if (classEnd === -1) continue;

        const body = deobCode.substring(braceIdx + 1, classEnd);

        // Scene classes have _create method
        if (body.includes('_create')) {
            candidates.push({ className, parentVar, body, braceIdx, classEnd });
        }
    }

    if (candidates.length === 0) return null;

    // Prefer the candidate with both _preload and _create
    let best = candidates.find(c => c.body.includes('_preload') && c.body.includes('_create'));
    if (!best) best = candidates[0];

    // Detect components variable from class body usage (more reliable than chunk-level imports)
    let compVar = null;
    const compPattern = KNOWN_COMPONENTS.join('|');
    const compRefRe = new RegExp(`\\b(_0x\\w+)\\.(${compPattern})\\b`);
    const compRefMatch = best.body.match(compRefRe);
    if (compRefMatch) compVar = compRefMatch[1];

    let classBody = best.body;

    // Detect used components
    const usedComponents = new Set();
    if (compVar) {
        for (const comp of KNOWN_COMPONENTS) {
            if (new RegExp(`\\b${esc(compVar)}\\.${comp}\\b`).test(classBody)) usedComponents.add(comp);
        }
    }

    // Replace component references
    if (compVar) {
        for (const comp of usedComponents) {
            classBody = classBody.replace(new RegExp(`\\b${esc(compVar)}\\.${comp}\\b`, 'g'), comp);
        }
    }

    // Remove dead lookup function aliases: const _0xHEX = someOtherLookup;
    classBody = classBody.replace(/const\s+_0x\w+\s*=\s*(?:a\w+_0x\w+|_0x\w+)\s*[;,]/g, '');

    return { classBody, usedComponents };
}

function splitMethods(classBody) {
    const methods = {};
    // Methods appear as: methodName(params){body}
    // Find them by scanning for identifier followed by ( at depth 0
    const re = /(\w+)\s*\(([^)]*)\)\s*\{/g;
    let m;
    const methodStarts = [];

    while (m = re.exec(classBody)) {
        const name = m[1];
        const paramsEnd = m.index + m[0].length;
        const braceStart = classBody.lastIndexOf('{', paramsEnd);
        const braceEnd = findMatchingBrace(classBody, braceStart);
        if (braceEnd === -1) continue;

        methodStarts.push({
            name,
            params: m[2],
            bodyStart: braceStart + 1,
            bodyEnd: braceEnd,
            fullEnd: braceEnd + 1
        });

        re.lastIndex = braceEnd + 1;
    }

    for (const ms of methodStarts) {
        methods[ms.name] = {
            params: ms.params,
            body: classBody.substring(ms.bodyStart, ms.bodyEnd)
        };
    }

    return methods;
}

function splitStatements(code) {
    const stmts = [];
    let current = '';
    let depth = 0;
    let inStr = false, strCh = '';
    let declKeyword = null;

    for (let i = 0; i < code.length; i++) {
        const c = code[i];
        if (inStr) {
            current += c;
            if (c === strCh && code[i - 1] !== '\\') inStr = false;
            continue;
        }
        if (c === "'" || c === '"' || c === '`') { inStr = true; strCh = c; current += c; continue; }
        if (c === '(' || c === '[' || c === '{') depth++;
        if (c === ')' || c === ']' || c === '}') depth--;
        if (c === ';' && depth === 0) {
            const t = current.trim();
            if (t) stmts.push(t);
            current = '';
            declKeyword = null;
            continue;
        }
        if (c === ',' && depth === 0) {
            const t = current.trim();
            if (t) {
                const dm = t.match(/^(let|var|const)\s/);
                if (dm) declKeyword = dm[1];
                stmts.push(t);
            }
            current = declKeyword ? declKeyword + ' ' : '';
            continue;
        }
        current += c;
    }
    const t = current.trim();
    if (t) stmts.push(t);
    return stmts;
}

function renameVars(statements) {
    const renames = new Map();
    const usedNames = new Set([
        'this', 'true', 'false', 'null', 'undefined', 'super',
        'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
        'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function',
        'if', 'import', 'in', 'instanceof', 'let', 'new', 'return', 'static',
        'switch', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',
        'await', 'async', 'of', 'from', 'as', 'enum', 'implements', 'interface',
        'package', 'private', 'protected', 'public'
    ]);

    function unique(base) {
        base = base.replace(/^_+/, '').replace(/_+$/, '').replace(/[^a-zA-Z0-9_]/g, '_') || 'v';
        if (/^\d/.test(base)) base = '_' + base;
        if (!usedNames.has(base)) { usedNames.add(base); return base; }
        let i = 2;
        while (usedNames.has(`${base}_${i}`)) i++;
        const n = `${base}_${i}`;
        usedNames.add(n);
        return n;
    }

    const allCode = statements.join('\n');

    // Pass 1: images/sprites from frame name
    let m;
    const imgRe = /(?:let|var|const)\s+(_0x\w+)\s*=\s*this\.add\.(?:image|sprite)\([^,]+,\s*[^,]+,\s*['"][^'"]+['"],\s*['"]([^'"]+)['"]\)/g;
    while (m = imgRe.exec(allCode)) {
        if (!renames.has(m[1])) {
            let name = m[2].replace(/\d{3,}$/, '').replace(/\.\w+$/, '').replace(/[^a-zA-Z0-9_]/g, '_').replace(/_+$/, '');
            renames.set(m[1], unique(name || 'sprite'));
        }
    }

    // Pass 2: containers
    const cntRe = /(?:let|var|const)\s+(_0x\w+)\s*=\s*this\.add\.container\(/g;
    while (m = cntRe.exec(allCode)) {
        if (!renames.has(m[1])) renames.set(m[1], unique('container'));
    }

    // Pass 3: rectangles
    const rectRe = /(?:let|var|const)\s+(_0x\w+)\s*=\s*this\.add\.rectangle\(/g;
    while (m = rectRe.exec(allCode)) {
        if (!renames.has(m[1])) renames.set(m[1], unique('rect'));
    }

    // Pass 4: this.prop = _0xVAR — rename to prop
    const propRe = /this\.(\w+)\s*=\s*(_0x\w+)\b/g;
    while (m = propRe.exec(allCode)) {
        if (!renames.has(m[2]) && !['music', 'roomTriggers', 'itemId'].includes(m[1])) {
            renames.set(m[2], unique(m[1]));
        }
    }

    // Pass 5: component instances (all known components)
    const compRe = new RegExp(`(?:let|var|const)\\s+(_0x\\w+)\\s*=\\s*new\\s+(${KNOWN_COMPONENTS.join('|')})\\(`, 'g');
    while (m = compRe.exec(allCode)) {
        if (!renames.has(m[1])) {
            const base = m[2].charAt(0).toLowerCase() + m[2].slice(1);
            renames.set(m[1], unique(base));
        }
    }

    // Pass 6: remaining _0x variables
    const remRe = /(?:let|var|const)\s+(_0x\w+)\s*=/g;
    while (m = remRe.exec(allCode)) {
        if (!renames.has(m[1])) renames.set(m[1], unique('v'));
    }

    // Pass 7: arrow function parameters
    const arrowRe = /\b(_0x\w+)\s*=>/g;
    while (m = arrowRe.exec(allCode)) {
        if (!renames.has(m[1])) renames.set(m[1], unique('arg'));
    }

    // Apply renames (longest first)
    const sorted = [...renames.entries()].sort((a, b) => b[0].length - a[0].length);
    return statements.map(s => {
        let r = s;
        for (const [old, nw] of sorted) {
            r = r.replace(new RegExp(`\\b${old}\\b`, 'g'), nw);
        }
        return r;
    });
}

function cleanupUnresolvedRefs(statements) {
    const removedVars = new Set();
    const removedThisProps = new Set();

    // Pass 1: identify statements with _0x module refs, track their declared vars
    const keepPass1 = statements.map(stmt => {
        if (/_0x[0-9a-f]+\.\w+/.test(stmt)) {
            const declMatch = stmt.match(/^(?:let|var|const)\s+(\w+)\s*=/);
            if (declMatch) removedVars.add(declMatch[1]);
            return false;
        }
        return true;
    });

    // Pass 2: remove statements using removed variables, clean arrays
    const result = [];
    for (let i = 0; i < statements.length; i++) {
        if (!keepPass1[i]) continue;
        const stmt = statements[i];

        let skip = false;
        for (const rv of removedVars) {
            const rvRe = new RegExp(`\\b${rv}\\b`);
            if (!rvRe.test(stmt)) continue;

            // Array declaration: clean the variable from the array instead of removing
            if (/^(?:let|var|const)\s+\w+\s*=\s*\[/.test(stmt)) {
                let fixed = stmt;
                for (const rv2 of removedVars) {
                    fixed = fixed.replace(new RegExp(`,\\s*${rv2}\\b`, 'g'), '');
                    fixed = fixed.replace(new RegExp(`\\b${rv2}\\s*,\\s*`, 'g'), '');
                }
                result.push(fixed);
                skip = true;
                break;
            }

            // this.prop = removedVar → track the prop as removed
            const propMatch = stmt.match(/^this\.(\w+)\s*=/);
            if (propMatch) removedThisProps.add(propMatch[1]);

            skip = true;
            break;
        }

        if (!skip) result.push(stmt);
    }

    return { statements: result, removedThisProps };
}

function formatStatements(stmts, indent) {
    const pad = '    '.repeat(indent);
    return stmts.map(s => `${pad}${s};`).join('\n');
}

function formatMethodBody(body, indent) {
    // Remove dead lookup aliases
    body = body.replace(/const\s+_0x\w+\s*=\s*(?:a\w+_0x\w+|_0x\w+)\s*[;,]/g, '');
    const stmts = splitStatements(body);
    if (stmts.length === 0) return '';
    const pad = '    '.repeat(indent);
    return stmts.map(s => `${pad}${s};`).join('\n');
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

function generateScene(className, methods, usedComponents, roomDir) {
    const compImport = usedComponents.size > 0
        ? `\nimport { ${[...usedComponents].sort().join(', ')} } from '@components/components'\n`
        : '';

    let output = `import RoomScene from '../RoomScene'\n${compImport}\n\n/* START OF COMPILED CODE */\n\nexport default class ${className} extends RoomScene {\n\n`;

    // Process _create first to identify removed properties
    let removedThisProps = new Set();
    let createBody = '';
    if (methods._create) {
        const createStmts = splitStatements(methods._create.body);
        const renamedStmts = renameVars(createStmts);
        const cleaned = cleanupUnresolvedRefs(renamedStmts);
        removedThisProps = cleaned.removedThisProps;
        createBody = formatStatements(cleaned.statements, 2);
    }

    // Constructor
    if (methods.constructor) {
        const ctorStmts = splitStatements(methods.constructor.body);
        const renamedCtorStmts = renameVars(ctorStmts);
        output += `    constructor() {\n        super("${className}");\n\n        /* START-USER-CTR-CODE */\n\n`;
        // Skip the super() call in statements
        const nonSuper = renamedCtorStmts.filter(s => !s.startsWith('super('));
        if (nonSuper.length > 0) {
            output += formatStatements(nonSuper, 2) + '\n';
        }
        output += `\n        /* END-USER-CTR-CODE */\n    }\n\n`;
    }

    // _preload (normalize pack path to match actual file location)
    if (methods._preload) {
        let body = formatMethodBody(methods._preload.body, 2);
        const packFile = `assets/media/rooms/${roomDir}/${roomDir}-pack.json`;
        body = body.replace(/(this\.load\.pack\([^,]+,\s*')[^']+('\))/, `$1${packFile}$2`);
        output += `    /** @returns {void} */\n    _preload() {\n${body}\n    }\n\n`;
    }

    // _create
    if (createBody) {
        output += `    /** @returns {void} */\n    _create() {\n\n${createBody}\n    }\n\n`;
    }

    // Custom methods (everything else except constructor, _preload, _create)
    const skipMethods = new Set(['constructor', '_preload', '_create']);
    for (const [name, method] of Object.entries(methods)) {
        if (skipMethods.has(name)) continue;
        let body = formatMethodBody(method.body, 2);

        // Filter out lines referencing removed this.props
        if (removedThisProps.size > 0) {
            const lines = body.split('\n');
            const filtered = lines.filter(line => {
                for (const prop of removedThisProps) {
                    if (new RegExp(`\\bthis\\.${prop}\\b`).test(line)) return false;
                }
                return true;
            });
            body = filtered.join('\n');
        }

        // Filter out lines with remaining _0x references
        if (body.includes('_0x')) {
            const lines = body.split('\n');
            body = lines.filter(l => !/_0x[0-9a-f]+/.test(l)).join('\n');
        }

        // Ensure create() always has super.create()
        if (name === 'create' && !body.includes('super.create()')) {
            body = '        super.create();\n' + body;
        }

        // Skip empty methods (except create which should always call super)
        if (!body.trim() && name !== 'create') continue;

        // Rename _0x method parameters
        let params = method.params;
        const paramParts = params.split(',').map(p => p.trim()).filter(Boolean);
        const paramRenames = [];
        const renamedParams = paramParts.map((p, i) => {
            if (/_0x\w+/.test(p)) {
                const newName = `arg${i + 1}`;
                paramRenames.push([p, newName]);
                return newName;
            }
            return p;
        });
        params = renamedParams.join(', ');
        for (const [old, nw] of paramRenames) {
            body = body.replace(new RegExp(`\\b${old}\\b`, 'g'), nw);
        }

        output += `    ${name}(${params}) {\n${body}\n    }\n\n`;
    }

    output += `    /* START-USER-CODE */\n    /* END-USER-CODE */\n}\n\n/* END OF COMPILED CODE */\n`;
    return output;
}

function main() {
    console.log('CPJ Scene Deobfuscator V2');
    console.log(`  CPJ: ${CPJ_DIR}`);
    console.log(`  Scenes: ${SCENES_DIR}`);
    console.log(`  Dry run: ${DRY_RUN}`);
    if (SINGLE_ROOM) console.log(`  Room: ${SINGLE_ROOM}`);
    console.log();

    const { roomChunks, chunkHashes } = parseCpjChunks();
    const yukonRooms = getYukonRooms();
    let updated = 0, skipped = 0, failed = 0;

    const skipNames = ['Editor','Pin','Robot','Alarm','Ball','Pickup','Decoration',
        'Enemy','Projectile','Switchbox','Shadows','Waddle','Game','Seat','NormanSwarm'];

    for (const [roomDir, sceneFile] of Object.entries(yukonRooms).sort()) {
        if (SINGLE_ROOM && roomDir !== SINGLE_ROOM) continue;

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

        let best = candidates.find(c => {
            const cn = c.path.split('/').pop();
            return !skipNames.some(s => cn.includes(s));
        }) || candidates[0];

        for (const c of candidates) {
            if (c.path.includes(`${roomDir}/`) && !skipNames.some(s => c.path.split('/').pop().includes(s))) {
                best = c;
                break;
            }
        }

        const deob = deobfuscateChunk(best.chunkFile);
        if (!deob) { console.log(`  ${roomDir}: FAILED to deobfuscate`); failed++; continue; }

        const extracted = extractSceneClass(deob);
        if (!extracted) { console.log(`  ${roomDir}: no scene class found`); skipped++; continue; }

        const methods = splitMethods(extracted.classBody);
        if (!methods._create) { console.log(`  ${roomDir}: no _create method`); skipped++; continue; }

        const className = path.basename(sceneFile, '.js');
        const newCode = generateScene(className, methods, extracted.usedComponents, roomDir);

        // Quick sanity check: must have at least one this.add call
        if (!newCode.includes('this.add.')) {
            console.log(`  ${roomDir}: generated code has no this.add calls, skip`);
            skipped++;
            continue;
        }

        // Check for remaining _0x references
        const remaining0x = (newCode.match(/_0x[0-9a-f]+/g) || []);
        const warning = remaining0x.length > 0 ? ` (WARNING: ${remaining0x.length} unresolved _0x refs)` : '';

        if (DRY_RUN) {
            const methodNames = Object.keys(methods).filter(n => !['constructor', '_preload', '_create'].includes(n));
            console.log(`  ${roomDir}: would update (methods: ${methodNames.length > 0 ? methodNames.join(', ') : 'none'}, components: ${[...extracted.usedComponents].join(', ') || 'none'})${warning}`);
        } else {
            fs.writeFileSync(sceneFile, newCode);
            const methodNames = Object.keys(methods).filter(n => !['constructor', '_preload', '_create'].includes(n));
            console.log(`  ${roomDir}: UPDATED (methods: ${methodNames.length > 0 ? methodNames.join(', ') : 'none'}, components: ${[...extracted.usedComponents].join(', ') || 'none'})${warning}`);
        }
        updated++;
    }

    console.log(`\nDone: ${updated} updated, ${skipped} skipped, ${failed} failed`);
}

main();
