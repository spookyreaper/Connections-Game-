// Challenge boards use familiar words with indirect connections.
// Explanations spell out every wordplay link for answer review.
(() => {
    const buildBoards = boards => boards.map(groups =>
        groups.map(([category, words, mechanic, explanation], index) => ({
            category,
            words: words.split(' '),
            difficulty: index + 1,
            mechanic,
            explanation,
        }))
    );

    window.CONNECTION_CHALLENGE_PUZZLES = {
        hard: buildBoards([
            // 1: Fin and tail suggest money too, while room and night suggest accommodation.
            [
                ['Parts of a fish', 'FIN GILL SCALE TAIL', 'meaning', 'Fins, gills, scales, and a tail are parts of a fish.'],
                ['Words before MONEY', 'BLOOD EASY FUNNY POCKET', 'phrase', 'Blood money, easy money, funny money, pocket money.'],
                ['Words before CAP', 'BASEBALL BOTTLE NIGHT SWIM', 'phrase', 'Baseball cap, bottle cap, nightcap, swim cap.'],
                ['Words after DOUBLE', 'AGENT CROSS ROOM TAKE', 'phrase', 'Double agent, double cross, double room, double take.'],
            ],
            // 2: Black flag is a decoy, but a berry cannot join the fluttering group.
            [
                ['Things that flutter', 'FLAG KITE LEAF WING', 'meaning', 'A flag, kite, leaf, or wing can flutter.'],
                ['Words after BLACK', 'BERRY BOARD JACK MAIL', 'phrase', 'Blackberry, blackboard, blackjack, blackmail.'],
                ['Words before LIGHT', 'FLASH FLOOD MOON SPOT', 'phrase', 'Flashlight, floodlight, moonlight, spotlight.'],
                ['Words after RAIN', 'BOW CHECK COAT DROP', 'phrase', 'Rainbow, rain check, raincoat, raindrop.'],
            ],
            // 3: Pan, cup, coffee, honey, and pot-related meanings encourage false food groups.
            [
                ['Cook using water or steam', 'BOIL POACH SIMMER STEAM', 'meaning', 'Boiling, poaching, simmering, and steaming cook with water or its vapor.'],
                ['Words before CAKE', 'CUP PAN POUND SHORT', 'phrase', 'Cupcake, pancake, pound cake, shortcake.'],
                ['Words before POT', 'COFFEE FLOWER HONEY JACK', 'phrase', 'Coffee pot, flowerpot, honeypot, jackpot.'],
                ['Words after HOT', 'DOG SEAT SHOT SPOT', 'phrase', 'Hot dog, hot seat, hotshot, hot spot.'],
            ],
            // 4: Bank, current, low tide, and spring all encourage a water reading.
            [
                ['Features of a river', 'BANK BED CURRENT MOUTH', 'meaning', 'A river has banks, a bed, a current, and a mouth.'],
                ['Words after LOW', 'BROW DOWN LAND TIDE', 'phrase', 'Lowbrow, lowdown, lowland, low tide.'],
                ['Words before BREAK', 'COFFEE DAY HEART SPRING', 'phrase', 'Coffee break, daybreak, heartbreak, spring break.'],
                ['Words after PAPER', 'BACK CLIP CUT TRAIL', 'phrase', 'Paperback, paperclip, paper cut, paper trail.'],
            ],
            // 5: Finish, start, run, and fit tempt a racing group; string suggests line.
            [
                ['Things tied in knots', 'LACE ROPE STRING TIE', 'meaning', 'A lace, rope, string, or tie can be knotted.'],
                ['Words after OUT', 'CAST FIT LAW RUN', 'phrase', 'Outcast, outfit, outlaw, outrun.'],
                ['Words before LINE', 'BORDER CHORUS FINISH PUNCH', 'phrase', 'Borderline, chorus line, finish line, punchline.'],
                ['Words after HEAD', 'BOARD COUNT LIGHT START', 'phrase', 'Headboard, headcount, headlight, head start.'],
            ],
            // 6: Drum and band-like words lure toward music; bar and dumb toward weights.
            [
                ['Seen on a musical staff', 'CLEF NOTE REST SHARP', 'meaning', 'A staff may show clefs, notes, rests, and sharp signs.'],
                ['Words after SWEET', 'HEART PEA POTATO TOOTH', 'phrase', 'Sweetheart, sweet pea, sweet potato, sweet tooth.'],
                ['Words before BELL', 'BAR BLUE DOOR DUMB', 'phrase', 'Barbell, bluebell, doorbell, dumbbell.'],
                ['Words after EAR', 'DRUM MARK PHONE WAX', 'phrase', 'Eardrum, earmark, earphone, earwax.'],
            ],
            // 7: Key and bolt have other familiar meanings; pass, fore, and cross suggest sport.
            [
                ['Lock hardware', 'BOLT CYLINDER KEY TUMBLER', 'meaning', 'A lock-and-key system can include a bolt, cylinder, key, and tumblers.'],
                ['Words before TALK', 'BABY PEP SMALL TRASH', 'phrase', 'Baby talk, pep talk, small talk, trash talk.'],
                ['Words before WORD', 'BY CROSS FORE PASS', 'phrase', 'Byword, crossword, foreword, password.'],
                ['Words after UNDER', 'DOG GROUND LINE WORLD', 'phrase', 'Underdog, underground, underline, underworld.'],
            ],
            // 8: Arm and muscle suggest anatomy; ball and team suggest sports.
            [
                ['Things that stretch', 'ELASTIC MUSCLE RUBBER SPANDEX', 'meaning', 'Elastic, muscles, rubber, and spandex can stretch.'],
                ['Words after FOOT', 'BALL HILL NOTE PRINT', 'phrase', 'Football, foothill, footnote, footprint.'],
                ['Words before WORK', 'FRAME HOME NET TEAM', 'phrase', 'Framework, homework, network, teamwork.'],
                ['Words after FIRE', 'ARM FIGHTER FLY PLACE', 'phrase', 'Firearm, firefighter, firefly, fireplace.'],
            ],
        ]),
        expert: buildBoards([
            // 1: The real animals and food words distract from animals hidden at word starts.
            [
                ['Sandwich ingredients', 'BREAD CHEESE LETTUCE TOMATO', 'meaning', 'Bread, cheese, lettuce, and tomato can make a sandwich.'],
                ['Sound like letters', 'BEE PEA SEA TEA', 'sound', 'BEE sounds like B, PEA like P, SEA like C, and TEA like T.'],
                ['Words after WILD', 'CARD FIRE LIFE WEST', 'phrase', 'Wild card, wildfire, wildlife, Wild West.'],
                ['Begin with a farm animal', 'COWARD HENCHMAN PIGMENT RAMBLE', 'spelling', 'COWard, HENchman, PIGment, RAMble begin with COW, HEN, PIG, and RAM.'],
            ],
            // 2: Clock faces suggest numerals; watch case is a deliberate phrase decoy.
            [
                ['Devices for keeping time', 'CLOCK METRONOME TIMER WATCH', 'meaning', 'Clocks, timers, and watches track time; a metronome keeps the beat.'],
                ['Words before CASE', 'BOOK BRIEF LOWER UPPER', 'phrase', 'Bookcase, briefcase, lowercase, uppercase.'],
                ['Sound like numbers', 'WON TOO FOR ATE', 'sound', 'In standard American pronunciation, WON sounds like ONE, TOO like TWO, FOR like FOUR, and ATE like EIGHT.'],
                ['Only Roman-numeral letters', 'CIVIC DILL LIVID MIX', 'spelling', 'Each is written only with the Roman-numeral letters I, V, X, L, C, D, and M; the words need not form valid numerals.'],
            ],
            // 3: HARE and NAVAL sound like other ordinary words; BACK points toward anatomy too.
            [
                ['Punctuation marks', 'COLON COMMA DASH PERIOD', 'meaning', 'A colon, comma, dash, and period are punctuation marks.'],
                ['Words after BACK', 'FIRE GROUND PACK STAGE', 'phrase', 'Backfire, background, backpack, backstage.'],
                ['Read the same backward', 'KAYAK LEVEL RADAR ROTOR', 'spelling', 'KAYAK, LEVEL, RADAR, and ROTOR are palindromes.'],
                ['Sound like body parts', 'HARE MUSSEL NAVAL SOUL', 'sound', 'HARE sounds like HAIR, MUSSEL like MUSCLE, NAVAL like NAVEL, and SOUL like SOLE.'],
            ],
            // 4: Eye, fire, snow, man, and storm can make several plausible cross-links.
            [
                ['Parts of an eye', 'IRIS LENS PUPIL RETINA', 'meaning', 'The iris, lens, pupil, and retina are parts of an eye.'],
                ['Words before BALL', 'BASE EYE FIRE SNOW', 'phrase', 'Baseball, eyeball, fireball, snowball.'],
                ['Words after SNOW', 'BOARD FLAKE MAN STORM', 'phrase', 'Snowboard, snowflake, snowman, snowstorm.'],
                ['Contain ONE', 'HONEY MONEY PHONE STONE', 'spelling', 'hONEy, mONEy, phONE, and stONE each contain the consecutive letters ONE.'],
            ],
            // 5: Every group is indirect; familiar spellings disguise letters and sounds.
            [
                ['Things you can cast', 'BALLOT DOUBT SHADOW SPELL', 'phrase', 'Cast a ballot, cast doubt, cast a shadow, cast a spell.'],
                ['Words before BOARD', 'CARD CUP DASH KEY', 'phrase', 'Cardboard, cupboard, dashboard, keyboard.'],
                ['No A, E, I, O, or U', 'CRYPT GLYPH MYTH RHYTHM', 'spelling', 'CRYPT, GLYPH, MYTH, and RHYTHM contain none of the letters A, E, I, O, or U.'],
                ['Rhyme with GO', 'DOUGH SEW THOUGH TOE', 'sound', 'DOUGH, SEW, THOUGH, and TOE all rhyme with GO despite their different spellings.'],
            ],
            // 6: Eye, wrist, hand, and knot-related words compete across mechanisms.
            [
                ['Things you can tie', 'BOW KNOT LACE RIBBON', 'meaning', 'You can tie a bow, knot, lace, or ribbon.'],
                ['Words before HAND', 'BACK FARM FREE UNDER', 'phrase', 'Backhand, farmhand, freehand, underhand.'],
                ['Silent first letters', 'GNOME KNIFE PSALM WRIST', 'spelling', 'The initial G in GNOME, K in KNIFE, P in PSALM, and W in WRIST are silent.'],
                ['Rhyme with HIGH', 'BUY EYE LIE SIGH', 'sound', 'BUY, EYE, LIE, and SIGH all rhyme with HIGH.'],
            ],
            // 7: Draw and bluff suggest cards; life/live differ by one letter, not the hidden rule.
            [
                ['Words for a deception', 'BLUFF FEINT RUSE TRICK', 'meaning', 'A bluff, feint, ruse, or trick can deceive.'],
                ['Words before TIME', 'WINTER HALF LIFE MEAL', 'phrase', 'Wintertime, halftime, lifetime, mealtime.'],
                ['Reverse to another word', 'DRAW LIVE STOP STRESSED', 'spelling', 'Reversing the letters gives WARD, EVIL, POTS, and DESSERTS.'],
                ['Words after OVER', 'BOARD COAT LOAD LOOK', 'phrase', 'Overboard, overcoat, overload, overlook.'],
            ],
            // 8: Green room and house suggest theater; head and back both make SPACE compounds.
            [
                ['Parts of a stage play', 'ACT LINE SCENE SPEECH', 'meaning', 'A play contains acts and scenes, as well as spoken lines and speeches.'],
                ['Words before SPACE', 'AIR DEEP HEAD OUTER', 'phrase', 'Airspace, deep space, headspace, outer space.'],
                ['Contain TEN', 'EXTENT KITTEN OFTEN TENDER', 'spelling', 'exTENt, kitTEN, ofTEN, and TENder each contain the consecutive letters TEN.'],
                ['Words after GREEN', 'HOUSE LIGHT ROOM THUMB', 'phrase', 'Greenhouse, green light, greenroom, green thumb.'],
            ],
        ]),
    };
})();
