// Word groups for this game: 65 puzzles, 260 groups, and 1,040 distinct words.
// Each consecutive set of four groups forms one puzzle, ordered by difficulty.
(() => {
    const groups = [
        // Puzzle 1
        ["Bit of Magic", ["CHARM", "CURSE", "HEX", "SPELL"]],
        ["Found Around A Fireplace", ["FLUE", "GRATE", "LOG", "POKER"]],
        ["Things Seen At A Casino", ["CARDS", "CHIPS", "DICE", "SLOTS"]],
        ["Ways To Prepare Cheese", ["CRUMBLE", "MELT", "SHRED", "SLICE"]],
        // Puzzle 2
        ["Household Pets", ["CAT", "DOG", "HAMSTER", "GERBIL"]],
        ["Basic Colors", ["RED", "BLUE", "GREEN", "YELLOW"]],
        ["Eating Utensils", ["FORK", "SPOON", "KNIFE", "CHOPSTICK"]],
        ["Ways To Travel On Foot", ["WALK", "STROLL", "MARCH", "HIKE"]],
        // Puzzle 3
        ["Orchard Fruits", ["APPLE", "PEAR", "PLUM", "PEACH"]],
        ["Stovetop Vessels", ["POT", "PAN", "KETTLE", "SKILLET"]],
        ["Types Of Precipitation", ["RAIN", "SNOW", "SLEET", "HAIL"]],
        ["Money Actions", ["BUY", "SELL", "SPEND", "SAVE"]],
        // Puzzle 4
        ["Types Of Trees", ["OAK", "PINE", "BIRCH", "CEDAR"]],
        ["Writing Tools", ["PEN", "PENCIL", "MARKER", "CRAYON"]],
        ["Things On A Bed", ["BLANKET", "PILLOW", "DUVET", "SHEET"]],
        ["Ways To Look", ["LOOK", "GAZE", "STARE", "PEEK"]],
        // Puzzle 5
        ["Small Garden Birds", ["ROBIN", "SPARROW", "FINCH", "WREN"]],
        ["Music Genres", ["JAZZ", "BLUES", "ROCK", "POP"]],
        ["Geometric Shapes", ["CIRCLE", "SQUARE", "OVAL", "TRIANGLE"]],
        ["Ways To Calm Someone", ["SOOTHE", "EASE", "PACIFY", "COMFORT"]],
        // Puzzle 6
        ["Vegetables In Soup", ["CARROT", "ONION", "CELERY", "TURNIP"]],
        ["City Road Transport", ["CAR", "BUS", "TAXI", "TRAM"]],
        ["Parts Of A Shoe", ["LACE", "SOLE", "HEEL", "TOE"]],
        ["Question Words", ["WHAT", "WHEN", "WHERE", "WHY"]],
        // Puzzle 7
        ["Fish On A Menu", ["SALMON", "TROUT", "TUNA", "COD"]],
        ["Natural Fabrics", ["COTTON", "LINEN", "SILK", "WOOL"]],
        ["Photography Actions", ["SNAP", "SHOOT", "FRAME", "ZOOM"]],
        ["Units Of Time", ["SECOND", "MINUTE", "HOUR", "DAY"]],
        // Puzzle 8
        ["Small Insects", ["ANT", "BEE", "MOTH", "FLY"]],
        ["Sensory Experiences", ["SIGHT", "SOUND", "TASTE", "TOUCH"]],
        ["Baking Instructions", ["KNEAD", "WHISK", "SIFT", "FOLD"]],
        ["Boat Equipment", ["OAR", "SAIL", "ANCHOR", "RUDDER"]],
        // Puzzle 9
        ["Common Flowers", ["ROSE", "TULIP", "DAISY", "LILY"]],
        ["Furniture To Sit Or Work At", ["CHAIR", "TABLE", "DESK", "BENCH"]],
        ["Sports Played With A Ball", ["TENNIS", "SOCCER", "RUGBY", "GOLF"]],
        ["Cleaning Actions", ["SCRUB", "SWEEP", "MOP", "DUST"]],
        // Puzzle 10
        ["Big Cats", ["LION", "TIGER", "LEOPARD", "JAGUAR"]],
        ["Tools In A Toolbox", ["HAMMER", "WRENCH", "PLIERS", "DRILL"]],
        ["Planets", ["MARS", "VENUS", "EARTH", "SATURN"]],
        ["Words For Small", ["SMALL", "TINY", "LITTLE", "MINI"]],
        // Puzzle 11
        ["Edible Nuts", ["ALMOND", "WALNUT", "PECAN", "CASHEW"]],
        ["Items Of Clothing", ["SHIRT", "SKIRT", "DRESS", "BLOUSE"]],
        ["School Subjects", ["MATH", "HISTORY", "SCIENCE", "ART"]],
        ["Ways To Talk", ["SAY", "TELL", "SPEAK", "CHAT"]],
        // Puzzle 12
        ["Legumes", ["BEAN", "PEA", "LENTIL", "SOYBEAN"]],
        ["Metals Used In Jewelry", ["GOLD", "SILVER", "PLATINUM", "TITANIUM"]],
        ["Drawing Actions", ["TRACE", "SKETCH", "DRAW", "DOODLE"]],
        ["Places With Admission Tickets", ["ZOO", "MUSEUM", "CINEMA", "THEATER"]],
        // Puzzle 13
        ["Berries", ["RASPBERRY", "STRAWBERRY", "BLUEBERRY", "CRANBERRY"]],
        ["Camping Gear", ["TENT", "COMPASS", "LANTERN", "TARP"]],
        ["Bakery Items", ["BREAD", "BAGEL", "MUFFIN", "SCONE"]],
        ["Sleepy Actions", ["YAWN", "DOZE", "SNOOZE", "NAP"]],
        // Puzzle 14
        ["Reptiles", ["SNAKE", "LIZARD", "GECKO", "TURTLE"]],
        ["Leafy Salad Greens", ["KALE", "CHARD", "ENDIVE", "ARUGULA"]],
        ["Office Supplies", ["STAPLER", "BINDER", "FOLDER", "CLIP"]],
        ["Medical Supplies", ["MASK", "GLOVE", "SYRINGE", "BANDAGE"]],
        // Puzzle 15
        ["Rodents", ["RAT", "MOUSE", "VOLE", "BEAVER"]],
        ["Body Joints", ["KNEE", "ELBOW", "ANKLE", "WRIST"]],
        ["Coastal Inlets", ["BAY", "GULF", "COVE", "INLET"]],
        ["Words For Fast", ["FAST", "QUICK", "RAPID", "SWIFT"]],
        // Puzzle 16
        ["Tropical Fruits", ["MANGO", "PAPAYA", "GUAVA", "LYCHEE"]],
        ["Parts Of A Book", ["COVER", "SPINE", "PAGE", "CHAPTER"]],
        ["Arithmetic Operations", ["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"]],
        ["Skiing Gear", ["SKI", "POLE", "MITTEN", "BOOT"]],
        // Puzzle 17
        ["Farm Animals", ["COW", "PIG", "SHEEP", "GOAT"]],
        ["Tea Varieties", ["BLACK", "OOLONG", "WHITE", "MATCHA"]],
        ["Computer Accessories", ["KEYBOARD", "MONITOR", "SPEAKER", "WEBCAM"]],
        ["Fabric Crafts", ["WEAVE", "KNIT", "SEW", "CROCHET"]],
        // Puzzle 18
        ["Members Of The Horse Family", ["HORSE", "DONKEY", "ZEBRA", "MULE"]],
        ["Spices", ["CUMIN", "PAPRIKA", "TURMERIC", "SAFFRON"]],
        ["Objects In Space", ["ASTEROID", "COMET", "METEOR", "MOON"]],
        ["Ways To Build", ["ASSEMBLE", "ERECT", "BUILD", "CONSTRUCT"]],
        // Puzzle 19
        ["Words Before Bear", ["PANDA", "GRIZZLY", "POLAR", "TEDDY"]],
        ["Culinary Herbs", ["BASIL", "THYME", "SAGE", "MINT"]],
        ["Casual Greetings", ["HELLO", "HI", "HEY", "HOWDY"]],
        ["Hair Styling Tools", ["COMB", "BRUSH", "CLIPPER", "CURLER"]],
        // Puzzle 20
        ["Seabirds", ["GULL", "TERN", "PUFFIN", "GANNET"]],
        ["Imperial Length Units", ["INCH", "FOOT", "YARD", "MILE"]],
        ["Things That Can Fold", ["MAP", "FAN", "UMBRELLA", "NAPKIN"]],
        ["Parts Of Eyeglasses", ["LENS", "TEMPLE", "BRIDGE", "RIM"]],
        // Puzzle 21
        ["Dog Breeds", ["POODLE", "COLLIE", "BEAGLE", "BOXER"]],
        ["Pungent Ingredients", ["GARLIC", "GINGER", "WASABI", "MUSTARD"]],
        ["Celebration Actions", ["DANCE", "SING", "CHEER", "TOAST"]],
        ["Paint Finishes", ["MATTE", "GLOSS", "SATIN", "EGGSHELL"]],
        // Puzzle 22
        ["Wild Canines", ["WOLF", "FOX", "COYOTE", "DINGO"]],
        ["Royal Titles", ["KING", "QUEEN", "PRINCE", "DUKE"]],
        ["Parts Of A Flower", ["PETAL", "SEPAL", "STAMEN", "PISTIL"]],
        ["Words For A Large Amount", ["MANY", "AMPLE", "PLENTY", "ABUNDANT"]],
        // Puzzle 23
        ["Aquatic Mammals", ["WHALE", "DOLPHIN", "SEAL", "OTTER"]],
        ["Coffee Shop Drinks", ["LATTE", "MOCHA", "ESPRESSO", "CAPPUCCINO"]],
        ["Parts Of A Hand", ["PALM", "FINGER", "THUMB", "KNUCKLE"]],
        ["Ways To Stop", ["HALT", "CEASE", "PAUSE", "QUIT"]],
        // Puzzle 24
        ["Primates", ["APE", "GORILLA", "GIBBON", "LEMUR"]],
        ["Breakfast Foods", ["CEREAL", "OATMEAL", "PANCAKE", "WAFFLE"]],
        ["Office Machine Functions", ["PRINT", "COPY", "SCAN", "FAX"]],
        ["Words For Concealed", ["HIDDEN", "COVERT", "PRIVATE", "SECRET"]],
        // Puzzle 25
        ["Amphibians", ["FROG", "TOAD", "NEWT", "AXOLOTL"]],
        ["Desserts", ["CAKE", "PIE", "COOKIE", "PUDDING"]],
        ["Routes To Follow", ["ROAD", "LANE", "PATH", "TRAIL"]],
        ["Currencies", ["DOLLAR", "EURO", "YEN", "PESO"]],
        // Puzzle 26
        ["Cephalopods", ["OCTOPUS", "SQUID", "NAUTILUS", "CUTTLEFISH"]],
        ["Features Of Clothing", ["COLLAR", "CUFF", "HEM", "SLEEVE"]],
        ["Card Games", ["CANASTA", "RUMMY", "HEARTS", "SPADES"]],
        ["Dry Heat Cooking Methods", ["GRILL", "BROIL", "ROAST", "BAKE"]],
        // Puzzle 27
        ["Crustaceans", ["CRAB", "LOBSTER", "SHRIMP", "KRILL"]],
        ["Rain Gear", ["PONCHO", "PARKA", "RAINCOAT", "GALOSH"]],
        ["Ways To Accumulate", ["GATHER", "AMASS", "HOARD", "STOCKPILE"]],
        ["Musical Ensembles", ["QUARTET", "TRIO", "DUO", "ORCHESTRA"]],
        // Puzzle 28
        ["Shellfish In Shells", ["CLAM", "OYSTER", "MUSSEL", "SCALLOP"]],
        ["Cheeses", ["BRIE", "CHEDDAR", "GOUDA", "FETA"]],
        ["Camera Brands", ["CANON", "NIKON", "LEICA", "SONY"]],
        ["Compass Directions", ["NORTH", "SOUTH", "EAST", "WEST"]],
        // Puzzle 29
        ["Marsupials", ["KOALA", "WOMBAT", "POSSUM", "WALLABY"]],
        ["Cereal Grains", ["BARLEY", "RYE", "MILLET", "SORGHUM"]],
        ["Parts Of A House", ["ATTIC", "CELLAR", "PORCH", "GARAGE"]],
        ["Ways To Persuade", ["COAX", "URGE", "SWAY", "CONVINCE"]],
        // Puzzle 30
        ["Flightless Birds", ["EMU", "OSTRICH", "RHEA", "KIWI"]],
        ["Condiments", ["KETCHUP", "RELISH", "MAYO", "VINEGAR"]],
        ["Airport Areas", ["GATE", "RUNWAY", "HANGAR", "TERMINAL"]],
        ["Words For Wet", ["DAMP", "MOIST", "SOGGY", "DRENCHED"]],
        // Puzzle 31
        ["Water Birds", ["DUCK", "GOOSE", "SWAN", "GREBE"]],
        ["Pasta Shapes", ["PENNE", "FUSILLI", "RAVIOLI", "ORZO"]],
        ["Storage Containers", ["BOX", "CRATE", "BIN", "BASKET"]],
        ["Words For Happy", ["GLAD", "HAPPY", "JOLLY", "MERRY"]],
        // Puzzle 32
        ["Types Of Snakes", ["COBRA", "VIPER", "PYTHON", "BOA"]],
        ["Confectionery", ["TOFFEE", "TAFFY", "FUDGE", "NOUGAT"]],
        ["Literary Forms", ["NOVEL", "ESSAY", "POEM", "FABLE"]],
        ["Ways To Cut", ["SNIP", "TRIM", "SAW", "CHOP"]],
        // Puzzle 33
        ["Needle Bearing Trees", ["FIR", "SPRUCE", "LARCH", "HEMLOCK"]],
        ["Citrus Fruits", ["LEMON", "LIME", "ORANGE", "GRAPEFRUIT"]],
        ["Objects Near A Harbor", ["BUOY", "PIER", "DOCK", "JETTY"]],
        ["Sleepwear", ["PAJAMAS", "ROBE", "NIGHTGOWN", "SLIP"]],
        // Puzzle 34
        ["Deciduous Trees", ["MAPLE", "ELM", "ASH", "WILLOW"]],
        ["String Instruments", ["HARP", "CELLO", "VIOLIN", "GUITAR"]],
        ["Rooms", ["CHAMBER", "LOUNGE", "KITCHEN", "BATHROOM"]],
        ["Collective Groups", ["ARMY", "HERD", "FLOCK", "SWARM"]],
        // Puzzle 35
        ["Birds Of Prey", ["EAGLE", "HAWK", "FALCON", "KITE"]],
        ["Brass Instruments", ["TRUMPET", "TROMBONE", "TUBA", "CORNET"]],
        ["Ways To Give Off Light", ["GLEAM", "GLOW", "SHINE", "SPARKLE"]],
        ["Clothing Fasteners", ["BUTTON", "ZIPPER", "BUCKLE", "VELCRO"]],
        // Puzzle 36
        ["Animals Active At Night", ["BAT", "OWL", "BADGER", "HEDGEHOG"]],
        ["Woodwind Instruments", ["FLUTE", "OBOE", "CLARINET", "BASSOON"]],
        ["Beach Finds", ["SAND", "SHELL", "PEBBLE", "DRIFTWOOD"]],
        ["Words For Uncomplicated", ["SIMPLE", "EASY", "BASIC", "PLAIN"]],
        // Puzzle 37
        ["Monkeys", ["BABOON", "MANDRILL", "MACAQUE", "TAMARIN"]],
        ["Percussion Instruments", ["DRUM", "CYMBAL", "GONG", "TAMBOURINE"]],
        ["Sports Playing Areas", ["COURT", "FIELD", "RINK", "PITCH"]],
        ["Memory Actions", ["RECALL", "REMEMBER", "RETAIN", "RECOLLECT"]],
        // Puzzle 38
        ["Antelopes", ["GAZELLE", "IMPALA", "ORYX", "ELAND"]],
        ["Sewing Supplies", ["NEEDLE", "THREAD", "THIMBLE", "BOBBIN"]],
        ["Sleeping Places", ["BUNK", "COT", "HAMMOCK", "FUTON"]],
        ["Ways To Discover", ["FIND", "SPOT", "LOCATE", "DETECT"]],
        // Puzzle 39
        ["Members Of The Deer Family", ["ELK", "MOOSE", "CARIBOU", "REINDEER"]],
        ["Car Parts", ["ENGINE", "BUMPER", "FENDER", "HOOD"]],
        ["School Facilities", ["GYM", "LAB", "LIBRARY", "CLASSROOM"]],
        ["Ways To Make Quiet", ["HUSH", "MUFFLE", "SILENCE", "SHUSH"]],
        // Puzzle 40
        ["Large African Mammals", ["RHINO", "HIPPO", "GIRAFFE", "OKAPI"]],
        ["Board Games", ["CHESS", "CHECKERS", "LUDO", "OTHELLO"]],
        ["Parts Of Fruit", ["RIND", "PEEL", "PIT", "CORE"]],
        ["Ways To Open", ["OPEN", "UNLATCH", "UNLOCK", "UNSEAL"]],
        // Puzzle 41
        ["Wading Birds", ["HERON", "EGRET", "IBIS", "STORK"]],
        ["Sweet Tree Fruits", ["FIG", "DATE", "PERSIMMON", "APRICOT"]],
        ["Workshop Equipment", ["LATHE", "CHISEL", "MALLET", "ANVIL"]],
        ["Words About Earning Money", ["EARN", "PROFIT", "GAIN", "GROSS"]],
        // Puzzle 42
        ["Songbirds", ["LARK", "THRUSH", "WARBLER", "CANARY"]],
        ["Ice Cream Flavors", ["VANILLA", "CHOCOLATE", "PISTACHIO", "CARAMEL"]],
        ["Mountain Features", ["PEAK", "RIDGE", "SUMMIT", "SLOPE"]],
        ["Ways To Get Bigger", ["GROW", "EXPAND", "SWELL", "ENLARGE"]],
        // Puzzle 43
        ["Members Of The Crow Family", ["CROW", "RAVEN", "MAGPIE", "JAY"]],
        ["Italian Dishes", ["PIZZA", "RISOTTO", "LASAGNA", "GNOCCHI"]],
        ["Musical Notation", ["NOTE", "CLEF", "REST", "STAFF"]],
        ["Things That May Be Untrue", ["FIB", "LIE", "MYTH", "FALSEHOOD"]],
        // Puzzle 44
        ["Predatory Fish", ["SHARK", "PIKE", "MARLIN", "BARRACUDA"]],
        ["Gemstones", ["RUBY", "OPAL", "TOPAZ", "GARNET"]],
        ["Footwear", ["SANDAL", "SNEAKER", "LOAFER", "CLOG"]],
        ["Words About Being Afraid", ["FEAR", "DREAD", "FRIGHT", "PANIC"]],
        // Puzzle 45
        ["Flatfish", ["HALIBUT", "TURBOT", "PLAICE", "FLOUNDER"]],
        ["Heavy Fabrics", ["VELVET", "DENIM", "TWEED", "CORDUROY"]],
        ["Words About Smell", ["SNIFF", "WHIFF", "SMELL", "SCENT"]],
        ["Actions In A Card Game", ["DEAL", "PLAY", "BLUFF", "DISCARD"]],
        // Puzzle 46
        ["Freshwater Fish", ["CARP", "PERCH", "BASS", "BREAM"]],
        ["Sweet Or Savory Preserves", ["JAM", "JELLY", "CHUTNEY", "MARMALADE"]],
        ["Cleaning Implements", ["SPONGE", "BROOM", "DUSTER", "SQUEEGEE"]],
        ["Ways To Take A Chance", ["RISK", "GAMBLE", "WAGER", "BET"]],
        // Puzzle 47
        ["Aquarium Fish", ["GUPPY", "TETRA", "MOLLY", "ANGELFISH"]],
        ["Book Formats", ["HARDBACK", "PAPERBACK", "EBOOK", "AUDIOBOOK"]],
        ["Insect Body Parts", ["WING", "ANTENNA", "THORAX", "ABDOMEN"]],
        ["Ways To Say Yes", ["AGREE", "ACCEPT", "ASSENT", "APPROVE"]],
        // Puzzle 48
        ["Hoofed Animals", ["BISON", "YAK", "LLAMA", "ALPACA"]],
        ["Words Before Bean", ["MUNG", "KIDNEY", "PINTO", "NAVY"]],
        ["Things In A Pocket", ["COIN", "KEY", "WALLET", "RECEIPT"]],
        ["Ways To Think Carefully", ["PONDER", "MUSE", "REFLECT", "CONSIDER"]],
        // Puzzle 49
        ["Large Water Birds", ["FLAMINGO", "PELICAN", "CRANE", "SPOONBILL"]],
        ["Members Of The Onion Family", ["LEEK", "SHALLOT", "SCALLION", "CHIVE"]],
        ["Casual Headwear", ["HAT", "CAP", "BERET", "BEANIE"]],
        ["Words For Authentic", ["TRUE", "REAL", "VALID", "GENUINE"]],
        // Puzzle 50
        ["Garden Flowers", ["IRIS", "PEONY", "POPPY", "PANSY"]],
        ["Olympic Sports", ["SWIMMING", "FENCING", "ROWING", "ARCHERY"]],
        ["Things That Heat A Home", ["FURNACE", "HEATER", "BOILER", "RADIATOR"]],
        ["Expressions Of Amusement", ["LAUGH", "SMILE", "GRIN", "CHUCKLE"]],
        // Puzzle 51
        ["Flower Garden Favorites", ["DAHLIA", "ASTER", "ZINNIA", "MARIGOLD"]],
        ["Green Vegetables", ["BROCCOLI", "CABBAGE", "LETTUCE", "SPINACH"]],
        ["Tools That Flatten", ["PRESS", "ROLLER", "IRON", "TAMPER"]],
        ["Ways To Make A Fold", ["PLEAT", "CREASE", "TUCK", "CRIMP"]],
        // Puzzle 52
        ["Succulent Plants", ["ALOE", "AGAVE", "CACTUS", "SEDUM"]],
        ["Types Of Noodles", ["UDON", "SOBA", "RAMEN", "VERMICELLI"]],
        ["Parts Of A Head", ["SCALP", "FOREHEAD", "CHIN", "CHEEK"]],
        ["Ways Water Moves", ["DRIP", "FLOW", "TRICKLE", "GUSH"]],
        // Puzzle 53
        ["Fragrant Flowers", ["LAVENDER", "JASMINE", "GARDENIA", "FREESIA"]],
        ["Types Of Bread", ["NAAN", "PITA", "BUN", "BRIOCHE"]],
        ["Fixtures On A Wall", ["SWITCH", "SOCKET", "THERMOSTAT", "VENT"]],
        ["Ways To Break Something", ["BREAK", "CRACK", "SPLIT", "SHATTER"]],
        // Puzzle 54
        ["Kitchen Garden Herbs", ["DILL", "PARSLEY", "OREGANO", "TARRAGON"]],
        ["Cuts Of Meat", ["STEAK", "CUTLET", "FILLET", "BRISKET"]],
        ["Food Storage Vessels", ["JAR", "CAN", "TIN", "BOTTLE"]],
        ["Water Outlets", ["SPIGOT", "FAUCET", "TAP", "HYDRANT"]],
        // Puzzle 55
        ["Root Vegetables", ["BEET", "RADISH", "PARSNIP", "RUTABAGA"]],
        ["Edible Mushrooms", ["MOREL", "SHIITAKE", "PORCINI", "ENOKI"]],
        ["Bones In Limbs", ["FEMUR", "TIBIA", "RADIUS", "ULNA"]],
        ["Cooking Instructions", ["SIMMER", "SEAR", "POACH", "FRY"]],
        // Puzzle 56
        ["Staple Grains", ["WHEAT", "OAT", "RICE", "CORN"]],
        ["Farm Buildings", ["BARN", "SILO", "COOP", "STABLE"]],
        ["Electrical Terms", ["CHARGE", "CURRENT", "VOLTAGE", "CIRCUIT"]],
        ["Small Wheeled Vehicles", ["CART", "WAGON", "TROLLEY", "BUGGY"]],
        // Puzzle 57
        ["Dried Fruits", ["RAISIN", "PRUNE", "SULTANA", "CURRANT"]],
        ["Bicycle Parts", ["PEDAL", "SADDLE", "HANDLEBAR", "SPOKE"]],
        ["Landforms", ["MESA", "BUTTE", "VALLEY", "CANYON"]],
        ["Ways To Move Through The Air", ["SOAR", "GLIDE", "HOVER", "FLUTTER"]],
        // Puzzle 58
        ["Words Before Oil", ["OLIVE", "SESAME", "CANOLA", "SUNFLOWER"]],
        ["Baking Spices", ["CINNAMON", "NUTMEG", "CLOVE", "ALLSPICE"]],
        ["Swimming Terms", ["STROKE", "LAP", "DIVE", "GOGGLES"]],
        ["Things On A Forest Floor", ["MOSS", "FERN", "LICHEN", "FUNGUS"]],
        // Puzzle 59
        ["Underground Plant Structures", ["TUBER", "BULB", "RHIZOME", "CORM"]],
        ["Coastal Landforms", ["CAPE", "DELTA", "ISLAND", "PENINSULA"]],
        ["Parcel Packing Actions", ["WRAP", "PACK", "TAPE", "BUNDLE"]],
        ["Musical Tempo Markings", ["LARGO", "ADAGIO", "ANDANTE", "ALLEGRO"]],
        // Puzzle 60
        ["Bladed Tools", ["AXE", "HATCHET", "CLEAVER", "MACHETE"]],
        ["Bathroom Supplies", ["SOAP", "SHAMPOO", "TOWEL", "TOOTHPASTE"]],
        ["Neckwear", ["SCARF", "TIE", "CRAVAT", "BOLO"]],
        ["Words For Angry", ["IRATE", "ANGRY", "LIVID", "FURIOUS"]],
        // Puzzle 61
        ["Garden Insects", ["BEETLE", "WEEVIL", "APHID", "CICADA"]],
        ["Pencil Case Items", ["RULER", "ERASER", "SHARPENER", "NOTEPAD"]],
        ["Temperature Words", ["COLD", "COOL", "WARM", "HOT"]],
        ["Ways To Bring Something To An End", ["END", "FINISH", "CLOSE", "CONCLUDE"]],
        // Puzzle 62
        ["Small Fasteners", ["PIN", "PEG", "NAIL", "SCREW"]],
        ["Diving Gear And Terms", ["FIN", "SNORKEL", "FLIPPER", "SCUBA"]],
        ["Gardening Tools", ["SPADE", "RAKE", "TROWEL", "HOE"]],
        ["Gentle Touches", ["PAT", "PET", "RUB", "DAB"]],
        // Puzzle 63
        ["Resonant Noises", ["RING", "BUZZ", "CHIME", "CLANG"]],
        ["Sailboat Parts", ["KEEL", "HULL", "MAST", "DECK"]],
        ["Punctuation Marks", ["COMMA", "PERIOD", "COLON", "DASH"]],
        ["Types Of Hat", ["FEDORA", "TRILBY", "TURBAN", "VISOR"]],
        // Puzzle 64
        ["Places To Stay", ["HOTEL", "MOTEL", "HOSTEL", "INN"]],
        ["Rail Transport", ["TRAIN", "METRO", "STREETCAR", "MONORAIL"]],
        ["Units Of Writing", ["LETTER", "WORD", "SENTENCE", "PARAGRAPH"]],
        ["Words For Cleverly Deceptive", ["WILY", "SLY", "CUNNING", "CRAFTY"]],
        // Puzzle 65
        ["Units Of Weight Or Mass", ["GRAM", "OUNCE", "POUND", "TON"]],
        ["Dental Items", ["FLOSS", "BRACES", "DENTURE", "CROWN"]],
        ["Newspaper Sections", ["NEWS", "SPORTS", "WEATHER", "COMICS"]],
        ["Words For A Friend", ["PAL", "BUDDY", "CHUM", "MATE"]],
    ];

    window.CONNECTION_PUZZLES = Array.from({ length: groups.length / 4 }, (_, puzzleIndex) =>
        groups.slice(puzzleIndex * 4, puzzleIndex * 4 + 4).map(([category, words], index) => ({
            category,
            words,
            difficulty: index + 1,
        }))
    );
})();
