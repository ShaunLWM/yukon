# TODO

## Done

- [x] Docker Compose setup (client, server, MySQL)
- [x] CPJourney crumbs adapted for yukon
- [x] 49 room scenes ported with animations and interactive objects
- [x] 28 room-interactive widgets (catalogs, posters, game UIs)
- [x] Table and waddle game wiring
- [x] Stamps system (client collection, server persistence, Ruffle hooks)
- [x] Stampbook widget with cover editor and drag-and-drop
- [x] Stamp earned notification (CPJ StampPrompt port)
- [x] Player card stamp count and stampbook button
- [x] Stampbook cover persistence (stampbookInfo + coverStamps in DB)
- [x] Engine fixes (pathfinding, reconnection, ice sliding, loading spinner)
- [x] 48 room scenes ported from CPJourney
- [x] Ruffle Flash emulator integration (RuffleController, CDN loading, base class wiring)
- [x] SWF minigames hooked up via Ruffle (data-driven from games.json crumbs)
- [x] Puffles system (igloo pets, adoption, pet card, walking puffle in rooms, digging for coins)
- [ ] Party/event system (room decorations, event-specific items, party rooms)
- [x] UI enhancements (newspaper viewer, archives filing cabinet, penguin transformations, inventory search)
- [ ] Igloo editing improvements
- [x] Buddy list online status indicators + buddy rings on penguins
- [x] Postcard sending from rooms (player card mail button)
- [ ] Cross-server buddy features (buddy_find_server, buddy_online_server, buddy_offline_server)
- [ ] Buddy favorites + buddy search

## CPJ Features to Port (from GitHub audit)

### Quick Wins
- [x] Outfit Saver — save/load up to 12 outfit presets (OutfitLoader plugin + UI widget)
- [x] Unlock/Redemption Codes — redeem codes for items/coins with expiry (UnlockCodes plugin)
- [x] Info Plugin — server info messages + streamer mode (~20 lines)
- [x] Popup Interactions — track which dialogs a user has seen (first-time tutorials)
- [ ] Igloo Likes — rate other players' igloos (social counter + DB table)

### Medium Effort
- [ ] Mining System — idle coin farming in mine/cave rooms with AFK detection
- [ ] Penguins Work — job system (pizza delivery, coffee serving) with stamp progression
- [ ] Enhanced Moderation — mutes, reports, username verification, invisibility, warn, broadcast
- [ ] Mod Panel — admin panel: user search, edit player, add/remove items, teleport, ban history, alt detection
- [ ] Scavenger Hunts — item collection hunts driven by crumbs config

### Big Lifts
- [ ] Dance Contest — multiplayer dance game with server-side song queue, 6 tracks, 4 difficulties
- [ ] Party/Quest System — party events, quests, gem rewards, concert system (multiple plugins + widgets)

### Extra DB Models (needed for above)
- IglooLikes, LocationInventories, MusicInventories, FlooringInventories, Mascots (encounter tracking)

### Skipped (not relevant for offline clone)
- ServerJumping, Voyager/Tower (CPJ-original), PlayerSubmissions (online community), LiveEvent (mod-only)
