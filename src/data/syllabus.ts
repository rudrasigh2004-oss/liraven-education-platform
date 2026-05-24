import { Subject, NoteItem } from "../types";

export const SUBJECTS: Subject[] = [
  {
    id: "english",
    name: "English",
    icon: "BookOpen",
    color: "from-blue-500 to-cyan-400",
    description: "Literature, Reader prose, and comprehensive Grammar modules for board success.",
    categories: [
      {
        id: "reader",
        name: "First Flight Reader",
        description: "Core textbook prose and poetry highlights.",
        topics: ["A Letter to God", "Nelson Mandela: Long Walk to Freedom", "Two Stories about Flying", "From the Diary of Anne Frank", "The Hundred Dresses", "Glimpses of India"]
      },
      {
        id: "literature",
        name: "Footprints Without Feet",
        description: "Supplementary reading and extensive analysis.",
        topics: ["A Triumph of Surgery", "The Thief's Story", "The Midnight Visitor", "A Question of Trust", "Footprints without Feet", "The Making of a Scientist"]
      },
      {
        id: "grammar",
        name: "English Grammar",
        description: "Interactive structure, verbs, syntax, and voice rules.",
        topics: ["Tenses", "Modals", "Subject-Verb Concord", "Reported Speech", "Commands & Requests", "Statements & Questions", "Determiners"]
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematics",
    icon: "Calculator",
    color: "from-purple-500 to-pink-500",
    description: "Concept proofs, formulas, solved NCERT exemplars, and chapter insights.",
    categories: [
      {
        id: "algebra",
        name: "Algebra & Number Systems",
        description: "Equations, polynomials, and arithmetic progressions.",
        topics: ["Real Numbers & Euclid's Lemma", "Polynomials & Roots", "Pair of Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progressions (AP)"]
      },
      {
        id: "geometry",
        name: "Geometry & Trigonometry",
        description: "Triangles, coordinate geometry, circles, and sine/cosine identities.",
        topics: ["Triangles & Similarity Theorems", "Coordinate Geometry", "Introduction to Trigonometry", "Trigonometric Identities", "Heights and Distances", "Circles & Tangents"]
      },
      {
        id: "mensuration_stats",
        name: "Mensuration & Statistics",
        description: "Surface areas, volumes, mean, median, mode, and probability.",
        topics: ["Areas Related to Circles", "Surface Areas and Volumes", "Statistics & Standard Deviation", "Probability & Expected Outcomer"]
      }
    ]
  },
  {
    id: "science",
    name: "Science",
    icon: "Atom",
    color: "from-cyan-500 to-indigo-500",
    description: "In-depth Biology, Physics, and Chemistry concept summaries and laboratory guides.",
    categories: [
      {
        id: "biology",
        name: "Biology",
        description: "Life processes, reproduction, and evolutionary biology.",
        topics: ["Life Processes (Nutrition, Respiration, Circulation)", "Control and Coordination", "How do Organisms Reproduce?", "Heredity and Evolution", "Our Environment"]
      },
      {
        id: "physics",
        name: "Physics",
        description: "Ray optics, refraction, human eye, electricity, and magnetic effects.",
        topics: ["Light - Reflection and Refraction", "Human Eye and Colorful World", "Electricity & Ohm's Law", "Heating Effects & Joule's Heating", "Magnetic Effects of Electric Current"]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        description: "Chemical equations, salts, metallurgy, carbon compounds.",
        topics: ["Chemical Reactions and Equations", "Acids, Bases, and Salts", "Metals and Non-metals", "Carbon and its Compounds", "Periodic Classification of Elements"]
      }
    ]
  },
  {
    id: "social_science",
    name: "Social Science",
    icon: "Globe",
    color: "from-emerald-500 to-teal-400",
    description: "Global history chapters, modern economics, planetary resources, and governance structures.",
    categories: [
      {
        id: "history",
        name: "History (India & World)",
        description: "Modern freedom struggles and global industrial dynamics.",
        topics: ["The Rise of Nationalism in Europe", "Nationalism in India", "The Making of a Global World", "The Age of Industrialisation", "Print Culture and the Modern World"]
      },
      {
        id: "economics",
        name: "Economics",
        description: "National income, banking, globalization, and consumers.",
        topics: ["Development Indicators", "Sectors of the Indian Economy", "Money and Credit", "Globalisation and the Indian Economy", "Consumer Rights"]
      },
      {
        id: "geography",
        name: "Geography",
        description: "Resource planning, forests, agriculture, minerals, and manufacturing.",
        topics: ["Resources and Development", "Forest and Wildlife Resources", "Water Resources", "Agriculture", "Minerals and Energy Resources", "Manufacturing Industries"]
      },
      {
        id: "civics",
        name: "Political Science (Civics)",
        description: "Democratic power mechanisms, federalism, politics of religion, and state outcomes.",
        topics: ["Power Sharing", "Federalism", "Democracy and Diversity", "Gender, Religion and Caste", "Popular Struggles and Movements", "Political Parties", "Outcomes of Democracy"]
      }
    ]
  },
  {
    id: "hindi",
    name: "Hindi (हिंदी)",
    icon: "Scroll",
    color: "from-amber-500 to-orange-500",
    description: "Kshitij poems, supplementary Kritika prose, and detailed Vyakarana/Grammar guides.",
    categories: [
      {
        id: "kshitij",
        name: "Kshitij (क्षितिज भाग-२)",
        description: "Main poetry collection and prose chapters.",
        topics: ["सूरदास के पद", "राम-लक्ष्मण-परशुराम संवाद", "जयशंकर प्रसाद (आत्मकथ्य)", "सूर्यकांत त्रिपाठी निराला (उत्साह)", "नेताजी का चश्मा", "बालगोबिन भगत", "लखनवी अंदाज़"]
      },
      {
        id: "kritika",
        name: "Kritika (कृतिका भाग-२)",
        description: "Deep supplementary structural essays and stories.",
        topics: ["माता का अंचल (शिवपूजन सहाय)", "जॉर्ज पंचम की नाक (कमलेश्वर)", "साना-साना हाथ जोड़ि (मधु कांकरिया)"]
      },
      {
        id: "hindi_grammar",
        name: "Hindi Grammar (व्याकरण)",
        description: "Sentences, compound words, parts of speech, and writing compositions.",
        topics: ["रचना के आधार पर वाक्य भेद", "वाच्य (कर्तृवाच्य, कर्मवाच्य, भाववाच्य)", "पद परिचय", "रस (श्रृंगार, वीर, रौद्र, हास्य आदि)", "विज्ञापन लेखन", "पत्र लेखन", "अनुच्छेद लेखन"]
      }
    ]
  }
];

export const NOTES_LIST: NoteItem[] = [
  // Science - Physics
  {
    id: "sci-light",
    subjectId: "science",
    categoryName: "Physics",
    chapterNumber: 1,
    title: "Light: Reflection & Refraction",
    description: "Comprehensive notes covering spherical mirrors, sign conventions, lens formulas, magnification ratios, and refractive indexes of various media.",
    fileSize: "4.8 MB",
    pageCount: 16,
    downloadCount: 1240,
    lastUpdated: "2026-05-15",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // rickroll as placeholder
    importantTopics: ["Snell's Law", "Mirror Formula", "Power of Lens", "Total Internal Reflection"]
  },
  {
    id: "sci-electricity",
    subjectId: "science",
    categoryName: "Physics",
    chapterNumber: 2,
    title: "Electricity & Circuits",
    description: "Full explanation of Ohm's Law, resistors in series and parallel, electric power calculations, and Joule's heating effect of electric currents.",
    fileSize: "5.2 MB",
    pageCount: 20,
    downloadCount: 942,
    lastUpdated: "2026-05-18",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    importantTopics: ["Ohm's Law", "Resistivity Factors", "Parallel Advantage", "Electric Fuse Logic"]
  },
  // Science - Chemistry
  {
    id: "sci-reactions",
    subjectId: "science",
    categoryName: "Chemistry",
    chapterNumber: 1,
    title: "Chemical Reactions & Equations",
    description: "Formulas, balancing techniques, combination, decomposition, displacement, double-displacement, oxidation, and reduction reactions in neat charts.",
    fileSize: "3.6 MB",
    pageCount: 12,
    downloadCount: 1405,
    lastUpdated: "2026-05-10",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    importantTopics: ["Balancing Redux Systems", "Corrosion & Rancidity Protection", "Precipitation Tests"]
  },
  {
    id: "sci-carbon",
    subjectId: "science",
    categoryName: "Chemistry",
    chapterNumber: 4,
    title: "Carbon & its Compounds",
    description: "Detailed study of covalent bonds, allotropes (diamond, graphite, fullerenes), homologous series, soaps, and synthetic detergents.",
    fileSize: "6.1 MB",
    pageCount: 22,
    downloadCount: 2153,
    lastUpdated: "2026-05-22",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    importantTopics: ["Versatile Nature of Carbon", "Isomerism", "Saponification Reaction", "Esterification Process"]
  },
  // Science - Biology
  {
    id: "sci-processes",
    subjectId: "science",
    categoryName: "Biology",
    chapterNumber: 1,
    title: "Life Processes (Complete Guide)",
    description: "Aesthetic color-coded flow diagrams of human digestive systems, double circulation, nephron anatomy, and anaerobic respiration in plants.",
    fileSize: "7.4 MB",
    pageCount: 30,
    downloadCount: 3105,
    lastUpdated: "2026-05-20",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    importantTopics: ["Holozoic Nutrition", "Alveolar Gas Exchange", "Structure of Nephron", "Translocation in Phloem"]
  },
  // Maths
  {
    id: "mth-quadratic",
    subjectId: "maths",
    categoryName: "Algebra & Number Systems",
    chapterNumber: 4,
    title: "Quadratic Equations Hacks",
    description: "Sridharacharya's root formula, solving by factorization, discriminant nature rules, and tricky word problems solved step-by-step.",
    fileSize: "4.1 MB",
    pageCount: 14,
    downloadCount: 1118,
    lastUpdated: "2026-05-04",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    importantTopics: ["Quadratic Roots Formula", "Nature of Discriminant (D)", "Real World Rational Word Problems"]
  },
  {
    id: "mth-trig",
    subjectId: "maths",
    categoryName: "Geometry & Trigonometry",
    chapterNumber: 8,
    title: "Introduction to Trigonometry",
    description: "The ultimate Trigonometry table shortcut, complimentary angles, trigonometry identities, and Height & Distance proofs in plain language.",
    fileSize: "5.5 MB",
    pageCount: 18,
    downloadCount: 2490,
    lastUpdated: "2026-05-14",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    importantTopics: ["Trigo Identity Derivations", "Angles of Elevation & Depression", "Line of Sight Geometry"]
  },
  // History
  {
    id: "sst-india",
    subjectId: "social_science",
    categoryName: "History (India & World)",
    chapterNumber: 2,
    title: "Nationalism in India (1915-1947)",
    description: "Chronology of Rowlatt Act, Jallianwala Bagh massacre, Non-Cooperation movement, Salt March (Dandi), Poona Pact, and Map work guidelines.",
    fileSize: "6.8 MB",
    pageCount: 25,
    downloadCount: 1845,
    lastUpdated: "2026-05-19",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    importantTopics: ["Idea of Satyagraha", "Khilafat Movement Collaboration", "Simon Commission Boycott", "Impact of Poona Pact"]
  },
  {
    id: "sst-money",
    subjectId: "social_science",
    categoryName: "Economics",
    chapterNumber: 3,
    title: "Money and Credit",
    description: "Barter system flaws, formal vs informal credit sector comparisons, role of Self-Help Groups (SHGs), and Credit terms.",
    fileSize: "3.2 MB",
    pageCount: 10,
    downloadCount: 785,
    lastUpdated: "2026-05-01",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    importantTopics: ["Double Coincidence of Wants", "Terms of Credit", "Self-Help Groups functioning"]
  },
  // English
  {
    id: "eng-tenses",
    subjectId: "english",
    categoryName: "English Grammar",
    chapterNumber: 1,
    title: "English Grammar: Master All 12 Tenses",
    description: "The structural matrices of complex tenses, active-passive voice transitions, dynamic formulas, and common board-exam correction logs.",
    fileSize: "3.2 MB",
    pageCount: 10,
    downloadCount: 1530,
    lastUpdated: "2026-05-11",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    importantTopics: ["Present Perfect Continuous usage", "Past Perfect narrative sequence", "Futuristic Active-Passive transformations"]
  },
  // Hindi
  {
    id: "hin-vyakarana",
    subjectId: "hindi",
    categoryName: "Hindi Grammar (व्याकरण)",
    chapterNumber: 1,
    title: "वाक्य भेद और वाच्य परिवर्तन",
    description: "सरल, संयुक्त, और मिश्र वाक्य की पहचान। कर्तृवाच्य, कर्मवाच्य, और भाववाच्य परिवर्तन के अत्यंत आसान नियम एवं उदाहरण सूचियां।",
    fileSize: "3.8 MB",
    pageCount: 11,
    downloadCount: 651,
    lastUpdated: "2026-05-23",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    importantTopics: ["रचना के आधार पर वाक्य रूपांतरण", "कर्मवाच्य परिवर्तन सूत्र (द्वारा / से)", "पद-परिचय नियम"]
  }
];
