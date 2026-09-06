# Yukon — CPJourney Edition

An offline Club Penguin clone built on [yukon](https://github.com/wizguin/yukon) (client) and [yukon-server](https://github.com/wizguin/yukon-server), enhanced with features ported from CPJourney's deobfuscated client.

## Built With

* [Phaser 3](https://phaser.io/) — game engine
* [Socket.IO](https://socket.io/) — real-time networking
* [Node.js](https://nodejs.org/en/) — server runtime
* [Sequelize](https://sequelize.org/) — database ORM
* [MySQL 8](https://www.mysql.com/) — database
* [Docker Compose](https://docs.docker.com/compose/) — container orchestration

## Quick Start (Docker)

The easiest way to run everything is with Docker Compose from the parent directory:

```console
docker compose up -d --build
```

This starts three containers:
- **mysql** — database on port 3306
- **server** — game server (login on 6111, world on 6112)
- **client** — webpack dev server on port 3000

Open `http://localhost:3000` in your browser. Create an account or log in with saved credentials.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) with Compose
- Game assets placed in `assets/media/` (not included in repo)

### Database Credentials

| Field    | Value       |
|----------|-------------|
| User     | yukon       |
| Password | yukon_pass  |
| Database | yukon       |

### Rebuilding

```console
docker compose up -d --build client   # rebuild client only
docker compose up -d --build server   # rebuild server only
```

## Local Installation (without Docker)

### Prerequisites

* [Node.js](https://nodejs.org/en/)
* [yukon-server](https://github.com/wizguin/yukon-server)
* Game assets

### Setup

1. Clone and install dependencies:
```console
git clone <repo-url> yukon
cd yukon
npm install
```

2. Merge game assets into the `assets/` folder.

3. Run the dev server:
```console
npm run dev
```

4. Build for production (output in `/dist`):
```console
npm run build
```

5. Rebuild crumbs (only needed when modifying crumb data):
```console
npm run build-crumbs
```

## Added Features (CPJourney Ports)

### Rooms
49 room scenes ported from CPJourney with animations, interactive objects, and navigation triggers. Includes room-specific widgets (catalogs, posters, game UIs).

### Stamps
Full stamp system — collection tracking, stampbook widget with browsable pages, cover customization (colour, clasp, highlight, pattern), drag-and-drop stamps/pins on cover with persistent save. Stamp earned notification with slide-in animation.

### Games
Table and waddle game wiring from rooms. Card-Jitsu, Sled Racing, Mancala, Find Four.

### Engine Improvements
- Socket.IO reconnection support
- Pathfinding fixes (collision rounding, camera rooms)
- Ice sliding physics
- Ruffle Flash game integration hooks (stamp earning from minigames)

## Production Usage

Set up WebSocket proxy routes on your web server:

```apache
RewriteEngine on

RewriteCond %{REQUEST_URI} ^/world/login [NC]
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteRule /(.*) ws://localhost:6111/$1 [P,L]
ProxyPass /world/login http://localhost:6111

RewriteCond %{REQUEST_URI} ^/world/blizzard [NC]
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteRule /(.*) ws://localhost:6112/$1 [P,L]
ProxyPass /world/blizzard http://localhost:6112
```

Use the minified bundle from `npm run build` (output in `/dist`).

## Scene Editing

Editing `.scene` files requires [Phaser Editor](https://phasereditor2d.com/).

## Credits

Built on [yukon](https://github.com/wizguin/yukon) by wizguin. CPJourney features reverse-engineered from the deobfuscated CPJourney client.

## Disclaimer

This project is intended for personal use only.
