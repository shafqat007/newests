// src/components/Navigation/index.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Add useLocation
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

const MenuItem = styled(motion(Link))`
  display: block;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  padding: 1rem 0;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:nth-last-of-type(2) {
    margin-bottom: 2rem;
  }
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current route

  const menuItems = [
    { title: 'Home', to: '/' },
    { title: 'About', to: '/#about' },
    { title: 'Events', to: '/#events' },
    { title: 'Schedule', to: '/#schedule' },
    { title: 'Gallery', to: '/#gallery' },
    { title: 'Sponsors', to: '/#sponsors' },
    { title: 'Team', to: '/#team' },
    { title: 'Campus Ambassador', to: '/#ambassador' },
    { title: 'Contact', to: '/#contact' },
  ];

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
    // If already on root, scroll to section; otherwise, navigate
    if (location.pathname === '/' && to.startsWith('/#')) {
      const sectionId = to.substring(2); // Remove "/#" to get ID
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
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
                to={item.to}
                onClick={() => handleClick(item.to)}
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
  );
};

export default Navigation;