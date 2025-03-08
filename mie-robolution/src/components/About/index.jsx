// src/components/About/index.jsx
import styled from 'styled-components'
import { motion } from 'framer-motion'
import logo from "/src/assets/images/logo.jpg";

<img src={logo} alt="MIE ROBOlution" />


const AboutSection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TextContent = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
`

const StatItem = styled(motion.div)`
  text-align: center;
  
  .number {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`

const ImageContainer = styled(motion.div)`
  img {
    width: 100%;
    border-radius: 10px;
  }
`

const About = () => {
  return (
    <AboutSection id="about">
      <Content>
        <TextContent>
          <h2>About MIE ROBOlution</h2>
          <p>
            MIE ROBOlution 1.0 is the premier robotics and automation event at CUET,
            bringing together innovative minds and cutting-edge technology.
          </p>
          <p>
            Our mission is to foster innovation, encourage collaboration, and showcase
            the latest advancements in robotics and automation.
          </p>
          
          <Stats>
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="number">500+</div>
              <p>Participants</p>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="number">10+</div>
              <p>Events</p>
            </StatItem>
          </Stats>
        </TextContent>
        
        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
<img src={logo} alt="MIE ROBOlution" />

        </ImageContainer>
      </Content>
    </AboutSection>
  )
}

export default About