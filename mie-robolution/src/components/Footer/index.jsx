// src/components/Footer/index.jsx
import styled from "styled-components";

const FooterSection = styled.footer`
  padding: 5rem 5% 2rem;
  background: ${({ theme }) => theme.colors.dark};
  border-top: 1px solid rgba(198, 230, 5, 0.1);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterColumn = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;

  a {
    color: ${({ theme }) => theme.colors.light};
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  opacity: 0.7;
`;

const Footer = () => {
  return (
    <FooterSection id="contact">
      <FooterGrid>
        <FooterColumn>
          <h3>About Event</h3>
          <p>
            MIE ROBOlution 1.0 is the premier robotics and automation event at
            CUET, bringing together innovative minds and cutting-edge
            technology.
          </p>
        </FooterColumn>

        <FooterColumn>
          <h3>Contact Info</h3>
          <p>Chittagong University of Engineering & Technology (CUET)</p>
          <p>Email: mierobolution2025@gmail.com</p>
          <p>Contact: +880 1670-558956</p>
        </FooterColumn>

        <FooterColumn>
  <h3>Follow Us</h3>
  <SocialLinks>
    <a href="https://www.facebook.com/events/9420448124644824" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook"></i>
    </a>
    <a href="mailto:mierobolution2025@gmail.com">
      <i className="fas fa-envelope"></i> {/* Gmail Icon */}
    </a>
    <a href="tel:+8801670558956">
      <i className="fas fa-phone"></i> {/* Phone Icon */}
    </a>
  </SocialLinks>
</FooterColumn>

      </FooterGrid>

      <Copyright>© 2025 MIE ROBOlution. Made by Shafqat</Copyright>
    </FooterSection>
  );
};

export default Footer;
