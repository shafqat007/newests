import styled from 'styled-components'
import { motion } from 'framer-motion'

const TeamSection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); // Reduced from 250px to 200px
  gap: 1.5rem; // Reduced from 2rem to 1.5rem
  margin-top: 3rem;
`

const MemberCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(198, 230, 5, 0.1);
  border-radius: 8px; // Reduced from 10px to 8px
  overflow: hidden;
  // Added max-width for better control on mobile
  max-width: 100%;
`

const MemberImage = styled.div`
  width: 100%;
  height: 220px; // Reduced from 300px to 220px
  background: #222;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`

const MemberInfo = styled.div`
  padding: 1rem; // Reduced from 1.5rem to 1rem
`

const MemberName = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.3rem; // Reduced from 0.5rem to 0.3rem
  font-size: 1.1rem; // Added smaller font size
`

const MemberRole = styled.p`
  font-size: 0.8rem; // Reduced from 0.9rem to 0.8rem
  opacity: 0.8;
  margin-bottom: 0.8rem; // Reduced from 1rem to 0.8rem
`

const ContactInfo = styled.div`
  display: flex;
  gap: 0.8rem; // Reduced from 1rem to 0.8rem
  font-size: 0.8rem;
  
  a {
    color: ${({ theme }) => theme.colors.light};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

const teamMemberImages = {
  ashiqur: new URL('/src/assets/images/ashiqur.jpg', import.meta.url).href,
  nakib: new URL('/src/assets/images/nakib.jpg', import.meta.url).href,
  anik: new URL('/src/assets/images/anik.jpeg', import.meta.url).href,
  marzan: new URL('/src/assets/images/marzan.jpg', import.meta.url).href,
  sadek: new URL('/src/assets/images/sadek.jpg', import.meta.url).href,
  rakib: new URL('/src/assets/images/rakib.jpg', import.meta.url).href,
  jubair: new URL('/src/assets/images/jubair.jpg', import.meta.url).href,
  alif: new URL('/src/assets/images/alif.jpg', import.meta.url).href,
  mehedi: new URL('/src/assets/images/mehedi.jpg', import.meta.url).href,
  shihab: new URL('/src/assets/images/shihab.jpg', import.meta.url).href,
  redwan: new URL('/src/assets/images/redwan.jpg', import.meta.url).href,
  sajid: new URL('/src/assets/images/sajid.jpg', import.meta.url).href,
  tanmoy: new URL('/src/assets/images/tanmoy.jpg', import.meta.url).href,
  shahriar: new URL('/src/assets/images/shahriar.jpg', import.meta.url).href,
};

const teamMembers = [
  { name: "Nakib A. Raj", role: "Lead Organizer", email: "u1906002@student.cuet.ac.bd", phone: "123-456-7890", image: teamMemberImages.nakib },
  { name: "Mehedi Hasan Obhi", role: "Logistics & Operations Lead", email: "u1909003@student.cuet.ac.bd", phone: "123-456-7890", image: teamMemberImages.mehedi },
  { name: "Sadek Bin Islam", role: "Logistics & Operations Lead", email: "u1908013@student.cuet.ac.bd", phone: "123-456-7890", image: teamMemberImages.sadek },
  { name: "Anik Saha", role: "Logistics & Operations Lead", email: "u190801@student.cuet.ac.bd", phone: "123-456-7890", image: teamMemberImages.anik },
  { name: "Alif Haider", role: "Marketing & Sponsorship Lead", email: "u1909022@student.cuet.ac.bd", phone: "123-456-7890", image: teamMemberImages.alif },
  { name: "Ibn Zubair", role: "Sports Lead", email: "u1909016@student.cuet.ac.bd", phone: "123-456-7890", image: teamMemberImages.jubair },
  { name: "Al Marzan Sadid", role: "Sports Lead", email: "u1909008@student.cuet.ac.bd", phone: "123-456-7890", image: teamMemberImages.marzan },
  { name: "SK Rakib Hasan", role: "Design Lead", email: "u1909028@student.cuet.ac.bd", phone: "123-456-7890", image: teamMemberImages.rakib },
  { name: "Ashiqur Rahman", role: "Competition Lead", email: "u1906001@student.cuet.ac.bd", phone: "+8801835488814", image: teamMemberImages.ashiqur },
  { name: "Redwan Rifat", role: "Competition Lead", email: "u1909018@student.cuet.ac.bd", phone: "123-456-7890", image: teamMemberImages.redwan },
  { name: "Shihab Uddin", role: "Finance Lead", email: "u1909259@student.cuet.ac.bd", phone: "123-456-7890", image: teamMemberImages.shihab },
];

const Team = () => {
  return (
    <TeamSection id="team">
      <h2>Our Team</h2>
      <TeamGrid>
        {teamMembers.map((member, index) => (
          <MemberCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <MemberImage src={member.image} />
            <MemberInfo>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <ContactInfo>
                <a href={`mailto:${member.email}`}>
                  <i className="fas fa-envelope"></i>
                </a>
                <a href={`tel:${member.phone}`}>
                  <i className="fas fa-phone"></i>
                </a>
              </ContactInfo>
            </MemberInfo>
          </MemberCard>
        ))}
      </TeamGrid>
    </TeamSection>
  )
}

export default Team