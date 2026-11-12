import { ProjectItem, SkillItem, MilestoneItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  fullName: 'Nagilla Shivamani',
  shortName: 'Shivamani',
  tagline: 'An Aspiring Software Engineer',
  educationSubtitle: 'First-Year B.Tech CSE | Artificial Intelligence & Machine Learning',
  college: 'NIAT X JOY UNIVERSITY',
  degree: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science Engineering',
  specialization: 'Artificial Intelligence and Machine Learning',
  currentYear: 'First Year',
  expectedGraduation: '2029 (Currently 1st Year)',
  location: 'India',
  email: 'shivamani.7981570112@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shivamani-nagilla-7b0105440/',
  github: 'https://github.com/ShivamaniNagilla',
  avatarUrl: '/src/assets/images/shivamani_profile.jpeg',
  heroDescription:
    'Exploring the universe of technology, building ideas into reality, and creating meaningful digital experiences through code.',
  aboutIntroduction:
    'I am a first-year Bachelor of Technology student pursuing Computer Science Engineering with a specialization in Artificial Intelligence and Machine Learning at NIAT X JOY UNIVERSITY. I am passionate about programming, software development, problem-solving, and exploring emerging technologies. This portfolio offers an interactive preview into my Technical Arsenal (Python, C/C++, Web & AI/ML), Transmissions & Projects (The Lost Danta of Ganesha & Health Watch Dashboard), Milestones & Achievements (academic induction & competitive roadmap), and Sublight Comms to connect directly.',
  careerAspiration:
    'To become a skilled software engineer capable of building innovative, intelligent, and impactful technology.',
  interests: [
    'Software Engineering',
    'Artificial Intelligence',
    'Machine Learning',
    'Web Development',
    '3D Web Experiences',
    'Game Development',
    'Problem Solving',
  ],
  learningGoals: [
    { title: 'Master programming fundamentals', done: true },
    { title: 'Develop strong data structures and algorithms skills', done: false, inProgress: true },
    { title: 'Build real-world software applications', done: true },
    { title: 'Explore AI and machine learning architectures', done: false, inProgress: true },
    { title: 'Contribute actively to open-source projects', done: false, inProgress: false },
  ],
};

export const SKILLS_DATA: SkillItem[] = [
  // Programming Languages
  { name: 'Python', category: 'Programming', status: 'known', note: 'Core Syntax, Scripts & Logic' },
  { name: 'C / C++', category: 'Programming', status: 'known', note: 'Fundamentals & Memory Concepts' },
  
  // Frontend Development
  { name: 'HTML5', category: 'Frontend', status: 'known', note: 'Semantic Architecture' },
  { name: 'CSS3', category: 'Frontend', status: 'known', note: 'Styling, Flexbox & Grid' },
  { name: 'JavaScript', category: 'Frontend', status: 'learning', note: 'Currently Learning / Will Learn' },
  { name: 'React', category: 'Frontend', status: 'exploring', note: 'Component UI & State' },

  // Tools
  { name: 'Git', category: 'Tools', status: 'known', note: 'Version Control & Branches' },
  { name: 'GitHub', category: 'Tools', status: 'known', note: 'Repositories & Collaboration' },
  { name: 'VS Code', category: 'Tools', status: 'known', note: 'Development Environment & Extensions' },

  // Core Engineering Skills
  { name: 'Problem Solving', category: 'Core', status: 'known', note: 'Algorithmic Thinking' },
  { name: 'Logical Thinking', category: 'Core', status: 'known', note: 'Systematic Reasoning' },
  { name: 'Debugging', category: 'Core', status: 'known', note: 'Code Analysis & Traceback' },
  { name: 'Responsive Web Design', category: 'Core', status: 'known', note: 'Cross-Device Layouts' },

  // AI & ML
  { name: 'Artificial Intelligence Foundations', category: 'AI & ML', status: 'learning', note: 'Core Concepts & Paradigms' },
  { name: 'Machine Learning Fundamentals', category: 'AI & ML', status: 'learning', note: 'Model Types & Math' },
  { name: 'AI Engineering Tools', category: 'AI & ML', status: 'known', note: 'AI-assisted Development & Prompting' },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-01',
    name: 'THE LOST DANTA OF GANESHA',
    tagline: 'Mythology-Inspired Adventure Game Concept',
    description:
      "A mythology-inspired adventure game concept where a young devotee discovers an ancient Ganesha temple hidden inside a mysterious forest. Guided by Mushak, the player solves ancient scripture puzzles, faces obstacles, and searches for Ganesha's lost danta.",
    technologies: ['Game Design Concept', 'Narrative Architecture', 'Puzzle Logic', 'Level Storyboarding', 'Unreal / Unity Vision'],
    status: 'Concept',
    imageUrl: '/src/assets/images/lost_danta_game_1794412753519.jpg',
    role: 'Lead Concept Creator & Narrative Designer',
    timeline: '2025 – Present',
    highlights: [
      'Rich mythological narrative integrating sacred Indian scriptures and ancient riddles',
      'Companion AI mechanics featuring Mushak guiding the player through hidden traps',
      'Atmospheric environmental puzzle progression and ancient temple lore',
      'Designed to blend cultural heritage with immersive interactive game mechanics',
    ],
  },
  {
    id: 'project-02',
    name: 'Health Watch DashBoard',
    tagline: 'Real-Time Biometric Health & Activity Telemetry',
    description:
      'A responsive health monitoring dashboard tracking vital blood pressure readings and daily step counts. Built to provide clear biometric visualizations and daily wellness telemetry.',
    technologies: ['AI Tools', 'Lovable.dev', 'React', 'Biometric Metrics', 'Data Visualization'],
    status: 'Live',
    liveUrl: 'https://lovable.dev/projects/53fda0c0-61a5-4f86-af3b-118dd3b7416a',
    imageUrl: '/src/assets/images/health_watch_ui_1794412753485.jpg',
    role: 'Creator & Frontend Developer',
    timeline: '2025',
    highlights: [
      'Interactive systolic / diastolic blood pressure visualization with instant health state indicators',
      'Daily step count progress tracking with goal comparison and telemetry breakdown',
      'Sleek dark-mode glassmorphic interface designed for fast biometric reading',
      'Deployed and interactive on Lovable platform',
    ],
  },
  {
    id: 'project-03',
    name: 'GeoLocation Spatial Radar API',
    tagline: 'Real-Time GPS Triangulation & Orbital Telemetry',
    description:
      'A high-performance geolocation web application utilizing the HTML5 Geolocation API and spatial mapping services. Features live latitude/longitude triangulation, spatial accuracy radar visualization, altitude and heading metrics, and reverse geocoding into localized landmarks.',
    technologies: ['Geolocation API', 'JavaScript', 'HTML5 APIs', 'Spatial Mapping', 'Leaflet / OpenStreetMap', 'Responsive Telemetry'],
    status: 'Live',
    imageUrl: '/src/assets/images/geolocation_api_project_1794416581921.jpg',
    role: 'Lead Developer & Frontend Architect',
    timeline: '2026',
    highlights: [
      'High-precision real-time GPS coordinate triangulation with live accuracy circle rendering',
      'Interactive spatial compass radar calculating cardinal heading, elevation, and speed vectors',
      'Instant reverse geocoding translating latitude/longitude into human-readable geographic locations',
      'Graceful permission handling and fallback simulation for privacy-conscious environments',
    ],
  },
];

export const MILESTONES_DATA: MilestoneItem[] = [
  {
    id: 'milestone-1',
    year: '2025 – 2026',
    title: 'B.Tech CSE (AI & ML) Induction',
    category: 'Academic',
    institution: 'NIAT X JOY UNIVERSITY',
    description:
      'Enrolled in Bachelor of Technology in Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning, laying strong computational foundations.',
    status: 'Completed',
  },
  {
    id: 'milestone-2',
    year: '2025',
    title: 'Health Watch Dashboard Launch',
    category: 'Project',
    institution: 'Lovable.dev & AI Engineering',
    description:
      'Engineered and published interactive biometric telemetry dashboard tracking blood pressure readings and step analytics.',
    status: 'Completed',
  },
  {
    id: 'milestone-3',
    year: '2025 – 2026',
    title: 'Mythology Game Architecture: The Lost Danta of Ganesha',
    category: 'Project',
    institution: 'Independent Creative Engineering',
    description:
      'Formulated the design document, lore, ancient puzzle mechanics, and level progression for an Indian mythology action-adventure game.',
    status: 'In Progress',
  },
  {
    id: 'milestone-4',
    year: 'Upcoming',
    title: 'Hackathons & Technical Coding Competitions',
    category: 'Hackathon',
    institution: 'University & National Platforms',
    description:
      'Preparing to participate in competitive hackathons and coding arenas to solve real-world problems under time pressure.',
    status: 'Upcoming',
  },
  {
    id: 'milestone-5',
    year: 'Upcoming',
    title: 'Open Source & AI Model Deployment',
    category: 'Certification',
    institution: 'Global Developer Community',
    description:
      'Targeting first open-source contributions and building end-to-end intelligent applications with deep learning.',
    status: 'Upcoming',
  },
];
