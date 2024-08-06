const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
    painting_title: String,
    season: String,
    id: String,
    painting_index: String,
    img_src: String,
    episode: String,
    num_colors: String,
    youtube_src: String,
    colors: [String],
    color_hex: [String],
    Black_Gesso: String,
    Bright_Red: String,
    Burnt_Umber: String,
    Cadmium_Yellow: String,
    Dark_Sienna: String,
    Indian_Red: String,
    Indian_Yellow: String,
    Liquid_Black: String,
    Liquid_Clear: String,
    Midnight_Black: String,
    Phthalo_Blue: String,
    Phthalo_Green: String,
    Prussian_Blue: String,
    Sap_Green: String,
    Titanium_White: String,
    Van_Dyke_Brown: String,
    Yellow_Ochre: String,
    Alizarin_Crimson: String,
    EPISODE: String,
    TITLE: String,
    APPLE_FRAME: String,
    AURORA_BOREALIS: String,
    BARN: String,
    BEACH: String,
    BOAT: String,
    BRIDGE: String,
    BUILDING: String,
    BUSHES: String,
    CABIN: String,
    CACTUS: String,
    CIRCLE_FRAME: String,
    CIRRUS: String,
    CLIFF: String,
    CLOUDS: String,
    CONIFER: String,
    CUMULUS: String,
    DECIDUOUS: String,
    DIANE_ANDRE: String,
    DOCK: String,
    DOUBLE_OVAL_FRAME: String,
    FARM: String,
    FENCE: String,
    FIRE: String,
    FLORIDA_FRAME: String,
    FLOWERS: String,
    FOG: String,
    FRAMED: String,
    GRASS: String,
    GUEST: String,
    HALF_CIRCLE_FRAME: String,
    HALF_OVAL_FRAME: String,
    HILLS: String,
    LAKE: String,
    LAKES: String,
    LIGHTHOUSE: String,
    MILL: String,
    MOON: String,
    MOUNTAIN: String,
    MOUNTAINS: String,
    NIGHT: String,
    OCEAN: String,
    OVAL_FRAME: String,
    PALM_TREES: String,
    PATH: String,
    PERSON: String,
    PORTRAIT: String,
    RECTANGLE_3D_FRAME: String,
    RECTANGULAR_FRAME: String,
    RIVER: String,
    ROCKS: String,
    SEASHELL_FRAME: String,
    SNOW: String,
    SNOWY_MOUNTAIN: String,
    SPLIT_FRAME: String,
    STEVE_ROSS: String,
    STRUCTURE: String,
    SUN: String,
    TOMB_FRAME: String,
    TREE: String,
    TREES: String,
    TRIPLE_FRAME: String,
    WATERFALL: String,
    WAVES: String,
    WINDMILL: String,
    WINDOW_FRAME: String,
    WINTER: String,
    WOOD_FRAMED: String,
    Episode_TITLE: String,
    Month: String,
    Day: String,
    Year: String,
});

const Painting = mongoose.model('Painting', paintingSchema);

module.exports = Painting;