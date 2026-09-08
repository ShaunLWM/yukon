// Merges all crumb files into one

const fs = require('fs')
const path = require('path')

const lang = 'en'
const crumbsDir = path.resolve(__dirname, `../assets/media/crumbs/${lang}`)

const crumbFiles = [
    'agent_quiz',
    'anniversary_trivia',
    'artifacts',
    'cards',
    'colors',
    'community_events',
    'cover',
    'flooring',
    'furniture',
    'games',
    'igloo_music',
    'igloos',
    'items',
    'jokes',
    'locations',
    'mascot_messages',
    'mascot_postcards',
    'missions',
    'music',
    'newspaper_pages',
    'newspapers',
    'penguin',
    'pets',
    'phone_locations',
    'polaroids',
    'postcards',
    'puffle_furniture',
    'puffleanims',
    'puffleitems',
    'puffles',
    'quick_keys',
    'rooms',
    'ruffle_widgets',
    'safe_messages',
    'scarystories',
    'secret_frames',
    'sounds',
    'stage_script_messages',
    'stamps',
    'strings',
    'tour_messages',
    'tour_questions',
    'tour_quiz',
    'tours',
    'transformations',
    'widgets',
    'worlds'
]

const crumbs = {}

crumbFiles.forEach(file => {
    crumbs[file] = require(path.resolve(crumbsDir, `${file}.json`))
})

try {
    fs.writeFileSync(path.resolve(crumbsDir, 'crumbs.json'), JSON.stringify(crumbs))
    console.log('Done')
} catch (error) {
    console.log(error)
}
