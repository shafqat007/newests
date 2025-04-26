// src/components/About/index.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from "/src/assets/images/ffff.jpg";
import image from "/src/assets/images/img.jpg"; // Static import for the image
import posterImage from "/src/assets/images/img.jpg"; // A lightweight poster image for the video
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react'; // Import useState and useEffect for dynamic import

const AboutSection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`;

const MediaSection = styled.section`
  padding: 3rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`;

const MediaContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const VideoContainer = styled(motion.div)`
  video {
    width: 100%;
    height: auto;
    border-radius: 10px;
    max-height: 720px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const ImageContainer = styled(motion.div)`
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    max-height: 720px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
    text-align: justify;

    @media (max-width: 768px) {
      padding: 0 5px;
      text-align: left;
    }

    @media screen and (width: 412px) {
      padding: 0 10px;
    }
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;

  .number {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.heading};
    display: block;
    margin-bottom: 0.5rem;
  }

  p {
    text-align: center;
    margin-top: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }

  @media screen and (width: 412px) {
    padding: 0 10px;
  }
`;

const Button = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.2rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.dark};
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const About = () => {
  const [participantsRef, participantsInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [eventsRef, eventsInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [videoRef, videoInView] = useInView({
    triggerOnce: true,
    threshold: 0.3, // Load when 30% of the video container is in view
  });

  const [videoSrc, setVideoSrc] = useState(null); // State to hold the video source

  // Dynamically load the video when the VideoContainer is in view
  useEffect(() => {
    if (videoInView) {
      // Dynamic import of the video
      import("/src/assets/video.mp4").then((module) => {
        setVideoSrc(module.default);
      });
      // Alternatively, if using a CDN, you can directly set the URL:
      // setVideoSrc("https://your-cdn-url/video.mp4");
    }
  }, [videoInView]);

  return (
    <>
      <AboutSection id="about">
        <Content>
          <TextContent>
            <h2>About CUET MIE & MIE ROBOlution1.0</h2>
            <p>
              The MIE Department at CUET, established in 2015, addresses the growing demand for automation and industrial innovation in Bangladesh. Integrating mechanical, electronics, and control systems, it prepares 30 students annually for careers in precision engineering, automation, and industrial research. With a strong curriculum and advanced labs, MIE aims to be a hub for innovation and industry-driven research, producing globally competitive engineers.
            </p>
            <p>
              MIE ROBOlution 1.0 is a first-of-its-kind robotics and automation festival hosted by CUET MIE. It is designed to bring together the brightest minds, challenging them in robotics competitions. The event aims to bridge academia and industry, inspiring the next generation of engineers to take on global technological challenges.
            </p>
            <p>
              With a grand prize pool of <b>330,000 BDT</b>, this competition is set to be a groundbreaking event in Bangladesh's robotics and automation landscape.
            </p>

            <ButtonContainer>
              <Button
                href="https://www.facebook.com/events/9420448124644824"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                EVENT ON FACEBOOK
              </Button>

              <Button
                href="https://www.cuet.ac.bd/dept/mie"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                MORE ON DEPARTMENT
              </Button>
            </ButtonContainer>

            <Stats>
              <StatItem
                ref={participantsRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="number">
                  {participantsInView ? (
                    <CountUp
                      start={0}
                      end={1500}
                      duration={2.5}
                      suffix="+"
                      separator=","
                    />
                  ) : (
                    "0"
                  )}
                </div>
                <p>Participants</p>
              </StatItem>
              <StatItem
                ref={eventsRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="number">
                  {eventsInView ? (
                    <CountUp
                      start={0}
                      end={10}
                      duration={2.5}
                      suffix="+"
                    />
                  ) : (
                    "0"
                  )}
                </div>
                <p>Events</p>
              </StatItem>
            </Stats>
          </TextContent>

          <ImageContainer
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={logo} alt="MIE ROBOlution" />
          </ImageContainer>
        </Content>
      </AboutSection>

      <MediaSection>
        <MediaContent>
          <VideoContainer
            ref={videoRef} // Attach the ref to detect when the video is in view
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {videoSrc ? (
              <video
                autoPlay // Enable autoplay
                muted // Mute the video to comply with browser policies
                loop // Optional: make the video loop
                controls // Show controls so the user can unmute or pause
                poster={posterImage}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={posterImage}
                alt="Video Placeholder"
                style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
              />
            )}
          </VideoContainer>

          <ImageContainer
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={image} alt="MIE ROBOlution Event" />
          </ImageContainer>
        </MediaContent>
      </MediaSection>
    </>
  );
};

export default About;