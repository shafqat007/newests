import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import logo from "/src/assets/images/trans.png";
import { useEffect, useState, useRef } from 'react';

// Existing styled components (unchanged except for adjustments below)
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
`;

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
`;

const Title = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 700px;

  img {
    width: 100%;
    height: auto;
    max-width: 100%;
    margin-bottom: 3rem;
    margin-top: 6rem;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    max-width: 600px;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    
    img {
      max-width: 100%;
    }
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin-bottom: 1rem;
  text-align: center;
`;

const PrizeMoney = styled(motion.div)`
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #ff0000, #ff4d4d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const CountdownContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(198, 230, 5, 0.1);
  border-radius: 10px;
  width: 100%;
  max-width: 500px;

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 90%;
  }
`;

const CountdownTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
`;

const CountdownTimer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: ${({ theme }) => theme.colors.light};

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const CountdownUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  padding: 0.8rem;
  background: rgba(198, 230, 5, 0.1);
  border-radius: 8px;

  @media (max-width: 480px) {
    min-width: 50px;
    padding: 0.5rem;
  }
`;

const CountdownValue = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const CountdownLabel = styled.span`
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  color: ${({ theme }) => theme.colors.light};
`;

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
`;

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
`;

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  left: 5%;
  padding: 0.5rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.dark};
  border: none;
  border-radius: 5px;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s ease, opacity 0.3s ease;

  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }

  @media (max-width: 768px) {
    padding: 0.4rem 1.2rem;
    font-size: clamp(0.8rem, 1.2vw, 1rem);
    bottom: 1.5rem;
    left: 3%;
  }
`;

// New styled component for the email icon with tooltip
const EmailIconContainer = styled(motion.div)`
  position: absolute;
  bottom: 1.5rem;
  right: 5%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmailIcon = styled(motion.a)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(1.5rem, 2vw, 1.5rem);
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.light};
  }

  @media (max-width: 768px) {
    font-size: clamp(2rem, 1.5vw, 1.2rem);
    bottom: 1.5rem;
    right: 3%;
  }
`;

const Tooltip = styled(motion.span)`
  visibility: hidden;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.dark};
  text-align: center;
  padding: 5px 10px;
  border-radius: 5px;
  position: absolute;
  bottom: 120%;
  right: 0;
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  white-space: nowrap;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${EmailIcon}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const Hero = () => {
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState({});
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const deadline = new Date('May 8, 2025 00:00:00').getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance < 0) {
        setTimeLeft({ expired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsButtonVisible(heroBottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (sectionId) => {
    const id = sectionId.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollForMore = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <HeroSection ref={heroRef}>
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
      
      <PrizeMoney
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        330K PRIZE MONEY
      </PrizeMoney>
      
      <CountdownContainer>
        <CountdownTitle>Event 8 May to 10 May<br />Event starting in:</CountdownTitle>
        {timeLeft.expired ? (
          <p>Event has started!</p>
        ) : (
          <CountdownTimer>
            <CountdownUnit>
              <CountdownValue>{timeLeft.days || 0}</CountdownValue>
              <CountdownLabel>Days</CountdownLabel>
            </CountdownUnit>
            <CountdownUnit>
              <CountdownValue>{timeLeft.hours || 0}</CountdownValue>
              <CountdownLabel>Hours</CountdownLabel>
            </CountdownUnit>
            <CountdownUnit>
              <CountdownValue>{timeLeft.minutes || 0}</CountdownValue>
              <CountdownLabel>Minutes</CountdownLabel>
            </CountdownUnit>
            <CountdownUnit>
              <CountdownValue>{timeLeft.seconds || 0}</CountdownValue>
              <CountdownLabel>Seconds</CountdownLabel>
            </CountdownUnit>
          </CountdownTimer>
        )}
      </CountdownContainer>
      
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

      <ScrollButton
        onClick={handleScrollForMore}
        initial={{ opacity: 0 }}
        animate={{ opacity: isButtonVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        Scroll for More
      </ScrollButton>

      {/* Email icon with tooltip */}
      <EmailIconContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <EmailIcon href="mailto:mierobolution2025@gmail.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="40"
            height="40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <Tooltip>mierobolution2025@gmail.com</Tooltip>
        </EmailIcon>
      </EmailIconContainer>
    </HeroSection>
  );
};

export default Hero;