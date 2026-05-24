export interface MonthlySyllabusEntry {
  id: string;
  subject: string;
  subjectId: string; // Matches standard subject ids or represents additional subjects
  month: string;
  topics: string;
  practical: string;
}

export const MONTHS = [
  "April", "May", "June", "July", "August", "September",
  "October", "November", "December", "January", "February", "March"
];

export const SYLLABUS_SUBJECTS = [
  { id: "science", name: "Science (Chem/Bio/Phy)", icon: "Atom", color: "from-cyan-500 to-indigo-500" },
  { id: "maths", name: "Mathematics", icon: "Calculator", color: "from-purple-500 to-pink-500" },
  { id: "english", name: "English Language & Lit", icon: "BookOpen", color: "from-blue-500 to-cyan-400" },
  { id: "social_science", name: "Social Science", icon: "Globe", color: "from-emerald-500 to-teal-400" },
  { id: "hindi", name: "Hindi (हिंदी)", icon: "Scroll", color: "from-amber-500 to-orange-500" },
  { id: "sanskrit", name: "Sanskrit (संस्कृत)", icon: "Compass", color: "from-rose-500 to-orange-400" },
  { id: "it", name: "Information Technology", icon: "Cpu", color: "from-indigo-500 to-purple-500" },
  { id: "physical_activity", name: "Physical Activity Trainer", icon: "Activity", color: "from-emerald-500 to-green-400" }
];

export const MONTHLY_SCHOOL_SYLLABUS: MonthlySyllabusEntry[] = [
  // --- BIOLOGY (subjectId: science) ---
  {
    id: "bio-apr",
    subject: "Biology",
    subjectId: "science",
    month: "April",
    topics: "Unit: II World of Living - Life Processes: 'Living Being' Basic Concepts of Animal Nutrition in plants and animals.",
    practical: "Preparing a temporary mount of leaf peel to show stomata."
  },
  {
    id: "bio-may",
    subject: "Biology",
    subjectId: "science",
    month: "May",
    topics: "Unit: II World of Living - Life Processes: 'Living Being' Basic Concepts of respiration, transport and excretion in plants and animals.",
    practical: ""
  },
  {
    id: "bio-jun",
    subject: "Biology",
    subjectId: "science",
    month: "June",
    topics: "Excretion in plants and animals.",
    practical: ""
  },
  {
    id: "bio-jul",
    subject: "Biology",
    subjectId: "science",
    month: "July",
    topics: "*Excretion in plants and animals (Continued..)\n*Control and co-ordination in plants: Tropic movements in plants, introduction of plant hormones.",
    practical: "Experimentally show that carbon dioxide is given out during respiration."
  },
  {
    id: "bio-aug",
    subject: "Biology",
    subjectId: "science",
    month: "August",
    topics: "*Control and co-ordination in animals:- Nervous System, Voluntary and involuntary reflex action, chemical co-ordination: Animal Hormones.\n*Reproduction:- Reproduction in animals and plants (Asexual reproduction).",
    practical: "Studying (a) binary fission in Amoeba, and (b) budding in yeast and Hydra with the help of prepared slides."
  },
  {
    id: "bio-sep",
    subject: "Biology",
    subjectId: "science",
    month: "September",
    topics: "Reproduction: Reproduction in animals and plants (sexual reproduction), reproductive health- need and methods of family planning. Safe vs HIV/AIDS. Child bearing and women’s health.",
    practical: ""
  },
  {
    id: "bio-oct",
    subject: "Biology",
    subjectId: "science",
    month: "October",
    topics: "* Reproduction:- reproduction in animals and plants (Contd..)\n* Heredity: Mendel’s contribution – laws of inheritance of traits, sex determination, brief introduction.",
    practical: "Identification of the different parts of an embryo of a dicot seed (Pea, gram or red kidney bean)."
  },
  {
    id: "bio-nov",
    subject: "Biology",
    subjectId: "science",
    month: "November",
    topics: "* Heredity (Continued…)\n* Our Environment.",
    practical: ""
  },
  {
    id: "bio-dec",
    subject: "Biology",
    subjectId: "science",
    month: "December",
    topics: "Revision - Complete Science syllabus recap and Mock Board papers.",
    practical: ""
  },
  {
    id: "bio-jan",
    subject: "Biology",
    subjectId: "science",
    month: "January",
    topics: "Board Practice & Final Revision of Diagrams and important NCERT questions.",
    practical: ""
  },

  // --- PHYSICS (subjectId: science) ---
  {
    id: "phy-apr",
    subject: "Physics",
    subjectId: "science",
    month: "April",
    topics: "1. Reflection of Light\n2. Refraction of Light",
    practical: "Focal length of: 1. Concave Mirror, 2. Convex Lens"
  },
  {
    id: "phy-may",
    subject: "Physics",
    subjectId: "science",
    month: "May",
    topics: "3. Spherical Lens\n- Ray Diagram representation\n- Lens Formula and magnification calculation",
    practical: "Tracing of the path of a ray of light passing through: 1. Glass slab, 2. Glass Prism"
  },
  {
    id: "phy-jun",
    subject: "Physics",
    subjectId: "science",
    month: "June",
    topics: "4. Human Eye - structure, functions, accommodation power. Defects of vision and their corrections (Myopia, Hypermetropia, Presbyopia).",
    practical: ""
  },
  {
    id: "phy-jul",
    subject: "Physics",
    subjectId: "science",
    month: "July",
    topics: "5. Dispersion and scattering of light (Spectrum formation, atmospheric refraction, blue color of sky, reddening of sun).",
    practical: "Verification of Ohm’s Law"
  },
  {
    id: "phy-aug",
    subject: "Physics",
    subjectId: "science",
    month: "August",
    topics: "6. Electricity (Ohm’s Law, Ohm's law verification, resistance and factors affecting resistance).",
    practical: ""
  },
  {
    id: "phy-sep",
    subject: "Physics",
    subjectId: "science",
    month: "September",
    topics: "7. Electricity (Resistors in Series and Parallel configurations, electric power, and energy calculations).",
    practical: "Equivalent Resistance of series and parallel networks"
  },
  {
    id: "phy-oct",
    subject: "Physics",
    subjectId: "science",
    month: "October",
    topics: "8. Heating Effect of Electric Current\n9. Magnetic Effect of Electric Current (Magnetic field lines, force on a current-carrying conductor).",
    practical: ""
  },
  {
    id: "phy-nov",
    subject: "Physics",
    subjectId: "science",
    month: "November",
    topics: "10. Magnetic Effect of Electric Current (Electromagnetic induction, Electric generator, Domestic electric circuits, and safety fuses).",
    practical: ""
  },
  {
    id: "phy-dec",
    subject: "Physics",
    subjectId: "science",
    month: "December",
    topics: "Revision of core Physics numericals, ray diagrams, and circuit calculations.",
    practical: ""
  },
  {
    id: "phy-jan",
    subject: "Physics",
    subjectId: "science",
    month: "January",
    topics: "Board examination strategy & sample question paper solving.",
    practical: ""
  },

  // --- CHEMISTRY (subjectId: science) ---
  {
    id: "chm-apr",
    subject: "Chemistry",
    subjectId: "science",
    month: "April",
    topics: "Chemical Substances Nature and Behavior\nUNIT 1: Chemical reactions & Chemical equation (Chemical equations, Balancing chemical equations, Implication of balanced equations, Types of reactions: Combination, decomposition, displacement, double-displacement, precipitation, endothermic, exothermic, and redox reactions).",
    practical: "Performing and observing chemical reactions and classifying them into components: 1. Action of water on quick lime, 2. Action of heat on ferrous sulphate crystals, 3. Iron nails kept in copper sulphate, 4. Reaction between sodium sulphate and barium chloride."
  },
  {
    id: "chm-may",
    subject: "Chemistry",
    subjectId: "science",
    month: "May",
    topics: "Unit-2 Chapter: Acids, Bases and Salts: Their definitions in terms of furnishing of H+ and OH- ions, General chemical properties, examples, and uses of neutralization reactions.",
    practical: "Studying the properties of acids and bases (HCl & NaOH) by their reaction with: a. Litmus Solution (Blue/Red), b. Zinc Metal, c. Solid Sodium Carbonate."
  },
  {
    id: "chm-jun",
    subject: "Chemistry",
    subjectId: "science",
    month: "June",
    topics: "Concept of pH Scale (Definition relating to logarithm not required; introductory scale mapping).",
    practical: ""
  },
  {
    id: "chm-jul",
    subject: "Chemistry",
    subjectId: "science",
    month: "July",
    topics: "UNIT – 2: Importance of pH in everyday life, preparation, and key uses of Sodium Hydroxide, Bleaching Powder, Baking Soda, Washing Soda and Plaster of Paris.",
    practical: "Finding the pH of different chemical samples by using pH paper / Universal Indicator."
  },
  {
    id: "chm-aug",
    subject: "Chemistry",
    subjectId: "science",
    month: "August",
    topics: "UNIT-3 Chapter: Metals and Non-metals (Properties of metals and non-metals; Reactivity series; Formation and properties of ionic compounds. Basic metallurgical processes; Corrosion and its prevention).",
    practical: "Observing action of Zn, Fe, Cu and Al metals on salt solutions: a) ZnSO4, b) FeSO4, c) CuSO4, d) Al2(SO4)3. Arrange metals in decreasing order of reactivity."
  },
  {
    id: "chm-sep",
    subject: "Chemistry",
    subjectId: "science",
    month: "September",
    topics: "UNIT-4: Carbon compounds: Covalent bonding in carbon compounds. Versatile nature of Carbon. Homologous series.",
    practical: "Study of the properties of acetic acid (ethanoic acid)."
  },
  {
    id: "chm-oct",
    subject: "Chemistry",
    subjectId: "science",
    month: "October",
    topics: "UNIT-4: Carbon compounds (Nomenclature of carbon compounds containing functional groups: halogens, alcohol, ketones, aldehydes, alkenes, alkynes; Saturated vs Unsaturated hydrocarbons).",
    practical: ""
  },
  {
    id: "chm-nov",
    subject: "Chemistry",
    subjectId: "science",
    month: "November",
    topics: "UNIT-4: Carbon compounds: Chemical properties of carbon compounds (combustion, oxidation, addition, and substitution reaction), Ethanol and Ethanoic acid properties/uses, Soaps and Detergents.",
    practical: "Study of the comparative cleaning capacity of a sample of soap in soft and hard water."
  },
  {
    id: "chm-dec",
    subject: "Chemistry",
    subjectId: "science",
    month: "December",
    topics: "Revision of Chemical equations, formulas, nomenclature of carbon, and CBSE sample questions.",
    practical: ""
  },
  {
    id: "chm-jan",
    subject: "Chemistry",
    subjectId: "science",
    month: "January",
    topics: "Review of key chemical tests, equations sheet practice and previous years questions.",
    practical: ""
  },

  // --- MATHEMATICS (subjectId: maths) ---
  {
    id: "mth-apr",
    subject: "Mathematics",
    subjectId: "maths",
    month: "April",
    topics: "CH-1 Real numbers (Ex-1.1, Ex-1.2)\nCH-2 Polynomials (Ex-2.1, 2.2)",
    practical: "1. To determine the zeroes of linear, quadratic, & cubic polynomials graphically.\n2. To construct a square root spiral."
  },
  {
    id: "mth-may",
    subject: "Mathematics",
    subjectId: "maths",
    month: "May",
    topics: "CH-3 : Pair of Linear equation in two variables (Except cross multiplication)\nCh-4: Quadratic Equation",
    practical: "To verify the conditions for consistency/inconsistency for pair of linear equations in two variables by graphical method."
  },
  {
    id: "mth-jun",
    subject: "Mathematics",
    subjectId: "maths",
    month: "June",
    topics: "Summer Vacation Homework - Project Work (Polynomials & Quadratic equations).",
    practical: "Independent mathematics project files compilation."
  },
  {
    id: "mth-jul",
    subject: "Mathematics",
    subjectId: "maths",
    month: "July",
    topics: "Ch – 05: Arithmetic Progression\nCh – 07: Coordinate Geometry (Ex-7.1 , Ex – 7.2)",
    practical: "(i) To find the sum of ‘n’ natural numbers.\n(ii) To verify the distance formula by graphical method."
  },
  {
    id: "mth-aug",
    subject: "Mathematics",
    subjectId: "maths",
    month: "August",
    topics: "Ch – 06: Triangles (Ex-6.1, 6.2, 6.3)\nCh – 10: Circle (Ex – 10.1, 10.2)",
    practical: "(i) Verification of basic proportionality (BPT) Theorem.\n(ii) To find the area of circle by using cut & paste Activity."
  },
  {
    id: "mth-sep",
    subject: "Mathematics",
    subjectId: "maths",
    month: "September",
    topics: "Revision (Topics taught from April to August in preparation for Term-1 Exam).\nCh – 12: Area Related to Circle",
    practical: "Preparation and practice for Term-1 school EXAM."
  },
  {
    id: "mth-oct",
    subject: "Mathematics",
    subjectId: "maths",
    month: "October",
    topics: "Ch – 08: Introduction of Trigonometry.\nCh – 15: Probability",
    practical: "Project work: Trigonometric Ratios & Identities."
  },
  {
    id: "mth-nov",
    subject: "Mathematics",
    subjectId: "maths",
    month: "November",
    topics: "Ch – 09: Some Application of Trigonometry\nCh – 14: Statistics (Ex – 14.1, 14.2, 14.3)",
    practical: "(i) To measure inaccessible height/length by using applications of Trigonometry.\n(ii) To find the height of a building using clinometer model."
  },
  {
    id: "mth-dec",
    subject: "Mathematics",
    subjectId: "maths",
    month: "December",
    topics: "Ch – 13: Surface Area & Volume (Ex – 13.1, 13.2)\nRevision of Trigonometry.",
    practical: "To calculate the curved surface area of a cone using a cone made from paper."
  },
  {
    id: "mth-jan",
    subject: "Mathematics",
    subjectId: "maths",
    month: "January",
    topics: "Complete math syllabus revision; solving past CBSE 10th Board exam papers.",
    practical: "Pre-board examination drills and self-assessments."
  },

  // --- ENGLISH (subjectId: english) ---
  {
    id: "eng-apr",
    subject: "English Literature",
    subjectId: "english",
    month: "April",
    topics: "English Literature (First Flight): 1. A Letter to God, 1. Poem: Dust of Snow, 2. Fire and Ice (Poem), 3. A Tiger in the Zoo.\nSupplementary (Footprints): A Triumph of Surgery.\nGrammar & Writing: 1. Tense, 2. Formal Letters.",
    practical: "i) Fill up money order form.\nii) Collect Postal Stamp and paste on A4 Paper.\niii) Write theme of the poem & Role Play on letter-writing structures."
  },
  {
    id: "eng-may",
    subject: "English Literature",
    subjectId: "english",
    month: "May",
    topics: "English Literature: 2. Nelson Mandela: Long Walk to Freedom.\nSupplementary: The Thief’s Story.\nGrammar: 1. Modals, 2. Formal Letter.",
    practical: "Class Discussion on: i) Apartheid system, ii) Untouchability, and write a short reflective note about these two topics. Make a calendar on Modals."
  },
  {
    id: "eng-jun",
    subject: "English Literature",
    subjectId: "english",
    month: "June",
    topics: "Revision of Literature Ch – 01 & Ch – 02, Supplementary Storytelling, and core Grammar tenses revision.",
    practical: "Assignment: Write short paragraph about famous personalities (e.g., Swami Vivekananda, Sachin Tendulkar)."
  },
  {
    id: "eng-jul",
    subject: "English Literature",
    subjectId: "english",
    month: "July",
    topics: "English Literature: 3. Two Stories About Flying, 3. A Tiger in the Zoo (Poem), 4. How to Tell Wild Animals.\nSupplementary: The Midnight Visitor, A Question of Trust.\nGrammar: Subject-Verb Concord.",
    practical: "Prepare a structural grammar chart on the Subject-Verb Concord logic. Draw a picture related to literature topics. Interactive Game on 'Trust'."
  },
  {
    id: "eng-aug",
    subject: "English Literature",
    subjectId: "english",
    month: "August",
    topics: "English Literature: 4. From the Diary of Anne Frank, 5. The Ball Poem.\nSupplementary: Footprints without Feet.\nGrammar: 1. Determiners, 2. Formal Letter writing.",
    practical: "Short Notes writing: 'How to Save Valuable Things'. Literature story telling activities."
  },
  {
    id: "eng-sep",
    subject: "English Literature",
    subjectId: "english",
    month: "September",
    topics: "English Literature: 5. Glimpses of India, 6. Amanda (Poem), 7. The Trees.\nSupplementary: The Making of a Scientist.\nGrammar: Revision of basic writing compositions.",
    practical: "Short Paragraph writing: 'About Tea & Coffee growing cultures of India'. Write about your hobbies."
  },
  {
    id: "eng-oct",
    subject: "English Literature",
    subjectId: "english",
    month: "October",
    topics: "English Literature: 6. Mijbil The Otter, 8. Fog (Poem).\nSupplementary: The Necklace.\nGrammar: 1. Narration, 2. Analytical Paragraph writing based on charts.",
    practical: "Discuss the social problems faced in daily life. Make a grammar chart on Narration. Write analytical paragraphs."
  },
  {
    id: "eng-nov",
    subject: "English Literature",
    subjectId: "english",
    month: "November",
    topics: "English Literature: 7. Madam Rides the Bus, 9. The Tale of Custard the Dragon (Poem), 10. For Anne Gregory (Poem).\nSupplementary: Bholi.\nGrammar: 1. Narration practice, 2. Analytical Paragraph drills.",
    practical: "Collect actual Bus Tickets, examine terms, and paste them on an A4 size paper. Write a short note about your personal specialty."
  },
  {
    id: "eng-dec",
    subject: "English Literature",
    subjectId: "english",
    month: "December",
    topics: "English Literature: 8. The Sermon at Benares, 9. The Proposal (Play).\nSupplementary: The Book that saved the Earth.\nGrammar: Letter and essay revisions.",
    practical: "Sharing own imaginative experiences about space or Earth. Discussion on character roles in the play."
  },
  {
    id: "eng-jan",
    subject: "English Literature",
    subjectId: "english",
    month: "January",
    topics: "Board strategy, comprehensive textbook revision, correct writing format checks, and mock english drills.",
    practical: ""
  },

  // --- SOCIAL SCIENCE (subjectId: social_science) ---
  {
    id: "sst-apr",
    subject: "Social Science",
    subjectId: "social_science",
    month: "April",
    topics: "History: Ch – 1: The Rise of nationalism in Europe\nGeography: Ch – 1 (Resources and Development)\nCivics: Ch – 1: Power Sharing\nEconomics: Ch -1: Development",
    practical: "Geography: Identify major soil types on the Map of India.\nCivics: Class debate on forms of Power Sharing based on cases of India & Belgium.\nEconomics: Download and analyze World Development Report 2020."
  },
  {
    id: "sst-may",
    subject: "Social Science",
    subjectId: "social_science",
    month: "May",
    topics: "History: Nationalism in India\nGeography: Ch – 1 Continued, Ch - 2 (Forest and Wildlife Resources)\nCivics: Ch – 1 Continued\nEconomics: Ch – 1 Development indicators continued.",
    practical: "History Map: Label Calcutta, Nagpur, Madras congress sessions, Champaran, Ahmedabad, Jallianwala Bagh, Dandi. Geography: Interdisciplinary project on Globalization. Economics: Calculate personal BMI & health status."
  },
  {
    id: "sst-jun",
    subject: "Social Science",
    subjectId: "social_science",
    month: "June",
    topics: "History: Ch – 02 (Nationalism in India) Continued\nGeography: Ch – 03 (Water Resources)\nCivics: Ch – 2: Federalism\nEconomics: Ch – 1 Continued (Sustainability of Development)",
    practical: "Independent research on local water harvesting systems of India."
  },
  {
    id: "sst-jul",
    subject: "Social Science",
    subjectId: "social_science",
    month: "July",
    topics: "History: Ch – 3: The Making of the Global world (Themes: Pre-modern world to conquest, disease & trade)\nGeography: Ch – 3 & 4 (Water Resources & Agriculture)\nCivics: Ch – 2: Federalism Continued\nEconomics: Ch -2: Sectors of the Indian Economy",
    practical: "Map Work: Locate & label dams (Salal, Bhakra Nangal, Tehri, Rana Pratap Sagar, Sardar Sarovar, Hirakud, Nagarjuna Sagar, Tungabhadra). Civics: Draw charts on local self-governments. Economics: Discussion on workforce under primary, secondary and tertiary sectors."
  },
  {
    id: "sst-aug",
    subject: "Social Science",
    subjectId: "social_science",
    month: "August",
    topics: "History: Ch - 4: The Age of Industrialization (Periodic Assessment topic only)\nGeography: Ch – 4 (Agriculture) Continued\nCivics: Ch – 3: Gender, Religion & Caste\nEconomics: Ch – 2 Continued (Employment and public sectors)",
    practical: "History: Research list of historic industrial groups or textile mills in Bihar, India. Geography Map: Major areas of Rice/Wheat, Sugarcane, Tea, Coffee, Rubber, Jute, Cotton. Civics: Class workshop on gender division roles."
  },
  {
    id: "sst-sep",
    subject: "Social Science",
    subjectId: "social_science",
    month: "September",
    topics: "SST Mid-Term Term-1 Examination review.\nGeography: Ch – 5 (Minerals and Energy Resources)\nCivics: Ch – 3 Continued (Feminist social movements)\nEconomics: Ch – 3: Money and Credit",
    practical: "Civics: Case study files on the feminist struggles. Economics: Interactive questionnaire on the role of Reserve Bank of India (RBI)."
  },
  {
    id: "sst-oct",
    subject: "Social Science",
    subjectId: "social_science",
    month: "October",
    topics: "History: Ch – 5: Print Culture and the modern World\nGeography: Ch – 5 & Ch – 6 (Manufacturing Industries)\nCivics: Ch -4: Political Parties\nEconomics: Ch – 3 Money and Credit (Formal vs Informal sectors & SHGs)",
    practical: "Geography Map: Locate iron ore mines (Mayurbanj, Durg, Bailadila, Bellary, Kudremukh), coal mines, oil fields, and plants (Singrauli, Narora, Kakrapara, Tarapur). Civics: Class project tracking local national & regional political parties."
  },
  {
    id: "sst-nov",
    subject: "Social Science",
    subjectId: "social_science",
    month: "November",
    topics: "History: Ch – 5 Continued\nGeography: Ch – 6 Continued\nCivics: Ch – 4 Continued, Ch – 5: Outcomes of Democracy\nEconomics: Ch – 4: Globalization and the Indian Economy",
    practical: "Geography Map: Locate Cotton Textile clusters (Mumbai, Surat, Indore, Kanpur), Iron/Steel plants, and IT Technology Parks. Economics: Market study verifying imported products & MNC linkages in daily household brands."
  },
  {
    id: "sst-dec",
    subject: "Social Science",
    subjectId: "social_science",
    month: "December",
    topics: "Geography: Ch - 7 (Lifelines of National Economy) (Map elements only)\nCivics: Ch – 5 Outcomes of Democracy continued.",
    practical: "Map Work: Locate and identify Major Sea Ports (Kandla, Mumbai, Marmagao, New Mangalore, Kochi, Tuticorin, Chennai, Haldia) and International Airports (Amritsar, Delhi, Mumbai, Chennai, Kolkata, Hyderabad)."
  },
  {
    id: "sst-jan",
    subject: "Social Science",
    subjectId: "social_science",
    month: "January",
    topics: "Full board exam map practice, history event chronology reviews, and past CBSE board exam questions solutions.",
    practical: ""
  },

  // --- HINDI (subjectId: hindi) ---
  {
    id: "hin-apr",
    subject: "Hindi (हिंदी)",
    subjectId: "hindi",
    month: "April",
    topics: "क्षितिज भाग-२: सूरदास का जीवन परिचय एवं सूरदास के पद। स्वयं प्रकाश का जीवन परिचय, नेताजी का चश्मा।\nव्याकरण: रचना के आधार पर वाक्य भेद।",
    practical: "परियोजना कार्य: भक्तिकालीन कविताओं एवं पदों का सुंदर सचित्र संग्रह बनाना।"
  },
  {
    id: "hin-may",
    subject: "Hindi (हिंदी)",
    subjectId: "hindi",
    month: "May",
    topics: "क्षितिज भाग-२: तुलसीदास का जीवन परिचय, राम-लक्ष्मण-परशुराम संवाद।\nकृतिका भाग-२: शिवपूजन सहाय (माता का अंचल)।\nव्याकरण: वाच्य (कर्तृवाच्य, कर्मवाच्य, भाववाच्य)।",
    practical: "परियोजना: तुलसीदास रचित रामचरितमानस की चौपाइयों का संकलन करना तथा वर्ग में सस्वर गायन।"
  },
  {
    id: "hin-jun",
    subject: "Hindi (हिंदी)",
    subjectId: "hindi",
    month: "June",
    topics: "क्षितिज: राम, लक्ष्मण और परशुराम जी के ऐतिहासिक पृष्ठभूमि पर अतिरिक्त ज्ञानार्जन। पठित अध्यायों का सामूहिक अभ्यास।\nव्याकरण: अपठित गद्यांश एवं पद्यांश संकलन।",
    practical: "भक्तिकालीन कवियों के योगदान पर वैचारिक विचार-विमर्श।"
  },
  {
    id: "hin-jul",
    subject: "Hindi (हिंदी)",
    subjectId: "hindi",
    month: "July",
    topics: "क्षितिज भाग-२: बालगोबिन भगत (रामवृक्ष बेनीपुरी), यशपाल जी का जीवन परिचय, लखनवी अंदाज़।\nव्याकरण: १. अर्थालंकार भेद (उपमा, रूपक, उत्प्रेक्षा, अतिशयोक्ति, मानवीकरण), २. स्ववृत्त लेखन (Bio-data), ३. ई-मेल लेखन।",
    practical: "परियोजना: बालगोबिन भगत रेखाचित्र के आधार पर ग्रामीण जीवन के संगीत और लोक संस्कृतियों को समझाना।"
  },
  {
    id: "hin-aug",
    subject: "Hindi (हिंदी)",
    subjectId: "hindi",
    month: "August",
    topics: "क्षितिज भाग-२: जयशंकर प्रसाद का जीवन परिचय तथा कविता 'आत्मकथ्य'।\nकृतिका भाग-२: साना-साना हाथ जोड़ि (मधु कांकरिया)।",
    practical: "जयशंकर प्रसाद एवं सुमित्रानंदन पंत जी के प्रकृति-चित्रण तुलनात्मक विवेचन।"
  },
  {
    id: "hin-sep",
    subject: "Hindi (हिंदी)",
    subjectId: "hindi",
    month: "September",
    topics: "क्षितिज भाग-२: सूर्यकांत त्रिपाठी निराला जी का जीवन परिचय तथा रचनाएं 'उत्साह' एवं 'अट नहीं रही है'।\nव्याकरण: पद-परिचय नियम।",
    practical: "छायावाद युग के बारे में विस्तृत चर्चा (छायावाद के प्रमुख चार स्तंभ तथा उनका संक्षिप्त रचनात्मक जीवन)।"
  },
  {
    id: "hin-oct",
    subject: "Hindi (हिंदी)",
    subjectId: "hindi",
    month: "October",
    topics: "क्षितिज भाग-२: नागार्जुन का जीवन परिचय, 'यह दंतुरित मुस्कान' तथा 'फसल' कविता।\nव्याकरण: विज्ञापन लेखन, शुभकामना संदेश लेखन।",
    practical: "परियोजना कार्य: छायावादी कवियों की कविताओं के अंश संकलित कर भित्ति-पत्रिका निर्माण।"
  },
  {
    id: "hin-nov",
    subject: "Hindi (हिंदी)",
    subjectId: "hindi",
    month: "November",
    topics: "क्षितिज भाग-२: मंगलेश डबराल (संगतकार), मन्नू भंडारी का जीवन परिचय एवं 'एक कहानी यह भी'।\nव्याकरण: औपचारिक व अनौपचारिक पत्र लेखन, सामयिक अनुच्छेद लेखन।",
    practical: "मुख्य विधाकारों के संस्मरणों पर परिचर्चा।"
  },
  {
    id: "hin-dec",
    subject: "Hindi (हिंदी)",
    subjectId: "hindi",
    month: "December",
    topics: "क्षितिज भाग-२: यतीन्द्र मिश्र का जीवन परिचय (नौबतखाने में इबादत), भदंत आनंद कौसल्यायन (संस्कृति)।\nव्याकरण: अपठित गद्यांश एवं पद्यांश अभ्यास।",
    practical: "नौबतखाने में इबादत अध्याय के आधार पर शास्त्रीय संगीत परंपराओं की समझ।"
  },
  {
    id: "hin-jan",
    subject: "Hindi (हिंदी)",
    subjectId: "hindi",
    month: "January",
    topics: "व्याकरण के समस्त नियमों (वाच्य, पद-परिचय, अलंकार) की पुनरावृत्ति तथा प्रिलिम्स परीक्षा सुधार लेखन सत्र।",
    practical: ""
  },

  // --- SANSKRIT (subjectId: sanskrit) ---
  {
    id: "skt-apr",
    subject: "Sanskrit (शेमुषी-II)",
    subjectId: "sanskrit",
    month: "April",
    topics: "शेमुषी भाग-२: प्रथमः अध्यायः शुचिपर्यावरणम्।\nव्याकरण: स्वर संधि (यण्, अयादि, पूर्वरूप), प्रकृति प्रत्यय (अनीयर, तव्यत्), अपठित गद्यांश, पत्र लेखनम्।",
    practical: "संवाद वाचन एवं पर्यावरण संवर्धन श्लोकों का सामूहिक अभ्यास।"
  },
  {
    id: "skt-may",
    subject: "Sanskrit (शेमुषी-II)",
    subjectId: "sanskrit",
    month: "May",
    topics: "शेमुषी भाग-२: द्वितीयः अध्यायः बुद्धिर्बलवती सदा।\nव्याकरण: समास-विभक्ति तत्पुरुषः, चित्र वर्णनम्, संस्कृते अनुवादम्, प्रत्यय (क्त, क्तवतु)।",
    practical: "संस्कृत कथाओं का लघु अभिनय एवं सामूहिक सस्वर वाचन।"
  },
  {
    id: "skt-jun",
    subject: "Sanskrit (शेमुषी-II)",
    subjectId: "sanskrit",
    month: "June",
    topics: "शेमुषी भाग-२: तृतीयः अध्यायः शिशुलालनम् (आंतरिक भाग)।\nव्याकरण: मतुप्, त्व, तल् प्रत्यय अभ्यासः।",
    practical: "धातु रूप एवं शब्द रूपों की लेखन प्रतिस्पर्धा।"
  },
  {
    id: "skt-jul",
    subject: "Sanskrit (शेमुषी-II)",
    subjectId: "sanskrit",
    month: "July",
    topics: "शेमुषी भाग-२: चतुर्थः अध्यायः शिशुलालनम् समाप्ति, जननी तुल्यवत्सला।\nव्याकरण: ठक् प्रत्यय, कर्मधारय, बहुव्रीहि समास, स्त्री प्रत्यय (टाप्), वाच्य परिवर्तनम् (केवलं लट् लकारे)।",
    practical: "संस्कृत गद्य कथाओं का अनुवाद कार्य तथा व्याकरण संरचना चक्र।"
  },
  {
    id: "skt-aug",
    subject: "Sanskrit (शेमुषी-II)",
    subjectId: "sanskrit",
    month: "August",
    topics: "शेमुषी भाग-२: सुभाषितशतानि (सुभाषितानि), सौहार्दं प्रकृतेः शोभा।\nव्याकरण: विसर्ग संधि, स्त्री प्रत्यय (ङीप्), अव्ययीभाव समास।",
    practical: "नैतिक श्लोकों का सुंदर अर्थ सहित सुंदर भित्ति-चित्र तैयार करना।"
  },
  {
    id: "skt-sep",
    subject: "Sanskrit (शेमुषी-II)",
    subjectId: "sanskrit",
    month: "September",
    topics: "शेमुषी भाग-२: सौहार्दं प्रकृतेः शोभा समाप्ति, विचित्रः साक्षी।\nव्याकरण: समय लेखनम् (सामान्य-सपाद-सार्ध-पादोन समय सूचियां)।",
    practical: "संस्कृत समय सूचक घडियों का निर्माण एवं समय सम्भाषण अभ्यास।"
  },
  {
    id: "skt-oct",
    subject: "Sanskrit (शेमुषी-II)",
    subjectId: "sanskrit",
    month: "October",
    topics: "शेमुषी भाग-२: सूक्तयः।\nव्याकरण: अशुद्धि संशोधनम्, अव्यय पदानि, संस्कृत भाषायाम् अनुवादकार्यम्।",
    practical: "सूक्त श्लोकों का सामूहिक श्लोक पाठ एवं कंठस्थीकरण।"
  },
  {
    id: "skt-nov",
    subject: "Sanskrit (शेमुषी-II)",
    subjectId: "sanskrit",
    month: "November",
    topics: "शेमुषी भाग-२: अन्योक्तयः।\nव्याकरण: द्वन्द्व समास, पत्र लेखनम्, चित्र वर्णनम् च।",
    practical: "अन्योक्ति कथाओं पर आधारित चित्रों का संस्कृत में विवरण लिखना।"
  },
  {
    id: "skt-dec",
    subject: "Sanskrit (शेमुषी-II)",
    subjectId: "sanskrit",
    month: "December",
    topics: "शेमुषी भाग-२: अन्योक्तयः समाप्तिः।\nव्याकरण: अपठित गद्यांश सम्पादन एवं पुनरावृत्ति सत्र।",
    practical: "सदुक्ति श्लोकों पर अंत्याक्षरी प्रतियोगिता का आयोजन।"
  },
  {
    id: "skt-jan",
    subject: "Sanskrit (शेमुषी-II)",
    subjectId: "sanskrit",
    month: "January",
    topics: "व्याकरण, समास, वाक्यों के वाच्य एवं समय लेखन की पुनरावृत्ति। सीबीएसई बोर्ड सैंपल पेपर्स हल करना।",
    practical: ""
  },

  // --- INFORMATION TECHNOLOGY (subjectId: it) ---
  {
    id: "it-apr",
    subject: "Information Technology",
    subjectId: "it",
    month: "April",
    topics: "Unit 1 : Communication Skills-II (Part-A)\nUnit 1: Digital Documentation (Advanced) using LibreOffice Writer (Part-B).",
    practical: "Creating and managing List Styles and Style Categories. Applying Fill Format. Inserting and modifying images in Writer text documents."
  },
  {
    id: "it-may",
    subject: "Information Technology",
    subjectId: "it",
    month: "May",
    topics: "Unit 2 : Self-Management Skills-II (Part-A)\nUnit 3 : ICT Skills-II (Part-A)",
    practical: "Identification of OS taskbars, customizing menu icons, adjusting system settings."
  },
  {
    id: "it-jun",
    subject: "Information Technology",
    subjectId: "it",
    month: "June",
    topics: "Unit 1: Digital Documentation (Advanced) using LibreOffice Writer (Part-B) Revision and deep features recap.",
    practical: "Hands-on document formatting, templates creation, and custom headers setup."
  },
  {
    id: "it-jul",
    subject: "Information Technology",
    subjectId: "it",
    month: "July",
    topics: "Unit 2: Electronic Spreadsheet using LibreOffice Calc (Part-B)",
    practical: "Using Data Consolidation features. Creating Subtotals. Practical implementation of 'What-If' scenarios, Goal Seek, and Solver tools. Recording macros and running them."
  },
  {
    id: "it-aug",
    subject: "Information Technology",
    subjectId: "it",
    month: "August",
    topics: "Unit 3: Database Management System using LibreOffice Base (Part-B)",
    practical: "Identifying keys, fields, records, and tables. Restructuring schemas. Launching LibreOffice Base, navigating screens, and performing forms design, query retrieval, and reports generation."
  },
  {
    id: "it-sep",
    subject: "Information Technology",
    subjectId: "it",
    month: "September",
    topics: "Unit 4: Entrepreneurial Skills-II (Part-A)",
    practical: "Writing reflective assignments on starting a tech entrepreneurship venture."
  },
  {
    id: "it-oct",
    subject: "Information Technology",
    subjectId: "it",
    month: "October",
    topics: "Unit 5: Green Skills-II (Part-A)",
    practical: "Preparing digital presentation models on rain water harvesting, drip irrigation setups, solar cooker energy systems, or composting models."
  },
  {
    id: "it-nov",
    subject: "Information Technology",
    subjectId: "it",
    month: "November",
    topics: "Unit 4: Maintain Healthy, Safe and Secure Working Environment (Part-B)",
    practical: "Demonstrating workspace safety guidelines. Designing accident handling templates in spreadsheet, and evacuation flowcharts in LibreOffice."
  },
  {
    id: "it-dec",
    subject: "Information Technology",
    subjectId: "it",
    month: "December",
    topics: "Practical Board Preparation, school Term-2 Practical Examinations, and final IT Portfolio compilation.",
    practical: "Final validation of LibreOffice writer, calc, base labs and final files binding."
  },

  // --- PHYSICAL ACTIVITY TRAINER (subjectId: physical_activity) ---
  {
    id: "pat-apr",
    subject: "Physical Activity Trainer",
    subjectId: "physical_activity",
    month: "April",
    topics: "Part A - Unit 1: Communication Skills-II, Unit 2: Self-Management Skills-II\nPart B - Unit 1: Role and responsibilities of Early Years Physical Activity Facilitator.",
    practical: ""
  },
  {
    id: "pat-may",
    subject: "Physical Activity Trainer",
    subjectId: "physical_activity",
    month: "May",
    topics: "Part B - Unit 1: Role and responsibilities of Early Years Physical Activity Facilitator (Continued).",
    practical: ""
  },
  {
    id: "pat-jun",
    subject: "Physical Activity Trainer",
    subjectId: "physical_activity",
    month: "June",
    topics: "Part B - Unit 2: Assessment and Evaluation of Students (Introduction of indicators).",
    practical: ""
  },
  {
    id: "pat-jul",
    subject: "Physical Activity Trainer",
    subjectId: "physical_activity",
    month: "July",
    topics: "Part B - Unit 2: Assessment and Evaluation of Students (Physical fitness metrics).",
    practical: ""
  },
  {
    id: "pat-aug",
    subject: "Physical Activity Trainer",
    subjectId: "physical_activity",
    month: "August",
    topics: "Part B - Unit 3: Free Play and organizing sports sessions.",
    practical: ""
  },
  {
    id: "pat-sep",
    subject: "Physical Activity Trainer",
    subjectId: "physical_activity",
    month: "September",
    topics: "Part B - Unit 3: Free Play (Planning play zones).",
    practical: ""
  },
  {
    id: "pat-oct",
    subject: "Physical Activity Trainer",
    subjectId: "physical_activity",
    month: "October",
    topics: "Part B - Unit 4: Monitoring and Inventory Management of physical assets.",
    practical: ""
  },
  {
    id: "pat-nov",
    subject: "Physical Activity Trainer",
    subjectId: "physical_activity",
    month: "November",
    topics: "Part B - Unit 4: Monitoring and Inventory Management tracking tables.",
    practical: ""
  },
  {
    id: "pat-dec",
    subject: "Physical Activity Trainer",
    subjectId: "physical_activity",
    month: "December",
    topics: "Part A - Unit 3: Information and Communication Technology Skills, Unit 4: Entrepreneurial Skills - II, Unit 5: Green Skills - II.",
    practical: ""
  }
];
