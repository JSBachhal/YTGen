import { Component, OnInit } from '@angular/core';
import { pokemonNames } from 'src/assets/pokemonsNames';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-loadimages',
  templateUrl: './loadimages.component.html',
  styleUrls: ['./loadimages.component.scss']
})
export class LoadimagesComponent implements OnInit {
  pokemonNames: { ID: number, name: string }[] = pokemonNames;

  ngOnInit(): void {
     [
      { ID: 0, name: 'Bulbasaur' },
      { ID: 1, name: 'Ivysaur' },
      { ID: 2, name: 'Venusaur' },
      { ID: 3, name: 'Charmander' },
      { ID: 4, name: 'Charmeleon' },
      { ID: 5, name: 'Charizard' },
      { ID: 6, name: 'Squirtle' },
      { ID: 7, name: 'Wartortle' },
      { ID: 8, name: 'Blastoise' },
      { ID: 9, name: 'Caterpie' },
      { ID: 10, name: 'Metapod' },
      { ID: 11, name: 'Butterfree' },
      { ID: 12, name: 'Weedle' },
      { ID: 13, name: 'Kakuna' },
      { ID: 14, name: 'Beedrill' },
      { ID: 15, name: 'Pidgey' },
      { ID: 16, name: 'Pidgeotto' },
      { ID: 17, name: 'Pidgeot' },
      { ID: 18, name: 'Rattata' },
      { ID: 19, name: 'Raticate' },
      { ID: 20, name: 'Spearow' },
      { ID: 21, name: 'Fearow' },
      { ID: 22, name: 'Ekans' },
      { ID: 23, name: 'Arbok' },
      { ID: 24, name: 'Pikachu' },
      { ID: 25, name: 'Raichu' },
      { ID: 26, name: 'Sandshrew' },
      { ID: 27, name: 'Sandslash' },
      { ID: 28, name: 'Nidoran♀' },
      { ID: 29, name: 'Nidorina' },
      { ID: 30, name: 'Nidoqueen' },
      { ID: 31, name: 'Nidoran♂' },
      { ID: 32, name: 'Nidorino' },
      { ID: 33, name: 'Nidoking' },
      { ID: 34, name: 'Clefairy' },
      { ID: 35, name: 'Clefable' },
      { ID: 36, name: 'Vulpix' },
      { ID: 37, name: 'Ninetales' },
      { ID: 38, name: 'Jigglypuff' },
      { ID: 39, name: 'Wigglytuff' },
      { ID: 40, name: 'Zubat' },
      { ID: 41, name: 'Golbat' },
      { ID: 42, name: 'Oddish' },
      { ID: 43, name: 'Gloom' },
      { ID: 44, name: 'Vileplume' },
      { ID: 45, name: 'Paras' },
      { ID: 46, name: 'Parasect' },
      { ID: 47, name: 'Venonat' },
      { ID: 48, name: 'Venomoth' },
      { ID: 49, name: 'Diglett' },
      { ID: 50, name: 'Dugtrio' },
      { ID: 51, name: 'Meowth' },
      { ID: 52, name: 'Persian' },
      { ID: 53, name: 'Psyduck' },
      { ID: 54, name: 'Golduck' },
      { ID: 55, name: 'Mankey' },
      { ID: 56, name: 'Primeape' },
      { ID: 57, name: 'Growlithe' },
      { ID: 58, name: 'Arcanine' },
      { ID: 59, name: 'Poliwag' },
      { ID: 60, name: 'Poliwhirl' },
      { ID: 61, name: 'Poliwrath' },
      { ID: 62, name: 'Abra' },
      { ID: 63, name: 'Kadabra' },
      { ID: 64, name: 'Alakazam' },
      { ID: 65, name: 'Machop' },
      { ID: 66, name: 'Machoke' },
      { ID: 67, name: 'Machamp' },
      { ID: 68, name: 'Bellsprout' },
      { ID: 69, name: 'Weepinbell' },
      { ID: 70, name: 'Victreebel' },
      { ID: 71, name: 'Tentacool' },
      { ID: 72, name: 'Tentacruel' },
      { ID: 73, name: 'Geodude' },
      { ID: 74, name: 'Graveler' },
      { ID: 75, name: 'Golem' },
      { ID: 76, name: 'Ponyta' },
      { ID: 77, name: 'Rapidash' },
      { ID: 78, name: 'Slowpoke' },
      { ID: 79, name: 'Slowbro' },
      { ID: 80, name: 'Magnemite' },
      { ID: 81, name: 'Magneton' },
      {
          ID: 82, name: "Farfetch'd"
      },
      { ID: 83, name: 'Doduo' },
      { ID: 84, name: 'Dodrio' },
      { ID: 85, name: 'Seel' },
      { ID: 86, name: 'Dewgong' },
      { ID: 87, name: 'Grimer' },
      { ID: 88, name: 'Muk' },
      { ID: 89, name: 'Shellder' },
      { ID: 90, name: 'Cloyster' },
      { ID: 91, name: 'Gastly' },
      { ID: 92, name: 'Haunter' },
      { ID: 93, name: 'Gengar' },
      { ID: 94, name: 'Onix' },
      { ID: 95, name: 'Drowzee' },
      { ID: 96, name: 'Hypno' },
      { ID: 97, name: 'Krabby' },
      { ID: 98, name: 'Kingler' },
      { ID: 99, name: 'Voltorb' },
      { ID: 100, name: 'Electrode' },
      { ID: 101, name: 'Exeggcute' },
      { ID: 102, name: 'Exeggutor' },
      { ID: 103, name: 'Cubone' },
      { ID: 104, name: 'Marowak' },
      { ID: 105, name: 'Hitmonlee' },
      { ID: 106, name: 'Hitmonchan' },
      { ID: 107, name: 'Lickitung' },
      { ID: 108, name: 'Koffing' },
      { ID: 109, name: 'Weezing' },
      { ID: 110, name: 'Rhyhorn' },
      { ID: 111, name: 'Rhydon' },
      { ID: 112, name: 'Chansey' },
      { ID: 113, name: 'Tangela' },
      { ID: 114, name: 'Kangaskhan' },
      { ID: 115, name: 'Horsea' },
      { ID: 116, name: 'Seadra' },
      { ID: 117, name: 'Goldeen' },
      { ID: 118, name: 'Seaking' },
      { ID: 119, name: 'Staryu' },
      { ID: 120, name: 'Starmie' },
      { ID: 121, name: 'Mr. Mime' },
      { ID: 122, name: 'Scyther' },
      { ID: 123, name: 'Jynx' },
      { ID: 124, name: 'Electabuzz' },
      { ID: 125, name: 'Magmar' },
      { ID: 126, name: 'Pinsir' },
      { ID: 127, name: 'Tauros' },
      { ID: 128, name: 'Magikarp' },
      { ID: 129, name: 'Gyarados' },
      { ID: 130, name: 'Lapras' },
      { ID: 131, name: 'Ditto' },
      { ID: 132, name: 'Eevee' },
      { ID: 133, name: 'Vaporeon' },
      { ID: 134, name: 'Jolteon' },
      { ID: 135, name: 'Flareon' },
      { ID: 136, name: 'Porygon' },
      { ID: 137, name: 'Omanyte' },
      { ID: 138, name: 'Omastar' },
      { ID: 139, name: 'Kabuto' },
      { ID: 140, name: 'Kabutops' },
      { ID: 141, name: 'Aerodactyl' },
      { ID: 142, name: 'Snorlax' },
      { ID: 143, name: 'Articuno' },
      { ID: 144, name: 'Zapdos' },
      { ID: 145, name: 'Moltres' },
      { ID: 146, name: 'Dratini' },
      { ID: 147, name: 'Dragonair' },
      { ID: 148, name: 'Dragonite' },
      { ID: 149, name: 'Mewtwo' },
      { ID: 150, name: 'Mew' },
      { ID: 151, name: 'Chikorita' },
      { ID: 152, name: 'Bayleef' },
      { ID: 153, name: 'Meganium' },
      { ID: 154, name: 'Cyndaquil' },
      { ID: 155, name: 'Quilava' },
      { ID: 156, name: 'Typhlosion' },
      { ID: 157, name: 'Totodile' },
      { ID: 158, name: 'Croconaw' },
      { ID: 159, name: 'Feraligatr' },
      { ID: 160, name: 'Sentret' },
      { ID: 161, name: 'Furret' },
      { ID: 162, name: 'Hoothoot' },
      { ID: 163, name: 'Noctowl' },
      { ID: 164, name: 'Ledyba' },
      { ID: 165, name: 'Ledian' },
      { ID: 166, name: 'Spinarak' },
      { ID: 167, name: 'Ariados' },
      { ID: 168, name: 'Crobat' },
      { ID: 169, name: 'Chinchou' },
      { ID: 170, name: 'Lanturn' },
      { ID: 171, name: 'Pichu' },
      { ID: 172, name: 'Cleffa' },
      { ID: 173, name: 'Igglybuff' },
      { ID: 174, name: 'Togepi' },
      { ID: 175, name: 'Togetic' },
      { ID: 176, name: 'Natu' },
      { ID: 177, name: 'Xatu' },
      { ID: 178, name: 'Mareep' },
      { ID: 179, name: 'Flaaffy' },
      { ID: 180, name: 'Ampharos' },
      { ID: 181, name: 'Bellossom' },
      { ID: 182, name: 'Marill' },
      { ID: 183, name: 'Azumarill' },
      { ID: 184, name: 'Sudowoodo' },
      { ID: 185, name: 'Politoed' },
      { ID: 186, name: 'Hoppip' },
      { ID: 187, name: 'Skiploom' },
      { ID: 188, name: 'Jumpluff' },
      { ID: 189, name: 'Aipom' },
      { ID: 190, name: 'Sunkern' },
      { ID: 191, name: 'Sunflora' },
      { ID: 192, name: 'Yanma' },
      { ID: 193, name: 'Wooper' },
      { ID: 194, name: 'Quagsire' },
      { ID: 195, name: 'Espeon' },
      { ID: 196, name: 'Umbreon' },
      { ID: 197, name: 'Murkrow' },
      { ID: 198, name: 'Slowking' },
      { ID: 199, name: 'Misdreavus' },
      { ID: 200, name: 'Unown' },
      { ID: 201, name: 'Wobbuffet' },
      { ID: 202, name: 'Girafarig' },
      { ID: 203, name: 'Pineco' },
      { ID: 204, name: 'Forretress' },
      { ID: 205, name: 'Dunsparce' },
      { ID: 206, name: 'Gligar' },
      { ID: 207, name: 'Steelix' },
      { ID: 208, name: 'Snubbull' },
      { ID: 209, name: 'Granbull' },
      { ID: 210, name: 'Qwilfish' },
      { ID: 211, name: 'Scizor' },
      { ID: 212, name: 'Shuckle' },
      { ID: 213, name: 'Heracross' },
      { ID: 214, name: 'Sneasel' },
      { ID: 215, name: 'Teddiursa' },
      { ID: 216, name: 'Ursaring' },
      { ID: 217, name: 'Slugma' },
      { ID: 218, name: 'Magcargo' },
      { ID: 219, name: 'Swinub' },
      { ID: 220, name: 'Piloswine' },
      { ID: 221, name: 'Corsola' },
      { ID: 222, name: 'Remoraid' },
      { ID: 223, name: 'Octillery' },
      { ID: 224, name: 'Delibird' },
      { ID: 225, name: 'Mantine' },
      { ID: 226, name: 'Skarmory' },
      { ID: 227, name: 'Houndour' },
      { ID: 228, name: 'Houndoom' },
      { ID: 229, name: 'Kingdra' },
      { ID: 230, name: 'Phanpy' },
      { ID: 231, name: 'Donphan' },
      { ID: 232, name: 'Porygon2' },
      { ID: 233, name: 'Stantler' },
      { ID: 234, name: 'Smeargle' },
      { ID: 235, name: 'Tyrogue' },
      { ID: 236, name: 'Hitmontop' },
      { ID: 237, name: 'Smoochum' },
      { ID: 238, name: 'Elekid' },
      { ID: 239, name: 'Magby' },
      { ID: 240, name: 'Miltank' },
      { ID: 241, name: 'Blissey' },
      { ID: 242, name: 'Raikou' },
      { ID: 243, name: 'Entei' },
      { ID: 244, name: 'Suicune' },
      { ID: 245, name: 'Larvitar' },
      { ID: 246, name: 'Pupitar' },
      { ID: 247, name: 'Tyranitar' },
      { ID: 248, name: 'Lugia' },
      { ID: 249, name: 'Ho-Oh' },
      { ID: 250, name: 'Celebi' },
      { ID: 251, name: 'Treecko' },
      { ID: 252, name: 'Grovyle' },
      { ID: 253, name: 'Sceptile' },
      { ID: 254, name: 'Torchic' },
      { ID: 255, name: 'Combusken' },
      { ID: 256, name: 'Blaziken' },
      { ID: 257, name: 'Mudkip' },
      { ID: 258, name: 'Marshtomp' },
      { ID: 259, name: 'Swampert' },
      { ID: 260, name: 'Poochyena' },
      { ID: 261, name: 'Mightyena' },
      { ID: 262, name: 'Zigzagoon' },
      { ID: 263, name: 'Linoone' },
      { ID: 264, name: 'Wurmple' },
      { ID: 265, name: 'Silcoon' },
      { ID: 266, name: 'Beautifly' },
      { ID: 267, name: 'Cascoon' },
      { ID: 268, name: 'Dustox' },
      { ID: 269, name: 'Lotad' },
      { ID: 270, name: 'Lombre' },
      { ID: 271, name: 'Ludicolo' },
      { ID: 272, name: 'Seedot' },
      { ID: 273, name: 'Nuzleaf' },
      { ID: 274, name: 'Shiftry' },
      { ID: 275, name: 'Taillow' },
      { ID: 276, name: 'Swellow' },
      { ID: 277, name: 'Wingull' },
      { ID: 278, name: 'Pelipper' },
      { ID: 279, name: 'Ralts' },
      { ID: 280, name: 'Kirlia' },
      { ID: 281, name: 'Gardevoir' },
      { ID: 282, name: 'Surskit' },
      { ID: 283, name: 'Masquerain' },
      { ID: 284, name: 'Shroomish' },
      { ID: 285, name: 'Breloom' },
      { ID: 286, name: 'Slakoth' },
      { ID: 287, name: 'Vigoroth' },
      { ID: 288, name: 'Slaking' },
      { ID: 289, name: 'Nincada' },
      { ID: 290, name: 'Ninjask' },
      { ID: 291, name: 'Shedinja' },
      { ID: 292, name: 'Whismur' },
      { ID: 293, name: 'Loudred' },
      { ID: 294, name: 'Exploud' },
      { ID: 295, name: 'Makuhita' },
      { ID: 296, name: 'Hariyama' },
      { ID: 297, name: 'Azurill' },
      { ID: 298, name: 'Nosepass' },
      { ID: 299, name: 'Skitty' },
      { ID: 300, name: 'Delcatty' },
      { ID: 301, name: 'Sableye' },
      { ID: 302, name: 'Mawile' },
      { ID: 303, name: 'Aron' },
      { ID: 304, name: 'Lairon' },
      { ID: 305, name: 'Aggron' },
      { ID: 306, name: 'Meditite' },
      { ID: 307, name: 'Medicham' },
      { ID: 308, name: 'Electrike' },
      { ID: 309, name: 'Manectric' },
      { ID: 310, name: 'Plusle' },
      { ID: 311, name: 'Minun' },
      { ID: 312, name: 'Volbeat' },
      { ID: 313, name: 'Illumise' },
      { ID: 314, name: 'Roselia' },
      { ID: 315, name: 'Gulpin' },
      { ID: 316, name: 'Swalot' },
      { ID: 317, name: 'Carvanha' },
      { ID: 318, name: 'Sharpedo' },
      { ID: 319, name: 'Wailmer' },
      { ID: 320, name: 'Wailord' },
      { ID: 321, name: 'Numel' },
      { ID: 322, name: 'Camerupt' },
      { ID: 323, name: 'Torkoal' },
      { ID: 324, name: 'Spoink' },
      { ID: 325, name: 'Grumpig' },
      { ID: 326, name: 'Spinda' },
      { ID: 327, name: 'Trapinch' },
      { ID: 328, name: 'Vibrava' },
      { ID: 329, name: 'Flygon' },
      { ID: 330, name: 'Cacnea' },
      { ID: 331, name: 'Cacturne' },
      { ID: 332, name: 'Swablu' },
      { ID: 333, name: 'Altaria' },
      { ID: 334, name: 'Zangoose' },
      { ID: 335, name: 'Seviper' },
      { ID: 336, name: 'Lunatone' },
      { ID: 337, name: 'Solrock' },
      { ID: 338, name: 'Barboach' },
      { ID: 339, name: 'Whiscash' },
      { ID: 340, name: 'Corphish' },
      { ID: 341, name: 'Crawdaunt' },
      { ID: 342, name: 'Baltoy' },
      { ID: 343, name: 'Claydol' },
      { ID: 344, name: 'Lileep' },
      { ID: 345, name: 'Cradily' },
      { ID: 346, name: 'Anorith' },
      { ID: 347, name: 'Armaldo' },
      { ID: 348, name: 'Feebas' },
      { ID: 349, name: 'Milotic' },
      { ID: 350, name: 'Castform' },
      { ID: 351, name: 'Kecleon' },
      { ID: 352, name: 'Shuppet' },
      { ID: 353, name: 'Banette' },
      { ID: 354, name: 'Duskull' },
      { ID: 355, name: 'Dusclops' },
      { ID: 356, name: 'Tropius' },
      { ID: 357, name: 'Chimecho' },
      { ID: 358, name: 'Absol' },
      { ID: 359, name: 'Wynaut' },
      { ID: 360, name: 'Snorunt' },
      { ID: 361, name: 'Glalie' },
      { ID: 362, name: 'Spheal' },
      { ID: 363, name: 'Sealeo' },
      { ID: 364, name: 'Walrein' },
      { ID: 365, name: 'Clamperl' },
      { ID: 366, name: 'Huntail' },
      { ID: 367, name: 'Gorebyss' },
      { ID: 368, name: 'Relicanth' },
      { ID: 369, name: 'Luvdisc' },
      { ID: 370, name: 'Bagon' },
      { ID: 371, name: 'Shelgon' },
      { ID: 372, name: 'Salamence' },
      { ID: 373, name: 'Beldum' },
      { ID: 374, name: 'Metang' },
      { ID: 375, name: 'Metagross' },
      { ID: 376, name: 'Regirock' },
      { ID: 377, name: 'Regice' },
      { ID: 378, name: 'Registeel' },
      { ID: 379, name: 'Latias' },
      { ID: 380, name: 'Latios' },
      { ID: 381, name: 'Kyogre' },
      { ID: 382, name: 'Groudon' },
      { ID: 383, name: 'Rayquaza' },
      { ID: 384, name: 'Jirachi' },
      { ID: 385, name: 'Deoxys' },
      { ID: 386, name: 'Turtwig' },
      { ID: 387, name: 'Grotle' },
      { ID: 388, name: 'Torterra' },
      { ID: 389, name: 'Chimchar' },
      { ID: 390, name: 'Monferno' },
      { ID: 391, name: 'Infernape' },
      { ID: 392, name: 'Piplup' },
      { ID: 393, name: 'Prinplup' },
      { ID: 394, name: 'Empoleon' },
      { ID: 395, name: 'Starly' },
      { ID: 396, name: 'Staravia' },
      { ID: 397, name: 'Staraptor' },
      { ID: 398, name: 'Bidoof' },
      { ID: 399, name: 'Bibarel' },
      { ID: 400, name: 'Kricketot' },
      { ID: 401, name: 'Kricketune' },
      { ID: 402, name: 'Shinx' },
      { ID: 403, name: 'Luxio' },
      { ID: 404, name: 'Luxray' },
      { ID: 405, name: 'Budew' },
      { ID: 406, name: 'Roserade' },
      { ID: 407, name: 'Cranidos' },
      { ID: 408, name: 'Rampardos' },
      { ID: 409, name: 'Shieldon' },
      { ID: 410, name: 'Bastiodon' },
      { ID: 411, name: 'Burmy' },
      { ID: 412, name: 'Wormadam' },
      { ID: 413, name: 'Mothim' },
      { ID: 414, name: 'Combee' },
      { ID: 415, name: 'Vespiquen' },
      { ID: 416, name: 'Pachirisu' },
      { ID: 417, name: 'Buizel' },
      { ID: 418, name: 'Floatzel' },
      { ID: 419, name: 'Cherubi' },
      { ID: 420, name: 'Cherrim' },
      { ID: 421, name: 'Shellos' },
      { ID: 422, name: 'Gastrodon' },
      { ID: 423, name: 'Ambipom' },
      { ID: 424, name: 'Drifloon' },
      { ID: 425, name: 'Drifblim' },
      { ID: 426, name: 'Buneary' },
      { ID: 427, name: 'Lopunny' },
      { ID: 428, name: 'Mismagius' },
      { ID: 429, name: 'Honchkrow' },
      { ID: 430, name: 'Glameow' },
      { ID: 431, name: 'Purugly' },
      { ID: 432, name: 'Chingling' },
      { ID: 433, name: 'Stunky' },
      { ID: 434, name: 'Skuntank' },
      { ID: 435, name: 'Bronzor' },
      { ID: 436, name: 'Bronzong' },
      { ID: 437, name: 'Bonsly' },
      { ID: 438, name: 'Mime Jr.' },
      { ID: 439, name: 'Happiny' },
      { ID: 440, name: 'Chatot' },
      { ID: 441, name: 'Spiritomb' },
      { ID: 442, name: 'Gible' },
      { ID: 443, name: 'Gabite' },
      { ID: 444, name: 'Garchomp' },
      { ID: 445, name: 'Munchlax' },
      { ID: 446, name: 'Riolu' },
      { ID: 447, name: 'Lucario' },
      { ID: 448, name: 'Hippopotas' },
      { ID: 449, name: 'Hippowdon' },
      { ID: 450, name: 'Skorupi' },
      { ID: 451, name: 'Drapion' },
      { ID: 452, name: 'Croagunk' },
      { ID: 453, name: 'Toxicroak' },
      { ID: 454, name: 'Carnivine' },
      { ID: 455, name: 'Finneon' },
      { ID: 456, name: 'Lumineon' },
      { ID: 457, name: 'Mantyke' },
      { ID: 458, name: 'Snover' },
      { ID: 459, name: 'Abomasnow' },
      { ID: 460, name: 'Weavile' },
      { ID: 461, name: 'Magnezone' },
      { ID: 462, name: 'Lickilicky' },
      { ID: 463, name: 'Rhyperior' },
      { ID: 464, name: 'Tangrowth' },
      { ID: 465, name: 'Electivire' },
      { ID: 466, name: 'Magmortar' },
      { ID: 467, name: 'Togekiss' },
      { ID: 468, name: 'Yanmega' },
      { ID: 469, name: 'Leafeon' },
      { ID: 470, name: 'Glaceon' },
      { ID: 471, name: 'Gliscor' },
      { ID: 472, name: 'Mamoswine' },
      { ID: 473, name: 'Porygon-Z' },
      { ID: 474, name: 'Gallade' },
      { ID: 475, name: 'Probopass' },
      { ID: 476, name: 'Dusknoir' },
      { ID: 477, name: 'Froslass' },
      { ID: 478, name: 'Rotom' },
      { ID: 479, name: 'Uxie' },
      { ID: 480, name: 'Mesprit' },
      { ID: 481, name: 'Azelf' },
      { ID: 482, name: 'Dialga' },
      { ID: 483, name: 'Palkia' },
      { ID: 484, name: 'Heatran' },
      { ID: 485, name: 'Regigigas' },
      { ID: 486, name: 'Giratina' },
      { ID: 487, name: 'Cresselia' },
      { ID: 488, name: 'Phione' },
      { ID: 489, name: 'Manaphy' },
      { ID: 490, name: 'Darkrai' },
      { ID: 491, name: 'Shaymin' },
      { ID: 492, name: 'Arceus' },
      { ID: 493, name: 'Victini' },
      { ID: 494, name: 'Snivy' },
      { ID: 495, name: 'Servine' },
      { ID: 496, name: 'Serperior' },
      { ID: 497, name: 'Tepig' },
      { ID: 498, name: 'Pignite' },
      { ID: 499, name: 'Emboar' },
      { ID: 500, name: 'Oshawott' },
      { ID: 501, name: 'Dewott' },
      { ID: 502, name: 'Samurott' },
      { ID: 503, name: 'Patrat' },
      { ID: 504, name: 'Watchog' },
      { ID: 505, name: 'Lillipup' },
      { ID: 506, name: 'Herdier' },
      { ID: 507, name: 'Stoutland' },
      { ID: 508, name: 'Purrloin' },
      { ID: 509, name: 'Liepard' },
      { ID: 510, name: 'Pansage' },
      { ID: 511, name: 'Simisage' },
      { ID: 512, name: 'Pansear' },
      { ID: 513, name: 'Simisear' },
      { ID: 514, name: 'Panpour' },
      { ID: 515, name: 'Simipour' },
      { ID: 516, name: 'Munna' },
      { ID: 517, name: 'Musharna' },
      { ID: 518, name: 'Pidove' },
      { ID: 519, name: 'Tranquill' },
      { ID: 520, name: 'Unfezant' },
      { ID: 521, name: 'Blitzle' },
      { ID: 522, name: 'Zebstrika' },
      { ID: 523, name: 'Roggenrola' },
      { ID: 524, name: 'Boldore' },
      { ID: 525, name: 'Gigalith' },
      { ID: 526, name: 'Woobat' },
      { ID: 527, name: 'Swoobat' },
      { ID: 528, name: 'Drilbur' },
      { ID: 529, name: 'Excadrill' },
      { ID: 530, name: 'Audino' },
      { ID: 531, name: 'Timburr' },
      { ID: 532, name: 'Gurdurr' },
      { ID: 533, name: 'Conkeldurr' },
      { ID: 534, name: 'Tympole' },
      { ID: 535, name: 'Palpitoad' },
      { ID: 536, name: 'Seismitoad' },
      { ID: 537, name: 'Throh' },
      { ID: 538, name: 'Sawk' },
      { ID: 539, name: 'Sewaddle' },
      { ID: 540, name: 'Swadloon' },
      { ID: 541, name: 'Leavanny' },
      { ID: 542, name: 'Venipede' },
      { ID: 543, name: 'Whirlipede' },
      { ID: 544, name: 'Scolipede' },
      { ID: 545, name: 'Cottonee' },
      { ID: 546, name: 'Whimsicott' },
      { ID: 547, name: 'Petilil' },
      { ID: 548, name: 'Lilligant' },
      { ID: 549, name: 'Basculin' },
      { ID: 550, name: 'Sandile' },
      { ID: 551, name: 'Krokorok' },
      { ID: 552, name: 'Krookodile' },
      { ID: 553, name: 'Darumaka' },
      { ID: 554, name: 'Darmanitan' },
      { ID: 555, name: 'Maractus' },
      { ID: 556, name: 'Dwebble' },
      { ID: 557, name: 'Crustle' },
      { ID: 558, name: 'Scraggy' },
      { ID: 559, name: 'Scrafty' },
      { ID: 560, name: 'Sigilyph' },
      { ID: 561, name: 'Yamask' },
      { ID: 562, name: 'Cofagrigus' },
      { ID: 563, name: 'Tirtouga' },
      { ID: 564, name: 'Carracosta' },
      { ID: 565, name: 'Archen' },
      { ID: 566, name: 'Archeops' },
      { ID: 567, name: 'Trubbish' },
      { ID: 568, name: 'Garbodor' },
      { ID: 569, name: 'Zorua' },
      { ID: 570, name: 'Zoroark' },
      { ID: 571, name: 'Minccino' },
      { ID: 572, name: 'Cinccino' },
      { ID: 573, name: 'Gothita' },
      { ID: 574, name: 'Gothorita' },
      { ID: 575, name: 'Gothitelle' },
      { ID: 576, name: 'Solosis' },
      { ID: 577, name: 'Duosion' },
      { ID: 578, name: 'Reuniclus' },
      { ID: 579, name: 'Ducklett' },
      { ID: 580, name: 'Swanna' },
      { ID: 581, name: 'Vanillite' },
      { ID: 582, name: 'Vanillish' },
      { ID: 583, name: 'Vanilluxe' },
      { ID: 584, name: 'Deerling' },
      { ID: 585, name: 'Sawsbuck' },
      { ID: 586, name: 'Emolga' },
      { ID: 587, name: 'Karrablast' },
      { ID: 588, name: 'Escavalier' },
      { ID: 589, name: 'Foongus' },
      { ID: 590, name: 'Amoonguss' },
      { ID: 591, name: 'Frillish' },
      { ID: 592, name: 'Jellicent' },
      { ID: 593, name: 'Alomomola' },
      { ID: 594, name: 'Joltik' },
      { ID: 595, name: 'Galvantula' },
      { ID: 596, name: 'Ferroseed' },
      { ID: 597, name: 'Ferrothorn' },
      { ID: 598, name: 'Klink' },
      { ID: 599, name: 'Klang' },
      { ID: 600, name: 'Klinklang' },
      { ID: 601, name: 'Tynamo' },
      { ID: 602, name: 'Eelektrik' },
      { ID: 603, name: 'Eelektross' },
      { ID: 604, name: 'Elgyem' },
      { ID: 605, name: 'Beheeyem' },
      { ID: 606, name: 'Litwick' },
      { ID: 607, name: 'Lampent' },
      { ID: 608, name: 'Chandelure' },
      { ID: 609, name: 'Axew' },
      { ID: 610, name: 'Fraxure' },
      { ID: 611, name: 'Haxorus' },
      { ID: 612, name: 'Cubchoo' },
      { ID: 613, name: 'Beartic' },
      { ID: 614, name: 'Cryogonal' },
      { ID: 615, name: 'Shelmet' },
      { ID: 616, name: 'Accelgor' },
      { ID: 617, name: 'Stunfisk' },
      { ID: 618, name: 'Mienfoo' },
      { ID: 619, name: 'Mienshao' },
      { ID: 620, name: 'Druddigon' },
      { ID: 621, name: 'Golett' },
      { ID: 622, name: 'Golurk' },
      { ID: 623, name: 'Pawniard' },
      { ID: 624, name: 'Bisharp' },
      { ID: 625, name: 'Bouffalant' },
      { ID: 626, name: 'Rufflet' },
      { ID: 627, name: 'Braviary' },
      { ID: 628, name: 'Vullaby' },
      { ID: 629, name: 'Mandibuzz' },
      { ID: 630, name: 'Heatmor' },
      { ID: 631, name: 'Durant' },
      { ID: 632, name: 'Deino' },
      { ID: 633, name: 'Zweilous' },
      { ID: 634, name: 'Hydreigon' },
      { ID: 635, name: 'Larvesta' },
      { ID: 636, name: 'Volcarona' },
      { ID: 637, name: 'Cobalion' },
      { ID: 638, name: 'Terrakion' },
      { ID: 639, name: 'Virizion' },
      { ID: 640, name: 'Tornadus' },
      { ID: 641, name: 'Thundurus' },
      { ID: 642, name: 'Reshiram' },
      { ID: 643, name: 'Zekrom' },
      { ID: 644, name: 'Landorus' },
      { ID: 645, name: 'Kyurem' },
      { ID: 646, name: 'Keldeo' },
      { ID: 647, name: 'Meloetta' },
      { ID: 648, name: 'Genesect' },
      { ID: 649, name: 'Chespin' },
      { ID: 650, name: 'Quilladin' },
      { ID: 651, name: 'Chesnaught' },
      { ID: 652, name: 'Fennekin' },
      { ID: 653, name: 'Braixen' },
      { ID: 654, name: 'Delphox' },
      { ID: 655, name: 'Froakie' },
      { ID: 656, name: 'Frogadier' },
      { ID: 657, name: 'Greninja' },
      { ID: 658, name: 'Bunnelby' },
      { ID: 659, name: 'Diggersby' },
      { ID: 660, name: 'Fletchling' },
      { ID: 661, name: 'Fletchinder' },
      { ID: 662, name: 'Talonflame' },
      { ID: 663, name: 'Scatterbug' },
      { ID: 664, name: 'Spewpa' },
      { ID: 665, name: 'Vivillon' },
      { ID: 666, name: 'Litleo' },
      { ID: 667, name: 'Pyroar' },
      { ID: 668, name: 'Flabebe' },
      { ID: 669, name: 'Floette' },
      { ID: 670, name: 'Florges' },
      { ID: 671, name: 'Skiddo' },
      { ID: 672, name: 'Gogoat' },
      { ID: 673, name: 'Pancham' },
      { ID: 674, name: 'Pangoro' },
      { ID: 675, name: 'Furfrou' },
      { ID: 676, name: 'Espurr' },
      { ID: 677, name: 'Meowstic' },
      { ID: 678, name: 'Honedge' },
      { ID: 679, name: 'Doublade' },
      { ID: 680, name: 'Aegislash' },
      { ID: 681, name: 'Spritzee' },
      { ID: 682, name: 'Aromatisse' },
      { ID: 683, name: 'Swirlix' },
      { ID: 684, name: 'Slurpuff' },
      { ID: 685, name: 'Inkay' },
      { ID: 686, name: 'Malamar' },
      { ID: 687, name: 'Binacle' },
      { ID: 688, name: 'Barbaracle' },
      { ID: 689, name: 'Skrelp' },
      { ID: 690, name: 'Dragalge' },
      { ID: 691, name: 'Clauncher' },
      { ID: 692, name: 'Clawitzer' },
      { ID: 693, name: 'Helioptile' },
      { ID: 694, name: 'Heliolisk' },
      { ID: 695, name: 'Tyrunt' },
      { ID: 696, name: 'Tyrantrum' },
      { ID: 697, name: 'Amaura' },
      { ID: 698, name: 'Aurorus' },
      { ID: 699, name: 'Sylveon' },
      { ID: 700, name: 'Hawlucha' },
      { ID: 701, name: 'Dedenne' },
      { ID: 702, name: 'Carbink' },
      { ID: 703, name: 'Goomy' },
      { ID: 704, name: 'Sliggoo' },
      { ID: 705, name: 'Goodra' },
      { ID: 706, name: 'Klefki' },
      { ID: 707, name: 'Phantump' },
      { ID: 708, name: 'Trevenant' },
      { ID: 709, name: 'Pumpkaboo' },
      { ID: 710, name: 'Gourgeist' },
      { ID: 711, name: 'Bergmite' },
      { ID: 712, name: 'Avalugg' },
      { ID: 713, name: 'Noibat' },
      { ID: 714, name: 'Noivern' },
      { ID: 715, name: 'Xerneas' },
      { ID: 716, name: 'Yveltal' },
      { ID: 717, name: 'Zygarde' },
      { ID: 718, name: 'Diancie' },
      { ID: 719, name: 'Hoopa' },
      { ID: 720, name: 'Volcanion' },
      { ID: 721, name: 'Rowlet' },
      { ID: 722, name: 'Dartrix' },
      { ID: 723, name: 'Decidueye' },
      { ID: 724, name: 'Litten' },
      { ID: 725, name: 'Torracat' },
      { ID: 726, name: 'Incineroar' },
      { ID: 727, name: 'Popplio' },
      { ID: 728, name: 'Brionne' },
      { ID: 729, name: 'Primarina' },
      { ID: 730, name: 'Pikipek' },
      { ID: 731, name: 'Trumbeak' },
      { ID: 732, name: 'Toucannon' },
      { ID: 733, name: 'Yungoos' },
      { ID: 734, name: 'Gumshoos' },
      { ID: 735, name: 'Grubbin' },
      { ID: 736, name: 'Charjabug' },
      { ID: 737, name: 'Vikavolt' },
      { ID: 738, name: 'Crabrawler' },
      { ID: 739, name: 'Crabominable' },
      { ID: 740, name: 'Oricorio' },
      { ID: 741, name: 'Cutiefly' },
      { ID: 742, name: 'Ribombee' },
      { ID: 743, name: 'Rockruff' },
      { ID: 744, name: 'Lycanroc' },
      { ID: 745, name: 'Wishiwashi' },
      { ID: 746, name: 'Mareanie' },
      { ID: 747, name: 'Toxapex' },
      { ID: 748, name: 'Mudbray' },
      { ID: 749, name: 'Mudsdale' },
      { ID: 750, name: 'Dewpider' },
      { ID: 751, name: 'Araquanid' },
      { ID: 752, name: 'Fomantis' },
      { ID: 753, name: 'Lurantis' },
      { ID: 754, name: 'Morelull' },
      { ID: 755, name: 'Shiinotic' },
      { ID: 756, name: 'Salandit' },
      { ID: 757, name: 'Salazzle' },
      { ID: 758, name: 'Stufful' },
      { ID: 759, name: 'Bewear' },
      { ID: 760, name: 'Bounsweet' },
      { ID: 761, name: 'Steenee' },
      { ID: 762, name: 'Tsareena' },
      { ID: 763, name: 'Comfey' },
      { ID: 764, name: 'Oranguru' },
      { ID: 765, name: 'Passimian' },
      { ID: 766, name: 'Wimpod' },
      { ID: 767, name: 'Golisopod' },
      { ID: 768, name: 'Sandygast' },
      { ID: 769, name: 'Palossand' },
      { ID: 770, name: 'Pyukumuku' },
      { ID: 771, name: 'Type: Null' },
      { ID: 772, name: 'Silvally' },
      { ID: 773, name: 'Minior' },
      { ID: 774, name: 'Komala' },
      { ID: 775, name: 'Turtonator' },
      { ID: 776, name: 'Togedemaru' },
      { ID: 777, name: 'Mimikyu' },
      { ID: 778, name: 'Bruxish' },
      { ID: 779, name: 'Drampa' },
      { ID: 780, name: 'Dhelmise' },
      { ID: 781, name: 'Jangmo-o' },
      { ID: 782, name: 'Hakamo-o' },
      { ID: 783, name: 'Kommo-o' },
      { ID: 784, name: 'Tapu Koko' },
      { ID: 785, name: 'Tapu Lele' },
      { ID: 786, name: 'Tapu Bulu' },
      { ID: 787, name: 'Tapu Fini' },
      { ID: 788, name: 'Cosmog' },
      { ID: 789, name: 'Cosmoem' },
      { ID: 790, name: 'Solgaleo' },
      { ID: 791, name: 'Lunala' },
      { ID: 792, name: 'Nihilego' },
      { ID: 793, name: 'Buzzwole' },
      { ID: 794, name: 'Pheromosa' },
      { ID: 795, name: 'Xurkitree' },
      { ID: 796, name: 'Celesteela' },
      { ID: 797, name: 'Kartana' },
      { ID: 798, name: 'Guzzlord' },
      { ID: 799, name: 'Necrozma' },
      { ID: 800, name: 'Magearna' },
      { ID: 801, name: 'Marshadow' },
      { ID: 802, name: 'Poipole' },
      { ID: 803, name: 'Naganadel' },
      { ID: 804, name: 'Stakataka' },
      { ID: 805, name: 'Blacephalon' },
      { ID: 806, name: 'Zeraora' },
      { ID: 807, name: 'Meltan' },
      { ID: 808, name: 'Melmetal' },
      { ID: 809, name: 'Grookey' },
      { ID: 810, name: 'Thwackey' },
      { ID: 811, name: 'Rillaboom' },
      { ID: 812, name: 'Scorbunny' },
      { ID: 813, name: 'Raboot' },
      { ID: 814, name: 'Cinderace' },
      { ID: 815, name: 'Sobble' },
      { ID: 816, name: 'Drizzile' },
      { ID: 817, name: 'Inteleon' },
      { ID: 818, name: 'Skwovet' },
      { ID: 819, name: 'Greedent' },
      { ID: 820, name: 'Rookidee' },
      { ID: 821, name: 'Corvisquire' },
      { ID: 822, name: 'Corviknight' },
      { ID: 823, name: 'Blipbug' },
      { ID: 824, name: 'Dottler' },
      { ID: 825, name: 'Orbeetle' },
      { ID: 826, name: 'Nickit' },
      { ID: 827, name: 'Thievul' },
      { ID: 828, name: 'Gossifleur' },
      { ID: 829, name: 'Eldegoss' },
      { ID: 830, name: 'Wooloo' },
      { ID: 831, name: 'Dubwool' },
      { ID: 832, name: 'Chewtle' },
      { ID: 833, name: 'Drednaw' },
      { ID: 834, name: 'Yamper' },
      { ID: 835, name: 'Boltund' },
      { ID: 836, name: 'Rolycoly' },
      { ID: 837, name: 'Carkol' },
      { ID: 838, name: 'Coalossal' },
      { ID: 839, name: 'Applin' },
      { ID: 840, name: 'Flapple' },
      { ID: 841, name: 'Appletun' },
      { ID: 842, name: 'Silicobra' },
      { ID: 843, name: 'Sandaconda' },
      { ID: 844, name: 'Cramorant' },
      { ID: 845, name: 'Arrokuda' },
      { ID: 846, name: 'Barraskewda' },
      { ID: 847, name: 'Toxel' },
      { ID: 848, name: 'Toxtricity' },
      { ID: 849, name: 'Sizzlipede' },
      { ID: 850, name: 'Centiskorch' },
      { ID: 851, name: 'Clobbopus' },
      { ID: 852, name: 'Grapploct' },
      { ID: 853, name: 'Sinistea' },
      { ID: 854, name: 'Polteageist' },
      { ID: 855, name: 'Hatenna' },
      { ID: 856, name: 'Hattrem' },
      { ID: 857, name: 'Hatterene' },
      { ID: 858, name: 'Impidimp' },
      { ID: 859, name: 'Morgrem' },
      { ID: 860, name: 'Grimmsnarl' },
      { ID: 861, name: 'Obstagoon' },
      { ID: 862, name: 'Perrserker' },
      { ID: 863, name: 'Cursola' },
      { ID: 864, name: "Sirfetch'd" },
      { ID: 865, name: 'Mr. Rime' },
      { ID: 866, name: 'Runerigus' },
      { ID: 867, name: 'Milcery' },
      { ID: 868, name: 'Alcremie' },
      { ID: 869, name: 'Falinks' },
      { ID: 870, name: 'Pincurchin' },
      { ID: 871, name: 'Snom' },
      { ID: 872, name: 'Frosmoth' },
      { ID: 873, name: 'Stonjourner' },
      { ID: 874, name: 'Eiscue' },
      { ID: 875, name: 'Indeedee' },
      { ID: 876, name: 'Morpeko' },
      { ID: 877, name: 'Cufant' },
      { ID: 878, name: 'Copperajah' },
      { ID: 879, name: 'Dracozolt' },
      { ID: 880, name: 'Arctozolt' },
      { ID: 881, name: 'Dracovish' },
      { ID: 882, name: 'Arctovish' },
      { ID: 883, name: 'Duraludon' },
      { ID: 884, name: 'Dreepy' },
      { ID: 885, name: 'Drakloak' },
      { ID: 886, name: 'Dragapult' },
      { ID: 887, name: 'Zacian' },
      { ID: 888, name: 'Zamazenta' },
      { ID: 889, name: 'Eternatus' },
      { ID: 890, name: 'Kubfu' },
      { ID: 891, name: 'Urshifu' },
      { ID: 892, name: 'Zarude' },
      { ID: 893, name: 'Regieleki' },
      { ID: 894, name: 'Regidrago' },
      { ID: 895, name: 'Glastrier' },
      { ID: 896, name: 'Spectrier' },
      { ID: 897, name: 'Calyrex' },
      { ID: 898, name: 'Wyrdeer' },
      { ID: 899, name: 'Kleavor' },
      { ID: 900, name: 'Ursaluna' },
      { ID: 901, name: 'Basculegion' },
      { ID: 902, name: 'Sneasler' },
      { ID: 903, name: 'Overqwil' },
      { ID: 904, name: 'Enamorus' },
  
  ].forEach(pokemon => {
      const nameWithID = `${pokemon.ID}-${pokemon.name}.jpg`
      const name = `${pokemon.name.toLocaleLowerCase()}.jpg`
      const path = `https://img.pokemondb.net/artwork/large/${name}`;
      console.log(path)
      // const imgBlob = fetch(path).then(res => res.blob)
      // imgBlob.then(img=>{

      //   var url = URL.createObjectURL(img as any);
        const a =document.createElement('a');
        a.href= path;
        a.download= nameWithID;
        a.text=nameWithID
        document.body.appendChild(a);
        // a.click();
        // window.URL.revokeObjectURL(url);
      })
        
    // })
  }

  save(blob: any, name: string) {
    saveAs(blob, name);
  }
}
