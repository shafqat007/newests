// src/components/Schedule/index.jsx
import styled from 'styled-components'
import { motion } from 'framer-motion'
import logo from "/src/assets/images/cuet.jpg";

const ScheduleSection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const DayCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(198, 230, 5, 0.1);

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 1.3rem;
    
    @media (min-width: 769px) {
      font-size: 1.2rem;
    }
  }

  ul {
    list-style: none;
  }
  
  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
  }

  time {
    color: ${({ theme }) => theme.colors.primary};
    font-family: monospace;
    display: block;
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
    
    @media (min-width: 769px) {
      font-size: 1rem;
    }
  }

  span {
    font-family: monospace;
    display: block;
    font-size: 1.1rem;
    
    @media (min-width: 769px) {
      font-size: 1rem;
    }
  }
`

const VenueSection = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  img {
    width: 100%;
    border-radius: 15px;
  }
  
  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    
    @media (min-width: 769px) {
      font-size: 1.3rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    
    @media (min-width: 769px) {
      font-size: 1rem;
    }
  }
`

const Schedule = () => {
  // Updated event names to match your provided list
  const scheduleData = {
    day1: {
      date: "17th April - Thursday",
      events: [
        { time: "08:00 - 08:30 am", event: "T-shirt Distribution" }, // Kept as is (not in image)
        { time: "08:30 - 09:00 am", event: "Inauguration by Cutting Cake" }, // Kept as is (not in image)
        { time: "09:00 - 10:00 am", event: "Rally" }, // Kept as is (not in image)
        { time: "10:00 am - 2:00 pm", event: "Industrial 4.0 Seminar" }, // Updated from "Technical Seminar"
        { time: "2:00 pm - 5:00 pm", event: "FIFA Gaming Event" }, // Added from image
      ],
    },
    day2: {
      date: "18th April - Friday",
      events: [
        { time: "08:00 am - 5:00 pm", event: "Line Following Robot" }, // Added from image
        { time: "08:00 am - 5:00 pm", event: "Soccer Bot" }, // Added from image (replaces Robo Soccer)
        { time: "09:00 am - 5:00 pm", event: "Techathon" }, // Added from image
        { time: "01:00 - 02:00 pm", event: "Prayer & Lunch Break" }, // Kept as is (not in image, fits in schedule)
      ],
    },
    day3: {
      date: "19th April - Saturday",
      events:[
        { time: "08:00 am - 5:00 pm", event: "Project Presentation" }, // Added from image
        { time: "08:00 am - 5:00 pm", event: "Poster Presentation" }, // Added from image
        { time: "09:00 am - 1:00 pm", event: "CAD Contest" }, // Added from image
        { time: "01:00 - 02:00 pm", event: "Prayer & Lunch Break" }, // Kept as is (not in image, fits in schedule)
        { time: "05:00 pm - 10:00 pm", event: "Prize Giving Ceremony and Cultural Event" }, // Updated from "Cultural Night and Band Show"
      // Kept as is (not in image, but matches event details)
        { time: "05:00 - 05:30 pm", event: "Chess Competition" }, // Kept as is (not in image, but matches event details)
      ],
    }
  }

  return (
    <ScheduleSection id="schedule">
      <h2>Event Schedule</h2>
      <DaysGrid>
        {Object.entries(scheduleData).map(([day, data], index) => (
          <DayCard
            key={day}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <h3>{data.date}</h3>
            <ul>
              {data.events.map((event, i) => (
                <li key={i}>
                  <time>{event.time}</time>
                  <span>{event.event}</span>
                </li>
              ))}
            </ul>
          </DayCard>
        ))}
      </DaysGrid>

      <VenueSection>
        <img src={logo} alt="MIE ROBOlution" />
        <div>
          <h3>Venue</h3>
          <p>CUET Premises</p>
          <p>The spot will be given by confirmation mail.</p>
          <p>Stay tuned with us.</p>
        </div>
      </VenueSection>
    </ScheduleSection>
  )
}

export default Schedule