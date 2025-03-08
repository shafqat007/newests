// src/components/Gallery/index.jsx
import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const GallerySection = styled.section`
  padding: 5rem 5%;
  background: ${({ theme }) => theme.colors.dark};
`

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 3rem;
`

const ImageCard = styled(motion.div)`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  
  img {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.light};
  font-size: 2rem;
  cursor: pointer;
`

// Dynamically import images
const galleryImages = [
  new URL('/src/assets/images/e1.jpg', import.meta.url).href,
  new URL('/src/assets/images/e2.jpg', import.meta.url).href,
  new URL('/src/assets/images/e3.jpg', import.meta.url).href,
  new URL('/src/assets/images/imgg.jpg', import.meta.url).href,
  new URL('/src/assets/images/mie.jpg', import.meta.url).href,
  new URL('/src/assets/images/s5.jpg', import.meta.url).href,
  new URL('/src/assets/images/img.png', import.meta.url).href,
 
]

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <GallerySection id="gallery">
      <h2>Gallery</h2>
      
      <GalleryGrid>
        {galleryImages.map((image, index) => (
          <ImageCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedImage(image)}
          >
            <img src={image} alt={`Gallery Image ${index + 1}`} />
          </ImageCard>
        ))}
      </GalleryGrid>

      <AnimatePresence>
        {selectedImage && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <img src={selectedImage} alt="Selected Gallery Image" />
            <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
          </Modal>
        )}
      </AnimatePresence>
    </GallerySection>
  )
}

export default Gallery
