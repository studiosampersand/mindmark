window.MINDMARK_TRACKERS = [
  {
    group: 'Verbinding',
    icon: 'connection',
    items: [
      {id:'bel-iemand',title:'Iemand bellen die ik graag hoor',unit:'contactmomenten',logMode:'binary',dailyTarget:1,keywords:'bellen telefoon vriend familie oma opa kleinkind contact eenzaamheid'},
      {id:'stuur-bericht',title:'Een warm bericht sturen',unit:'berichten',logMode:'count',step:1,dailyTarget:1,keywords:'bericht sms whatsapp contact vriend familie'},
      {id:'spreek-af',title:'Iets kleins afspreken',unit:'afspraken',logMode:'binary',dailyTarget:1,keywords:'afspreken koffie wandelen bezoek ontmoeten sociaal'},
      {id:'bezoek',title:'Iemand bezoeken of ontvangen',unit:'bezoeken',logMode:'binary',dailyTarget:1,keywords:'bezoeken visite familie vrienden buur'},
      {id:'buurt',title:'Een kort praatje maken',unit:'praatjes',logMode:'count',step:1,dailyTarget:1,keywords:'buur winkel praatje sociaal alleen eenzaamheid'},
      {id:'hulpvragen',title:'Iemand om hulp of gezelschap vragen',unit:'keer',logMode:'binary',dailyTarget:1,keywords:'hulp vragen gezelschap steun'},
      {id:'vraag-hoe-gaat',title:'Oprecht vragen hoe het met iemand gaat',unit:'gesprekken',logMode:'count',step:1,dailyTarget:1,keywords:'vragen luisteren gesprek contact'},
      {id:'dankjewel',title:'Iemand bewust bedanken',unit:'bedankjes',logMode:'count',step:1,dailyTarget:1,keywords:'dankjewel waardering vriendelijkheid'},
      {id:'samen-drinken',title:'Samen iets drinken of eten',unit:'momenten',logMode:'binary',dailyTarget:1,keywords:'samen koffie thee maaltijd sociaal'},
      {id:'groet-iemand',title:'Iemand vriendelijk groeten',unit:'groeten',logMode:'count',step:1,dailyTarget:1,keywords:'groeten glimlach buur collega sociaal'},
      {id:'deel-herinnering',title:'Een fijne herinnering delen',unit:'momenten',logMode:'binary',dailyTarget:1,keywords:'herinnering foto verhaal familie vriend'},
      {id:'plan-contact',title:'Een contactmoment voor later plannen',unit:'afspraken',logMode:'binary',dailyTarget:1,keywords:'plannen afspraak bellen bezoeken kalender'}
    ]
  },
  {
    group: 'Rust & herstel',
    icon: 'breathe',
    items: [
      {id:'adempauze',title:'Een rustige adempauze nemen',unit:'pauzes',logMode:'count',step:1,dailyTarget:1,keywords:'ademen rust pauze stress'},
      {id:'ontprikkelen',title:'Bewust ontprikkelen',unit:'momenten',logMode:'count',step:1,dailyTarget:1,keywords:'prikkels rust stilte herstel'},
      {id:'slaaproutine',title:'Mijn slaaproutine volgen',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'slaap bed routine'},
      {id:'echte-pauze',title:'Een echte pauze nemen',unit:'pauzes',logMode:'count',step:1,dailyTarget:1,keywords:'pauze rust werk school'},
      {id:'buiten',title:'Even naar buiten gaan',unit:'momenten',logMode:'count',step:1,dailyTarget:1,keywords:'buiten frisse lucht tuin'},
      {id:'schermpauze',title:'Schermvrije tijd nemen',unit:'minuten',logMode:'amount',step:15,dailyTarget:30,keywords:'scherm gsm telefoon sociale media'},
      {id:'schouders-los',title:'Mijn schouders en kaak bewust ontspannen',unit:'momenten',logMode:'count',step:1,dailyTarget:1,keywords:'schouders kaak spanning ontspannen lichaam'},
      {id:'stilte-vijf',title:'Vijf minuten niets moeten',unit:'minuten',logMode:'amount',step:5,dailyTarget:5,keywords:'stilte niets doen rust pauze'},
      {id:'raam-open',title:'Frisse lucht binnenlaten',unit:'momenten',logMode:'binary',dailyTarget:1,keywords:'raam open frisse lucht kamer'},
      {id:'meldingen-uit',title:'Meldingen even uitschakelen',unit:'minuten',logMode:'amount',step:15,dailyTarget:30,keywords:'meldingen notificaties telefoon rust'},
      {id:'rustige-avond',title:'Mijn avond rustig beginnen',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'avond routine rust slaap'},
      {id:'grens-bewaken',title:'Eén grens vriendelijk bewaken',unit:'momenten',logMode:'binary',dailyTarget:1,keywords:'grens nee zeggen rust beschermen'}
    ]
  },
  {
    group: 'Beweging op mijn tempo',
    icon: 'target',
    items: [
      {id:'wandelen',title:'Een korte wandeling maken',unit:'minuten',logMode:'amount',step:10,dailyTarget:20,keywords:'wandelen stappen bewegen buiten'},
      {id:'fietsen',title:'Fietsen op mijn tempo',unit:'minuten',logMode:'amount',step:10,dailyTarget:30,keywords:'fiets bewegen'},
      {id:'rekken',title:'Rekken of rustig bewegen',unit:'minuten',logMode:'amount',step:5,dailyTarget:10,keywords:'rekken mobiliteit bewegen'},
      {id:'sport',title:'Trainen voor een persoonlijk sportdoel',unit:'minuten',logMode:'amount',step:15,dailyTarget:30,keywords:'sport trainen lopen fitness'},
      {id:'vijf-min-bewegen',title:'Vijf minuten bewegen',unit:'minuten',logMode:'amount',step:5,dailyTarget:5,keywords:'kort bewegen begin klein'},
      {id:'dans-een-liedje',title:'Bewegen op één liedje',unit:'liedjes',logMode:'count',step:1,dailyTarget:1,keywords:'dansen muziek bewegen plezier'},
      {id:'trap-een-keer',title:'Eén keer bewust de trap nemen',unit:'keer',logMode:'count',step:1,dailyTarget:1,keywords:'trap bewegen dagelijkse beweging'},
      {id:'staan-en-strekken',title:'Even rechtstaan en strekken',unit:'momenten',logMode:'count',step:1,dailyTarget:3,keywords:'staan bureau werk school strekken'},
      {id:'natuurwandeling',title:'Rustig bewegen in de natuur',unit:'minuten',logMode:'amount',step:10,dailyTarget:20,keywords:'natuur wandeling bos park bewegen'},
      {id:'balans',title:'Een korte evenwichtsoefening doen',unit:'minuten',logMode:'amount',step:2,dailyTarget:5,keywords:'balans evenwicht rustig bewegen'}
    ]
  },
  {
    group: 'Dagelijkse zorg',
    icon: 'heart',
    items: [
      {id:'water',title:'Voldoende water drinken',unit:'ml',logMode:'amount',step:250,dailyTarget:1500,keywords:'water drinken hydratatie'},
      {id:'maaltijdritme',title:'Mijn afgesproken maaltijdritme volgen',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'eten maaltijd ritme zorgplan'},
      {id:'medicatie',title:'Medicatie volgens mijn zorgplan nemen',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'medicatie geneesmiddel arts zorgplan'},
      {id:'verzorging',title:'Tijd maken voor persoonlijke verzorging',unit:'momenten',logMode:'count',step:1,dailyTarget:1,keywords:'douchen tanden verzorging'},
      {id:'gezond-eten',title:'Een voedzame keuze maken',unit:'momenten',logMode:'count',step:1,dailyTarget:1,keywords:'gezond eten voedzaam maaltijd groenten fruit'},
      {id:'kleine-taak',title:'Eén kleine praktische taak afronden',unit:'taken',logMode:'count',step:1,dailyTarget:1,keywords:'opruimen administratie taak'},
      {id:'tandenpoetsen',title:'Mijn tanden poetsen',unit:'keer',logMode:'count',step:1,dailyTarget:2,keywords:'tanden poetsen verzorging'},
      {id:'gordijnen-open',title:'De gordijnen openen en daglicht binnenlaten',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'daglicht gordijnen ochtend kamer'},
      {id:'water-klaarzetten',title:'Een fles of glas water klaarzetten',unit:'keer',logMode:'binary',dailyTarget:1,keywords:'water voorbereiden drinken'},
      {id:'een-oppervlak',title:'Eén klein oppervlak opruimen',unit:'plekjes',logMode:'count',step:1,dailyTarget:1,keywords:'opruimen tafel bureau kamer'},
      {id:'morgen-klaar',title:'Iets voor morgen klaarleggen',unit:'taken',logMode:'binary',dailyTarget:1,keywords:'voorbereiden kleren tas morgen routine'},
      {id:'zorgafspraak',title:'Een zorg- of doktersafspraak voorbereiden',unit:'stappen',logMode:'count',step:1,dailyTarget:1,keywords:'dokter psycholoog afspraak vragen noteren'}
    ]
  },
  {
    group: 'Vriendelijkheid & omgeving',
    icon: 'heart',
    items: [
      {id:'compliment',title:'Een oprecht compliment geven',unit:'complimenten',logMode:'count',step:1,dailyTarget:1,keywords:'compliment aardig vriendelijkheid'},
      {id:'kleine-vriendelijkheid',title:'Eén kleine vriendelijke daad doen',unit:'daden',logMode:'count',step:1,dailyTarget:1,keywords:'vriendelijk helpen aardig'},
      {id:'laat-voorgaan',title:'Iemand bewust laten voorgaan',unit:'momenten',logMode:'binary',dailyTarget:1,keywords:'vriendelijkheid verkeer winkel geduld'},
      {id:'gedeelde-plek',title:'Een gedeelde plek iets aangenamer achterlaten',unit:'plekjes',logMode:'binary',dailyTarget:1,keywords:'opruimen delen thuis werk school'},
      {id:'huisdier',title:'Bewust tijd maken voor een huisdier',unit:'minuten',logMode:'amount',step:5,dailyTarget:10,keywords:'huisdier hond kat aandacht'},
      {id:'luister-zonder-oplossen',title:'Even luisteren zonder meteen op te lossen',unit:'gesprekken',logMode:'binary',dailyTarget:1,keywords:'luisteren gesprek steun empathie'}
    ]
  },
  {
    group: 'Zelfvertrouwen & focus',
    icon: 'spark',
    items: [
      {id:'vraag-stellen',title:'Eén vraag stellen die ik anders inslik',unit:'vragen',logMode:'binary',dailyTarget:1,keywords:'vraag durven school werk duidelijkheid'},
      {id:'twee-minuten-start',title:'Een taak twee minuten starten',unit:'starts',logMode:'count',step:1,dailyTarget:1,keywords:'uitstel beginnen taak twee minuten'},
      {id:'een-prioriteit',title:'Eén haalbare prioriteit kiezen',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'prioriteit focus planning'},
      {id:'gedaan-noteren',title:'Eén ding noteren dat wél lukte',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'trots gedaan positief aandacht'},
      {id:'eerlijk-nee',title:'Eén keer vriendelijk nee zeggen',unit:'momenten',logMode:'binary',dailyTarget:1,keywords:'nee grens assertief'},
      {id:'moeilijk-bericht',title:'Eén uitgesteld bericht versturen',unit:'berichten',logMode:'binary',dailyTarget:1,keywords:'bericht uitstel antwoorden mail'},
      {id:'vijf-min-focus',title:'Vijf minuten aan één ding werken',unit:'minuten',logMode:'amount',step:5,dailyTarget:5,keywords:'focus concentratie taak'},
      {id:'pauze-voor-keuze',title:'Eerst één ademhaling nemen voor ik reageer',unit:'momenten',logMode:'count',step:1,dailyTarget:1,keywords:'impuls reactie ademen rust'}
    ]
  },
  {
    group: 'Digitale rust',
    icon: 'eye',
    items: [
      {id:'telefoon-maaltijd',title:'Mijn telefoon wegleggen tijdens een maaltijd',unit:'maaltijden',logMode:'count',step:1,dailyTarget:1,keywords:'telefoon maaltijd schermvrij'},
      {id:'ochtend-zonder-scherm',title:'De eerste minuten van de dag schermvrij houden',unit:'minuten',logMode:'amount',step:5,dailyTarget:15,keywords:'ochtend telefoon schermvrij'},
      {id:'melding-minder',title:'Eén onnodige melding uitschakelen',unit:'meldingen',logMode:'count',step:1,dailyTarget:1,keywords:'notificatie melding rust telefoon'},
      {id:'social-later',title:'Sociale media bewust even uitstellen',unit:'minuten',logMode:'amount',step:15,dailyTarget:30,keywords:'sociale media uitstellen schermtijd'},
      {id:'telefoon-andere-kamer',title:'Mijn telefoon even in een andere kamer leggen',unit:'minuten',logMode:'amount',step:15,dailyTarget:30,keywords:'telefoon afstand scherm rust'}
    ]
  },
  {
    group: 'Patronen veranderen',
    icon: 'chart',
    items: [
      {id:'rookvrij',title:'Vandaag niet gerookt',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'stoppen met roken rookvrij sigaret nicotine',minAge:16},
      {id:'minderroken',title:'Vandaag binnen mijn rookdoel gebleven',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'minder roken sigaretten nicotine',minAge:16},
      {id:'alcoholvrij',title:'Vandaag geen alcohol gedronken',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'alcohol bier wijn stoppen minderen',minAge:18},
      {id:'gokvrij',title:'Vandaag niet gegokt',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'gokken casino weddenschap',minAge:18},
      {id:'schermdoel',title:'Vandaag binnen mijn schermtijd-doel gebleven',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'schermtijd sociale media gsm'},
      {id:'impulsaankoop',title:'Een impulsaankoop uitgesteld',unit:'keer',logMode:'count',step:1,dailyTarget:1,keywords:'kopen geld shoppen impuls'},
      {id:'uitstel',title:'Een uitgestelde taak rustig gestart',unit:'keer',logMode:'count',step:1,dailyTarget:1,keywords:'uitstel taak beginnen'}
    ]
  },
  {
    group: 'Leren & positieve aandacht',
    icon: 'spark',
    items: [
      {id:'lezen',title:'Even lezen',unit:'minuten',logMode:'amount',step:10,dailyTarget:20,keywords:'lezen boek'},
      {id:'creatief',title:'Iets creatiefs doen',unit:'minuten',logMode:'amount',step:10,dailyTarget:20,keywords:'tekenen muziek knutselen creatief'},
      {id:'leren',title:'Iets nieuws leren of oefenen',unit:'minuten',logMode:'amount',step:10,dailyTarget:20,keywords:'leren oefenen school hobby'},
      {id:'natuur',title:'Bewust tijd in de natuur doorbrengen',unit:'minuten',logMode:'amount',step:10,dailyTarget:20,keywords:'natuur bos park tuin'},
      {id:'goed-moment',title:'Eén goed moment van vandaag noteren',unit:'dagen',logMode:'binary',dailyTarget:1,keywords:'dankbaar positief moment'},
      {id:'favoriet-lied',title:'Eén favoriet lied bewust beluisteren',unit:'liedjes',logMode:'count',step:1,dailyTarget:1,keywords:'muziek luisteren plezier'},
      {id:'mooi-detail',title:'Eén mooi detail opmerken',unit:'momenten',logMode:'binary',dailyTarget:1,keywords:'mooi aandacht natuur omgeving'},
      {id:'daglicht',title:'Een paar minuten daglicht opzoeken',unit:'minuten',logMode:'amount',step:5,dailyTarget:10,keywords:'daglicht buiten raam zon'},
      {id:'hobby-tien',title:'Tien minuten tijd maken voor een hobby',unit:'minuten',logMode:'amount',step:10,dailyTarget:10,keywords:'hobby plezier ontspanning'},
      {id:'iets-afmaken',title:'Een klein creatief ding afmaken',unit:'dingen',logMode:'binary',dailyTarget:1,keywords:'creatief afronden hobby'}
    ]
  }
];
