import styled from 'styled-components'
import { motion } from 'framer-motion'

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
  padding: 2rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
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
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.5rem;
`

const Button = styled.a`
  padding: 0.8rem 1rem;
  text-decoration: none;
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.heading};
  transition: all 0.3s ease;
  text-align: center;
  min-width: 90px;
  font-size: 0.9rem;
  target: "_blank";
  rel: "noopener noreferrer";
  
  @media (max-width: 400px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
    min-width: 80px;
  }
  
  ${({ primary, theme }) => primary ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.dark};
  ` : `
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
  `}
`

const events = [
  {
    title: 'Technical Seminar',
    description: 'Industry experts share insights and knowledge [ No registration required ]',
    detailsLink: 'https://www.facebook.com/events/9420448124644824',
  },
  {
    title: 'Line Following Robot',
    description: 'Test your robot precision and speed',
    registerLink: 'https://forms.gle/PsA17ZVVu6hhZxyMA',
    rulebookLink: '#'
  },
  {
    title: 'Robo Soccer',
    description: 'Unleash your robot agility',
    registerLink: 'https://forms.gle/yxBbx14ppuBPAKyTA',
    rulebookLink: '#'
  },
  {
    title: 'Project Presentation',
    description: 'Showcase your groundbreaking ideas',
    registerLink: 'https://forms.gle/QCdVDivvf7EkaU8c6',
    rulebookLink: '#'
  },
  {
    title: 'CAD Contest',
    description: 'Test your design skills',
    registerLink: 'https://forms.gle/zh5UohCdRy66Xyq97',
    rulebookLink: '#'
  },
  {
    title: 'Techathon',
    description: 'Solve real-world challenges',
    registerLink: 'https://forms.gle/BBJu3hKrCN8JjWkm9',
    rulebookLink: '#'
  },
  {
    title: 'Logo Design Contest',
    description: 'Show your creative prowess',
    registerLink: 'https://forms.gle/QNsrHGox3EsSLSwn7',
    rulebookLink: '#'
  },
  {
    title: 'Poster Presentation',
    description: 'Present your research visually',
    registerLink: 'https://forms.gle/fmXA5gfS1eJxsjYq6',
    rulebookLink: '#'
  },
  {
    title: 'Gaming Contest - PUBG',
    description: 'Compete in exciting games [ Intra CUET ]',
    registerLink: 'https://forms.gle/Y2KMNzBFHd5xSwCo7',
    rulebookLink: '#'
  },
  {
    title: 'Gaming Contest - FIFA',
    description: 'Compete in exciting games [ Intra CUET ]',
    registerLink: 'https://forms.gle/Y2KMNzBFHd5xSwCo7',
    rulebookLink: '#'
  },
  {
    title: 'Chess Competition',
    description: 'Strategic battles of minds [ Intra CUET ]',
    registerLink: 'https://forms.gle/NKwbKdrKd2t2CJC69',
    rulebookLink: '#'
  }
]

const Events = () => {
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
          >
            <EventTitle>{event.title}</EventTitle>
            <EventDescription>
              <p>{event.description}</p>
            </EventDescription>
            <ButtonGroup>
              {event.detailsLink ? (
                <Button href={event.detailsLink} target="_blank" rel="noopener noreferrer" primary>Details</Button>
              ) : (
                <>
                  <Button href={event.registerLink} target="_blank" rel="noopener noreferrer" primary>Register</Button>
                  <Button href={event.rulebookLink} target="_blank" rel="noopener noreferrer">Rulebook</Button>
                </>
              )}
            </ButtonGroup>
          </EventCard>
        ))}
      </EventsGrid>
    </EventsSection>
  )
}

export default Events;
