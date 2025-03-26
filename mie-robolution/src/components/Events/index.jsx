import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

// Sample image for testing
import gamingImage from '/src/assets/images/e1.jpg'

const EventsSection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const EventCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(198, 230, 5, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const EventImageContainer = styled.div`
 width: 100%;
  padding-top: 36.36%; /* Updated aspect ratio for 400x1100 */
  position: relative;
  overflow: hidden;
`

const EventImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${EventCard}:hover & {
    transform: scale(1.05);
  }
`

const EventContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const EventTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`

const EventDescription = styled.div`
  flex-grow: 1;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`

const Button = styled(Link)`
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.heading};
  transition: all 0.3s ease;
  text-align: center;
  font-size: 0.9rem;
  
  @media (max-width: 400px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }
  
  ${({ primary, theme }) => primary ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.dark};
  ` : `
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
  `}
`

// Dynamically import event images
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

const events = [
  {
    id: "technical-seminar",
    title: 'Technical Seminar',
    description: 'Industry experts share insights and knowledge [ No registration required ]',
    detailsLink: 'https://www.facebook.com/events/9420448124644824',
    fullDescription: 'Join our technical seminar where industry experts will share valuable insights and knowledge on the latest technological trends and innovations. Attendance is open to all with no registration required.',
    date: 'March 15, 2025',
    time: '10:00 AM - 1:00 PM',
    venue: 'Main Auditorium',
    speakers: ['Dr. John Smith', 'Prof. Maria Rodriguez']
  },
  {
    id: "techathon",
    title: 'Techathon',
    description: 'Solve real-world challenges',
    registerLink: 'https://forms.gle/BBJu3hKrCN8JjWkm9',
    rulebookLink: '#',
    fullDescription: 'A 24-hour hackathon where teams develop solutions to real-world problems provided by industry partners. Food and refreshments will be provided.',
    date: 'March 20-21, 2025',
    time: '10:00 AM - 10:00 AM (next day)',
    venue: 'Innovation Hub',
    prizes: ['1st Place: $1000', '2nd Place: $700', '3rd Place: $400']
  },
  {
    id: "robo-soccer",
    title: 'Robo Soccer',
    description: 'Unleash your robot agility',
    registerLink: 'https://forms.gle/yxBbx14ppuBPAKyTA',
    rulebookLink: '#',
    fullDescription: 'Build a soccer-playing robot and compete in our tournament. Your robot must be able to detect the ball, navigate the field, and score goals against opponent robots.',
    date: 'March 17, 2025',
    time: '10:00 AM - 6:00 PM',
    venue: 'Sports Complex',
    prizes: ['1st Place: $600', '2nd Place: $350', '3rd Place: $200']
  },
  {
    id: "line-following-robot",
    title: 'Line Following Robot',
    description: 'Test your robot precision and speed',
    registerLink: 'https://forms.gle/PsA17ZVVu6hhZxyMA',
    rulebookLink: '#',
    fullDescription: 'Design a robot that can autonomously follow a line track with precision and speed. The competition will test your engineering skills in building sensors and implementing control algorithms.',
    date: 'March 16, 2025',
    time: '9:00 AM - 4:00 PM',
    venue: 'Robotics Lab',
    prizes: ['1st Place: $500', '2nd Place: $300', '3rd Place: $150']
  },
 
  {
    id: "project-presentation",
    title: 'Project Presentation',
    description: 'Showcase your groundbreaking ideas',
    registerLink: 'https://forms.gle/QCdVDivvf7EkaU8c6',
    rulebookLink: '#',
    fullDescription: 'Present your innovative projects to a panel of judges from academia and industry. This is a great opportunity to receive feedback and potentially find sponsors for your ideas.',
    date: 'March 18, 2025',
    time: '11:00 AM - 3:00 PM',
    venue: 'Conference Hall',
    judgingCriteria: ['Innovation', 'Technical Feasibility', 'Presentation Quality', 'Potential Impact']
  },
  {
    id: "cad-contest",
    title: 'CAD Contest',
    description: 'Test your design skills',
    registerLink: 'https://forms.gle/zh5UohCdRy66Xyq97',
    rulebookLink: '#',
    fullDescription: 'Demonstrate your Computer-Aided Design expertise by creating 3D models based on given specifications within a limited time frame.',
    date: 'March 19, 2025',
    time: '9:00 AM - 12:00 PM',
    venue: 'Design Studio',
    software: ['AutoCAD', 'SolidWorks', 'Fusion 360']
  },
  
 
  {
    id: "poster-presentation",
    title: 'Poster Presentation',
    description: 'Present your research visually',
    registerLink: 'https://forms.gle/fmXA5gfS1eJxsjYq6',
    rulebookLink: '#',
    fullDescription: 'Create and present a research poster on your ongoing or completed research project. This is an excellent opportunity to network with peers and receive valuable feedback.',
    date: 'March 22, 2025',
    time: '1:00 PM - 5:00 PM',
    venue: 'Exhibition Hall',
    categories: ['Engineering', 'Computer Science', 'Environmental Science', 'Biotechnology']
  },

  {
    id: "gaming-fifa",
    title: 'Gaming Contest - FIFA',
    description: 'Compete in exciting games [ Only for CUETian ]',
    registerLink: 'https://forms.gle/Y2KMNzBFHd5xSwCo7',
    rulebookLink: '#',
    fullDescription: 'Challenge your fellow CUET students in a FIFA tournament. Players will compete in a knockout format to crown the campus champion.',
    date: 'March 24, 2025',
    time: '3:00 PM - 7:00 PM',
    venue: 'Gaming Arena',
    prizes: ['Winner: Trophy + Certificates', 'Runner-up: Certificates']
  },
  {
    id: "chess-competition",
    title: 'Chess Competition',
    description: 'Strategic battles of minds [ Only for CUETian ]',
    registerLink: 'https://forms.gle/NKwbKdrKd2t2CJC69',
    rulebookLink: '#',
    fullDescription: 'Test your strategic thinking in our chess tournament. The competition will follow standard chess rules with time controls appropriate for all skill levels.',
    date: 'March 25, 2025',
    time: '10:00 AM - 4:00 PM',
    venue: 'Student Center',
    format: 'Swiss-system tournament with 5 rounds'
  },
  {
    id: "logo-design-contest",
    title: 'Logo Design Contest',
    description: 'Show your creative prowess',
    registerLink: 'https://forms.gle/QNsrHGox3EsSLSwn7',
    rulebookLink: '#',
    fullDescription: 'Design a logo for our upcoming university initiative. The winning design will be officially adopted and the designer will be credited in all future publications.',
    date: 'March 15, 2025',
    time: 'Submit by 6:00 PM',
    venue: 'Online Submission',
    prize: 'Winner: $250 and official recognition'
  },
  {
    id: "gaming-efootball",
    title: 'Gaming Contest - efootball',
    description: 'Compete in exciting games [ Only for CUETian ]',
    registerLink: 'https://forms.gle/Y2KMNzBFHd5xSwCo7',
    rulebookLink: '#',
    fullDescription: 'Show off your gaming skills in this efootball tournament exclusively for CUET students. Teams of 4 will compete in multiple rounds to determine the ultimate champions.',
    date: 'March 23, 2025',
    time: '2:00 PM - 8:00 PM',
    venue: 'Gaming Arena',
    prizes: ['Winner: Trophy + Certificates', 'Runner-up: Certificates']
  }
]

const Events = () => {
  const navigate = useNavigate();

  // Handle card click
  const handleCardClick = (e, eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <EventsSection id="events">
      <h2>What's in store?</h2>
      <EventsGrid>
        {events.map((event, index) => (
          <EventCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={(e) => handleCardClick(e, event.id)}
          >
            <EventImageContainer>
              <EventImage 
                src={eventImages[event.id] || eventImages['technical-seminar']} 
                alt={`${event.title} event`} 
              />
            </EventImageContainer>
            <EventContent>
              <EventTitle>{event.title}</EventTitle>
              <EventDescription>
                <p>{event.description}</p>
              </EventDescription>
              <ButtonGroup>
                <Button 
                  to={`/events/${event.id}`} 
                  primary
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                >
                  Learn More
                </Button>
              </ButtonGroup>
            </EventContent>
          </EventCard>
        ))}
      </EventsGrid>
    </EventsSection>
  )
}

export default Events;