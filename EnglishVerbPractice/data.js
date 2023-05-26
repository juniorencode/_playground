const verbs = [
  {
    spanish: 'jugar; tocar; reproducir',
    base: 'play',
    gerund: 'playing',
    third: 'plays',
    past: 'played',
    participle: 'played'
  },
  {
    spanish: 'estudiar, analizar, investigar',
    base: 'study',
    gerund: 'studying',
    third: 'studies',
    past: 'studied',
    participle: 'studied'
  },
  {
    spanish: 'cantar, interpretar',
    base: 'sing',
    gerund: 'singing',
    third: 'sings',
    past: 'sang',
    participle: 'sung'
  },
  {
    spanish: 'ir, acudir',
    base: 'go',
    gerund: 'going',
    third: 'goes',
    past: 'went',
    participle: 'gone'
  },
  {
    spanish: 'costar, valer',
    base: 'cost',
    gerund: 'costing',
    third: 'costs',
    past: 'cost',
    participle: 'cost'
  },
  {
    spanish: 'cortar, reducir',
    base: 'cut',
    gerund: 'cutting',
    third: 'cuts',
    past: 'cut',
    participle: 'cut'
  },
  {
    spanish: 'hacer, realizar',
    base: 'do',
    gerund: 'doing',
    third: 'does',
    past: 'did',
    participle: 'done'
  },
  {
    spanish: 'dibujar',
    base: 'draw',
    gerund: 'drawing',
    third: 'draws',
    past: 'drew',
    participle: 'drawn'
  },
  {
    spanish: 'soñar',
    base: 'dream',
    gerund: 'dreaming',
    third: 'dreams',
    past: 'dreamed/dreamt',
    participle: 'dreamed/dreamt'
  },
  {
    spanish: 'beber, tomar, beberse, ingerir',
    base: 'drink',
    gerund: 'drinking',
    third: 'drinks',
    past: 'drank',
    participle: 'drunk'
  },
  {
    spanish: 'conducir, manejar, dirigir',
    base: 'drive',
    gerund: 'driving',
    third: 'drives',
    past: 'drove',
    participle: 'driven'
  },
  {
    spanish: 'comer, comerse, ingerir, cenar, almorzar',
    base: 'eat',
    gerund: 'eating',
    third: 'eats',
    past: 'ate',
    participle: 'eaten'
  },
  {
    spanish: 'caer; caerse, recaer, derrumbar; enamorarse',
    base: 'fall',
    gerund: 'falling',
    third: 'falls',
    past: 'fell',
    participle: 'fallen'
  },
  {
    spanish: 'alimentar, comer, alimentarse',
    base: 'feed',
    gerund: 'feeding',
    third: 'feeds',
    past: 'fed',
    participle: 'fed'
  },
  {
    spanish: 'sentirse, creer; tocar, sentir, palpar',
    base: 'feel',
    gerund: 'feeling',
    third: 'feels',
    past: 'felt',
    participle: 'felt'
  },
  {
    spanish: 'luchar, pelear, combatir, enfrentar, discutir',
    base: 'fight',
    gerund: 'fighting',
    third: 'fights',
    past: 'fought',
    participle: 'fought'
  },
  {
    spanish: 'encontrar, hallar, descubrir; conseguir, obtener; localizar',
    base: 'find',
    gerund: 'finding',
    third: 'finds',
    past: 'found',
    participle: 'found'
  },
  {
    spanish: 'volar; viajar, pilotar',
    base: 'fly',
    gerund: 'flying',
    third: 'flies',
    past: 'flew',
    participle: 'flown'
  },
  {
    spanish: 'olvidar, olvidarse de',
    base: 'forget',
    gerund: 'forgetting',
    third: 'forgets',
    past: 'forgot',
    participle: 'forgotten'
  },
  {
    spanish: 'perdonar, disculpar, perdonarse, condonar',
    base: 'forgive',
    gerund: 'forgiving',
    third: 'forgives',
    past: 'forgave',
    participle: 'forgiven'
  },
  {
    spanish: 'congelar, congelarse, helar; bloquear, paralizar',
    base: 'freeze',
    gerund: 'freezing',
    third: 'freezes',
    past: 'froze',
    participle: 'frozen'
  },
  {
    spanish: 'llorar, gritar',
    base: 'cry',
    gerund: 'crying',
    third: 'cries',
    past: 'cried',
    participle: 'cried'
  },
  {
    spanish: 'dañar, dañarse, perjudicar',
    base: 'damage',
    gerund: 'damaging',
    third: 'damages',
    past: 'damaged',
    participle: 'damaged'
  },
  {
    spanish: 'entregar, enviar',
    base: 'deliver',
    gerund: 'delivering',
    third: 'delivers',
    past: 'delivered',
    participle: 'delivered'
  },
  {
    spanish: 'disfrutar, gozar, divertirse',
    base: 'enjoy',
    gerund: 'enjoying',
    third: 'enjoys',
    past: 'enjoyed',
    participle: 'enjoyed'
  },
  {
    spanish: 'explicar, explicarse, aclarar, exponer',
    base: 'explain',
    gerund: 'explaining',
    third: 'explains',
    past: 'explained',
    participle: 'explained'
  },
  {
    spanish: 'pasar, suceder, ocurrir, acontecer',
    base: 'happen',
    gerund: 'happening',
    third: 'happens',
    past: 'happened',
    participle: 'happened'
  },
  {
    spanish: 'reír, reírse',
    base: 'laugh',
    gerund: 'laughing',
    third: 'laughs',
    past: 'laughed',
    participle: 'laughed'
  },
  {
    spanish: 'gustar',
    base: 'like',
    gerund: 'liking',
    third: 'likes',
    past: 'liked',
    participle: 'liked'
  },
  {
    spanish: 'evitar, evitarse, eludir, prevenir',
    base: 'avoid',
    gerund: 'avoiding',
    third: 'avoids',
    past: 'avoided',
    participle: 'avoided'
  },
  {
    spanish: 'despertar, despertarse, darse cuenta',
    base: 'awake',
    gerund: 'awaking',
    third: 'awakes',
    past: 'awaked/awoke',
    participle: 'awaked/awoken'
  },
  {
    spanish: 'llegar a ser, hacerse, volverse, convertirse en',
    base: 'become',
    gerund: 'becoming',
    third: 'becomes',
    past: 'became',
    participle: 'become'
  },
  {
    spanish: 'comenzar, empezar, iniciarse, emprender',
    base: 'begin',
    gerund: 'beginning',
    third: 'begins',
    past: 'began',
    participle: 'begun'
  },
  {
    spanish: 'apostar, jugar; estar seguro',
    base: 'bet',
    gerund: 'betting',
    third: 'bets',
    past: 'betted/bet',
    participle: 'betted/bet'
  },
  {
    spanish: 'morder, picar, morderse',
    base: 'bite',
    gerund: 'biting',
    third: 'bites',
    past: 'bit',
    participle: 'bitten'
  },
  {
    spanish: 'soplar, soplarse; explotar, estallar',
    base: 'blow',
    gerund: 'blowing',
    third: 'blows',
    past: 'blew',
    participle: 'blown'
  },
  {
    spanish: 'romper, romperse, quebrar; salir, terminar',
    base: 'break',
    gerund: 'breaking',
    third: 'breaks',
    past: 'broke',
    participle: 'broken'
  },
  {
    spanish: 'traer, llevar; aportar, introducir',
    base: 'bring',
    gerund: 'bringing',
    third: 'brings',
    past: 'brought',
    participle: 'brought'
  },
  {
    spanish: 'construir, crear; fomentar, desarrollarse; edificar; fortalecer',
    base: 'build',
    gerund: 'building',
    third: 'builds',
    past: 'built',
    participle: 'built'
  },
  {
    spanish: 'quemar, arder; incinerar; grabar',
    base: 'burn',
    gerund: 'burning',
    third: 'burns',
    past: 'burned/burnt',
    participle: 'burned/burnt'
  },
  {
    spanish: 'comprar, comprarse, adquirir',
    base: 'buy',
    gerund: 'buying',
    third: 'buys',
    past: 'bought',
    participle: 'bought'
  },
  {
    spanish: 'atrapar, coger, capturar, tomar, agarrar; pescar, pillar',
    base: 'catch',
    gerund: 'catching',
    third: 'catches',
    past: 'caught',
    participle: 'caught'
  },
  {
    spanish: 'escoger, elegir, seleccionar; optar, preferir',
    base: 'choose',
    gerund: 'choosing',
    third: 'chooses',
    past: 'chose',
    participle: 'chosen'
  },
  {
    spanish: 'venir, llegar',
    base: 'come',
    gerund: 'coming',
    third: 'comes',
    past: 'came',
    participle: 'come'
  },
  {
    spanish: 'conseguir, obtener, tener',
    base: 'get',
    gerund: 'getting',
    third: 'gets',
    past: 'got',
    participle: 'got/gotten'
  },
  {
    spanish: 'dar, regalar, otorgar; ofrecer',
    base: 'give',
    gerund: 'giving',
    third: 'gives',
    past: 'gave',
    participle: 'given'
  },
  {
    spanish: 'crecer, aumentar; cultivar',
    base: 'grow',
    gerund: 'growing',
    third: 'grows',
    past: 'grew',
    participle: 'grown'
  },
  {
    spanish: 'haber',
    base: 'have',
    gerund: 'having',
    third: 'has',
    past: 'had',
    participle: 'had'
  },
  {
    spanish: 'oír, escuchar; enterarse de',
    base: 'hear',
    gerund: 'hearing',
    third: 'hears',
    past: 'heard',
    participle: 'heard'
  },
  {
    spanish: 'esconder, ocultar; guardar, almacenar',
    base: 'hide',
    gerund: 'hiding',
    third: 'hides',
    past: 'hid',
    participle: 'hidden'
  },
  ,
  {
    spanish: 'golpear, pegar',
    base: 'hit',
    gerund: 'hitting',
    third: 'hits',
    past: 'hit',
    participle: 'hit'
  },
  {
    spanish: 'sostener, aguantar, soportar, mantener',
    base: 'hold',
    gerund: 'holding',
    third: 'holds',
    past: 'held',
    participle: 'held'
  },
  {
    spanish: 'herir, hacer daño, perjudicar, lastimar, doler',
    base: 'hurt',
    gerund: 'hurting',
    third: 'hurts',
    past: 'hurt',
    participle: 'hurt'
  },
  {
    spanish: 'mantener, seguir, guardar, quedarse en, conservarse',
    base: 'keep',
    gerund: 'keeping',
    third: 'keeps',
    past: 'kept',
    participle: 'kept'
  },
  {
    spanish: 'conocer; saber; estar informado, estar al tanto',
    base: 'know',
    gerund: 'knowing',
    third: 'knows',
    past: 'knew',
    participle: 'known'
  },
  {
    spanish: 'colocar, poner; tender, acostar',
    base: 'lay',
    gerund: 'laying',
    third: 'lays',
    past: 'laid',
    participle: 'laid'
  },
  {
    spanish: 'dirigir, conducir, llevar, guiar, encabezar',
    base: 'lead',
    gerund: 'leading',
    third: 'leads',
    past: 'led',
    participle: 'led'
  },
  {
    spanish: 'aprender, aprenderse',
    base: 'learn',
    gerund: 'learning',
    third: 'learns',
    past: 'learned/learnt',
    participle: 'learned/learnt'
  },
  {
    spanish: 'dejar, abandonar, salir, irse, marcharse, partir, retirarse',
    base: 'leave',
    gerund: 'leaving',
    third: 'leaves',
    past: 'left',
    participle: 'left'
  },
  {
    spanish: 'prestar, prestarse',
    base: 'lend',
    gerund: 'lending',
    third: 'lends',
    past: 'lent',
    participle: 'lent'
  },
  {
    spanish: 'dejar, alquilar, arrendar',
    base: 'let',
    gerund: 'letting',
    third: 'lets',
    past: 'let',
    participle: 'let'
  },
  {
    spanish: 'perder, perderse, fracasar',
    base: 'lose',
    gerund: 'losing',
    third: 'loses',
    past: 'lost',
    participle: 'lost'
  },
  {
    spanish: 'hacer, realizar, fabricar',
    base: 'make',
    gerund: 'making',
    third: 'makes',
    past: 'made',
    participle: 'made'
  },
  {
    spanish: 'querer decir; significar, implicar, pretender',
    base: 'mean',
    gerund: 'meaning',
    third: 'means',
    past: 'meant',
    participle: 'meant'
  },
  {
    spanish: 'reunir, reunirse, encontrarse con; conocer; atender',
    base: 'meet',
    gerund: 'meeting',
    third: 'meets',
    past: 'met',
    participle: 'met'
  },
  {
    spanish: 'pagar, saldar, liquidar',
    base: 'pay',
    gerund: 'paying',
    third: 'pays',
    past: 'paid',
    participle: 'paid'
  },
  {
    spanish: 'poner, ponerse, colocar',
    base: 'put',
    gerund: 'putting',
    third: 'puts',
    past: 'put',
    participle: 'put'
  },
  {
    spanish: 'leer',
    base: 'read',
    gerund: 'reading',
    third: 'reads',
    past: 'read',
    participle: 'read'
  },
  {
    spanish: 'montar, cabalgar; viajar',
    base: 'ride',
    gerund: 'riding',
    third: 'rides',
    past: 'rode',
    participle: 'ridden'
  },
  {
    spanish: 'llamar por teléfono; sonar',
    base: 'ring',
    gerund: 'ringing',
    third: 'rings',
    past: 'rang',
    participle: 'rung'
  },
  {
    spanish: 'elevarse, aumentar; resucitar, alzarse',
    base: 'rise',
    gerund: 'rising',
    third: 'rises',
    past: 'rose',
    participle: 'risen'
  },
  {
    spanish: 'correr; huir',
    base: 'run',
    gerund: 'running',
    third: 'runs',
    past: 'ran',
    participle: 'run'
  },
  {
    spanish: 'decir, decirse, indicar',
    base: 'say',
    gerund: 'saying',
    third: 'says',
    past: 'said',
    participle: 'said'
  },
  {
    spanish: 'ver; consultar, comprobar',
    base: 'see',
    gerund: 'seeing',
    third: 'sees',
    past: 'saw',
    participle: 'seen'
  },
  {
    spanish: 'vender, venderse, comercializar',
    base: 'sell',
    gerund: 'selling',
    third: 'sells',
    past: 'sold',
    participle: 'sold'
  },
  {
    spanish: 'enviar, mandar, transmitir',
    base: 'send',
    gerund: 'sending',
    third: 'sends',
    past: 'sent',
    participle: 'sent'
  },
  {
    spanish: 'sacudir, agitar; temblar',
    base: 'shake',
    gerund: 'shaking',
    third: 'shakes',
    past: 'shook',
    participle: 'shaken'
  },
  {
    spanish: 'mostrar, demostrar, enseñar',
    base: 'show',
    gerund: 'showing',
    third: 'shows',
    past: 'showed',
    participle: 'shown'
  },
  {
    spanish: 'sentar, sentarse; quedarse, permanecer',
    base: 'sit',
    gerund: 'sitting',
    third: 'sits',
    past: 'sat',
    participle: 'sat'
  },
  {
    spanish: 'dormir, descansar, dormirse; rocar',
    base: 'sleep',
    gerund: 'sleeping',
    third: 'sleeps',
    past: 'slept',
    participle: 'slept'
  },
  {
    spanish: 'oler, olfatear',
    base: 'smell',
    gerund: 'smelling',
    third: 'smells',
    past: 'smelled/smelt',
    participle: 'smelled/smelt'
  },
  {
    spanish: 'hablar, hablarse, decir, intervenir, estresarse, dirigirse',
    base: 'speak',
    gerund: 'speaking',
    third: 'speaks',
    past: 'spoke',
    participle: 'spoken'
  },
  {
    spanish: 'deletrear',
    base: 'spell',
    gerund: 'spelling',
    third: 'spells',
    past: 'spelled/spelt',
    participle: 'spelled/spelt'
  },
  {
    spanish: 'gastar, gastarse',
    base: 'spend',
    gerund: 'spending',
    third: 'spends',
    past: 'spent',
    participle: 'spent'
  },
  {
    spanish: 'dividir, dividirse, partirse; repartir, compartir',
    base: 'split',
    gerund: 'splitting',
    third: 'splits',
    past: 'split',
    participle: 'split'
  },
  {
    spanish: 'difundir, extender, propagar, esparcir; untar',
    base: 'spread',
    gerund: 'spreading',
    third: 'spreads',
    past: 'spread',
    participle: 'spread'
  },
  {
    spanish: 'estar de pie; pararse, quedarse; aguantar',
    base: 'stand',
    gerund: 'standing',
    third: 'stands',
    past: 'stood',
    participle: 'stood'
  },
  {
    spanish: 'jurar, prometer',
    base: 'swear',
    gerund: 'swearing',
    third: 'swears',
    past: 'swore',
    participle: 'sworn'
  },
  {
    spanish: 'nadar; bañarse, bucear',
    base: 'swim',
    gerund: 'swimming',
    third: 'swims',
    past: 'swam',
    participle: 'swum'
  },
  {
    spanish: 'barrer',
    base: 'sweep',
    gerund: 'sweeping',
    third: 'sweeps',
    past: 'swept',
    participle: 'swept'
  },
  {
    spanish: 'balancear, columpiar; girar, oscilar, pivotar',
    base: 'swing',
    gerund: 'swinging',
    third: 'swings',
    past: 'swung',
    participle: 'swung'
  },
  {
    spanish: 'tomar, tomarse, agarrar, coger',
    base: 'take',
    gerund: 'taking',
    third: 'takes',
    past: 'took',
    participle: 'taken'
  },
  {
    spanish: 'enseñar, enseñarse, impartir, dar clases, educar, instruir',
    base: 'teach',
    gerund: 'teaching',
    third: 'teaches',
    past: 'taught',
    participle: 'taught'
  },
  {
    spanish: 'decir, contar; explicar',
    base: 'tell',
    gerund: 'telling',
    third: 'tells',
    past: 'told',
    participle: 'told'
  },
  {
    spanish: 'pensar, creer, parecer, considerar, reflexionar, suponer',
    base: 'think',
    gerund: 'thinking',
    third: 'thinks',
    past: 'thought',
    participle: 'thought'
  },
  {
    spanish: 'tirar, tirarse, lanzar',
    base: 'throw',
    gerund: 'throwing',
    third: 'throws',
    past: 'threw',
    participle: 'thrown'
  },
  {
    spanish: 'entender, entenderse, comprender, comprenderse',
    base: 'understand',
    gerund: 'understanding',
    third: 'understands',
    past: 'understood',
    participle: 'understood'
  },
  {
    spanish: 'despertar, despertarse, despertar a',
    base: 'wake',
    gerund: 'waking',
    third: 'wakes',
    past: 'woke',
    participle: 'woken'
  },
  {
    spanish: 'llevar puesto, vestir, vestirse; ponerse, colocarse',
    base: 'wear',
    gerund: 'wearing',
    third: 'wears',
    past: 'wore',
    participle: 'worn'
  },
  {
    spanish: 'ganar, vencer',
    base: 'win',
    gerund: 'winning',
    third: 'wins',
    past: 'won',
    participle: 'won'
  },
  {
    spanish: 'escribir, escribirse, anotar, redactar, apuntar',
    base: 'write',
    gerund: 'writing',
    third: 'writes',
    past: 'wrote',
    participle: 'written'
  },
  {
    spanish: 'encender, alumbrar',
    base: 'light',
    gerund: 'lighting',
    third: 'lights',
    past: 'lit',
    participle: 'lit'
  },
  {
    spanish: 'buscar, solicitar, obtener',
    base: 'seek',
    gerund: 'seeking',
    third: 'seeks',
    past: 'sought',
    participle: 'sought'
  },
  {
    spanish: 'brillar, resplandecer',
    base: 'shine',
    gerund: 'shining',
    third: 'shines',
    past: 'shone',
    participle: 'shone'
  },
  {
    spanish: 'disparar, tirar',
    base: 'shoot',
    gerund: 'shooting',
    third: 'shoots',
    past: 'shot',
    participle: 'shot'
  },
  {
    spanish: 'hundir, hundirse, hincar, sumirse',
    base: 'sink',
    gerund: 'sinking',
    third: 'sinks',
    past: 'sank',
    participle: 'sunk'
  },
  {
    spanish: 'lograr, alcanzar, conseguir, obtener',
    base: 'achieve',
    gerund: 'achieving',
    third: 'achieves',
    past: 'achieved',
    participle: 'achieved'
  },
  {
    spanish: 'responder, contestar',
    base: 'answer',
    gerund: 'answering',
    third: 'answers',
    past: 'answered',
    participle: 'answered'
  },
  {
    spanish: 'llegar, arribar',
    base: 'arrive',
    gerund: 'arriving',
    third: 'arrives',
    past: 'arrived',
    participle: 'arrived'
  },
  {
    spanish: 'creer, creerse',
    base: 'believe',
    gerund: 'believing',
    third: 'believes',
    past: 'believed',
    participle: 'believed'
  },
  {
    spanish: 'llevar, cargar',
    base: 'carry',
    gerund: 'carrying',
    third: 'carries',
    past: 'carried',
    participle: 'carried'
  },
  {
    spanish: 'cambiar, cambiarse, modificar',
    base: 'change',
    gerund: 'changing',
    third: 'changes',
    past: 'changed',
    participle: 'changed'
  },
  {
    spanish: 'imaginar, imaginarse, suponer, creer',
    base: 'imagine',
    gerund: 'imagining',
    third: 'imagines',
    past: 'imagined',
    participle: 'imagined'
  },
  {
    spanish: 'acostarse, echarse, descansar',
    base: 'lie',
    gerund: 'lying',
    third: 'lies',
    past: 'lay',
    participle: 'lain'
  },
  {
    spanish: 'mentir',
    base: 'lie',
    gerund: 'lying',
    third: 'lies',
    past: 'lied',
    participle: 'lied'
  },
  {
    spanish: 'escuchar, oir, prestar atencion',
    base: 'listen',
    gerund: 'listening',
    third: 'listens',
    past: 'listened',
    participle: 'listened'
  },
  {
    spanish: 'vivir, habitar, residir',
    base: 'live',
    gerund: 'living',
    third: 'lives',
    past: 'lived',
    participle: 'lived'
  },
  {
    spanish: 'abrir, abrirse; inaugurar',
    base: 'open',
    gerund: 'opening',
    third: 'opens',
    past: 'opened',
    participle: 'opened'
  },
  {
    spanish: 'planear, planificar',
    base: 'plan',
    gerund: 'planning',
    third: 'plans',
    past: 'planned',
    participle: 'planned'
  },
  {
    spanish: 'preferir, anteponer',
    base: 'prefer',
    gerund: 'preferring',
    third: 'prefers',
    past: 'preferred',
    participle: 'preferred'
  },
  {
    spanish: 'preparar, prepararse',
    base: 'prepare',
    gerund: 'preparing',
    third: 'prepares',
    past: 'prepared',
    participle: 'prepared'
  },
  {
    spanish: 'recibir, obtener, percibir, acoger, beneficiarse',
    base: 'receive',
    gerund: 'receiving',
    third: 'receives',
    past: 'received',
    participle: 'received'
  },
  {
    spanish: 'reconocer, reconocerse',
    base: 'recognize',
    gerund: 'recognizing',
    third: 'recognizes',
    past: 'recognized',
    participle: 'recognized'
  },
  {
    spanish: 'recordar, acordar; memorizar',
    base: 'remember',
    gerund: 'remembering',
    third: 'remembers',
    past: 'remembered',
    participle: 'remembered'
  },
  {
    spanish: 'requerir; exigir, precisar, pedir',
    base: 'require',
    gerund: 'requiring',
    third: 'requires',
    past: 'required',
    participle: 'required'
  },
  {
    spanish: 'volver, regresar, devolver, restituir',
    base: 'return',
    gerund: 'returning',
    third: 'returns',
    past: 'returned',
    participle: 'returned'
  },
  {
    spanish: 'salvar, guardar; ahorrar; grabar, archivar',
    base: 'save',
    gerund: 'saving',
    third: 'saves',
    past: 'saved',
    participle: 'saved'
  },
  {
    spanish: 'compartir; intercambiar',
    base: 'share',
    gerund: 'sharing',
    third: 'shares',
    past: 'shared',
    participle: 'shared'
  },
  {
    spanish: 'parecer, parecerse, resultar, lucir',
    base: 'seem',
    gerund: 'seeming',
    third: 'seems',
    past: 'seemed',
    participle: 'seemed'
  },
  {
    spanish: 'sonreir, reir, sonreirse',
    base: 'smile',
    gerund: 'smiling',
    third: 'smiles',
    past: 'smiled',
    participle: 'smiled'
  },
  {
    spanish: 'sobrevivir, subsistir',
    base: 'survive',
    gerund: 'surviving',
    third: 'survives',
    past: 'survived',
    participle: 'survived'
  },
  {
    spanish: 'sufrir, padecer, soportar, adolecer',
    base: 'suffer',
    gerund: 'suffering',
    third: 'suffers',
    past: 'suffered',
    participle: 'suffered'
  },
  {
    spanish: 'quedarse, permanecer',
    base: 'stay',
    gerund: 'staying',
    third: 'stays',
    past: 'stayed',
    participle: 'stayed'
  },
  {
    spanish: 'viajar, recorrer',
    base: 'travel',
    gerund: 'traveling/travelling',
    third: 'travels',
    past: 'traveled/travelled',
    participle: 'traveled/travelled'
  },
  {
    spanish: 'intentar, tratar, probar',
    base: 'try',
    gerund: 'trying',
    third: 'tries',
    past: 'tried',
    participle: 'tried'
  },
  {
    spanish: 'mejorar, mejorarse, aumentar, perfeccionar',
    base: 'improve',
    gerund: 'improving',
    third: 'improves',
    past: 'improved',
    participle: 'improved'
  },
  {
    spanish: 'preguntar, preguntarse; pedir, solicitar',
    base: 'ask',
    gerund: 'asking',
    third: 'asks',
    past: 'asked',
    participle: 'asked'
  },
  {
    spanish: 'vestir, vestirse, aliniar',
    base: 'dress',
    gerund: 'dressing',
    third: 'dresses',
    past: 'dressed',
    participle: 'dressed'
  },
  {
    spanish: 'terminar, acabar, finalizar; concluir',
    base: 'finish',
    gerund: 'finishing',
    third: 'finishes',
    past: 'finished',
    participle: 'finished'
  },
  {
    spanish: 'mirar, mirarse',
    base: 'look',
    gerund: 'looking',
    third: 'looks',
    past: 'looked',
    participle: 'looked'
  },
  {
    spanish: 'parecer, lucir',
    base: 'look like',
    gerund: 'looking like',
    third: 'looks like',
    past: 'looked like',
    participle: 'looked like'
  },
  {
    spanish: 'extrañar; perder, perderse',
    base: 'miss',
    gerund: 'missing',
    third: 'misses',
    past: 'missed',
    participle: 'missed'
  },
  {
    spanish: 'notar, observar, darse cuenta, fijarse, percatarse',
    base: 'notice',
    gerund: 'noticing',
    third: 'notices',
    past: 'noticed',
    participle: 'noticed'
  },
  {
    spanish: 'pasar, pasarse, cruzar',
    base: 'pass',
    gerund: 'passing',
    third: 'passes',
    past: 'passed',
    participle: 'passed'
  },
  {
    spanish: 'parar, pararse, detener, impedir; dejar',
    base: 'stop',
    gerund: 'stopping',
    third: 'stops',
    past: 'stopped',
    participle: 'stopped'
  },
  {
    spanish: 'hablar, conversar, decir, charlar, discutir, platicar',
    base: 'talk',
    gerund: 'talking',
    third: 'talks',
    past: 'talked',
    participle: 'talked'
  },
  {
    spanish: 'caminar, andar, pasear',
    base: 'walk',
    gerund: 'walking',
    third: 'walks',
    past: 'walked',
    participle: 'walked'
  },
  {
    spanish: 'lavar, lavarse',
    base: 'wash',
    gerund: 'washing',
    third: 'washes',
    past: 'washed',
    participle: 'washed'
  },
  {
    spanish: 'mirar video; observar, vigilar',
    base: 'watch',
    gerund: 'watching',
    third: 'watches',
    past: 'watched',
    participle: 'watched'
  },
  {
    spanish: 'desear',
    base: 'wish',
    gerund: 'wishing',
    third: 'wishes',
    past: 'wished',
    participle: 'wished'
  },
  {
    spanish: 'trabajar, laborar; funcionar',
    base: 'work',
    gerund: 'working',
    third: 'works',
    past: 'worked',
    participle: 'worked'
  },
  {
    spanish: 'aceptar, admitir',
    base: 'accept',
    gerund: 'accepting',
    third: 'accepts',
    past: 'accepted',
    participle: 'accepted'
  },
  {
    spanish: 'añadir, agregar, sumar, aportar, adicionar',
    base: 'add',
    gerund: 'adding',
    third: 'adds',
    past: 'added',
    participle: 'added'
  },
  {
    spanish: 'pretender, intentar, tener la intención',
    base: 'intend',
    gerund: 'intending',
    third: 'intends',
    past: 'intended',
    participle: 'intended'
  },
  {
    spanish: 'necesitar, precisar, ser necesario',
    base: 'need',
    gerund: 'needing',
    third: 'needs',
    past: 'needed',
    participle: 'needed'
  },
  {
    spanish: 'proveer, proporcionar, ofrecer, facilitar',
    base: 'provide',
    gerund: 'providing',
    third: 'provides',
    past: 'provided',
    participle: 'provided'
  },
  {
    spanish: 'repetir, repetirse; reincidir; insistir',
    base: 'repeat',
    gerund: 'repeating',
    third: 'repeats',
    past: 'repeated',
    participle: 'repeated'
  },
  {
    spanish: 'empezar, comenzar; iniciarse; arrancar, encender',
    base: 'start',
    gerund: 'starting',
    third: 'starts',
    past: 'started',
    participle: 'started'
  },
  {
    spanish: 'visitar',
    base: 'visit',
    gerund: 'visiting',
    third: 'visits',
    past: 'visited',
    participle: 'visited'
  },
  {
    spanish: 'esperar, esperarse, aguardar',
    base: 'wait',
    gerund: 'waiting',
    third: 'waits',
    past: 'waited',
    participle: 'waited'
  },
  {
    spanish: 'querer, desear',
    base: 'want',
    gerund: 'wanting',
    third: 'wants',
    past: 'wanted',
    participle: 'wanted'
  },
  {
    spanish: 'prohibir, impedir',
    base: 'forbid',
    gerund: 'forbidding',
    third: 'forbids',
    past: 'forbade/forbad',
    participle: 'forbidden'
  },
  {
    spanish: 'entrar, introducir, entrar en, ingresar',
    base: 'enter',
    gerund: 'entering',
    third: 'enters',
    past: 'entered',
    participle: 'entered'
  },
  {
    spanish: 'cumplir, cumplirse, satisfacer',
    base: 'fulfill',
    gerund: 'fulfilling',
    third: 'fulfills',
    past: 'fulfilled',
    participle: 'fulfilled'
  },
  {
    spanish: 'arreglar, reparar, corregir; solucionar',
    base: 'fix',
    gerund: 'fixing',
    third: 'fixes',
    past: 'fixed',
    participle: 'fixed'
  },
  {
    spanish: 'suponer, adivinar, conjeturar, deducir, estimar',
    base: 'guess',
    gerund: 'guessing',
    third: 'guesses',
    past: 'guessed',
    participle: 'guessed'
  },
  {
    spanish: 'dictar, imponer, dictaminar, ordenar, dar órdenes',
    base: 'dictate',
    gerund: 'dictating',
    third: 'dictates',
    past: 'dictated',
    participle: 'dictated'
  },
  {
    spanish: 'mojar, mojarse, humedecer',
    base: 'wet',
    gerund: 'wetting',
    third: 'wets',
    past: 'wetted/wet',
    participle: 'wetted/wet'
  },
  {
    spanish: 'derramar, derramarse, verter, volcar',
    base: 'spill',
    gerund: 'spilling',
    third: 'spills',
    past: 'spilled/spilt',
    participle: 'spilled/spilt'
  },
  {
    spanish: 'admirar, admirarse, contemplar',
    base: 'admire',
    gerund: 'admiring',
    third: 'admires',
    past: 'admired',
    participle: 'admired'
  },
  {
    spanish: 'apurar, apurarse, apresurarse, darse prisa',
    base: 'hurry',
    gerund: 'hurrying',
    third: 'hurries',
    past: 'hurried',
    participle: 'hurried'
  },
  {
    spanish: 'memorizar, memorizarse, aprender de memoria',
    base: 'memorize',
    gerund: 'memorizing',
    third: 'memorizes',
    past: 'memorized',
    participle: 'memorized'
  },
  {
    spanish: 'reparar, subsanar, recomponer, enmendar',
    base: 'repair',
    gerund: 'repairing',
    third: 'repairs',
    past: 'repaired',
    participle: 'repaired'
  },
  {
    spanish: 'firmar, contratar, fichar, signar',
    base: 'sign',
    gerund: 'signing',
    third: 'signs',
    past: 'signed',
    participle: 'signed'
  },
  {
    spanish: 'pulir, lustrar, abrillantar, sacar brillo',
    base: 'polish',
    gerund: 'polishing',
    third: 'polishes',
    past: 'polished',
    participle: 'polished'
  },
  {
    spanish: 'practicar, ejercer, proceder',
    base: 'practice',
    gerund: 'practicing',
    third: 'practices',
    past: 'practiced',
    participle: 'practiced'
  },
  {
    spanish: 'pronunciar; pronunciarse, declarar; dictar, fallar',
    base: 'pronounce',
    gerund: 'pronouncing',
    third: 'pronounces',
    past: 'pronounced',
    participle: 'pronounced'
  },
  {
    spanish: 'escribir a máquina, teclear, mecanografiar, digitar',
    base: 'type',
    gerund: 'typing',
    third: 'types',
    past: 'typed',
    participle: 'typed'
  },
  {
    spanish: 'elegir, optar, decidir, votar',
    base: 'elect',
    gerund: 'electing',
    third: 'elects',
    past: 'elected',
    participle: 'elected'
  },
  {
    spanish: 'graduar, graduarse, egresar, egresar',
    base: 'graduate',
    gerund: 'graduating',
    third: 'graduates',
    past: 'graduated',
    participle: 'graduated'
  },
  {
    spanish: 'inventar, inventarse, crear, idear',
    base: 'invent',
    gerund: 'inventing',
    third: 'invents',
    past: 'invented',
    participle: 'invented'
  },
  {
    spanish: 'aterrizar, desembarcar',
    base: 'land',
    gerund: 'landing',
    third: 'lands',
    past: 'landed',
    participle: 'landed'
  },
  {
    spanish: 'pintar',
    base: 'paint',
    gerund: 'painting',
    third: 'paints',
    past: 'painted',
    participle: 'painted'
  },
  {
    spanish: 'recomendar, recomendarse',
    base: 'recommend',
    gerund: 'recommending',
    third: 'recommends',
    past: 'recommended',
    participle: 'recommended'
  },
  {
    spanish: 'inclinarse, apoyarse, recostar, recostarse',
    base: 'lean',
    gerund: 'leaning',
    third: 'leans',
    past: 'leaned/leant',
    participle: 'leaned/leant'
  },
  {
    spanish: 'ser, estar',
    base: 'be',
    gerund: 'being',
    third: 'is/are',
    past: 'was/were',
    participle: 'been'
  },
  {
    spanish: 'estar de acuerdo, acordar, aceptar, convenir, concordar, acceder',
    base: 'agree',
    gerund: 'agreeing',
    third: 'agrees',
    past: 'agreed',
    participle: 'agreed'
  },
  {
    spanish: 'llamar, llamarse',
    base: 'call',
    gerund: 'calling',
    third: 'calls',
    past: 'called',
    participle: 'called'
  },
  {
    spanish: 'cobrar, cargar, cobrarse',
    base: 'charge',
    gerund: 'charging',
    third: 'charges',
    past: 'charged',
    participle: 'charged'
  },
  {
    spanish: 'limpiar; recoger',
    base: 'clean',
    gerund: 'cleaning',
    third: 'cleans',
    past: 'cleaned',
    participle: 'cleaned'
  },
  {
    spanish: 'cerrar',
    base: 'close',
    gerund: 'closing',
    third: 'closes',
    past: 'closed',
    participle: 'closed'
  },
  {
    spanish: 'continuar, seguir, proseguir',
    base: 'continue',
    gerund: 'continuing',
    third: 'continues',
    past: 'continued',
    participle: 'continued'
  },
  {
    spanish: 'cocinar, cocer, cocinarse, cocerse',
    base: 'cook',
    gerund: 'cooking',
    third: 'cooks',
    past: 'cooked',
    participle: 'cooked'
  },
  {
    spanish: 'bailar, danzar, hacer bailar',
    base: 'dance',
    gerund: 'dancing',
    third: 'dances',
    past: 'danced',
    participle: 'danced'
  },
  {
    spanish: 'decidir, decidirse, determinar, determinarse',
    base: 'decide',
    gerund: 'deciding',
    third: 'decides',
    past: 'decided',
    participle: 'decided'
  },
  {
    spanish: 'morir, morirse, matar, fallecer',
    base: 'die',
    gerund: 'dying',
    third: 'dies',
    past: 'died',
    participle: 'died'
  },
  {
    spanish: 'fallar, fracasar',
    base: 'fail',
    gerund: 'failing',
    third: 'fails',
    past: 'failed',
    participle: 'failed'
  },
  {
    spanish: 'terminar, acabar, finalizar, concluir, culminar',
    base: 'finish',
    gerund: 'finishing',
    third: 'finishes',
    past: 'finished',
    participle: 'finished'
  },
  {
    spanish: 'ayudar, ayudarse, contribuir, socorrer, auxiliar',
    base: 'help',
    gerund: 'helping',
    third: 'helps',
    past: 'helped',
    participle: 'helped'
  },
  {
    spanish: 'esperar(tener esperanza)',
    base: 'hope',
    gerund: 'hoping',
    third: 'hopes',
    past: 'hoped',
    participle: 'hoped'
  },
  {
    spanish: 'amar, encantar, querer',
    base: 'love',
    gerund: 'loving',
    third: 'loves',
    past: 'loved',
    participle: 'loved'
  },
  {
    spanish: 'descansar, reposar',
    base: 'rest',
    gerund: 'resting',
    third: 'rests',
    past: 'rested',
    participle: 'rested'
  },
  {
    spanish: 'tocar, tocarse, rozar; afectar, conmover',
    base: 'touch',
    gerund: 'touching',
    third: 'touches',
    past: 'touched',
    participle: 'touched'
  },
  {
    spanish: 'voltear, cambiar, encender, apagar, girar',
    base: 'turn',
    gerund: 'turning',
    third: 'turns',
    past: 'turned',
    participle: 'turned'
  },
  {
    spanish: 'usar, utilizar, utilizarse',
    base: 'use',
    gerund: 'using',
    third: 'uses',
    past: 'used',
    participle: 'used'
  },
  {
    spanish: 'advertir, avisar, alertar, prevenir',
    base: 'warn',
    gerund: 'warning',
    third: 'warns',
    past: 'warned',
    participle: 'warned'
  },
  {
    spanish: 'pensar, preguntarse, dudar, sorprender, asombrarse',
    base: 'wonder',
    gerund: 'wondering',
    third: 'wonders',
    past: 'wondered',
    participle: 'wondered'
  },
  {
    spanish: 'preocupar, preocuparse, temer, inquietarse',
    base: 'worry',
    gerund: 'worrying',
    third: 'worries',
    past: 'worried',
    participle: 'worried'
  },
  {
    spanish: 'surgir, levantarse, emergir, presentarse',
    base: 'arise',
    gerund: 'arising',
    third: 'arises',
    past: 'arose',
    participle: 'arisen'
  },
  {
    spanish: 'golpear; derrotar, vencer; latir, palpitar',
    base: 'beat',
    gerund: 'beating',
    third: 'beats',
    past: 'beat',
    participle: 'beaten'
  },
  {
    spanish: 'doblarse, inclinarse, flexionar, doblegar, curvarse',
    base: 'bend',
    gerund: 'bending',
    third: 'bends',
    past: 'bent',
    participle: 'bent'
  },
  {
    spanish: 'sangrar; purgar; destinierse',
    base: 'bleed',
    gerund: 'bleeding',
    third: 'bleeds',
    past: 'bled',
    participle: 'bled'
  },
  {
    spanish: 'transmitir, emitir, difundir',
    base: 'broadcast',
    gerund: 'broadcasting',
    third: 'broadcasts',
    past: 'broadcast',
    participle: 'broadcast'
  },
  {
    spanish: 'estallar, estallar, reventar, explotar, reventarse',
    base: 'burst',
    gerund: 'bursting',
    third: 'bursts',
    past: 'burst',
    participle: 'burst'
  },
  {
    spanish: 'tratar, ocuparse, manejar, negociar',
    base: 'deal',
    gerund: 'dealing',
    third: 'deals',
    past: 'dealt',
    participle: 'dealt'
  },
  {
    spanish: 'cavar, excavar, extraer, buscar, escarbar',
    base: 'dig',
    gerund: 'digging',
    third: 'digs',
    past: 'dug',
    participle: 'dug'
  },
  {
    spanish: 'encajar, ajustarse, quedar; quedar bien',
    base: 'fit',
    gerund: 'fitting',
    third: 'fits',
    past: 'fitted',
    participle: 'fitted'
  },
  {
    spanish: 'colgar(objeto)',
    base: 'hang',
    gerund: 'hanging',
    third: 'hangs',
    past: 'hung',
    participle: 'hung'
  },
  {
    spanish: 'colgar, ahorcar, ahorcarse',
    base: 'hang',
    gerund: 'hanging',
    third: 'hangs',
    past: 'hanged',
    participle: 'hanged'
  },
  {
    spanish: 'arrodillarse, hincarse',
    base: 'kneel',
    gerund: 'kneeling',
    third: 'kneels',
    past: 'kneeled/knelt',
    participle: 'kneeled/knelt'
  },
  {
    spanish: 'equivocar, confundir, malinterpretar',
    base: 'mistake',
    gerund: 'mistaking',
    third: 'mistakes',
    past: 'mistook',
    participle: 'mistaken'
  },
  {
    spanish: 'adelantar, sobrepasar, rebasar, pasar',
    base: 'overtake',
    gerund: 'overtaking',
    third: 'overtakes',
    past: 'overtook',
    participle: 'overtaken'
  },
  {
    spanish: 'establecer, fijar, poner, fijar, colocar',
    base: 'set',
    gerund: 'setting',
    third: 'sets',
    past: 'set',
    participle: 'set'
  },
  {
    spanish: 'coser, coserse, bordar',
    base: 'sew',
    gerund: 'sewing',
    third: 'sews',
    past: 'sewed',
    participle: 'sewed/sewn'
  },
  {
    spanish: 'reducir, reducirse, encoger, encogerse',
    base: 'shrink',
    gerund: 'shrinking',
    third: 'shrinks',
    past: 'shrank',
    participle: 'shrunk'
  },
  {
    spanish: 'cerrar, cerrarse, apagar',
    base: 'shut',
    gerund: 'shutting',
    third: 'shuts',
    past: 'shut',
    participle: 'shut'
  },
  {
    spanish: 'estropear, echar a perder; mimar, malcriar, consentir',
    base: 'spoil',
    gerund: 'spoiling',
    third: 'spoils',
    past: 'spoiled/spoilt',
    participle: 'spoiled/spoilt'
  },
  {
    spanish: 'robar, robarse, hurtar, sustraer, saquear, apropiarse',
    base: 'steal',
    gerund: 'stealing',
    third: 'steals',
    past: 'stole',
    participle: 'stolen'
  },
  {
    spanish: 'pegar, pegarse, permanecer, clavarse, quedarse',
    base: 'stick',
    gerund: 'sticking',
    third: 'sticks',
    past: 'stuck',
    participle: 'stuck'
  },
  {
    spanish: 'picar, doler, arder, escocer; incitar',
    base: 'sting',
    gerund: 'stinging',
    third: 'stings',
    past: 'stung',
    participle: 'stung'
  },
  {
    spanish: 'atacar, golpear, pegar',
    base: 'strike',
    gerund: 'striking',
    third: 'strikes',
    past: 'struck',
    participle: 'struck'
  },
  {
    spanish: 'esforzar, esforzarse, luchar, empeniarse',
    base: 'strive',
    gerund: 'striving',
    third: 'strives',
    past: 'strove',
    participle: 'striven'
  },
  {
    spanish: 'rasgar, desgarrar, romper, rasgarse, desgarrarse, romperse',
    base: 'tear',
    gerund: 'tearing',
    third: 'tears',
    past: 'tore',
    participle: 'torn'
  },
  {
    spanish: 'disgutar, perturbar, afcetar, afligir',
    base: 'upset',
    gerund: 'upsetting',
    third: 'upsets',
    past: 'upset',
    participle: 'upset'
  },
  {
    spanish: 'llorar, sollozar',
    base: 'weep',
    gerund: 'weeping',
    third: 'weeps',
    past: 'wept',
    participle: 'wept'
  },
  {
    spanish: 'retirar, retractarse, revocar, desistir, retractarse',
    base: 'withdraw',
    gerund: 'withdrawing',
    third: 'withdraws',
    past: 'withdrew',
    participle: 'withdrawn'
  },
  {
    spanish: 'cuidar, hacer de niniera, cuidar ninios, hacer de canjuro',
    base: 'babysit',
    gerund: 'babysitting',
    third: 'babysits',
    past: 'babysat',
    participle: 'babysat'
  },
  {
    spanish: 'procrear, reproducirse, engendrar',
    base: 'breed',
    gerund: 'breeding',
    third: 'breeds',
    past: 'bred',
    participle: 'bred'
  },
  {
    spanish: 'dejar, renunciar, abandonar, salir, dimitir, retirarse',
    base: 'quit',
    gerund: 'quitting',
    third: 'quits',
    past: 'quitted/quit',
    participle: 'quitted/quit'
  },
  {
    spanish: 'unirse, atar, enlazar, ligar; encuadernar',
    base: 'bind',
    gerund: 'binding',
    third: 'binds',
    past: 'bound',
    participle: 'bound'
  },
  {
    spanish: 'deslizar; deslizarse, bajar',
    base: 'slide',
    gerund: 'sliding',
    third: 'slides',
    past: 'slid',
    participle: 'slid'
  },
  {
    spanish: 'girar, hacer girar, hilar, dar vueltas; centrifugar',
    base: 'spin',
    gerund: 'spinning',
    third: 'spins',
    past: 'span/spun',
    participle: 'spun'
  },
  {
    spanish: 'obedecer',
    base: 'obey',
    gerund: 'obeying',
    third: 'obeys',
    past: 'obeyed',
    participle: 'obeyed'
  }
];
