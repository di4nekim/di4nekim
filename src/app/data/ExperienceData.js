export const EXP_OVERVIEW = {
  hook: "Some PMs draw boxes and arrows. I write the code inside them too.",
  hook2: "I'm equal parts builder and strategist–architecting AWS microservices one day, leading product discovery the next. I thrive in the overlap between code and product.",
  currently: "Currently, I'm:",
  currentlyBullets: [
    "A junior (class of '27) @ Georgetown University, working on my B.Sc. in Computer Science and minor in Science, Technology, and International Affairs (STIA)",
    "President of Hoya Developers",
    "Director of Product @ Product Space"
  ],
  previously: "Previously, I've:",
  previouslyBullets: [
    "Led product discovery and roadmapping for a B2B CRM, conducting user research with 50+ users while managing backlogs for 3-4 engineers",
    "Improved engineering delivery velocity by 30% by implementing Scrumban workflows and facilitating critical architecture decisions",
    "Architected serverless AWS infrastructure with 9 Lambda microservices and advanced DynamoDB patterns, achieving sub-100ms WebSocket latency",
    "Bridged technical and business stakeholders, translating client needs into specs while evaluating trade-offs in performance, scalability, and maintainability",
    "Coordinated 8+ client projects for 100+ students, guiding teams through user research, technical scope definition, and agile delivery"
  ],
  closing: "There's still so much to learn, but here's a little of how far I've come since I've started:"
};

export const EXPERIENCES = ['HOYA DEVELOPERS', "KEEPUP", 'HOYALYTICS', 'THE HOYA', 'HM ON TECH']

export const EXP_ROLES = {
 "HOYA DEVELOPERS":{
    title: "Co-founder & President",
    company: "Hoya Developers",
    date: "JUL ‘23 - PRESENT",
  },
  "KEEPUP": {
    title: "Product Management Intern",
    company: "KeepUp Technologies",
    date: "MAY ‘24 - NOV '24",
  },
  "HOYALYTICS": {
    title: "Data Analyst",
    company: "Hoyalytics",
    date: "JAN ‘24 - MAY '24",
  },
 "THE HOYA" : {
    title: "Columnist",
    company: "The Hoya",
    date: "JAN ‘24 - MAY '24",
  },
 "HM ON TECH" : {
    title: "Founder & Project Manager",
    company: "HM on Tech",
    date: "OCT ‘21 - FEB '22",
  }
};

export const EXP_BLURBS = 
 {
  "KEEPUP": [
    "As a Product Management and Engineering Intern at KeepUp, I redesigned and scaled the company’s React-based MVP, making impactful contributions in a fast-paced startup environment where I shaped key technical and product decisions.",
    "In collaboration with stakeholders, I developed user-focused prototypes and delivered features that emphasized usability, performance, and maintainability."
  ],
  "HOYALYTICS": [
    "As a Data Analyst at Hoyalytics, I combined data-driven methodologies with product thinking to develop innovative solutions that addressed complex problems.",
    "I designed impactful models by leveraging advanced techniques, and delivered insights that enhanced decision-making and drove meaningful outcomes for the program and its participants."
  ],
  "HOYA DEVELOPERS": [
    "As a founding member and senior Project Manager of Hoya Developers, I established Georgetown’s premier software development club, providing students with technical experience through high-impact collaborations with real clients.",
    "I ensured the successful delivery of impactful solutions that addressed user needs and advanced our mission by aligning product visions, fostering strong stakeholder relationships, and guiding cross-functional teams toward shared goals."
  ],
  "THE HOYA": [
    "As a columnist for Georgetown’s largest student-run publication, I authored engaging and empathetic advice content for “Asking for a Friend,” addressing reader challenges and fostering meaningful connections with the audience.",
  ],
  "HM ON TECH": [
    "As the founder and Project Manager of HM on Tech, I identified a gap in student engagement and led the creation of a centralized platform to streamline event and publication discovery.",
    "By overseeing development and collaborating with stakeholders, I delivered a scalable solution that met both user and institutional needs."
  ]
}

export const EXP_IMPACTS = {
  "KEEPUP": [
    "Conducted in-depth user research to identify usability challenges and prioritized features that increased user satisfaction and engagement.",
    "Refactored the React app’s architecture, implementing modular design principles to develop a table-based layout for scalability and improved functionality.",
    "Delivered high-quality, maintainable full-stack features that optimized app performance while meeting business objectives.",
    "Collaborated with cross-functional teams to create high-fidelity Figma prototypes that balanced user needs with technical constraints."
  ],
 
  "HOYALYTICS": [
    "Developed the program's most innovative and impactful model by leveraging advanced techniques such as density-based clustering, dimensionality reduction, and NLP feature engineering with NLTK word embeddings. Complemented these efforts with robust data preprocessing and visualization to ensure accuracy and actionable insights.",
    "Conducted in-depth data analysis to uncover actionable insights, contributing to the success of high-impact projects evaluated by program leaders.",
    "Achieved the highest scores in a cohort of over 75 participants during the program’s final evaluations, showcasing the effectiveness and scalability of the solutions developed.",
    "Presented findings and recommendations to stakeholders, aligning technical deliverables with business objectives and ensuring practical implementation of data-driven solutions."
  ],

  "THE HOYA" : [
    "Crafted heartfelt and actionable advice columns that resonated with readers, fostering engagement through relatable storytelling.",
    "Partnered closely with editorial teams to refine content, thoughtfully incorporating reader feedback to create meaningful, impactful pieces that addressed their needs and challenges.",
  ],

  "HM ON TECH":[
    "Created a React-based platform to centralize event and publication discovery, enhancing accessibility for students.",
    "Built a robust backend infrastructure using MySQL to enable seamless data storage and retrieval, supporting dynamic user interactions.",
  ],
 }

export const EXP_PROJECTS = {
  "HOYA DEVELOPERS":{
    "Meander" : {
      paragraphs: [
        "Spearheaded the development of a mobile matchmaking platform for students studying abroad, aligning product vision with user needs and technical feasibility through market research and client collaboration.",
        "Directed an Agile development team to deliver core features, including a chat system, matchmaking directory, and community forum, fostering connection and engagement among users.",
        "Defined and executed the product roadmap, prioritizing features based on user pain points and personas, ensuring a seamless and intuitive user journey.",
        "Designed high-fidelity mockups and user journey maps in Figma to guide UX/UI design, creating a cohesive and user-centered product experience."
      ],
      site: "https://github.com/di4nekim/meander"
    },
    "Hilltop Microfinance Initiative" : {
      paragraphs : [
      "Led a user-focused redesign of the website, partnering with stakeholders to align functionality with business goals such as marketing, donations, and user education.",
      "Designed and iterated high-fidelity Figma mockups, refining UX/UI based on stakeholder feedback to create an intuitive and visually appealing user experience.",
      "Directed the development and deployment of a Next.js and React web app, significantly enhancing platform performance and usability to support the organization’s mission.",
      "Streamlined information architecture to effectively serve diverse audiences, including clients, students, and users seeking educational resources.",
      "Integrated Stripe and Airtable to enable seamless donations, directly supporting organizational growth and impact."
      ],
      site : "https://www.hilltopmfi.org/"
    }
  }
}

export const EXP_TECHS = {
 "KEEPUP": ["REACT", "POSTGRESQL", "AWS", "FIGMA"],

 "HOYALYTICS": ["PYTHON", "SCIKIT-LEARN", "NLTK", "PANDAS", "NUMPY"],

 "HOYA DEVELOPERS":["REACT", "REACT NATIVE", "FIREBASE", "FIGMA"],

 "HM ON TECH" : ["REACT", "MYSQL"],
}

export const EXP_LINKS = {
 "KEEPUP": {
    "SITE": "https://www.keep-up.online/",
  },

  "HOYALYTICS": {
    "SITE": "https://www.hoyalytics.com/",
    "GITHUB": "https://github.com/Hoyalytics",
  },

 "HOYA DEVELOPERS":{
    "SITE": "https://www.hoyadevelopers.com/",
    "GITHUB": "https://github.com/hoya-developers",
  },

 "THE HOYA" : {
    "SITE": "https://thehoya.com/",
  },
}