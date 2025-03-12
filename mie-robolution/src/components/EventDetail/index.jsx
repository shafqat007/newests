import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  overflow: hidden; /* To ensure the image container respects border radius */
`;

const EventImageContainer = styled.div`
  width: 100%;
  padding-top: 36.36%; /* This creates the same aspect ratio used in your Events component */
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

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  
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

// Add event images mapping
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
}

// Complete event data with all details
const events = [
  {
    id: 'technical-seminar',
    title: 'Technical Seminar',
    description: 'Industry experts share insights and knowledge [ No registration required ]',
    detailsLink: 'https://www.facebook.com/events/9420448124644824',
    fullDescription:
      'Join our technical seminar where industry experts will share valuable insights and knowledge on the latest technological trends and innovations. Attendance is open to all with no registration required.',
    date: 'April 15, 2025',
    time: '10:00 AM - 1:00 PM',
    venue: 'Main Auditorium',
    speakers: ['Dr. Ashraful Islam', 'Prof. Tahmina Rahman'],
  },
  {
    id: 'line-following-robot',
    title: 'Line Following Robot',
    description: 'Test your robot precision and speed',
    registerLink: '#',
    rulebookLink: '#',
    fullDescription:
      'Design a robot that can autonomously follow a line track with precision and speed. The competition will test your engineering skills in building sensors and implementing control algorithms.',
    date: 'April 15, 2025',
    time: '9:00 AM - 4:00 PM',
    venue: 'Robotics Lab',
    prizes: ['1st Place: ৳৳৳৳', '2nd Place: ৳৳৳', '3rd Place: ৳৳'],
  },
  {
    id: 'robo-soccer',
    title: 'Robo Soccer',
    description: 'Unleash your robot agility',
    registerLink: '#',
    rulebookLink: '#',
    fullDescription:
      'Build a soccer-playing robot and compete in our tournament. Your robot must be able to detect the ball, navigate the field, and score goals against opponent robots.',
    date: 'April 16, 2025',
    time: '10:00 AM - 6:00 PM',
    venue: 'Sports Complex',
    prizes: ['1st Place: ৳৳৳৳', '2nd Place: ৳৳৳', '3rd Place: ৳৳'],
  },
  {
    id: 'project-presentation',
    title: 'Project Presentation',
    description: 'Showcase your groundbreaking ideas',
    registerLink: '#',
    rulebookLink: '#',
    fullDescription:
      'Present your innovative projects to a panel of judges from academia and industry. This is a great opportunity to receive feedback and potentially find sponsors for your ideas.',
    date: 'April 16, 2025',
    time: '11:00 AM - 3:00 PM',
    venue: 'Conference Hall',
    judgingCriteria: ['Innovation', 'Technical Feasibility', 'Presentation Quality', 'Potential Impact'],
  },
  {
    id: 'cad-contest',
    title: 'CAD Contest',
    description: 'Test your design skills',
    registerLink: '#',
    rulebookLink: '#',
    fullDescription:
      'Demonstrate your Computer-Aided Design expertise by creating 3D models based on given specifications within a limited time frame.',
    date: 'April 16, 2025',
    time: '9:00 AM - 12:00 PM',
    venue: 'Design Studio',
    software: ['AutoCAD', 'SolidWorks', 'Fusion 360'],
  },
  {
    id: 'techathon',
    title: 'Techathon',
    description: 'Solve real-world challenges',
    registerLink: '#',
    rulebookLink: '#',
    fullDescription:
      'A 24-hour hackathon where teams develop solutions to real-world problems provided by industry partners. Food and refreshments will be provided.',
    date: 'April 16-17, 2025',
    time: '10:00 AM - 10:00 AM (next day)',
    venue: 'Innovation Hub',
    prizes: ['1st Place: ৳৳৳৳৳', '2nd Place: ৳৳৳৳', '3rd Place: ৳৳৳'],
  },
  {
    id: 'logo-design-contest',
    title: 'Logo Design Contest',
    description: 'Show your creative prowess',
    registerLink: '#',
    rulebookLink: '#',
    fullDescription:
      'Design a logo for our upcoming university initiative. The winning design will be officially adopted and the designer will be credited in all future publications.',
    date: 'April 15, 2025',
    time: 'Submit by 6:00 PM',
    venue: 'Online Submission',
    prize: 'Winner: ৳৳৳ and official recognition',
  },
  {
    id: 'poster-presentation',
    title: 'Poster Presentation',
    description: 'Present your research visually',
    registerLink: '#',
    rulebookLink: '#',
    fullDescription:
      'Create and present a research poster on your ongoing or completed research project. This is an excellent opportunity to network with peers and receive valuable feedback.',
    date: 'April 17, 2025',
    time: '1:00 PM - 5:00 PM',
    venue: 'Exhibition Hall',
    categories: ['Engineering', 'Computer Science', 'Environmental Science', 'Biotechnology'],
  },
  {
    id: 'gaming-efootball',
    title: 'Gaming Contest - efootball',
    description: 'Compete in exciting games [ Intra CUET ]',
    registerLink: '#',
    rulebookLink: '#',
    fullDescription:
      'Show off your gaming skills in this efootball tournament exclusively for CUET students. Teams of 4 will compete in multiple rounds to determine the ultimate champions.',
    date: 'April 17, 2025',
    time: '2:00 PM - 8:00 PM',
    venue: 'Gaming Arena',
    prizes: ['Winner: Trophy + Certificates', 'Runner-up: Certificates'],
  },
  {
    id: 'gaming-fifa',
    title: 'Gaming Contest - FIFA',
    description: 'Compete in exciting games [ Intra CUET ]',
    registerLink: '#',
    rulebookLink: '#',
    fullDescription:
      'Challenge your fellow CUET students in a FIFA tournament. Players will compete in a knockout format to crown the campus champion.',
    date: 'April 17, 2025',
    time: '3:00 PM - 7:00 PM',
    venue: 'Gaming Arena',
    prizes: ['Winner: Trophy + Certificates', 'Runner-up: Certificates'],
  },
  {
    id: 'chess-competition',
    title: 'Chess Competition',
    description: 'Strategic battles of minds [ Intra CUET ]',
    registerLink: '#',
    rulebookLink: '#',
    fullDescription:
      'Test your strategic thinking in our chess tournament. The competition will follow standard chess rules with time controls appropriate for all skill levels.',
    date: 'April 17, 2025',
    time: '10:00 AM - 4:00 PM',
    venue: 'Student Center',
    format: 'Swiss-system tournament with 5 rounds',
  },
];

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const foundEvent = events.find((event) => event.id === id);
    setEvent(foundEvent);
    setLoading(false);
  }, [id]);

  const showNotification = (message) => {
    setNotification(message);
    // Auto-hide notification after 3.5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleButtonClick = (type) => {
    showNotification(`Registration ${type === 'register' ? 'form' : 'rulebook'} coming soon! Please check back later.`);
  };

  if (loading) {
    return (
      <EventDetailSection>
        <BackButton to="/#events">
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
        <BackButton to="/#events">
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
      
      <BackButton to="/#events">
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
        {/* Event Banner Image */}
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

          <EventDescription>{event.fullDescription}</EventDescription>

          <EventInfo>
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

            {event.prizes && event.prizes.length > 0 && (
              <InfoRow>
                <InfoLabel>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M17 11h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1"></path>
                    <path d="M11 15.5c0 1.7 1.3 3 3 3s3-1.3 3-3v-10c0-1.7-1.3-3-3-3s-3 1.3-3 3v5.5"></path>
                    <path d="M3 8v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H3"></path>
                  </svg>
                  Prizes:
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
                  onClick={() => handleButtonClick('register')} 
                  primary
                >
                  Register Now
                </Button>
                <Button 
                  onClick={() => handleButtonClick('rulebook')}
                >
                  Download Rulebook
                </Button>
              </>
            )}
          </ButtonGroup>
        </EventContentContainer>
      </EventDetailContainer>
    </EventDetailSection>
  );
};

export default EventDetail;