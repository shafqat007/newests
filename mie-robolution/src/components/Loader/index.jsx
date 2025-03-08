// src/components/Loader/index.jsx
import styled from 'styled-components'
import { motion } from 'framer-motion'

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`

const LoadingText = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
`

const Loader = () => {
  return (
    <LoaderContainer>
      <LoadingText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        MIE ROBOlution 1.0
      </LoadingText>
    </LoaderContainer>
  )
}

export default Loader