import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom' // Add this import
import logo from "/src/assets/images/trans.png";

const HeroSection = styled.section`
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5%;
  position: relative;
  background-color: #1c1c1c;
  overflow-x: hidden;
  box-sizing: border-box;
`

const Logo = styled.div`
  position: absolute;
  top: 2rem;
  left: 5%;
  z-index: 10;

  img {
    height: 50px;
    width: auto;
  }

  @media (max-width: 768px) {
    img {
      height: 40px;
    }
  }
`

const Title = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 800px; /* Increased from 600px */

  img {
    width: 100%;
    height: auto;
    max-width: 100%; /* Increased from 80% */
     margin-bottom: 3rem;
      margin-top: 6rem;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    max-width: 700px;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    
    img {
      max-width: 100%;
    }
  }
`

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin-bottom: 3rem;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 600px) {
    gap: 1rem;
    flex-direction: column;
    width: 100%;
    max-width: 280px;
  }
`

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-decoration: none;
  border-radius: 30px;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  outline: none;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.8rem 1.5rem;
  }

  ${({ primary, theme }) => primary ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.dark};
    
    &:hover {
      background: ${theme.colors.light};
    }
  ` : `
    border: 2px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: transparent;
    
    &:hover {
      background: ${theme.colors.primary};
      color: ${theme.colors.dark};
    }
  `}
`

const Hero = () => {
  const location = useLocation();

  const handleScrollTo = (sectionId) => {
    // Remove the "#" from the beginning of the sectionId
    const id = sectionId.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection>
      <Logo>
        <img src={logo} alt="MIE ROBOlution" />
      </Logo>
      
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={logo} alt="MIE ROBOlution" />
      </Title>
      
      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Innovate - Automate - Dominate
      </Subtitle>
      
      <ButtonContainer>
        <Button 
          primary
          onClick={() => handleScrollTo('#events')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          EXPLORE EVENTS
        </Button>
        <Button 
          onClick={() => handleScrollTo('#about')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          LEARN MORE
        </Button>
      </ButtonContainer>
    </HeroSection>
  )
}

export default Hero