import React, { useState } from 'react';
import { 
  ChevronDown, 
  Smartphone, 
  Mail, 
  MapPin, 
  Download,
  Building2,
  Code,
  GraduationCap,
  Award,
  User,
  Briefcase,
  Rocket,
  ExternalLink,
  Calendar,
  Linkedin,
  Github
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './CV.css';

const CV = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const projects = [
    {
      title: 'Color Switch Clone',
      description: 'An addictive arcade game where players navigate a ball through color-coded obstacles.',
      link: 'https://color-switch-clone.vercel.app/'
    },
    {
      title: 'Weather Nexus',
      description: 'A weather application providing real-time weather data and forecasts.',
      link: 'https://benighter.github.io/Weather-App/'
    },
    {
      title: 'Neolex',
      description: 'A modern legal research platform with advanced search capabilities.',
      link: 'https://benighter.github.io/Dictionary/'
    },
    {
      title: 'Trivia Game',
      description: 'An interactive trivia game with multiple categories.',
      link: 'https://benighter.itch.io/trivia-master'
    },
    {
      title: 'Movie Site',
      description: 'A movie database website with comprehensive film information.',
      link: 'https://benighter.github.io/Movie-site/'
    },
    {
      title: 'Clock App',
      description: 'A digital clock with alarm and timer functionality.',
      link: 'https://futuristic-clock.vercel.app/'
    }
  ];
  
  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setTimeout(() => setIsPrinting(false), 1000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    const cvElement = document.getElementById('cv-container');
    
    if (!cvElement) {
      console.error("CV container element not found");
      setIsDownloading(false);
      return;
    }

    // HTML to PDF conversion using html2canvas and jsPDF
    const generatePDF = async () => {
      try {
        // Get the height and width of the CV element
        const canvas = await html2canvas(cvElement, { 
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;

        pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('Bennet_Nkolele_CV.pdf');
        
        setIsDownloading(false);
      } catch (error) {
        console.error("Error generating PDF: ", error);
        setIsDownloading(false);
      }
    };

    // Execute the PDF generation
    generatePDF();
  };

  return (
    <div id="cv-container" className={`max-w-5xl mx-auto p-8 md:p-10 font-sans text-gray-700 bg-white shadow-lg rounded-xl ${isPrinting ? 'print-mode' : ''}`}>
      {/* Download/Print Buttons */}
      <div className="fixed bottom-6 right-6 print:hidden flex gap-3">
        <button 
          onClick={handlePrint} 
          className="flex items-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-full font-medium shadow-lg hover:translate-y-1 transition-all"
        >
          <Download size={18} />
          Print CV
        </button>
        <button 
          onClick={handleDownload} 
          disabled={isDownloading}
          className={`flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-full font-medium shadow-lg hover:translate-y-1 transition-all ${isDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          <Download size={18} />
          {isDownloading ? 'Preparing PDF...' : 'Download PDF'}
        </button>
      </div>
      
      {/* ===== HEADER SECTION ===== */}
      <div className="text-center mb-8 pb-6 border-b-2 border-indigo-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-1 text-indigo-600 tracking-wide">Bennet Nkolele</h1>
        <h2 className="text-xl md:text-2xl font-medium text-gray-600 mb-6 tracking-wide">Junior Fullstack Developer</h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Smartphone size={16} className="text-indigo-600" />
            <span>+27 81 090 3232</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={16} className="text-indigo-600" />
            <a href="mailto:bennet.nkolele1998@gmail.com" className="hover:text-indigo-600 transition-colors">bennet.nkolele1998@gmail.com</a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-indigo-600" />
            <span>Marshalltown, Johannesburg</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Linkedin size={16} className="text-indigo-600" />
            <a href="https://linkedin.com/in/bennet-nkolele-321285249" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
              linkedin.com/in/bennet-nkolele-321285249
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Github size={16} className="text-indigo-600" />
            <a href="https://github.com/Benighter" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
              github.com/Benighter
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ExternalLink size={16} className="text-indigo-600" />
            <a href="https://react-personal-portfolio-alpha.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
              benighter.github.io/PersonalPortfolio
            </a>
          </div>
        </div>
      </div>
      
      {/* ===== PROFILE SECTION ===== */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6 shadow-sm hover:translate-y-1 transition-all">
        <h3 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-3 pb-2 border-b-2 border-indigo-100">
          <div className="bg-indigo-100 p-1.5 rounded-lg">
            <User size={18} className="text-indigo-600" />
          </div>
          Profile Summary
        </h3>
        <div className="pl-2">
          <p className="leading-relaxed text-gray-600">
            Full-stack developer with expertise in front-end and back-end technologies. I build interactive websites, mobile apps, and automation tools. Detail-oriented and adaptable, I am passionate about technology and education. I hold a TEFL Certificate and continuously expand my knowledge through self-taught courses and formal education.
          </p>
        </div>
      </div>
      
      {/* ===== SKILLS SECTION ===== */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6 shadow-sm hover:translate-y-1 transition-all">
        <h3 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-3 pb-2 border-b-2 border-indigo-100">
          <div className="bg-indigo-100 p-1.5 rounded-lg">
            <Code size={18} className="text-indigo-600" />
          </div>
          Key Skills
        </h3>
        <div className="pl-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-600 mb-2 flex items-center text-base">
                <span className="text-indigo-600 text-xl mr-2">•</span>
                Programming
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Python</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">JavaScript</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-600 mb-2 flex items-center text-base">
                <span className="text-indigo-600 text-xl mr-2">•</span>
                Web Development
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">HTML</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">CSS</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">React</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Angular</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-600 mb-2 flex items-center text-base">
                <span className="text-indigo-600 text-xl mr-2">•</span>
                Backend & Databases
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Node.js</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Express.js</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">PostgreSQL</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Spring Boot</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-600 mb-2 flex items-center text-base">
                <span className="text-indigo-600 text-xl mr-2">•</span>
                Tools & Practices
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Git</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">GitHub</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">VS Code</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Postman</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Thunder Client</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Figma</span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Microsoft Office</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-600 mb-2 flex items-center text-base">
              <span className="text-indigo-600 text-xl mr-2">•</span>
              Soft Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Problem Solving</span>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Teamwork & Collaboration</span>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Clear Communication</span>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Leadership</span>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Adaptability</span>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Time Management</span>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Interpersonal Skills</span>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Teaching & Training</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* ===== EXPERIENCE SECTION ===== */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6 shadow-sm hover:translate-y-1 transition-all">
        <h3 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-3 pb-2 border-b-2 border-indigo-100">
          <div className="bg-indigo-100 p-1.5 rounded-lg">
            <Briefcase size={18} className="text-indigo-600" />
          </div>
          Professional Experience
        </h3>
        <div className="pl-2">
          <div className="mb-6 pb-6 border-b border-indigo-100">
            <div className="text-indigo-600 font-semibold text-base">Web Designer & Developer</div>
            <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm">
              <Building2 size={16} className="text-gray-400" />
              First Love Church, Johannesburg
            </div>
            <div className="flex items-center gap-2 text-gray-500 mb-3 text-sm">
              <Calendar size={14} />
              2021 – Present
            </div>
            <div className="pl-4 relative mb-2 text-gray-600">
              <span className="absolute left-0 text-indigo-600 text-lg">•</span>
              Developed and maintained a user-friendly website to enhance design and functionality.
            </div>
            <div className="pl-4 relative text-gray-600">
              <span className="absolute left-0 text-indigo-600 text-lg">•</span>
              Improved the user experience using modern web development practices.
            </div>
          </div>
          
          <div>
            <div className="text-indigo-600 font-semibold text-base">Junior Fullstack Developer</div>
            <div className="flex items-center gap-2 text-gray-500 mb-3 text-sm">
              <Building2 size={16} className="text-gray-400" />
              Shaper (IT Systems Support Learnership Programme)
            </div>
            <div className="pl-4 relative mb-2 text-gray-600">
              <span className="absolute left-0 text-indigo-600 text-lg">•</span>
              Created a RESTful API for the MedSecura mobile app project.
            </div>
            <div className="pl-4 relative mb-2 text-gray-600">
              <span className="absolute left-0 text-indigo-600 text-lg">•</span>
              Developed back-end solutions with PostgreSQL and collaborated on front-end UI/UX improvements.
            </div>
            <div className="pl-4 relative text-gray-600">
              <span className="absolute left-0 text-indigo-600 text-lg">•</span>
              Worked closely with a team to deliver high-quality software solutions.
            </div>
          </div>
        </div>
      </div>
      
      {/* ===== EDUCATION SECTION ===== */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6 shadow-sm hover:translate-y-1 transition-all">
        <h3 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-3 pb-2 border-b-2 border-indigo-100">
          <div className="bg-indigo-100 p-1.5 rounded-lg">
            <GraduationCap size={18} className="text-indigo-600" />
          </div>
          Education
        </h3>
        <div className="pl-2">
          <div className="mb-5 pb-5 border-b border-indigo-100">
            <div className="text-indigo-600 font-semibold">University of Witwatersrand</div>
            <div className="text-gray-600 font-medium">BA in Digital Arts</div>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <Calendar size={14} />
              2018–2022
            </div>
          </div>
          
          <div className="mb-5 pb-5 border-b border-indigo-100">
            <div className="text-indigo-600 font-semibold">Additional Courses</div>
            <div className="text-gray-600">Programming Hub, Mimo, Coursera</div>
            <div className="text-gray-600">Princeton University: Computer Science – Programming with a Purpose (2024)</div>
          </div>
          
          <div>
            <div className="text-indigo-600 font-semibold">Ephes Mamkeli Secondary School</div>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <Calendar size={14} />
              2013–2017
            </div>
          </div>
        </div>
      </div>
      
      {/* ===== CERTIFICATIONS SECTION ===== */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6 shadow-sm hover:translate-y-1 transition-all">
        <h3 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-3 pb-2 border-b-2 border-indigo-100">
          <div className="bg-indigo-100 p-1.5 rounded-lg">
            <Award size={18} className="text-indigo-600" />
          </div>
          Certifications
        </h3>
        <div className="pl-2">
          <div className="flex flex-wrap gap-2">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Python</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">HTML</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">CSS</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">JavaScript</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Front-end Development</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Full-stack Development</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Data Analytics</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Cloud Computing</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">DevOps</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">Software Engineering</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">EF SET Certificate</span>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-100 font-medium hover:bg-indigo-100 transition-all">TEFL Certificate</span>
          </div>
        </div>
      </div>
      
      {/* ===== PROJECTS SECTION ===== */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6 shadow-sm hover:translate-y-1 transition-all">
        <h3 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-3 pb-2 border-b-2 border-indigo-100">
          <div className="bg-indigo-100 p-1.5 rounded-lg">
            <Rocket size={18} className="text-indigo-600" />
          </div>
          Projects
        </h3>
        <div className="pl-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="pb-4 border-b border-indigo-100">
                <div className="font-semibold text-gray-600 mb-1">{project.title}</div>
                <div className="pl-4 relative mb-3 text-gray-600 text-sm">
                  <span className="absolute left-0 text-indigo-600 text-lg">•</span>
                  {project.description}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs border border-indigo-100 font-medium hover:bg-indigo-100 transition-all"
                >
                  <ExternalLink size={12} />
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* ===== REFERENCES SECTION ===== */}
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:translate-y-1 transition-all">
        <h3 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-3 pb-2 border-b-2 border-indigo-100">
          <div className="bg-indigo-100 p-1.5 rounded-lg">
            <User size={18} className="text-indigo-600" />
          </div>
          References
        </h3>
        <div className="pl-2">
          <p className="text-gray-500 italic text-center">Available upon request</p>
        </div>
      </div>
    </div>
  );
};

export default CV; 