import styled from 'styled-components'
import { motion } from 'framer-motion'

const SponsorsSection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`

const SponsorCategories = styled.div`
  margin-top: 3rem;
`

const CategoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`

const SponsorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`

const SponsorCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(198, 230, 5, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  
  h4 {
    color: ${({ theme }) => theme.colors.light};
    margin: 0;
  }
  
  p {
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 0.5rem;
    font-style: italic;
  }
`

const BecomeSponsor = styled.div`
  text-align: center;
  margin-top: 4rem;
  
  p {
    margin-bottom: 2rem;
  }
`

const Button = styled.a`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.dark};
  text-decoration: none;
  border-radius: 30px;
  font-family: ${({ theme }) => theme.fonts.heading};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.light};
    transform: translateY(-2px);
  }
`

const Sponsors = () => {
  const sponsorCategories = {
    title: [
      { name: "Coming Soon!", status: "Revealing Soon" }
    ],
    platinum: [
      { name: "Coming Soon!", status: "Revealing Soon" }
    ],
  }

  return (
    <SponsorsSection id="sponsors">
      <h2>Our Sponsors</h2>
      
      <SponsorCategories>
        {Object.entries(sponsorCategories).map(([category, sponsors]) => (
          <div key={category}>
            <CategoryTitle>{category.toUpperCase()} SPONSORS</CategoryTitle>
            <SponsorsGrid>
              {sponsors.map((sponsor, index) => (
                <SponsorCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4>{sponsor.name}</h4>
                  {sponsor.status && <p>{sponsor.status}</p>}
                </SponsorCard>
              ))}
            </SponsorsGrid>
          </div>
        ))}
      </SponsorCategories>
      
      <BecomeSponsor>
        <p>Interested in becoming a sponsor? Knock Us!</p>
        <Button href="https://www.facebook.com/profile.php?id=61572987875146">Become a Sponsor</Button>
      </BecomeSponsor>
    </SponsorsSection>
  )
}

export default Sponsors