import styled from 'styled-components'
import { motion } from 'framer-motion'

const FacultySection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`

const FacultyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`

const FacultyCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(198, 230, 5, 0.1);
  border-radius: 8px;
  overflow: hidden;
  max-width: 100%;
`

const FacultyImageWrapper = styled.a`
  display: block;
  width: 100%;
  cursor: pointer;
`

const FacultyImage = styled.div`
  width: 100%;
  height: 220px;
  background: #222;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`

const FacultyInfo = styled.div`
  padding: 1rem;
`

const FacultyNameLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  
  &:hover h3 {
    text-decoration: underline;
  }
`

const FacultyName = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
`

const FacultyRole = styled.p`
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 0.8rem;
`

const ContactInfo = styled.div`
  display: flex;
  gap: 0.8rem;
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

// Dynamically import faculty images using shortcut names
const facultyImages = {
  prasanjit: new URL('/src/assets/images/faculty/prasanjit.jpg', import.meta.url).href,
  homayun: new URL('/src/assets/images/faculty/homayun.jpg', import.meta.url).href,
  abdur: new URL('/src/assets/images/faculty/abdur.jpg', import.meta.url).href,
  hridoy: new URL('/src/assets/images/faculty/hridoy.jpg', import.meta.url).href,
  sanjeeb: new URL('/src/assets/images/faculty/sanjeeb.jpg', import.meta.url).href,
  miraiz: new URL('/src/assets/images/faculty/miraiz.jpg', import.meta.url).href,
  fahim: new URL('/src/assets/images/faculty/shofol.jpg', import.meta.url).href,
  tasnuva: new URL('/src/assets/images/faculty/tasnuva.jpg', import.meta.url).href,
  naimur: new URL('/src/assets/images/faculty/naimur.jpg', import.meta.url).href,
  tasmia: new URL('/src/assets/images/faculty/tasmia.jpg', import.meta.url).href,
  nusrat: new URL('/src/assets/images/faculty/nusrat.jpg', import.meta.url).href,
};

// Default placeholder for any missing images
const placeholderImage = "https://via.placeholder.com/300x400";

const facultyMembers = [
  { 
    name: "Dr. Prasanjit Das", 
    role: "Head & Professor", 
    email: "headmie@cuet.ac.bd", 
    phone: "016-42997909", 
    image: facultyImages.prasanjit,
    details: "https://www.cuet.ac.bd/members/434",
    imageKey: "prasanjit"
  },
  { 
    name: "Homayun Kabir", 
    role: "Assistant Professor", 
    email: "homayun@cuet.ac.bd", 
    phone: "+8801814330170", 
    image: facultyImages.homayun,
    details: "https://www.cuet.ac.bd/members/393",
    imageKey: "homayun"
  },
  { 
    name: "Md. Abdur Rahman", 
    role: "Assistant Professor", 
    email: "abdurrahman@cuet.ac.bd", 
    phone: "+8801683215377", 
    image: facultyImages.abdur,
    details: "https://www.cuet.ac.bd/members/488",
    imageKey: "abdur"
  },
  { 
    name: "Monowar Wadud Hridoy", 
    role: "Assistant Professor", 
    email: "hridoy@cuet.ac.bd", 
    phone: "01734641700", 
    image: facultyImages.hridoy,
    details: "https://www.cuet.ac.bd/members/604",
    imageKey: "hridoy"
  },
  { 
    name: "Sanjeeb Roy", 
    role: "Assistant Professor", 
    email: "sanjeeb@cuet.ac.bd", 
    phone: "01771810318", 
    image: facultyImages.sanjeeb,
    details: "https://www.cuet.ac.bd/members/590",
    imageKey: "sanjeeb"
  },
  { 
    name: "Md. Miraiz Hossain", 
    role: "Lecturer", 
    email: "miraizhossain@cuet.ac.bd", 
    phone: "+8801521473649", 
    image: facultyImages.miraiz,
    details: "https://www.cuet.ac.bd/members/649",
    imageKey: "miraiz"
  },
  { 
    name: "S. M. Fahim Faisal", 
    role: "Assistant Professor", 
    email: "fahimfaisal@cuet.ac.bd", 
    phone: "+8801832834685", 
    image: facultyImages.fahim,
    details: "https://www.cuet.ac.bd/members/677",
    imageKey: "fahim"
  },
  { 
    name: "Tasnuva Jahan Nuva", 
    role: "Assistant Professor", 
    email: "tasnuvajahan@cuet.ac.bd", 
    phone: "", 
    image: facultyImages.tasnuva,
    details: "https://www.cuet.ac.bd/members/678",
    imageKey: "tasnuva"
  },
  { 
    name: "Kazi Naimur Rahman", 
    role: "Lecturer", 
    email: "naimur@cuet.ac.bd", 
    phone: "01643361857", 
    image: facultyImages.naimur,
    details: "https://www.cuet.ac.bd/members/689",
    imageKey: "naimur"
  },
  { 
    name: "Tasmia Binte Hai", 
    role: "Lecturer", 
    email: "tasmia_heem@cuet.ac.bd", 
    phone: "", 
    image: facultyImages.tasmia,
    details: "https://www.cuet.ac.bd/members/690",
    imageKey: "tasmia"
  },
  { 
    name: "Ms. Nusrat Sultana", 
    role: "Lecturer", 
    email: "nusratsultana@cuet.ac.bd", 
    phone: "01797601059", 
    image: facultyImages.nusrat,
    details: "https://www.cuet.ac.bd/members/758",
    imageKey: "nusrat"
  },
];

const Faculty = () => {
  // Function to get the correct image or fallback to placeholder if missing
  const getImage = (faculty) => {
    return faculty.image || placeholderImage;
  };

  return (
    <FacultySection id="faculty">
      <h2>Our Faculty</h2>
      <FacultyGrid>
        {facultyMembers.map((faculty, index) => (
          <FacultyCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <FacultyImageWrapper href={faculty.details} target="_blank" rel="noopener noreferrer">
              <FacultyImage src={getImage(faculty)} />
            </FacultyImageWrapper>
            <FacultyInfo>
              <FacultyNameLink href={faculty.details} target="_blank" rel="noopener noreferrer">
                <FacultyName>{faculty.name}</FacultyName>
              </FacultyNameLink>
              <FacultyRole>{faculty.role}</FacultyRole>
              <ContactInfo>
                <a href={`mailto:${faculty.email}`}>
                  <i className="fas fa-envelope"></i>
                </a>
       
                <a href={faculty.details} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-info-circle"></i>
                </a>
              </ContactInfo>
            </FacultyInfo>
          </FacultyCard>
        ))}
      </FacultyGrid>
    </FacultySection>
  )
}

export default Faculty