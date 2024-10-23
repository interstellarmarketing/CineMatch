import { useState } from 'react'
import { IMG_CDN_ORG_URL, IMG_CDN_URL } from '../utils/constants';

const ActorImagesList = ({images}) => {

    const actorImages = images.profiles;

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };
    
  return (
    <div className="px-12 py-3">
        <div className="flex overflow-x-scroll scrollbar-hide ">
            <div className="flex scroll-smooth">
                {actorImages.map(image => (
                   <div className='w-64 pr-4'>                    
                   <img 
                        src={IMG_CDN_URL + image.file_path}
                        className='w-52 h-72 rounded-md m-2 object-cover'
                        onClick={() => handleImageClick(image)} 
                    
                    />
                    </div>
                ))} 
            </div>
        </div>

        {selectedImage && ( // Conditionally render modal if an image is selected
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
                    <img 
                        src={IMG_CDN_ORG_URL + selectedImage.file_path} 
                        className='w-[480px] h-auto rounded-md' 
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
                    />
                </div>
        )}
        
    </div>
  )
}

export default ActorImagesList