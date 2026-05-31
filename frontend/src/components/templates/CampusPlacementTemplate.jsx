import React from 'react';

const CampusPlacementTemplate = ({ data, scale = 1, isPreview = false }) => {
    const {
        personalInfo,
        education,
        skills,
        experience,
        projects
    } = data || {};

    // ── Service-based company fresher dummy / fallback data ──
    const name = personalInfo?.fullName || 'Rahul Kumar Singh';
    const email = personalInfo?.email || 'rahul.singh2024@gmail.com';
    const phone = personalInfo?.phone || '+91-8765432109';
    const linkedin = personalInfo?.linkedin || 'linkedin.com/in/rahulsingh2024';
    const github = personalInfo?.github || 'github.com/rahulsingh2024';
    const location = personalInfo?.location || personalInfo?.address || 'Hyderabad, Telangana';

    const educationData = education?.length > 0 ? education : [
        {
            institution: 'JNTUH College of Engineering, Hyderabad',
            degree: 'Bachelor of Technology',
            field: 'Computer Science and Engineering',
            gpa: '8.42 / 10.00',
            startDate: 'Aug 2020',
            endDate: 'May 2024'
        },
        {
            institution: 'Sri Chaitanya Junior College, Hyderabad',
            degree: 'Intermediate (Class XII)',
            field: 'Mathematics, Physics, Chemistry',
            gpa: '9.21 / 10.00',
            startDate: 'Jun 2018',
            endDate: 'Mar 2020'
        },
        {
            institution: 'Delhi Public School, Hyderabad',
            degree: 'SSC (Class X)',
            field: 'Secondary School Certificate',
            gpa: '9.56 / 10.00',
            startDate: 'Jun 2016',
            endDate: 'Mar 2018'
        }
    ];

    const skillsData = skills?.length > 0 ? skills : [
        { category: 'Programming Languages', items: 'Java, Python, C, SQL' },
        { category: 'Frontend', items: 'HTML, CSS, JavaScript, React.js' },
        { category: 'Backend', items: 'Node.js, Express.js, Spring Boot basics' },
        { category: 'Database', items: 'MySQL, MongoDB basics' },
        { category: 'Tools & Platforms', items: 'Git, GitHub, Docker basics, AWS basics, VS Code, Postman' }
    ];

    const internshipData = experience?.length > 0 ? experience : [
        {
            company: 'TCS iON',
            role: 'Web Development Intern',
            location: 'Hyderabad',
            startDate: 'Jan 2024',
            endDate: 'Apr 2024',
            achievements: [
                'Developed responsive student management portal with role-based authentication serving 500+ users across 3 departments.',
                'Implemented REST APIs using Node.js and Express.js, integrated MySQL database, and optimized query performance by 30%.'
            ]
        },
        {
            company: 'Infosys Springboard',
            role: 'Java Full Stack Intern',
            location: 'Remote',
            startDate: 'Jun 2023',
            endDate: 'Aug 2023',
            achievements: [
                'Built inventory management system using Java, Spring Boot, and MySQL with CRUD operations and PDF report generation.',
                'Designed RESTful API endpoints following best practices, achieving 95% test coverage through unit and integration testing.'
            ]
        }
    ];

    const projectsData = projects?.length > 0 ? projects : [
        {
            name: 'Online Examination System',
            achievements: [
                'Developed a responsive full-stack application with user authentication, timer-based quiz engine, and auto-grading functionality.',
                'Implemented REST APIs for question management and result analytics, supporting 200+ concurrent test sessions.'
            ],
            techStack: 'React.js, Node.js, Express.js, MySQL'
        },
        {
            name: 'AI Resume Analyzer',
            achievements: [
                'Built resume analysis tool using Python and NLP libraries to extract skills, compute ATS compatibility scores, and suggest improvements.',
                'Integrated keyword matching algorithm with 85% accuracy, processing 100+ resume formats with PDF and DOCX parsing.'
            ],
            techStack: 'Python, Flask, NLTK, SQLite'
        },
        {
            name: 'Hospital Management System',
            achievements: [
                'Created patient management platform with appointment booking, billing module, and doctor dashboard for 3 hospital departments.',
                'Implemented role-based access control and RESTful APIs with proper validation, achieving zero data inconsistency across 50+ test cases.'
            ],
            techStack: 'Java, Spring Boot, MySQL, Thymeleaf'
        }
    ];

    const certificationsData = data?.certifications?.length > 0 ? data.certifications : [
        { name: 'Java Programming — HackerRank (Gold Badge)', date: '2023' },
        { name: 'Python for Everybody — Coursera (University of Michigan)', date: '2023' },
        { name: 'AWS Cloud Practitioner Essentials — AWS Training', date: '2024' },
        { name: 'CCNA Introduction to Networks — Cisco Networking Academy', date: '2022' },
        { name: 'Database Management Systems — NPTEL (IIT Kharagpur)', date: '2023' },
        { name: 'Full Stack Development — Infosys Springboard', date: '2023' }
    ];

    const achievementsData = data?.achievements?.length > 0 ? data.achievements : [
        'Solved 450+ problems on LeetCode (Top 15% globally) and 300+ on GeeksforGeeks with strong DSA proficiency.',
        'Secured 2nd Place in College Hackathon 2023 — built real-time quiz platform with 50+ participants.',
        'Participated in Smart India Hackathon 2022 (SIH) — developed disaster management tracking prototype.',
        'Attained Academic Excellence Award — CGPA 8.42, ranked among top 10% of CSE department.',
        'Completed 5-day Advanced Java Workshop organized by Oracle Academy at JNTUH.'
    ];

    const codingProfilesData = data?.codingProfiles?.length > 0 ? data.codingProfiles : [
        { platform: 'LeetCode', detail: '450+ problems solved | Rating 1,650 | Top 15% Global' },
        { platform: 'HackerRank', detail: 'Gold Badge in Java | 5-Star in SQL | 200+ problems solved' },
        { platform: 'GeeksforGeeks', detail: '300+ problems solved | Institute Rank #12 | Potd streak 90+ days' },
        { platform: 'CodeChef', detail: '2-Star coder | 150+ problems solved | Long Challenge participant' }
    ];

    const extraCurricularData = data?.extraCurricular?.length > 0 ? data.extraCurricular : [
        'Coordinator — CSE Technical Club (organized 8 workshops on DSA, Web Dev, and Cloud Computing for 200+ students).',
        'Team Lead — College Cricket Team (led inter-college tournament, fostering collaboration and strategic planning).',
        'Volunteer — National Service Scheme (NSS) — participated in 5 community drives including digital literacy campaigns.',
        'Member — ACM Student Chapter — attended 3 national conferences and contributed to open-source documentation projects.'
    ];

    // ── Design System ──
    const fonts = "'Calibri', 'Inter', 'Helvetica', 'Arial', sans-serif";

    const page = {
        width: '210mm',
        maxHeight: '297mm',
        overflow: 'hidden',
        background: '#ffffff',
        fontFamily: fonts,
        color: '#1a1a1a',
        padding: '12mm 15mm 8mm 15mm',
        boxSizing: 'border-box',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'relative',
        lineHeight: '1.35'
    };

    const nameStyle = {
        fontSize: '20px',
        fontWeight: '700',
        letterSpacing: '-0.3px',
        color: '#000000',
        lineHeight: '1.1',
        marginBottom: '2px'
    };

    const contactStyle = {
        fontSize: '8.5px',
        color: '#444444',
        lineHeight: '1.45',
        marginBottom: '6px',
        letterSpacing: '0.1px'
    };

    const contactLink = {
        color: '#444444',
        textDecoration: 'none'
    };

    const sectionTitle = {
        fontSize: '10px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#000000',
        borderBottom: '1.5px solid #222222',
        paddingBottom: '2px',
        marginBottom: '4px',
        marginTop: '0px',
        lineHeight: '1'
    };

    const sectionWrap = {
        marginBottom: '6px'
    };

    const dividerStyle = {
        borderBottom: '1px solid #cccccc',
        marginTop: '8px',
        marginBottom: '8px',
        width: '100%'
    };

    const bulletStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1a1a1a',
        paddingLeft: '10px',
        position: 'relative',
        marginBottom: '1px'
    };

    const bulletDot = {
        position: 'absolute',
        left: '0px',
        top: '4px',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: '#1a1a1a'
    };

    const jobHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '1.5px',
        lineHeight: '1'
    };

    const companyStyle = {
        fontSize: '9.5px',
        fontWeight: '700',
        color: '#000000'
    };

    const roleLocationStyle = {
        fontSize: '8.5px',
        color: '#555555',
        marginLeft: '4px'
    };

    const dateStyle = {
        fontSize: '8.5px',
        color: '#555555',
        fontWeight: '500',
        whiteSpace: 'nowrap'
    };

    const projectHeaderStyle = {
        fontSize: '9.5px',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '1.5px',
        lineHeight: '1'
    };

    const techStackStyle = {
        fontSize: '7.5px',
        color: '#777777',
        marginTop: '1.5px',
        lineHeight: '1.3',
        fontStyle: 'normal'
    };

    const skillCategoryStyle = {
        fontSize: '8.5px',
        lineHeight: '1.42',
        marginBottom: '1px',
        color: '#1a1a1a'
    };

    const skillLabelStyle = {
        fontWeight: '700',
        color: '#000000',
        marginRight: '3px'
    };

    const eduRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '0.5px',
        lineHeight: '1'
    };

    const eduInstitutionStyle = {
        fontSize: '9.5px',
        fontWeight: '700',
        color: '#000000'
    };

    const eduDetailStyle = {
        fontSize: '8.5px',
        color: '#555555',
        marginBottom: '0.5px',
        lineHeight: '1.3'
    };

    const certItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1a1a1a',
        marginBottom: '1px'
    };

    const achievementItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1a1a1a',
        paddingLeft: '10px',
        position: 'relative',
        marginBottom: '1px'
    };

    const codingProfileItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        marginBottom: '1px',
        color: '#1a1a1a'
    };

    const codingPlatformStyle = {
        fontWeight: '700',
        color: '#000000',
        marginRight: '4px'
    };

    const extraCurricularItemStyle = {
        fontSize: '8.5px',
        lineHeight: '1.38',
        color: '#1a1a1a',
        paddingLeft: '10px',
        position: 'relative',
        marginBottom: '1px'
    };

    // Build visible sections array
    const sections = [];

    // Education
    if (educationData && educationData.length > 0) {
        sections.push({
            key: 'education',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Education</div>
                    {educationData.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '2px' }}>
                            <div style={eduRowStyle}>
                                <span style={eduInstitutionStyle}>{edu.institution}</span>
                                <span style={dateStyle}>{edu.startDate} — {edu.endDate}</span>
                            </div>
                            <div style={eduDetailStyle}>
                                {edu.degree} in {edu.field}{edu.gpa ? ` | CGPA: ${edu.gpa}` : ''}
                            </div>
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Technical Skills
    if (skillsData && skillsData.length > 0) {
        sections.push({
            key: 'skills',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Technical Skills</div>
                    {skillsData.map((skill, i) => (
                        <div key={i} style={skillCategoryStyle}>
                            <span style={skillLabelStyle}>{skill.category}:</span>
                            <span>{skill.items || skill.name}</span>
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Internship Experience
    if (internshipData && internshipData.length > 0) {
        sections.push({
            key: 'internships',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Internship Experience</div>
                    {internshipData.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '4px' }}>
                            <div style={jobHeaderStyle}>
                                <span>
                                    <span style={companyStyle}>{exp.company}</span>
                                    <span style={roleLocationStyle}> · {exp.role} · {exp.location}</span>
                                </span>
                                <span style={dateStyle}>{exp.startDate} — {exp.endDate}</span>
                            </div>
                            {(exp.achievements || []).map((a, j) => (
                                <div key={j} style={bulletStyle}>
                                    <div style={bulletDot} />
                                    {a}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Academic Projects
    if (projectsData && projectsData.length > 0) {
        sections.push({
            key: 'projects',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Academic Projects</div>
                    {projectsData.map((proj, i) => (
                        <div key={i} style={{ marginBottom: '3px' }}>
                            <div style={projectHeaderStyle}>{proj.name}</div>
                            {(proj.achievements || []).map((a, j) => (
                                <div key={j} style={bulletStyle}>
                                    <div style={bulletDot} />
                                    {a}
                                </div>
                            ))}
                            {proj.techStack && (
                                <div style={techStackStyle}>
                                    <span style={{ fontWeight: '600', color: '#555555' }}>Tech Stack:</span> {proj.techStack}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Certifications
    if (certificationsData && certificationsData.length > 0) {
        sections.push({
            key: 'certifications',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Certifications</div>
                    {certificationsData.map((cert, i) => (
                        <div key={i} style={certItemStyle}>
                            <span style={{ fontWeight: '700', color: '#000000' }}>{cert.name}</span>
                            {cert.date && <span style={{ color: '#555555' }}> — {cert.date}</span>}
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Achievements
    if (achievementsData && achievementsData.length > 0) {
        sections.push({
            key: 'achievements',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Achievements</div>
                    {achievementsData.map((ach, i) => (
                        <div key={i} style={achievementItemStyle}>
                            <div style={bulletDot} />
                            {ach}
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Coding Profiles
    if (codingProfilesData && codingProfilesData.length > 0) {
        sections.push({
            key: 'codingProfiles',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Coding Profiles</div>
                    {codingProfilesData.map((profile, i) => (
                        <div key={i} style={codingProfileItemStyle}>
                            <span style={codingPlatformStyle}>{profile.platform}</span>
                            <span>{profile.detail}</span>
                        </div>
                    ))}
                </div>
            )
        });
    }

    // Extra-Curricular Activities
    if (extraCurricularData && extraCurricularData.length > 0) {
        sections.push({
            key: 'extraCurricular',
            content: (
                <div style={sectionWrap}>
                    <div style={sectionTitle}>Extra-Curricular Activities</div>
                    {extraCurricularData.map((item, i) => (
                        <div key={i} style={extraCurricularItemStyle}>
                            <div style={bulletDot} />
                            {item}
                        </div>
                    ))}
                </div>
            )
        });
    }

    // ── Render ──
    return (
        <div style={isPreview ? { ...page, maxHeight: 'none', overflow: 'visible' } : page}>
            {/* ── HEADER ── */}
            <div style={nameStyle}>{name}</div>
            <div style={contactStyle}>
                <span>{email}</span>
                <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                <span>{phone}</span>
                <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                <span style={contactLink}>{linkedin}</span>
                <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                <span style={contactLink}>{github}</span>
                <span style={{ margin: '0 6px', color: '#cccccc' }}>|</span>
                <span>{location}</span>
            </div>

            {/* ── SECTIONS WITH DIVIDERS ── */}
            {sections.map((section, index) => (
                <React.Fragment key={section.key}>
                    {section.content}
                    {index < sections.length - 1 && <div style={dividerStyle} />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default CampusPlacementTemplate;
