import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Dynamically import partner images
const partnerImages = {
  socialPartner1: new URL('/src/assets/images/blink.jpg', import.meta.url).href,
  socialPartner2: new URL('/src/assets/images/info.jpg', import.meta.url).href,
  socialPartner3: new URL('/src/assets/images/castor.jpg', import.meta.url).href,
  clubPartner1: new URL('/src/assets/images/rma.jpg', import.meta.url).href,
  clubPartner2: new URL('/src/assets/images/sports.jpg', import.meta.url).href,
  clubPartner3: new URL('/src/assets/images/chessc.png', import.meta.url).href,
  clubPartner4: new URL('/src/assets/images/cads.jpg', import.meta.url).href,
  clubPartner5: new URL('/src/assets/images/daffodil.jpg', import.meta.url).href,
};

// Styled components remain the same as in your original code
const SponsorsSection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`;

const SponsorCategories = styled.div`
  margin-top: 3rem;
`;

const CategoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const SponsorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

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
`;

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 660px;
  margin: 0 auto;
  margin-bottom: 4rem;
`;

const CarouselWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const PartnerCard = styled(motion.a)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(198, 230, 5, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 200px;
  margin: 0 1rem;
  text-decoration: none;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 1rem;
    border-radius: 50%;
  }

  h4 {
    color: ${({ theme }) => theme.colors.light};
    margin: 0;
    font-size: 1.2rem;
  }

  p {
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 0.5rem;
    font-style: italic;
    font-size: 0.9rem;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active, theme }) => (active ? theme.colors.primary : 'rgba(198, 230, 5, 0.3)')};
  margin: 0 5px;
  border: none;
  cursor: pointer;
`;

const BecomeSponsor = styled.div`
  text-align: center;
  margin-top: 4rem;

  p {
    margin-bottom: 2rem;
  }
`;

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
`;

const Sponsors = () => {
  const [socialMediaIndex, setSocialMediaIndex] = useState(0);
  const [clubIndex, setClubIndex] = useState(0);

  const sponsorCategories = {
    title: [{ name: "Coming Soon!", status: "Revealing Soon" }],
    platinum: [{ name: "Coming Soon!", status: "Revealing Soon" }],
  };

  const partnerCategories = {
    socialMedia: [
      {
        name: "blinkworthy",
        image: partnerImages.socialPartner1,
        url: "https://www.facebook.com/profile.php?id=61557549233031",
      },
      {
        name: "Infogram",
        image: partnerImages.socialPartner2,
        url: "https://www.facebook.com/infogrambd",
      },
      {
        name: "Castor",
        image: partnerImages.socialPartner3,
        url: "https://www.facebook.com/info.thecastor",
      },
    ],
    club: [
      {
        name: "RMA",
        image: partnerImages.clubPartner1,
        url: "https://www.facebook.com/rmabd",
      },
      {
        name: "CUET Sports Club",
        image: partnerImages.clubPartner2,
        url: "https://www.facebook.com/sccuet",
      },
      {
        name: "CUET Chess Club",
        image: partnerImages.clubPartner3,
        url: "https://www.facebook.com/cuetchessclub",
      },
      {
        name: "CUET CAD Society",
        image: partnerImages.clubPartner4,
        url: "https://www.facebook.com/cadsocietycuet",
      },
      {
        name: "Daffodil Robotics Club",
        image: partnerImages.clubPartner5,
        url: "",
      },
    ],
  };

  const cardWidth = 232; // 200px width + 2 * 1rem (16px) margin = 232px

  // Duplicate the arrays for infinite looping
  const extendedSocialMedia = [
    ...partnerCategories.socialMedia,
    ...partnerCategories.socialMedia,
  ];
  const extendedClub = [...partnerCategories.club, ...partnerCategories.club];

  useEffect(() => {
    const socialMediaInterval = setInterval(() => {
      setSocialMediaIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // When reaching the end of the original items, reset to the start
        if (nextIndex === partnerCategories.socialMedia.length) {
          setTimeout(() => setSocialMediaIndex(0), 500); // Match transition duration
        }
        return nextIndex % extendedSocialMedia.length;
      });
    }, 3000);
    return () => clearInterval(socialMediaInterval);
  }, [partnerCategories.socialMedia.length]);

  useEffect(() => {
    const clubInterval = setInterval(() => {
      setClubIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // When reaching the end of the original items, reset to the start
        if (nextIndex === partnerCategories.club.length) {
          setTimeout(() => setClubIndex(0), 500); // Match transition duration
        }
        return nextIndex % extendedClub.length;
      });
    }, 3000);
    return () => clearInterval(clubInterval);
  }, [partnerCategories.club.length]);

  return (
    <SponsorsSection id="sponsors">
      <h2>Our Sponsors & Partners</h2>

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

        <div>
          <CategoryTitle>SOCIAL MEDIA PARTNERS</CategoryTitle>
          <CarouselContainer>
            <CarouselWrapper
              animate={{ x: -socialMediaIndex * cardWidth }}
              transition={
                socialMediaIndex === 0
                  ? { duration: 0 } // Instant reset
                  : { duration: 0.5, ease: "easeInOut" }
              }
            >
              {extendedSocialMedia.map((partner, idx) => (
                <PartnerCard
                  key={`${partner.name}-${idx}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={partner.image} alt={partner.name} />
                  <h4>{partner.name}</h4>
                </PartnerCard>
              ))}
            </CarouselWrapper>
          </CarouselContainer>
          <DotsContainer>
            {partnerCategories.socialMedia.map((_, idx) => (
              <Dot
                key={idx}
                active={idx === (socialMediaIndex % partnerCategories.socialMedia.length)}
                onClick={() => setSocialMediaIndex(idx)}
              />
            ))}
          </DotsContainer>
        </div>

        <div>
          <CategoryTitle>CLUB PARTNERS</CategoryTitle>
          <CarouselContainer>
            <CarouselWrapper
              animate={{ x: -clubIndex * cardWidth }}
              transition={
                clubIndex === 0
                  ? { duration: 0 } // Instant reset
                  : { duration: 0.5, ease: "easeInOut" }
              }
            >
              {extendedClub.map((partner, idx) => (
                <PartnerCard
                  key={`${partner.name}-${idx}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={partner.image} alt={partner.name} />
                  <h4>{partner.name}</h4>
                </PartnerCard>
              ))}
            </CarouselWrapper>
          </CarouselContainer>
          <DotsContainer>
            {partnerCategories.club.map((_, idx) => (
              <Dot
                key={idx}
                active={idx === (clubIndex % partnerCategories.club.length)}
                onClick={() => setClubIndex(idx)}
              />
            ))}
          </DotsContainer>
        </div>
      </SponsorCategories>

      <BecomeSponsor>
        <p>Become a partner!</p>
        <Button
          href="https://www.facebook.com/profile.php?id=61572987875146"
          target="_blank"
        >
          Become a Sponsor or Partner
        </Button>
      </BecomeSponsor>
    </SponsorsSection>
  );
};

export default Sponsors;