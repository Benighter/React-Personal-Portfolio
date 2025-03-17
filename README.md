# Bennet Nkolele Portfolio - React Version

![Portfolio Preview](public/img/portfolio-preview.png)

## Author
**Bennet Nkolele** - [Benighter](https://github.com/Benighter)

## Description
This is a modern, React-based version of my personal portfolio website. The site showcases my professional journey, skills, projects, and contact information in an elegant, responsive design with dark mode support. Built with React and TypeScript, this portfolio serves as both a professional introduction and a demonstration of my front-end development capabilities.

## Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle between light and dark themes for comfortable viewing in any environment
- **Interactive UI**: Smooth animations, transitions, and interactive components enhance user experience
- **Project Showcase**: Detailed carousel display of projects with descriptions, technologies used, and links
- **Skills Visualization**: Visual representation of technical skills with proficiency indicators
- **Contact Section**: Easy access to contact details and social media profiles
- **Resume Download**: One-click resume download option
- **Performance Optimized**: Fast loading times and optimized assets
- **Accessibility Focused**: WCAG compliant design elements for all users

## Technologies Used

- **React 18**: Modern component-based architecture
- **TypeScript**: Type-safe code for better development experience
- **CSS3/SCSS**: Custom styling with variables and mixins
- **React Hooks**: Functional component state management
- **React Router**: Seamless navigation between sections
- **Font Awesome**: High-quality icons
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Media queries and flexible layouts
- **LocalStorage**: Persisting user preferences (like dark mode)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Benighter/portfolio-react.git
   cd portfolio-react
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
portfolio-react/
├── public/
│   ├── img/           # Static images
│   ├── Resume/        # Resume files
│   ├── favicon.ico    # Site favicon
│   └── index.html     # HTML template
├── src/
│   ├── assets/        # Project assets
│   │   └── img/       # Images used in components
│   ├── components/    # React components
│   │   ├── Header/    # Navigation and site header
│   │   ├── Hero/      # Hero section with introduction
│   │   ├── Services/  # Services offered section
│   │   ├── Projects/  # Portfolio projects showcase
│   │   ├── Skills/    # Technical skills display
│   │   ├── About/     # About me section
│   │   ├── Contact/   # Contact information and form
│   │   ├── Footer/    # Site footer
│   │   └── common/    # Reusable UI components
│   ├── context/       # React context providers
│   │   └── ThemeContext.tsx  # Dark/light mode context
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   ├── styles/        # Global styles
│   │   ├── global.css # Global style rules
│   │   ├── variables.css # CSS variables
│   │   └── darkmode.css # Dark mode specific styles
│   ├── App.tsx        # Main App component
│   └── index.tsx      # Entry point
├── tsconfig.json      # TypeScript configuration
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## Customization

### Changing Content

Most of the portfolio content can be modified in the respective component files:

- Update personal information in `src/components/About/About.tsx`
- Modify projects in `src/components/Projects/Projects.tsx`
- Edit skills in `src/components/Skills/Skills.tsx`

### Styling

- Global styles are in `src/styles/global.css`
- Dark mode styles are in `src/styles/darkmode.css`
- Component-specific styles are co-located with their components

## Deployment

This site can be deployed to any static site hosting service:

### Build for Production

```
npm run build
# or
yarn build
```

This will create a `build` directory with optimized production files.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the build folder or connect to GitHub
- **GitHub Pages**: Deploy using GitHub Actions workflow
- **AWS S3/CloudFront**: For scalable static site hosting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

If you'd like to contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original design and development by Bennet Nkolele
- Icons from Font Awesome and Icons8
- Inspiration from modern portfolio design trends
- Special thanks to the React community for excellent documentation and resources 