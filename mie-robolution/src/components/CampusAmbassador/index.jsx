// src/components/CampusAmbassador/index.jsx
import styled from 'styled-components'
import { motion } from 'framer-motion'

const AmbassadorSection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`

const Benefits = styled.div`
  margin: 3rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

const Benefit = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(198, 230, 5, 0.1);

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
  }
`

const RegisterButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.dark};
  text-decoration: none;
  border-radius: 30px;
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-top: 2rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }
`

const CampusAmbassador = () => {
  return (
    <AmbassadorSection id="ambassador">
      <Content>
        <h2>Become a Campus Ambassador</h2>
        <p>Join our team as a campus ambassador and be part of something extraordinary!</p>
        
        <Benefits>
  <Benefit
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <h3>Recognition</h3>
    <p>Receive an official certificate and a personalized letter of recommendation, enhancing your professional credibility.</p>
  </Benefit>
  <Benefit
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
  >
    <h3>Networking</h3>
    <p>Gain access to top industry experts, potential mentors, and a thriving community of passionate innovators.</p>
  </Benefit>
  <Benefit
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
  >
    <h3>Exclusive Benefits</h3>
    <p>Enjoy priority access to industry events, hands-on workshops, and early-bird perks for tech conferences.</p>
  </Benefit>
  <Benefit
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
  >
    <h3>Rewards</h3>
    <p>Receive exclusive merchandise, event passes, and special discounts on tech gear and software tools.</p>
  </Benefit>
</Benefits>



        <RegisterButton
          href="https://forms.gle/3MacqsT8R5jRbsCS8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register as Ambassador
        </RegisterButton>
      </Content>
    </AmbassadorSection>
  )
}

export default CampusAmbassador