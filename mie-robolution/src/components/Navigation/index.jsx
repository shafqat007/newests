// src/components/Navigation/index.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = styled.nav`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: relative;
  z-index: 1000;

  span {
    display: block;
    width: 30px;
    height: 2px;
    background: ${({ theme, isOpen }) => (isOpen ? 'transparent' : theme.colors.primary)};
    position: relative;
    transition: all 0.3s ease;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 2px;
      background: ${({ theme }) => theme.colors.primary};
      transition: all 0.3s ease;
    }

    &::before {
      top: ${({ isOpen }) => (isOpen ? '0' : '-8px')};
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'none')};
    }

    &::after {
      bottom: ${({ isOpen }) => (isOpen ? '0' : '-8px')};
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'none')};
    }
  }
`;

const GoToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.dark};
  border: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  z-index: 99;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 2.5rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const Menu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: rgba(17, 17, 17, 0.95);
  padding: 6rem 2rem;
  backdrop-filter: blur(10px);
`;

const MenuItem = styled(motion.button)` // Changed from motion(Link) to motion.button
  display: block;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  padding: 1rem 0;
  transition: color 0.3s ease;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:nth-last-of-type(2) {
    margin-bottom: 2rem;
  }
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Added useNavigate

  const menuItems = [
    { title: 'Home', to: '/' },
    { title: 'About', to: '/#about' },
    { title: 'Events', to: '/#events' },
    { title: 'Schedule', to: '/#schedule' },
    { title: 'Gallery', to: '/#gallery' },
    { title: 'Sponsors', to: '/#sponsors' },
    { title: 'Campus Ambassador', to: '/#ambassador' },
    { title: 'Faculty', to: '/#faculty' },
    { title: 'Team', to: '/#team' },
   
    { title: 'Contact', to: '/#contact' },
  ];

  // Show/hide go to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const menuVariants = {
    closed: {
      x: 300,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1 },
    }),
  };

  const handleClick = (to) => {
    setIsOpen(false); // Close the menu

    if (to === '/') {
      // If navigating to home, just go to root and scroll to top
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else if (to.startsWith('/#')) {
      // If navigating to a section, go to root and scroll to section
      const sectionId = to.substring(2); // Remove "/#" to get ID
      navigate('/'); // Always navigate to root first
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure navigation completes
    }
  };

  return (
    <>
      <Nav>
        <MenuButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span />
        </MenuButton>

        <AnimatePresence>
          {isOpen && (
            <Menu initial="closed" animate="open" exit="closed" variants={menuVariants}>
              {menuItems.map((item, i) => (
                <MenuItem
                  key={item.title}
                  onClick={() => handleClick(item.to)} // Use onClick instead of to
                  variants={itemVariants}
                  custom={i}
                  whileHover={{ x: 20 }}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Menu>
          )}
        </AnimatePresence>
      </Nav>

      <AnimatePresence>
        {showGoToTop && (
          <GoToTopButton
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to top"
          >
            ^
          </GoToTopButton>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;