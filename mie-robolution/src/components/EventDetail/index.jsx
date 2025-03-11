// src/components/EventDetail/index.jsx
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
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(198, 230, 5, 0.1);
  padding: 3rem;
  border-radius: 10px;
`;

const EventTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const EventInfo = styled.div`
  margin-bottom: 2rem;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoLabel = styled.span`
  width: 120px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const InfoValue = styled.span`
  flex: 1;
`;

const EventDescription = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.a`
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.heading};
  transition: all 0.3s ease;
  text-align: center;
  font-size: 1rem;
  
  ${({ primary, theme }) => primary ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.dark};
  ` : `
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
  `}
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 3rem;
`;

// Complete event data with all details
const events = [
  {
    id: 'technical-seminar',
    title: 'Technical Seminar',
    description: 'Industry experts share insights and knowledge [ No registration required ]',
    detailsLink: 'https://www.facebook.com/events/9420448124644824',
    fullDescription:
      'Join our technical seminar where industry experts will share valuable insights and knowledge on the latest technological trends and innovations. Attendance is open to all with no registration required.',
    date: 'March 15, 2025',
    time: '10:00 AM - 1:00 PM',
    venue: 'Main Auditorium',
    speakers: ['Dr. John Smith', 'Prof. Maria Rodriguez'],
  },
  {
    id: 'line-following-robot',
    title: 'Line Following Robot',
    description: 'Test your robot precision and speed',
    registerLink: 'https://forms.gle/PsA17ZVVu6hhZxyMA',
    rulebookLink: '#',
    fullDescription:
      'Design a robot that can autonomously follow a line track with precision and speed. The competition will test your engineering skills in building sensors and implementing control algorithms.',
    date: 'March 16, 2025',
    time: '9:00 AM - 4:00 PM',
    venue: 'Robotics Lab',
    prizes: ['1st Place: $500', '2nd Place: $300', '3rd Place: $150'],
  },
  {
    id: 'robo-soccer',
    title: 'Robo Soccer',
    description: 'Unleash your robot agility',
    registerLink: 'https://forms.gle/yxBbx14ppuBPAKyTA',
    rulebookLink: '#',
    fullDescription:
      'Build a soccer-playing robot and compete in our tournament. Your robot must be able to detect the ball, navigate the field, and score goals against opponent robots.',
    date: 'March 17, 2025',
    time: '10:00 AM - 6:00 PM',
    venue: 'Sports Complex',
    prizes: ['1st Place: $600', '2nd Place: $350', '3rd Place: $200'],
  },
  {
    id: 'project-presentation',
    title: 'Project Presentation',
    description: 'Showcase your groundbreaking ideas',
    registerLink: 'https://forms.gle/QCdVDivvf7EkaU8c6',
    rulebookLink: '#',
    fullDescription:
      'Present your innovative projects to a panel of judges from academia and industry. This is a great opportunity to receive feedback and potentially find sponsors for your ideas.',
    date: 'March 18, 2025',
    time: '11:00 AM - 3:00 PM',
    venue: 'Conference Hall',
    judgingCriteria: ['Innovation', 'Technical Feasibility', 'Presentation Quality', 'Potential Impact'],
  },
  {
    id: 'cad-contest',
    title: 'CAD Contest',
    description: 'Test your design skills',
    registerLink: 'https://forms.gle/zh5UohCdRy66Xyq97',
    rulebookLink: '#',
    fullDescription:
      'Demonstrate your Computer-Aided Design expertise by creating 3D models based on given specifications within a limited time frame.',
    date: 'March 19, 2025',
    time: '9:00 AM - 12:00 PM',
    venue: 'Design Studio',
    software: ['AutoCAD', 'SolidWorks', 'Fusion 360'],
  },
  {
    id: 'techathon',
    title: 'Techathon',
    description: 'Solve real-world challenges',
    registerLink: 'https://forms.gle/BBJu3hKrCN8JjWkm9',
    rulebookLink: '#',
    fullDescription:
      'A 24-hour hackathon where teams develop solutions to real-world problems provided by industry partners. Food and refreshments will be provided.',
    date: 'March 20-21, 2025',
    time: '10:00 AM - 10:00 AM (next day)',
    venue: 'Innovation Hub',
    prizes: ['1st Place: $1000', '2nd Place: $700', '3rd Place: $400'],
  },
  {
    id: 'logo-design-contest',
    title: 'Logo Design Contest',
    description: 'Show your creative prowess',
    registerLink: 'https://forms.gle/QNsrHGox3EsSLSwn7',
    rulebookLink: '#',
    fullDescription:
      'Design a logo for our upcoming university initiative. The winning design will be officially adopted and the designer will be credited in all future publications.',
    date: 'March 15, 2025',
    time: 'Submit by 6:00 PM',
    venue: 'Online Submission',
    prize: 'Winner: $250 and official recognition',
  },
  {
    id: 'poster-presentation',
    title: 'Poster Presentation',
    description: 'Present your research visually',
    registerLink: 'https://forms.gle/fmXA5gfS1eJxsjYq6',
    rulebookLink: '#',
    fullDescription:
      'Create and present a research poster on your ongoing or completed research project. This is an excellent opportunity to network with peers and receive valuable feedback.',
    date: 'March 22, 2025',
    time: '1:00 PM - 5:00 PM',
    venue: 'Exhibition Hall',
    categories: ['Engineering', 'Computer Science', 'Environmental Science', 'Biotechnology'],
  },
  {
    id: 'gaming-pubg',
    title: 'Gaming Contest - PUBG',
    description: 'Compete in exciting games [ Intra CUET ]',
    registerLink: 'https://forms.gle/Y2KMNzBFHd5xSwCo7',
    rulebookLink: '#',
    fullDescription:
      'Show off your gaming skills in this PUBG tournament exclusively for CUET students. Teams of 4 will compete in multiple rounds to determine the ultimate champions.',
    date: 'March 23, 2025',
    time: '2:00 PM - 8:00 PM',
    venue: 'Gaming Arena',
    prizes: ['Winner: Trophy + Certificates', 'Runner-up: Certificates'],
  },
  {
    id: 'gaming-fifa',
    title: 'Gaming Contest - FIFA',
    description: 'Compete in exciting games [ Intra CUET ]',
    registerLink: 'https://forms.gle/Y2KMNzBFHd5xSwCo7',
    rulebookLink: '#',
    fullDescription:
      'Challenge your fellow CUET students in a FIFA tournament. Players will compete in a knockout format to crown the campus champion.',
    date: 'March 24, 2025',
    time: '3:00 PM - 7:00 PM',
    venue: 'Gaming Arena',
    prizes: ['Winner: Trophy + Certificates', 'Runner-up: Certificates'],
  },
  {
    id: 'chess-competition',
    title: 'Chess Competition',
    description: 'Strategic battles of minds [ Intra CUET ]',
    registerLink: 'https://forms.gle/NKwbKdrKd2t2CJC69',
    rulebookLink: '#',
    fullDescription:
      'Test your strategic thinking in our chess tournament. The competition will follow standard chess rules with time controls appropriate for all skill levels.',
    date: 'March 25, 2025',
    time: '10:00 AM - 4:00 PM',
    venue: 'Student Center',
    format: 'Swiss-system tournament with 5 rounds',
  },
];

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundEvent = events.find((event) => event.id === id);
    setEvent(foundEvent);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <EventDetailSection>
        <BackButton to="/#events">← Back to Events</BackButton>
        <EventDetailContainer>
          <h2>Loading event details...</h2>
        </EventDetailContainer>
      </EventDetailSection>
    );
  }

  if (!event) {
    return (
      <EventDetailSection>
        <BackButton to="/#events">← Back to Events</BackButton>
        <NotFound>
          <h2>Event not found</h2>
          <p>Sorry, the event you're looking for doesn't exist.</p>
        </NotFound>
      </EventDetailSection>
    );
  }

  return (
    <EventDetailSection>
      <BackButton to="/#events">← Back to Events</BackButton>
      <EventDetailContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <EventTitle>{event.title}</EventTitle>

        <EventDescription>{event.fullDescription}</EventDescription>

        <EventInfo>
          <InfoRow>
            <InfoLabel>Date:</InfoLabel>
            <InfoValue>{event.date}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Time:</InfoLabel>
            <InfoValue>{event.time}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Venue:</InfoLabel>
            <InfoValue>{event.venue}</InfoValue>
          </InfoRow>

          {event.speakers && event.speakers.length > 0 && (
            <InfoRow>
              <InfoLabel>Speakers:</InfoLabel>
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
              <InfoLabel>Prizes:</InfoLabel>
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
              <InfoLabel>Prize:</InfoLabel>
              <InfoValue>{event.prize}</InfoValue>
            </InfoRow>
          )}

          {event.format && (
            <InfoRow>
              <InfoLabel>Format:</InfoLabel>
              <InfoValue>{event.format}</InfoValue>
            </InfoRow>
          )}

          {event.categories && event.categories.length > 0 && (
            <InfoRow>
              <InfoLabel>Categories:</InfoLabel>
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
              <InfoLabel>Judging:</InfoLabel>
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
              <InfoLabel>Software:</InfoLabel>
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
            <Button href={event.detailsLink} target="_blank" rel="noopener noreferrer" primary>
              External Details
            </Button>
          ) : (
            <>
              <Button href={event.registerLink} target="_blank" rel="noopener noreferrer" primary>
                Register Now
              </Button>
              <Button href={event.rulebookLink} target="_blank" rel="noopener noreferrer">
                Download Rulebook
              </Button>
            </>
          )}
        </ButtonGroup>
      </EventDetailContainer>
    </EventDetailSection>
  );
};

export default EventDetail;