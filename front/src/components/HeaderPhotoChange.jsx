import { useState, useEffect } from 'react';

function HeaderPhotoChange() {
    const totalPhotos = 9;
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(Math.floor(Math.random() * totalPhotos) + 1);
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState('');

    useEffect(() => {
        const loadPhoto = async (index) => {
            const photo = await import(`../assets/headerPhoto${index}.jpg`);
            setCurrentPhotoUrl(photo.default);
        };

        loadPhoto(currentPhotoIndex);

        const interval = setInterval(() => {
            setCurrentPhotoIndex(prevIndex => {
                const nextIndex = (prevIndex % totalPhotos) + 1;
                loadPhoto(nextIndex);
                return nextIndex;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [currentPhotoIndex]);    
    
    return(
        <>
        {currentPhotoUrl && <img src={currentPhotoUrl} alt="Header Photo" className="homeHeaderPhoto" />}
        </>
    )
}

export default HeaderPhotoChange;