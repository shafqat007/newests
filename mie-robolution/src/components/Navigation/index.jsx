// src/components/Navigation/index.jsx
import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const Nav = styled.nav`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
`

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
    background: ${({ theme, isOpen }) => isOpen ? 'transparent' : theme.colors.primary};
    position: relative;
    transition: all 0.3s ease;

    &::before, &::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 2px;
      background: ${({ theme }) => theme.colors.primary};
      transition: all 0.3s ease;
    }

    &::before {
      top: ${({ isOpen }) => isOpen ? '0' : '-8px'};
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'none'};
    }

    &::after {
      bottom: ${({ isOpen }) => isOpen ? '0' : '-8px'};
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg)' : 'none'};
    }
  }
`

const Menu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: rgba(17, 17, 17, 0.95);
  padding: 6rem 2rem;
  backdrop-filter: blur(10px);
`


const MenuItem = styled(motion.a)`
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

  /* Add extra margin below "Contact" */
  &:nth-last-of-type(2) {
    margin-bottom: 2rem; /* Adjust spacing */
  }
`


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Events', href: '#events' },
    { title: 'Schedule', href: '#schedule' },
    { title: 'Gallery', href: '#gallery' },
    { title: 'Sponsors', href: '#sponsors' },
    { title: 'Team', href: '#team' },
    { title: 'Campus Ambassador', href: '#ambassador' },
    { title: 'Contact', href: '#contact' },
    
  ]

  const menuVariants = {
    closed: {
      x: 300,
      transition: {
        type: "tween",
        duration: 0.3
      }
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3
      }
    }
  }

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: i => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1
      }
    })
  }

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
          <Menu
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {menuItems.map((item, i) => (
              <MenuItem
                key={item.title}
                href={item.href}
                onClick={() => setIsOpen(false)}
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
  )
}

export default Navigation