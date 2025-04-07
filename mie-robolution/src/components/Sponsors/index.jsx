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

// Dynamically import club images 6 to 35 (including the new 28.png)
const clubImages = Array.from({ length: 30 }, (_, i) => {
  if (i < 5) return null; // Skip first 5 as they are already defined
  return new URL(`/src/assets/images/clubs/${i + 1}.png`, import.meta.url).href;
}).filter(Boolean);

// Styled components
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
    width: ${({ isRectangular }) => (isRectangular ? '100%' : '80px')};
    height: ${({ isRectangular }) => (isRectangular ? '80%' : '80px')};
    object-fit: contain;
    margin-bottom: ${({ isRectangular }) => (isRectangular ? '0.5rem' : '1rem')};
    border-radius: ${({ isRectangular }) => (isRectangular ? '10px' : '50%')};
  }

  h4 {
    color: ${({ theme }) => theme.colors.light};
    margin: 0;
    font-size: 1.2rem; /* Increased font size for better visibility */
  }

  p {
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 0.5rem;
    font-style: italic;
    font-size: 0.9rem;
  }
`;

// Updated arrow buttons - positioned on top of carousel instead of sides
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.dark};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px; /* Moved inside the carousel container */
`;

const RightArrow = styled(ArrowButton)`
  right: 10px; /* Moved inside the carousel container */
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

const ExpandButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.dark};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.heading};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.dark};
  padding: 2rem;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(200px, 1fr)); /* Default: 1 column for mobile */
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr)); /* 3 columns for laptop */
  }
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
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [clubIndex, setClubIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    segment: [
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
    ],
    club: [
      {
        name: "Daffodil Robotics Club",
        image: partnerImages.clubPartner5,
        url: "",
      },
      ...Array.from({ length: 23 }, (_, i) => ({
        name: "",
        image: clubImages[i],
        url: "",
      })),
    ],
  };

  const cardWidth = 232; // 200px width + 2 * 1rem (16px) margin = 232px

  // Duplicate the arrays for infinite looping
  const extendedSocialMedia = [
    ...partnerCategories.socialMedia,
    ...partnerCategories.socialMedia,
  ];
  const extendedSegment = [
    ...partnerCategories.segment,
    ...partnerCategories.segment,
  ];
  const extendedClub = [...partnerCategories.club, ...partnerCategories.club];

  useEffect(() => {
    const socialMediaInterval = setInterval(() => {
      setSocialMediaIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex === partnerCategories.socialMedia.length) {
          setTimeout(() => setSocialMediaIndex(0), 500);
        }
        return nextIndex % extendedSocialMedia.length;
      });
    }, 3000);
    return () => clearInterval(socialMediaInterval);
  }, [partnerCategories.socialMedia.length]);

  useEffect(() => {
    const segmentInterval = setInterval(() => {
      setSegmentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex === partnerCategories.segment.length) {
          setTimeout(() => setSegmentIndex(0), 500);
        }
        return nextIndex % extendedSegment.length;
      });
    }, 3000);
    return () => clearInterval(segmentInterval);
  }, [partnerCategories.segment.length]);

  useEffect(() => {
    const clubInterval = setInterval(() => {
      setClubIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex === partnerCategories.club.length) {
          setTimeout(() => setClubIndex(0), 500);
        }
        return nextIndex % extendedClub.length;
      });
    }, 3000);
    return () => clearInterval(clubInterval);
  }, [partnerCategories.club.length]);

  // Navigation handlers for arrows
  const handlePrevSocialMedia = () => {
    setSocialMediaIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? partnerCategories.socialMedia.length - 1 : nextIndex;
    });
  };

  const handleNextSocialMedia = () => {
    setSocialMediaIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex % partnerCategories.socialMedia.length;
    });
  };

  const handlePrevSegment = () => {
    setSegmentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? partnerCategories.segment.length - 1 : nextIndex;
    });
  };

  const handleNextSegment = () => {
    setSegmentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex % partnerCategories.segment.length;
    });
  };

  const handlePrevClub = () => {
    setClubIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? partnerCategories.club.length - 1 : nextIndex;
    });
  };

  const handleNextClub = () => {
    setClubIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex % partnerCategories.club.length;
    });
  };

  // Handler to close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

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
            <LeftArrow onClick={handlePrevSocialMedia}>&lt;</LeftArrow>
            <CarouselWrapper
              animate={{ x: -socialMediaIndex * cardWidth }}
              transition={
                socialMediaIndex === 0
                  ? { duration: 0 }
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
            <RightArrow onClick={handleNextSocialMedia}>&gt;</RightArrow>
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
          <CategoryTitle>SEGMENT PARTNERS</CategoryTitle>
          <CarouselContainer>
            <LeftArrow onClick={handlePrevSegment}>&lt;</LeftArrow>
            <CarouselWrapper
              animate={{ x: -segmentIndex * cardWidth }}
              transition={
                segmentIndex === 0
                  ? { duration: 0 }
                  : { duration: 0.5, ease: "easeInOut" }
              }
            >
              {extendedSegment.map((partner, idx) => (
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
            <RightArrow onClick={handleNextSegment}>&gt;</RightArrow>
          </CarouselContainer>
          <DotsContainer>
            {partnerCategories.segment.map((_, idx) => (
              <Dot
                key={idx}
                active={idx === (segmentIndex % partnerCategories.segment.length)}
                onClick={() => setSegmentIndex(idx)}
              />
            ))}
          </DotsContainer>
        </div>

        <div>
          <CategoryTitle>CLUB PARTNERS</CategoryTitle>
          <CarouselContainer>
            <LeftArrow onClick={handlePrevClub}>&lt;</LeftArrow>
            <CarouselWrapper
              animate={{ x: -clubIndex * cardWidth }}
              transition={
                clubIndex === 0
                  ? { duration: 0 }
                  : { duration: 0.5, ease: "easeInOut" }
              }
            >
              {extendedClub.map((partner, idx) => (
                <PartnerCard
                  key={`${partner.name}-${idx}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  isRectangular={idx >= 1} // Changed to idx >= 1 since Daffodil is the only named club now
                >
                  <img src={partner.image} alt={partner.name} />
                  {idx === 0 && <h4>{partner.name}</h4>} {/* Only show name for Daffodil */}
                </PartnerCard>
              ))}
            </CarouselWrapper>
            <RightArrow onClick={handleNextClub}>&gt;</RightArrow>
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
          <ExpandButton onClick={() => setIsModalOpen(true)}>
            View All Club Partners
          </ExpandButton>
        </div>
      </SponsorCategories>

      {isModalOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <ModalContent>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <h2 style={{ color: 'white', textAlign: 'center' }}>All Club Partners</h2>
            <ModalGrid>
              {partnerCategories.club.map((partner, idx) => (
                <PartnerCard
                  key={`${partner.name}-${idx}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  isRectangular={idx >= 1}
                >
                  <img src={partner.image} alt={partner.name} />
                  {idx === 0 && <h4>{partner.name}</h4>}
                </PartnerCard>
              ))}
            </ModalGrid>
          </ModalContent>
        </ModalOverlay>
      )}

      <BecomeSponsor>
        <p>Become a partner!</p>
        <Button
          href="https://docs.google.com/forms/d/e/1FAIpQLSfUoYsqYmTfhPKLihK2IbawdL0tz5oc6Ek0RLYVfp5wgr8AtA/viewform?usp=header"
          target="_blank"
        >
          Become a Sponsor or Partner
        </Button>
      </BecomeSponsor>
    </SponsorsSection>
  );
};

export default Sponsors;