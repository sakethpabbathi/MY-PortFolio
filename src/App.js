import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const sectionsRef = useRef([]);
  // State to track which sections have been viewed to prevent re-animation on scroll up
  const [animatedSections, setAnimatedSections] = useState({});
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { name: 'Home', id: 'home', content: 'home' },
    { name: 'About', id: 'about', content: 'about' },
    { name: 'Experience', id: 'experience', content: 'experience' },
    { name: 'Projects', id: 'projects', content: 'projects' },
    { name: 'Skills', id: 'skills', content: 'skills' },
    { name: 'Contact', id: 'contact', content: 'contact' },
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
            // Optional: You can unobserve an element once it has been animated
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // Triggers when 20% of the section is visible
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  // Your existing scroll-based active section logic remains the same
  const handleScroll = () => {
    const pageYOffset = window.pageYOffset;
    let newActiveSection = null;

    sectionsRef.current.forEach((section, index) => {
      if (section) {
        const { offsetTop, offsetHeight } = section;
        const sectionTop = offsetTop - 100;
        const sectionBottom = sectionTop + offsetHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
          newActiveSection = index;
        }
      }
    });

    if (newActiveSection !== null && newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (index) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Your data objects remain unchanged
  const projectData = [
    {
      id: 1,
      title: "Web Development",
      description: "Built a Full-Stack E-Commerce Web Application",
      icon: "fa-solid fa-laptop-code",
      url: "https://frontend-uoj7.onrender.com/Rathamapp.html"
      
    },
    {
      id: 2,
      title: "Google-Search-Clone",
      description: "Built a functional Google Search clone using React.js with a clean UI.",
      icon: "fa-brands fa-google",
      url:"https://google-search-clone-eo1l.onrender.com"
    },
    {
      id: 3,
      title: "TO-DO-LIST",
      description: "Developed a To-Do List app to manage tasks with add and delete functionality.",
      icon: "fa-solid fa-tasks",
      url:"https://to-do-list-app-a3ng.onrender.com"
    },
    {
      id: 4,
      title: "Excel-Sheet to WhatsApp Message",
      description: "Built an Excel-to-WhatsApp integration tool with file upload, data display, and whatsapp messaging using React.JS Node.JS, Express.JS",
      icon: "fa-solid fa-file-excel"
    },
    
  ];

  const skillsData = [
    { name: 'HTML', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Javascript', level: 95 },
    { name: 'CSS', level: 90 },
    { name: 'Node.js', level: 75 },
    { name: 'Express.js', level: 70 },
    { name: 'MYSQL', level: 70 },
    { name: 'PostgrySql', level: 70 },
    { name: 'Git', level: 85 },
  ];

  const experienceData = [
    {
      id: 1,
      title: "Software Developer Intern",
      company: "Tagsol Nova CodeNeuro Pvt.Ltd.",
      dates: "July 2025 - Present",
      responsibilities: [
        "Developed and modified school and college-based web application including Fee Management & Automatic attendence using React.js and Node.js.",
        "Designed and implemented scalable , end-to-end solutions using ReactJs,NodeJS,MySql gaining extensive hands-on experience in full stack development and database integration",
        "Optimized existing codebases, resolved critical bugs, and enhanced UI/UX,leading to an increase in iser adoption and client satisfaction .",
      ],
    },
  ];

  const getSectionContent = (id) => {
    switch (id) {
      case 'home':
        return (
          <div className="home-section section-content">
            <p className={`home-greeting animate-fade-in-up ${animatedSections.home ? 'is-visible' : ''}`}>Hello,</p>
            <h1 className={`home-title animate-fade-in-up delay-200 ${animatedSections.home ? 'is-visible' : ''}`}>
              I'm <span className="highlight-text">Pabbathi Saketh</span>
            </h1>
            <p className={`home-job-title animate-fade-in-up delay-400 ${animatedSections.home ? 'is-visible' : ''}`}>
              FullStack Web Developer
            </p>
            <p className={`home-location animate-fade-in-up delay-600 ${animatedSections.home ? 'is-visible' : ''}`}>From Hyderabad</p>
            <a
              href="#contact"
              className={`button-primary animate-fade-in-up delay-800 ${animatedSections.home ? 'is-visible' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(5);
              }}
            >
              Hire Me
            </a>
          </div>
        );

      case 'about':
        return (
          <div className="about-section section-content">
            <h2 className={`section-title animate-slide-in-left ${animatedSections.about ? 'is-visible' : ''}`}>About Me</h2>
            <div className={`about-content-grid animate-fade-in delay-200 ${animatedSections.about ? 'is-visible' : ''}`}>
              <div className={`profile-image-container animate-scale-in ${animatedSections.about ? 'is-visible' : ''}`}>
                <img
                  src="/sakethportsizephoto.jpg"
                  alt="Pabbathi Saketh Profile"
                  className="profile-image"
                />
              </div>
              <div className="about-text-container">
                <p className={`animate-fade-in-up delay-400 ${animatedSections.about ? 'is-visible' : ''}`}>
                  I am a Master of Computer Science graduate with hands-on experience in full-stack web development.
                  I have completed an internship specializing in React.js and Node.js, where I worked on building scalable and responsive web applications.
                  With professional work experience, I bring strong expertise in both frontend and backend technologies, along with database management and deployment.
                </p>
                <p className={`animate-fade-in-up delay-600 ${animatedSections.about ? 'is-visible' : ''}`}>
                  I am passionate about solving real-world problems through efficient coding, and optimized database solutions.
                  I am eager to contribute to innovative projects, enhance user experiences, and grow as a software developer.
                </p>
                <div className={`about-details animate-fade-in-up delay-800 ${animatedSections.about ? 'is-visible' : ''}`}>
                  <p><strong><i className="fas fa-map-marker-alt"></i> Location:</strong> Hyderabad, India</p>
                  <p><strong><i className="fas fa-briefcase"></i> Role:</strong> Full-Stack Developer</p>
                </div>
                <a
                  href="./PabbathiSakethresume.pdf"
                  download
                  className={`button-primary mt-6 animate-fade-in-up delay-1000 ${animatedSections.about ? 'is-visible' : ''}`}
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="experience-section section-content">
            <h2 className={`section-title animate-slide-in-left ${animatedSections.experience ? 'is-visible' : ''}`}>Work Experience</h2>
            <div className="experience-list">
              {experienceData.map((job, index) => (
                <div key={job.id} className={`experience-card animate-fade-in-right delay-${index * 100} ${animatedSections.experience ? 'is-visible' : ''}`} style={{ animationDelay: animatedSections.experience ? `${index * 200 + 100}ms` : '' }}>
                  <div className="experience-header">
                    <h3 className="job-title">{job.title}</h3>
                    <span className="job-dates">{job.dates}</span>
                  </div>
                  <p className="company-name">{job.company}</p>
                  <ul className="job-responsibilities">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="projects-section section-content">
            <h2 className={`section-title animate-slide-in-left ${animatedSections.projects ? 'is-visible' : ''}`}>My Projects</h2>
            <div className="projects-grid">
              {projectData.map((project, index) => (
                <div key={project.id} className={`project-card animate-scale-in delay-${index * 100} ${animatedSections.projects ? 'is-visible' : ''}`} style={{ animationDelay: animatedSections.projects ? `${index * 150}ms` : '' }}>
                  <div className="project-icon-container">
                    <i className={`${project.icon} project-icon`}></i>
                  </div>
                  <div className="project-details">
                    
                    {/* <h3 className="project-title">{project.title}</h3> */}
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                      <h3 className="project-title">{project.title}</h3>
                    </a>
                    
                    <p className="project-description">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="skills-section section-content">
            <h2 className={`section-title animate-slide-in-left ${animatedSections.skills ? 'is-visible' : ''}`}>My Skills</h2>
            <div className={`skills-card animate-fade-in delay-200 ${animatedSections.skills ? 'is-visible' : ''}`}>
              {skillsData.map((skill, index) => (
                <div key={index} className={`skill-item animate-fade-in-up delay-200 ${animatedSections.skills ? 'is-visible' : ''}`} style={{ animationDelay: animatedSections.skills ? `${200 + index * 100}ms` : '' }}>
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-background">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="contact-section section-content">
            <h2 className={`section-title animate-slide-in-left ${animatedSections.contact ? 'is-visible' : ''}`}>Get in Touch</h2>
            <div className={`contact-card animate-fade-in delay-200 ${animatedSections.contact ? 'is-visible' : ''}`}>
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-field"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-field"
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="input-field"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="button-primary"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container animated-bg">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');

          :root {
            --bg-color: #0d1117;
            --card-bg-color: #161b22;
            --text-color: #f0f6fc;
            --highlight-color: #58a6ff;
            --subtle-highlight: #c9d1d9;
            --blue-gradient: linear-gradient(90deg, #6495ED, #4A73E8);
            --footer-bg-color: #0c1015;
          }

          body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            color: var(--text-color);
            scroll-behavior: smooth;
          }

          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .animated-bg {
            background: linear-gradient(-45deg, #0d1117, #161b22, #0d1117, #21262d);
            background-size: 400% 400%;
            animation: gradient-animation 15s ease infinite;
          }

          @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* --- Navigation --- */
          .nav {
            position: fixed;
            top: 1rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 50;
            width: 100%;
            max-width: 40rem;
            padding: 0.5rem;
            background-color: rgba(33, 38, 45, 0.8);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 9999px;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
          }
          @media (min-width: 768px) {
            .nav { max-width: 32rem; }
          }
          @media (min-width: 1024px) {
            .nav { max-width: 40rem; }
          }
          .nav-item a {
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-weight: bold;
            transition: all 0.3s ease;
            text-decoration: none;
            color: var(--subtle-highlight);
          }
          .nav-item a:hover {
            background-color: #1a1e24;
            color: var(--text-color);
          }
          .nav-item .active {
            background-color: var(--highlight-color);
            color: #ffffff;
            box-shadow: 0 4px 10px rgba(74, 115, 232, 0.4);
          }

          /* --- General Section & Content --- */
          main {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .section-container {
            width: 100%;
            padding: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .section-content {
            padding: 1.5rem;
            width: 100%;
            max-width: 72rem;
            margin: auto;
          }
          .section-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--text-color);
            margin-bottom: 3rem;
            text-align: center;
          }
          .highlight-text {
            color: var(--highlight-color);
          }
          .highlight-text-light {
            color: var(--subtle-highlight);
          }

          /* --- Home Section --- */
          .home-section {
            height: 100vh;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .home-greeting {
            font-size: 2rem;
            font-weight: 400;
          }
          .home-title {
            font-size: 3rem;
            font-weight: 800;
            color: var(--text-color);
            margin: 0.5rem 0;
          }
          .home-job-title {
            font-size: 1.75rem;
            font-weight: 600;
            color: var(--highlight-color);
            margin: 0.5rem 0;
          }
          .home-location {
            font-size: 1.125rem;
            color: var(--subtle-highlight);
            margin: 0.5rem 0 2rem;
          }
          @media (min-width: 768px) {
            .home-title { font-size: 4rem; }
            .home-job-title { font-size: 2rem; }
          }
          @media (min-width: 1024px) {
            .home-title { font-size: 5rem; }
            .home-job-title { font-size: 2.25rem; }
          }

          /* --- About Section - New Layout --- */
          .about-content-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            align-items: center;
            background-color: var(--card-bg-color);
            border-radius: 1.5rem;
            padding: 2rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
          }
          @media (min-width: 768px) {
            .about-content-grid {
              grid-template-columns: 1fr 2fr;
              padding: 3rem;
              text-align: left;
            }
          }
          .profile-image-container {
            position: relative;
            width: 100%;
            max-width: 12rem;
            justify-self: center;
          }
          .profile-image {
            width: 100%;
            height: auto;
            border-radius: 1.5rem;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .profile-image:hover {
            transform: scale(1.35);
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
          }
          .about-text-container {
            color: var(--subtle-highlight);
          }
          .about-text-container p {
            margin-bottom: 1rem;
            line-height: 1.6;
          }
          .about-details {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            font-size: 0.9rem;
            color: var(--highlight-color);
          }
          .about-details strong {
            color: var(--text-color);
            font-weight: 600;
          }

          /* --- Experience Section --- */
          .experience-list {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            width: 100%;
            max-width: 48rem;
            margin: auto;
          }
          .experience-card {
            background-color: var(--card-bg-color);
            border-radius: 1.5rem;
            padding: 2rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
          }
          .experience-card:hover {
            transform: translateY(-5px);
          }
          .experience-header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          @media (min-width: 640px) {
            .experience-header {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
          }
          .job-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--highlight-color);
          }
          .company-name {
            font-size: 1.125rem;
            color: var(--subtle-highlight);
            font-weight: 500;
            margin-top: 0.5rem;
          }
          .job-dates {
            color: var(--subtle-highlight);
            font-size: 0.875rem;
            font-weight: 400;
            margin-top: 0.5rem;
          }
          .job-responsibilities {
            list-style: none;
            padding: 0;
            margin-top: 1.5rem;
            color: var(--subtle-highlight);
          }
          .job-responsibilities li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.75rem;
          }
          .job-responsibilities li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--highlight-color);
            font-weight: bold;
          }

          /* --- Projects Section --- */
          .projects-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          @media (min-width: 768px) {
            .projects-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .projects-grid { grid-template-columns: repeat(3, 1fr); }
          }
          .project-card {
            background-color: var(--card-bg-color);
            border-radius: 1.5rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-align: center;
            padding: 2rem 1.5rem;
          }
          .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
          }
          .project-icon-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            background-color: var(--highlight-color);
            margin: 0 auto 1.5rem;
            transition: all 0.3s ease;
          }
          .project-card:hover .project-icon-container {
            background-color: var(--subtle-highlight);
          }
          .project-icon {
            font-size: 1.5rem;
            color: var(--bg-color);
          }
          .project-details { padding: 1.5rem 0 0; }
          .project-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--highlight-color);
            margin-bottom: 0.5rem;
          }
          .project-description { color: var(--subtle-highlight); }

          /* --- Skills Section --- */
          .skills-card {
            width: 100%;
            max-width: 42rem;
            background-color: rgba(33, 38, 45, 0.5);
            backdrop-filter: blur(10px);
            border-radius: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            margin: auto;
          }
          .skill-item { margin-bottom: 1.5rem; }
          .skill-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
          }
          .skill-name { font-size: 1.125rem; font-weight: 500; }
          .skill-level { font-size: 0.875rem; font-weight: 600; color: var(--highlight-color); }
          .skill-bar-background {
            width: 100%;
            height: 0.75rem;
            background-color: #21262d;
            border-radius: 9999px;
          }
          .skill-bar-fill {
            height: 100%;
            background-color: var(--highlight-color);
            border-radius: 9999px;
            transition: width 1s ease-in-out;
          }

          /* --- Contact Section --- */
          .contact-card {
            width: 100%;
            max-width: 28rem;
            background-color: rgba(33, 38, 45, 0.5);
            backdrop-filter: blur(10px);
            border-radius: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            margin: auto;
          }
          .contact-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          .form-group {
            display: flex;
            flex-direction: column;
          }
          .form-label {
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            color: var(--subtle-highlight);
          }
          .input-field {
            background-color: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            padding: 0.75rem;
            border-radius: 0.75rem;
            transition: border-color 0.3s ease, background-color 0.3s ease;
          }
          .input-field::placeholder { color: #9ca3af; }
          .input-field:focus {
            outline: none;
            border-color: var(--highlight-color);
            background-color: rgba(255, 255, 255, 0.1);
          }
          textarea.input-field { min-height: 8rem; resize: vertical; }

          /* --- Buttons & Links --- */
          .button-primary {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: var(--blue-gradient);
            color: #ffffff;
            font-weight: bold;
            text-decoration: none;
            text-align: center;
            border-radius: 9999px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
          }
          .button-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          }
          .button-primary:focus {
            outline: none;
            box-shadow: 0 0 0 4px rgba(74, 115, 232, 0.5);
          }

          /* --- Footer --- */
          .footer {
            background-color: var(--footer-bg-color);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding: 2rem 1.5rem;
            text-align: center;
            color: var(--subtle-highlight);
            margin-top: auto;
          }
          .footer-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            max-width: 72rem;
            margin: auto;
          }
          .social-links {
            display: flex;
            gap: 1.5rem;
          }
          .social-links a {
            color: var(--subtle-highlight);
            font-size: 1.5rem;
            transition: color 0.3s ease;
          }
          .social-links a:hover {
            color: var(--highlight-color);
          }
          .footer-text {
            font-size: 0.875rem;
            line-height: 1.5;
          }

          /* --- ANIMATION STYLES (MODIFIED) --- */
          .animate-fade-in-up,
          .animate-slide-in-left,
          .animate-fade-in-right,
          .animate-scale-in,
          .animate-fade-in {
            opacity: 0;
          }

          .animate-fade-in-up {
            transform: translateY(20px);
            transition: opacity 1s ease-out, transform 1s ease-out;
          }
          .animate-slide-in-left {
            transform: translateX(-50px);
            transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .animate-fade-in-right {
            transform: translateX(50px);
            transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .animate-scale-in {
            transform: scale(0.9);
            transition: opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
          .animate-fade-in {
            transition: opacity 1s ease-in;
          }
          
          .is-visible {
            opacity: 1 !important;
            transform: none !important;
          }

          .delay-200 { transition-delay: 0.2s; }
          .delay-400 { transition-delay: 0.4s; }
          .delay-600 { transition-delay: 0.6s; }
          .delay-800 { transition-delay: 0.8s; }
          .delay-1000 { transition-delay: 1s; }
        `}
      </style>

      <nav className="nav">
        <ul>
          {sections.map((section, index) => (
            <li key={section.id} className="nav-item">
              <a
                href={`#${section.id}`}
                className={activeSection === index ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(index);
                }}
              >
                {section.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={el => sectionsRef.current[index] = el}
            className="section-container"
          >
            {getSectionContent(section.id)}
          </section>
        ))}
      </main>

      <footer className="footer">
        <div className="footer-content">
          {/* <p className="footer-text">
            Crafted with <i className="fas fa-heart text-red-500"></i> by Pabbathi Saketh.
          </p> */}
          <div className="social-links">
            <a href="https://github.com/sakethpabbathi" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/pabbathi-saketh-12a8522a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com/PabbathiSaketh" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="mailto:pabbathisaketh123@gmail.com">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="tel:+919347719244">
              <i className="fa-solid fa-phone"></i>
            </a>
          </div>
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Pabbathi Saketh. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;



