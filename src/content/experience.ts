export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  type: string;
  bullets: string[];
  tools?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Data Services Contractor",
    org: "Bella Coola Heli Sports",
    period: "February 2026 – Ongoing",
    type: "Contract",
    bullets: [
      "Building Single Source of Truth (SSOT) document infrastructure to eliminate duplicated data.",
      "Created documentation lineage and identified necessary SSOT documents.",
    ],
    tools: ["Google Workspace App Script", "Google Sheets", "Google Docs"],
  },
  {
    role: "Sales & Reservations",
    org: "Bella Coola Heli Sports",
    period: "November 2024 – June 2025",
    type: "Full Time",
    bullets: [
      "Managed bookings valued up to $350,000.",
      "Built automation tools for daily reporting and scheduling, saving ~124 hours per season.",
      "Enhanced customer service coordination.",
    ],
    tools: ["Salesforce", "Google Sheets"],
  },
  {
    role: "Receptionist",
    org: "Bella Coola Heli Sports / Tweedsmuir Park Lodge",
    period: "June 2024 – October 2024",
    type: "Seasonal",
    bullets: [
      "Coordinated scheduling for guests and guides.",
      "Created a real-time scheduling tool and tracked revenue metrics.",
    ],
    tools: ["Google Sheets", "Conditional Logic"],
  },
  {
    role: "Direct-to-Consumer Manager & Logistics Specialist",
    org: "RMU Outdoors",
    period: "June 2020 – December 2023",
    type: "Full Time",
    bullets: [
      "Managed $1.8M product distribution across global channels.",
      "Expanded e-commerce revenue to $500K.",
      "Oversaw inventory and freight workflows across multiple regions.",
    ],
    tools: ["Jira", "Trello", "Google Sheets", "Shipedge", "Klaviyo", "Shopify", "Google Analytics"],
  },
  {
    role: "Various Hospitality Roles",
    org: "Canada & New Zealand",
    period: "2015 – 2020",
    type: "5 years, cumulative",
    bullets: ["Bartending, serving, and guest experience roles across Canada and New Zealand."],
  },
];

export const education = [
  { credential: "Data Science Immersive Diploma", org: "Lighthouse Labs", year: "Sep. 2025" },
  { credential: "Advanced Data Analytics – Professional Certificate", org: "Google", year: "2025" },
  { credential: "Data Analytics – Professional Certificate", org: "Google", year: "2024" },
  { credential: "DipGrad – Psychology", org: "", year: "2018" },
  { credential: "BSc – Microbiology & Immunology", org: "", year: "2017" },
];

export const skills = [
  "SQL (PostgreSQL, SQLite)",
  "Excel / Google Sheets",
  "Visualisation Software (Tableau & Tableau Public, Python Plotly)",
  "Python (Pandas, NumPy, Seaborn, Plotly, Scikit-Learn, statsmodels.api, GeoPandas)",
  "Cloud Inventory & Order Management (QuickBooks Commerce, Square)",
  "CRM Software (Salesforce, Zendesk)",
  "Email Service Provider Software (Klaviyo, Mailchimp)",
  "Coding Languages (HTML, CSS, XML, JSON)",
  "Image Segmentation (YOLO)",
  "GIS & Remote Sensing (Google Earth Engine)",
  "Machine Learning Algorithms (Bayes, XGBoost, Regression)",
  "Agile & Project Management Tools (Jira, Trello)",
  "Warehouse & Fulfilment / 3PL Systems (3PL Central/Extensiv, Shipedge)",
  "Collaboration Tools (Teams, Zoom, Google Docs)",
];

export const services = [
  {
    icon: "/images/icons/stats.png",
    title: "Data Analysis & Discovery",
    description:
      "Turn raw data into actionable insights using Python, SQL and statistical analysis. Support strategic decisions, operational improvements, and business growth.",
  },
  {
    icon: "/images/icons/operation.png",
    title: "Operations & Applied Modeling",
    description:
      "Design ML-driven solutions to uncover patterns, optimise workflows, and build predictive models that inform smarter decision-making.",
  },
  {
    icon: "/images/icons/carbon-cloud.png",
    title: "Environmental Data & Impact",
    description:
      "Utilise geospatial and climate data to support resilience planning, environmental forecasting, and sustainability strategy. Bridge business and ecosystems through measurable insight.",
  },
  {
    icon: "/images/icons/paint-brush.png",
    title: "Visual Design & Communication",
    description:
      "Create compelling visual narratives and dashboards for stakeholders that elevate understanding and bring data stories to life.",
  },
  {
    icon: "/images/icons/pipeline.png",
    title: "Pipelines & Efficiencies",
    description:
      "Automate data refreshes and operational workflows so teams spend less time in spreadsheets and more time acting on insights.",
  },
];
