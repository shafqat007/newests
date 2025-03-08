// src/components/About/index.jsx
import styled from 'styled-components'
import { motion } from 'framer-motion'
import logo from "/src/assets/images/about.jpg";

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
    text-align: justify;
    
    /* Fix for consistent padding on mobile devices */
    @media (max-width: 768px) {
      padding: 0 5px;
      text-align: left;
    }
    
    /* Specific fix for Pixel 7 */
    @media screen and (width: 412px) {
      padding: 0 10px;
    }
  }
`

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  /* Fix for mobile */
  @media (max-width: 768px) {
    padding: 0 5px;
  }
`

const StatItem = styled(motion.div)`
  text-align: center;
  
  .number {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.heading};
    display: block;
    margin-bottom: 0.5rem;
  }
  
  p {
    text-align: center;
    margin-top: 0;
  }
`

const ImageContainer = styled(motion.div)`
  img {
    width: 100%;
    border-radius: 10px;
  }
  
  /* Fix for mobile */
  @media (max-width: 768px) {
    padding: 0 5px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  /* Improve mobile display */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
  
  /* Specific fix for Pixel 7 */
  @media screen and (width: 412px) {
    padding: 0 10px;
  }
`

const Button = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.2rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.dark};
  }
  
  /* Improve mobile display */
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`

const About = () => {
  return (
    <AboutSection id="about">
      <Content>
        <TextContent>
          <h2>About CUET MIE & MIE ROBOlution1.0</h2>
          <p>
          The MIE Department at CUET, established in 2015, addresses the growing demand for automation and industrial innovation in Bangladesh. Integrating mechanical, electronics, and control systems, it prepares 30 students annually for careers in precision engineering, automation, and industrial research. With a strong curriculum and advanced labs, MIE aims to be a hub for innovation and industry-driven research, producing globally competitive engineers.
          </p>
          <p>
          MIE ROBOlution 1.0 is a first-of-its-kind robotics and automation festival hosted by CUET MIE. It is designed to bring together the brightest minds, challenging them in robotics competitions. The event aims to bridge academia and industry, inspiring the next generation of engineers to take on global technological challenges.
          </p>
          <p>
          With a grand prize pool of <b>330,000 BDT</b>, this competition is set to be a groundbreaking event in Bangladesh's robotics and automation landscape.
          </p>
          
          <ButtonContainer>
  <Button 
    href="https://www.facebook.com/events/9420448124644824"
    target="_blank" // Opens link in a new tab
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    EVENT ON FACEBOOK
  </Button>
  
  <Button 
    href="https://www.cuet.ac.bd/dept/mie" 
    target="_blank" // Opens link in a new tab
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    MORE ON DEPARTMENT
  </Button>
</ButtonContainer>

          
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