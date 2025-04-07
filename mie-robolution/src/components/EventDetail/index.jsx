import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Existing styled components (unchanged except for countdown-related adjustments)
const EventDetailSection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
  min-height: 100vh;
`;

const EventDetailContainer = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(198, 230, 5, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const EventImageContainer = styled.div`
  width: 100%;
  padding-top: 36.36%;
  position: relative;
  overflow: hidden;
`;

const EventImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EventContentContainer = styled.div`
  padding: 3rem;
`;

const EventTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(198, 230, 5, 0.1);
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  & svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const EventInfo = styled.div`
  margin-bottom: 2rem;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoLabel = styled.span`
  width: 150px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
`;

const InfoValue = styled.span`
  flex: 1;
  font-size: 1.1rem;
`;

const EventDescription = styled.div`
  margin-bottom: 2.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
`;

const EventNotice = styled.p`
  margin-top: 1rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.primary};
  background: rgba(198, 230, 5, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.5rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.heading};
  transition: all 0.3s ease;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  
  ${({ primary, theme }) => primary ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.dark};
    
    &:hover {
      background: ${theme.colors.primaryDark || '#b4cc04'};
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  ` : `
    border: 2px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: transparent;
    
    &:hover {
      background: rgba(198, 230, 5, 0.1);
      transform: translateY(-3px);
    }
  `}
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ListItem = styled.li`
  margin-bottom: 0.8rem;
  position: relative;
  padding-left: 1.5rem;
  
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem;
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.dark};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-width: 300px;
  opacity: 0;
  transform: translateY(-20px);
  animation: slideIn 0.3s forwards, fadeOut 0.3s 3s forwards;
  
  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`;

const PhasesSection = styled.div`
  margin-top: 3rem;
`;

const PhaseContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const PhaseTitle = styled.h3`
  color: ${({ theme }) => theme.colors.light};
  margin-bottom: 1rem;
`;

const PhaseDescription = styled.p`
  margin-bottom: 1rem;
`;

// Modified styled components for countdown timer to fix mobile UI
const CountdownContainer = styled.div`
  text-align: center;
  margin: 0 auto 2rem auto; /* Update margin to ensure horizontal centering */
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(198, 230, 5, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  
  @media (max-width: 480px) {
    max-width: 90%;
    padding: 0.8rem;
  }
`;

const CountdownTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const CountdownTimer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem; /* Reduced gap for mobile */
  font-size: 1.3rem; /* Slightly reduced font size */
  color: ${({ theme }) => theme.colors.light};

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const CountdownUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px; /* Reduced min-width for mobile */
  padding: 0.4rem; /* Reduced padding */
  background: rgba(198, 230, 5, 0.1);
  border-radius: 5px;

  @media (max-width: 480px) {
    min-width: 45px; /* Further reduced for smaller screens */
    padding: 0.3rem;
  }
`;

const CountdownValue = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem; /* Slightly reduced font size */

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const CountdownLabel = styled.span`
  font-size: 0.8rem; /* Slightly reduced font size */
  color: ${({ theme }) => theme.colors.light};

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

// Event images mapping (unchanged)
const eventImages = {
  'technical-seminar': new URL('/src/assets/images/4.png', import.meta.url).href,
  'line-following-robot': new URL('/src/assets/images/lfr.png', import.meta.url).href,
  'robo-soccer': new URL('/src/assets/images/3.png', import.meta.url).href,
  'project-presentation': new URL('/src/assets/images/project.png', import.meta.url).href,
  'cad-contest': new URL('/src/assets/images/2.png', import.meta.url).href,
  'techathon': new URL('/src/assets/images/techathon.png', import.meta.url).href,
  'logo-design-contest': new URL('/src/assets/images/logo.png', import.meta.url).href,
  'poster-presentation': new URL('/src/assets/images/poster.png', import.meta.url).href,
  'gaming-efootball': new URL('/src/assets/images/pes4.png', import.meta.url).href,
  'gaming-fifa': new URL('/src/assets/images/fifa.png', import.meta.url).href,
  'chess-competition': new URL('/src/assets/images/chess1.png', import.meta.url).href
};

// Updated events array (unchanged)
const events = [
  {
    id: 'technical-seminar',
    title: 'Technical Seminar',
    description: 'Industry experts share insights and knowledge [ No registration required ]',
    detailsLink: 'https://www.facebook.com/events/9420448124644824',
    fullDescription:
      'Join our technical seminar where industry experts will share valuable insights and knowledge on the latest technological trends and innovations. Attendance is open to all with no registration required.',
    date: 'April 17, 2025',
    time: '10:00 AM - 2:00 PM',
    venue: 'Auditorium',
    speakers: ['Shall be announced soon', 'Stay tuned for updates'],
  },
  {
    id: 'line-following-robot',
    title: 'Line Following Robot',
    description: 'Test your robot precision and speed',
    registerLink: 'https://forms.gle/YYtVH2fviyY9rU4MA',
    rulebookLink: 'https://drive.google.com/file/d/15YVsyN5tIv-AIxJcSZHAUlxn-d8OG8aD/view?usp=sharing',
    fullDescription:
      'Design a robot that can autonomously follow a line track with precision and speed. The competition will test your engineering skills in building sensors and implementing control algorithms.',
    date: 'April 18, 2025',
    time: '8:00 AM - 5:00 PM',
    venue: 'TSC Third Floor',
    prizes: ['Total Prize Pool: 48,000Tk', 'Reg Fee: 2040Tk'],
  },
  {
    id: 'robo-soccer',
    title: 'Robo Soccer',
    description: 'Unleash your robot agility',
    registerLink: 'https://forms.gle/DWCHrmtoZauCrFvf7',
    rulebookLink: 'https://drive.google.com/file/d/1MUtTcpVECumxapybQV2TduNCxqxll-g5/view?usp=sharing',
    fullDescription:
      'Build a soccer-playing robot and compete in our tournament. Your robot must be able to detect the ball, navigate the field, and score goals against opponent robots.',
    date: 'April 18, 2025',
    time: '8:00 AM - 5:00 PM',
    venue: 'Basketball Ground',
    prizes: ['Total Prize Pool: 60,000Tk', 'Reg Fee: 2240Tk'],
  },
  {
    id: 'project-presentation',
    title: 'Project Presentation',
    description: 'Showcase your groundbreaking ideas',
    registerLink: 'https://forms.gle/NYw4vc2BvQ9mXDCi8',
    rulebookLink: 'https://drive.google.com/file/d/11oyQxj1J22YQIbwqNnVk8-5rAjYebmvD/view?usp=sharing',
    fullDescription:
      'Present your innovative projects to a panel of judges from academia and industry. This is a great opportunity to receive feedback and potentially find sponsors for your ideas.',
    date: 'April 19, 2025',
    time: '8:00 AM - 5:00 PM',
    venue: 'TSC Third Floor',
    judgingCriteria: ['Innovation', 'Technical Feasibility', 'Presentation Quality', 'Potential Impact'],
    prizes: ['Total Prize Pool: 45,000Tk', 'Reg Fee: 1220'],
    categories: ['School / College', 'University'],
  },
  {
    id: 'cad-contest',
    title: 'CAD Contest',
    description: 'Test your design skills',
    fullDescription:
      'Demonstrate your Computer-Aided Design expertise by creating 3D models based on given specifications within a limited time frame.',
    date: 'April 18 - 19, 2025',
    time: 'Multiple Phases',
    venue: 'Online & PME Classroom#2',
    prizes: ['Total Prize Pool: 27,000Tk', 'Reg Fee: 410Tk'],
    phases: [
      {
        title: 'Phase - 1: Preliminary Design Submission',
        smallDetails: 'Submit your initial CAD design based on the provided problem statement.',
        date: 'April 18, 2025',
        time: '9:00 AM - 12:00 PM',
        venue: 'Online',
        registerLink: 'https://forms.gle/uqPyHMnkznA2rn1h8',
        rulebookLink: 'https://drive.google.com/file/d/1ryXK4ahBcsk0f9uR-wwNcU0d16-YXIHf/view?usp=drive_link',
      },
      {
        title: 'Phase - 2: Final Design and Presentation',
        smallDetails: 'Refine your design and present it to the judges.',
        date: 'April 19, 2025',
        time: '9:00 AM - 1:00 PM',
        venue: 'PME Classroom#2',
      },
    ],
    software: ['Solidworks version 2020 or later'],
  },
  {
    id: 'techathon',
    title: 'Techathon',
    description: 'Solve real-world challenges',
    fullDescription:
      'A 24-hour hackathon where teams develop solutions to real-world problems provided by industry partners. Food and refreshments will be provided.',
    date: 'April 7 - 18, 2025',
    time: '24 hours',
    venue: 'Two Phases: Online & CUET',
    prizes: ['Total Prize Pool: 100,000Tk'],
    categories: ['College', 'University'],
    phases: [
      {
        title: 'Phase - 1: Idea Submission and Initial Presentation',
        smallDetails: 'Teams submit their project ideas and give a brief presentation.',
        date: 'Registration Deadline: April 8, 2025',
        time: 'Case unveiling: April 9, 2025, 11:59 AM',
        venue: 'Online',
        registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfEmwd7GD3JfvxEMth_F-94g232ebqaM_-8R1ZDn3wg5Njf0w/viewform?usp=header',
        rulebookLink: 'https://drive.google.com/file/d/1lJul6bAX_WmXvwCnW2g5a-m6lE4YjiTm/view?usp=sharing',
      },
      {
        title: 'Phase - 2: Development and Final Presentation',
        smallDetails: 'Teams develop their solutions and present the final product.',
        date: 'April 18, 2025',
        time: '09:00 AM - 05:00 PM',
        venue: 'PME Classroom#3',
      },
    ],
  },
  {
    id: 'logo-design-contest',
    title: 'Logo Design Contest',
    description: 'Show your creative prowess',
    registerLink: 'https://forms.gle/V3zXV2A79VVwNfzE7',
    rulebookLink: 'https://drive.google.com/file/d/1Aj-ANehpddV4xdRK6-hg40vfWKXI0IMx/view?usp=sharing',
    fullDescription:
      'Design a logo for our upcoming university initiative. The winning design will be officially adopted and the designer will be credited in all future publications.',
    date: 'April 10, 2025 is deadline',
    time: '11:59 PM',
    venue: 'Online, Open to All',
    prize: ['Total Prize Pool: 5,000Tk', ' Reg Fee: 305Tk'],
  },
  {
    id: 'poster-presentation',
    title: 'Poster Presentation',
    description: 'Present your research visually',
    registerLink: 'https://forms.gle/ZM5cSoBHDBYzaTrR7',
    rulebookLink: 'https://drive.google.com/file/d/1JMGwnrqcVsVNGtGxhNV0ZOojl_oW9M_S/view?usp=sharing',
    fullDescription:
      'Create and present a research poster on your ongoing or completed research project. This is an excellent opportunity to network with peers and receive valuable feedback.',
    date: 'April 19, 2025',
    time: '8:00 AM - 5:00 PM',
    venue: 'Basketball Ground',
    prize: ['Total Prize Pool: 20,000Tk,', ' Reg Fee: 1020Tk'],
    categories: [
      'Next-Generation Robotics in Industrial Automation',
      'The Future of Smart Manufacturing: Industry 4.0 & Beyond',
      'AI and Machine Learning Applications in Engineering',
      'Autonomous Systems: From Self-Driving Cars to Smart Factories',
      'Sustainable Engineering: Innovations for a Greener Future',
      'Human-Robot Collaboration: The Rise of Cobots',
      'The Role of Mechatronics in Space Exploration',
      'Advanced Sensors and Control Systems in Modern Engineering',
      'The Impact of IoT on Industrial Efficiency',
    ],
  },
  {
    id: 'gaming-efootball',
    title: 'Gaming Contest - efootball',
    description: 'Compete in exciting games [ Only for CUETian ]',
    registerLink: 'https://forms.gle/CeyrUf1eeqSqJ8PE9',
    rulebookLink: 'https://drive.google.com/file/d/13N9Qd4Xbn9Fff1_cOLoMTdVeCiUg5PpM/view?usp=drive_link',
    fullDescription:
      'Show off your gaming skills in this efootball tournament exclusively for CUET students. Teams of 4 will compete in multiple rounds to determine the ultimate champions.',
    date: 'April 17, 2025',
    time: '2:00 PM - 5:00 PM',
    venue: 'PME Classroom',
    prizes: ['Total Prize Pool: 4,000Tk', ' Reg Fee: 55Tk'],
  },
  {
    id: 'gaming-fifa',
    title: 'Gaming Contest - FIFA',
    description: 'Compete in exciting games [ Only for CUETian ]',
    registerLink: 'https://forms.gle/TnsZquKuWdb4kZ5i6',
    rulebookLink: 'https://drive.google.com/file/d/1kj7zJs32nTBtWVqEgl7q7ll3DCqZ9RLX/view?usp=drive_link',
    fullDescription:
      'Challenge your fellow CUET students in a FIFA tournament. Players will compete in a knockout format to crown the campus champion.',
    date: 'April 17, 2025',
    time: '2:00 PM - 5:00 PM',
    venue: 'PME Classroom',
    prizes: ['Total Prize Pool: 6,000Tk', ' Reg Fee: 105Tk'],
  },
  {
    id: 'chess-competition',
    title: 'Chess Competition',
    description: 'Strategic battles of minds [ Only for CUETian ]',
    registerLink: 'https://forms.gle/E9fwJiYcDQCC9u34A',
    rulebookLink: 'https://drive.google.com/file/d/16MVHTSt2gJy5cZHbJaEXyBIWTe2JmzII/view?usp=drive_link',
    fullDescription:
      'Test your strategic thinking in our chess tournament. The competition will follow standard chess rules with time controls appropriate for all skill levels.',
    date: 'April 19, 2025',
    time: '5:00 PM - 5:30 PM',
    venue: 'CUET TSC',
    format: 'Swiss-system tournament',
    prizes: ['Total Prize Pool: 6,000Tk', ' Reg Fee: 210Tk'],
  },
];

// Add notice to all events' fullDescription (unchanged)
events.forEach((event) => {
  event.fullDescription += ' Your confirmation mail & further details shall be sent through your team’s Gmail from registration form.';
});

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const foundEvent = events.find((event) => event.id === id);
    setEvent(foundEvent);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [id]);

  // Countdown timer logic for Techathon Phase 1
  useEffect(() => {
    if (event?.id === 'techathon') {
      // Change the deadline here to your desired date and time
      const deadline = new Date('April 8, 2025 23:59:59').getTime(); // Modify this line to change the deadline
      const updateTimer = () => {
        const now = new Date().getTime();
        const distance = deadline - now;

        if (distance < 0) {
          setTimeLeft({ expired: true });
          return;
        }

        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [event]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleButtonClick = (type, link) => {
    if (link === '#') {
      showNotification(`Registration ${type === 'register' ? 'form' : 'rulebook'} coming soon! Please check back later.`);
    } else {
      window.open(link, '_blank');
    }
  };

  const handlePhase2ButtonClick = () => {
    alert("Phase 2's rulebooks and registration would be available after finishing phase 1");
  };

  const handleBackClick = () => {
    navigate('/');
    setTimeout(() => {
      const eventsSection = document.getElementById('events');
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (loading) {
    return (
      <EventDetailSection>
        <BackButton onClick={handleBackClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Events
        </BackButton>
        <EventDetailContainer>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h2>Loading event details...</h2>
          </div>
        </EventDetailContainer>
      </EventDetailSection>
    );
  }

  if (!event) {
    return (
      <EventDetailSection>
        <BackButton onClick={handleBackClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Events
        </BackButton>
        <NotFound>
          <h2>Event not found</h2>
          <p>Sorry, the event you're looking for doesn't exist.</p>
        </NotFound>
      </EventDetailSection>
    );
  }

  return (
    <EventDetailSection>
      {notification && <Notification>{notification}</Notification>}
      
      <BackButton onClick={handleBackClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Events
      </BackButton>
      
      <EventDetailContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <EventImageContainer>
          <EventImage src={eventImages[event.id]} alt={event.title} />
        </EventImageContainer>
        
        <EventContentContainer>
          <EventTitle>{event.title}</EventTitle>
          
          <EventMeta>
            <MetaItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {event.date}
            </MetaItem>
            <MetaItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {event.time}
            </MetaItem>
            <MetaItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {event.venue}
            </MetaItem>
          </EventMeta>

          <EventDescription>
            {event.fullDescription.split(' Your confirmation mail & further details shall be sent through your team’s Gmail from registration form.')[0]}
            <EventNotice>
              Your confirmation mail & further details shall be sent through your team’s Gmail from registration form.
            </EventNotice>
          </EventDescription>

          {event.id === 'techathon' && (
            <CountdownContainer>
              <CountdownTitle>Phase 1 Registration Deadline: 8 April</CountdownTitle>
              {timeLeft.expired ? (
                <p>Registration has ended!</p>
              ) : (
                <CountdownTimer>
                  <CountdownUnit>
                    <CountdownValue>{timeLeft.days || 0}</CountdownValue>
                    <CountdownLabel>Days</CountdownLabel>
                  </CountdownUnit>
                  <CountdownUnit>
                    <CountdownValue>{timeLeft.hours || 0}</CountdownValue>
                    <CountdownLabel>Hours</CountdownLabel>
                  </CountdownUnit>
                  <CountdownUnit>
                    <CountdownValue>{timeLeft.minutes || 0}</CountdownValue>
                    <CountdownLabel>Minutes</CountdownLabel>
                  </CountdownUnit>
                  <CountdownUnit>
                    <CountdownValue>{timeLeft.seconds || 0}</CountdownValue>
                    <CountdownLabel>Seconds</CountdownLabel>
                  </CountdownUnit>
                </CountdownTimer>
              )}
            </CountdownContainer>
          )}

          <EventInfo>
            {event.prizes && event.prizes.length > 0 && (
              <InfoRow>
                <InfoLabel>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M17 11h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1"></path>
                    <path d="M11 15.5c0 1.7 1.3 3 3 3s3-1.3 3-3v-10c0-1.7-1.3-3-3-3s-3 1.3-3 3v5.5"></path>
                    <path d="M3 8v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H3"></path>
                  </svg>
                  Prize Money
                </InfoLabel>
                <InfoValue>
                  <ul>
                    {event.prizes.map((prize, index) => (
                      <ListItem key={index}>{prize}</ListItem>
                    ))}
                  </ul>
                </InfoValue>
              </InfoRow>
            )}
            {event.speakers && event.speakers.length > 0 && (
              <InfoRow>
                <InfoLabel>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Speakers:
                </InfoLabel>
                <InfoValue>
                  <ul>
                    {event.speakers.map((speaker, index) => (
                      <ListItem key={index}>{speaker}</ListItem>
                    ))}
                  </ul>
                </InfoValue>
              </InfoRow>
            )}
            {event.prize && (
              <InfoRow>
                <InfoLabel>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M17 11h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1"></path>
                    <path d="M11 15.5c0 1.7 1.3 3 3 3s3-1.3 3-3v-10c0-1.7-1.3-3-3-3s-3 1.3-3 3v5.5"></path>
                    <path d="M3 8v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H3"></path>
                  </svg>
                  Prize:
                </InfoLabel>
                <InfoValue>{event.prize}</InfoValue>
              </InfoRow>
            )}
            {event.format && (
              <InfoRow>
                <InfoLabel>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  Format:
                </InfoLabel>
                <InfoValue>{event.format}</InfoValue>
              </InfoRow>
            )}
            {event.categories && event.categories.length > 0 && (
              <InfoRow>
                <InfoLabel>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                  </svg>
                  Categories:
                </InfoLabel>
                <InfoValue>
                  <ul>
                    {event.categories.map((category, index) => (
                      <ListItem key={index}>{category}</ListItem>
                    ))}
                  </ul>
                </InfoValue>
              </InfoRow>
            )}
            {event.judgingCriteria && event.judgingCriteria.length > 0 && (
              <InfoRow>
                <InfoLabel>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Judging Criteria:
                </InfoLabel>
                <InfoValue>
                  <ul>
                    {event.judgingCriteria.map((criteria, index) => (
                      <ListItem key={index}>{criteria}</ListItem>
                    ))}
                  </ul>
                </InfoValue>
              </InfoRow>
            )}
            {event.software && event.software.length > 0 && (
              <InfoRow>
                <InfoLabel>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  Software:
                </InfoLabel>
                <InfoValue>
                  <ul>
                    {event.software.map((sw, index) => (
                      <ListItem key={index}>{sw}</ListItem>
                    ))}
                  </ul>
                </InfoValue>
              </InfoRow>
            )}
          </EventInfo>

          {event.phases ? (
            <PhasesSection>
              <h2 style={{ color: theme => theme.colors.primary, marginBottom: '2rem' }}>Phases</h2>
              {event.phases.map((phase, index) => (
                <PhaseContainer
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PhaseTitle>{phase.title}</PhaseTitle>
                  <PhaseDescription>{phase.smallDetails}</PhaseDescription>
                  <EventMeta>
                    <MetaItem>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {phase.date}
                    </MetaItem>
                    <MetaItem>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {phase.time}
                    </MetaItem>
                    <MetaItem>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {phase.venue}
                    </MetaItem>
                  </EventMeta>
                  <ButtonGroup>
                    {(event.id === 'techathon' || event.id === 'cad-contest') && phase.title.includes('Phase - 2') ? (
                      <Button onClick={handlePhase2ButtonClick} primary>
                        Finish Phase-1 first!
                      </Button>
                    ) : (
                      <>
                        <Button onClick={() => handleButtonClick('register', phase.registerLink)} primary>
                          Register Now
                        </Button>
                        <Button onClick={() => handleButtonClick('rulebook', phase.rulebookLink)}>
                          Download Rulebook
                        </Button>
                      </>
                    )}
                  </ButtonGroup>
                </PhaseContainer>
              ))}
            </PhasesSection>
          ) : (
            <ButtonGroup>
              {event.detailsLink ? (
                <Button 
                  onClick={() => window.open(event.detailsLink, '_blank')}
                  primary
                >
                  View Event Details
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={() => handleButtonClick('register', event.registerLink)} 
                    primary
                  >
                    Register Now
                  </Button>
                  <Button 
                    onClick={() => handleButtonClick('rulebook', event.rulebookLink)}
                  >
                    Download Rulebook
                  </Button>
                </>
              )}
            </ButtonGroup>
          )}
        </EventContentContainer>
      </EventDetailContainer>
    </EventDetailSection>
  );
};

export default EventDetail;