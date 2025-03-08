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
  }

  ul {
    list-style: none;
li {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

time {
  color: ${({ theme }) => theme.colors.primary};
  font-family: monospace; /* Ensures equal spacing */
  min-width: 120px; /* Adjust as needed */
  text-align: left;
  display: inline-block;
}

span {
  flex: 1;
  text-align: left;
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
`

const Schedule = () => {
  const scheduleData = {
    day1: {
      date: "17th April - Thursday",
      events: [
        { time: "08:00 - 08.30 am", event: "T-shirt Distribution" },
        { time: "08:30 - 09:00 am", event: "Inauguration by Cutting Cake" },
        { time: "09:00 - 10:00 am", event: "Rally" },
        { time: "11:00 - 02:00 pm", event: "Seminar" },
      ]
    },
    day2: {
      date: "18th April - Friday",
      events: [
        { time: "09:00 - 09:30 am", event: "Reporting, Reception" },
        { time: "09:30 - 11:00 am", event: "Robo Soccer (Up to Quarter Final)" },
        { time: "11:00 - 12:10 pm", event: "Project Presentation" },
        { time: "12:10 - 01:00 pm", event: "Poster Presentation" },
        { time: "01:00 - 02:00 pm", event: "Prayer & Lunch Break" },
        { time: "02:00 - 03:00 pm", event: "Robo Soccer (Final Round)" },
        { time: "03:00 - 05:00 pm", event: "Hackathon" },
      ]
    },
    day3: {
      date: "19th April - Saturday",
      events: [
        { time: "09:00 - 09:30 am", event: "Reporting Time" },
        { time: "09:30 - 11:00 am", event: "Idea Contest" },
        { time: "11:00 - 01:00 pm", event: "LFR (Up to Quarter Final)" },
        { time: "01:00 - 02:00 pm", event: "Prayer & Lunch Break" },
        { time: "02:30 - 04:00 pm", event: "Technical Case Solving" },
        { time: "02:00 - 03:00 pm", event: "LFR (Final Round)" },
        { time: "03:00 - 05:00 pm", event: "Prize Giving Ceremony" },
        { time: "05:30 - 11:00 pm", event: "Cultural Night and Band Show" },
      ]
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