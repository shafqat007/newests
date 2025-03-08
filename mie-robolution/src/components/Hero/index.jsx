import styled from 'styled-components'
import { motion } from 'framer-motion'
import logo from "/src/assets/images/logoo.jpg";

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
  position: relative;
  background-color: #1c1c1c;
`

const Logo = styled.div`
  position: absolute;
  top: 2rem;
  left: 5%;

  img {
    height: 50px; /* Adjust as needed */
  }
`

const Title = styled(motion.div)` 
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  img {
    max-width: 80%;
    height: auto;
  }
`

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 3rem;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
`

const Button = styled(motion.a)`
  padding: 1rem 2rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  ${({ primary, theme }) => primary ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.dark};
    
    &:hover {
      background: ${theme.colors.light};
    }
  ` : `
    border: 2px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.primary};
      color: ${theme.colors.dark};
    }
  `}
`

const Hero = () => {
  return (
    <HeroSection>
      <Logo>
       <img src={logo} alt="MIE ROBOlution" />
      </Logo>
      
      <Title>
       <img src={logo} alt="MIE ROBOlution" />
      </Title>
      
      <Subtitle>
        Innovate - Automate - Dominate
      </Subtitle>
      
      <ButtonContainer>
        <Button 
          href="#events" 
          primary
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EXPLORE EVENTS
        </Button>
        <Button 
          href="#about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          LEARN MORE
        </Button>
      </ButtonContainer>
    </HeroSection>
  )
}

export default Hero
