# 🎓 EduMaster - AI-Powered Learning Platform

<div align="center">
  <img src="./public/favicon.svg" alt="EduMaster Logo" width="80" height="80">
  
  <h3>Master Professional Skills with AI-Powered Courses</h3>
  
  <p>
    <a href="https://edumaster-app.vercel.app">🌐 Live Demo</a> •
    <a href="#features">✨ Features</a> •
    <a href="#getting-started">🚀 Getting Started</a> •
    <a href="#tech-stack">🛠️ Tech Stack</a>
  </p>

  ![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
  ![Vite](https://img.shields.io/badge/Vite-5.0.8-purple?logo=vite)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-cyan?logo=tailwindcss)
  ![License](https://img.shields.io/badge/License-MIT-green)
</div>

## 📖 Overview

EduMaster is a modern, AI-powered learning platform designed to help professionals master essential skills across multiple domains. From Microsoft Office to programming, design, and marketing - EduMaster provides interactive, personalized learning experiences with cutting-edge AI assistance.

## ✨ Features

### 🎯 **Comprehensive Course Library**
- **Microsoft Office Suite**: Excel, Word, PowerPoint
- **Google Workspace**: Sheets, Docs, Drive
- **Programming**: Python, Web Development, Database & SQL
- **Design**: Adobe Photoshop, Illustrator, UI/UX Design
- **Marketing**: Digital Marketing, Social Media, Content Marketing
- **Accounting**: Bookkeeping, QuickBooks, Financial Analysis

### 🤖 **AI-Powered Learning Tools**
- **Smart Learning Paths**: AI generates personalized course sequences based on your goals
- **Interactive Flashcards**: AI explanations for complex concepts
- **Dynamic Quizzes**: AI-generated questions tailored to your progress
- **Assignment Feedback**: Intelligent feedback on submitted projects
- **Study Plans**: Personalized daily study recommendations

### 💡 **Advanced Learning Features**
- **Progress Tracking**: Detailed analytics and learning streaks
- **Video Lessons**: Embedded video content with playlist management
- **Interactive Assignments**: File upload and AI-powered feedback system
- **Achievement System**: Badges and certificates for milestones
- **Dark/Light Theme**: System-aware theme switching

### 🎨 **Beautiful UI/UX**
- **Responsive Design**: Perfect on all devices and screen sizes
- **Smooth Animations**: 60fps animations and transitions
- **Accessible**: WCAG-compliant design patterns
- **Intuitive Navigation**: Collapsible sidebar and smart search

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks and context
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Framer Motion** - Smooth animations and gestures

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting and style consistency
- **PostCSS** - CSS processing and optimization
- **Git** - Version control and collaboration

### Architecture
- **Component-Based**: Modular, reusable React components
- **Custom Hooks**: Reusable stateful logic (theme management, etc.)
- **Mock API**: Simulated AI responses for development
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ali-kin4/edumaster-app.git
   cd edumaster-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build

# Building
npm run build        # Create production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 📁 Project Structure

```
edumaster-app/
├── public/                 # Static assets
│   ├── favicon.svg        # App favicon
│   └── index.html         # HTML template
├── src/
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── common/       # Shared/reusable components
│   │   ├── course/       # Course-related components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── profile/      # User profile components
│   │   └── settings/     # Settings components
│   ├── data/             # Mock data and API responses
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # Global styles and CSS
│   ├── utils/            # Utility functions
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── .eslintrc.cjs         # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration
└── README.md           # Project documentation
```

## 🎨 Component Architecture

### Core Components
- **App.jsx** - Main application container with routing logic
- **Header** - Navigation bar with search and user menu
- **Sidebar** - Collapsible navigation sidebar
- **Modal** - Reusable modal component for AI interactions

### Feature Components
- **ContentView** - Course content with tabs (lessons, videos, flashcards, etc.)
- **TopicsGrid** - Course catalog with filtering and search
- **LearningPathGenerator** - AI-powered course recommendation engine
- **ProgressView** - Learning analytics and progress tracking

### Utility Components
- **AnimatedGradientText** - Gradient text animations
- **SuccessToast** - Success notification component
- **Flashcard** - 3D flip card component for study materials

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_API_BASE_URL=https://api.edumaster.com
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# App Configuration
VITE_APP_NAME=EduMaster
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_ANALYTICS=false
```

### Theme Configuration
The app supports automatic dark/light theme switching based on system preferences. Themes are managed through CSS custom properties and the `useTheme` hook.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Build
```bash
npm run build
# Deploy the 'dist' directory to your hosting provider
```

## 📱 Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and component patterns
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Test your changes across different screen sizes
- Ensure accessibility standards are maintained

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**EduMaster Team**
- GitHub: [@ali-kin4](https://github.com/ali-kin4)
- Repository: [edumaster-app](https://github.com/ali-kin4/edumaster-app)

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Tailwind Labs** - For the beautiful Tailwind CSS framework
- **Lucide** - For the comprehensive icon library
- **Vite Team** - For the blazing-fast build tool

---

<div align="center">
  <h3>🌟 Star this repository if you found it helpful!</h3>
  <p>Made with ❤️ by the EduMaster team</p>
</div>