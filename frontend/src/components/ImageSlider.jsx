import { useEffect, useState } from 'react';

const images = [
    "./images/banner1.jpg",
    "./images/banner2.jpeg",
    "./images/banner3.jpeg",
    "./images/banner4.jpeg"
]
function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 3000)
        return () => clearInterval(interval);
    }, [])
    return (
        <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 relative w-full mt-16 overflow-hidden">
            <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) =>
                (<div className="min-w-full h-[450px] md:h-[400px] sm:h-[300px]" key={index}>
                    <img className="w-full h-full object-cover" src={image} alt={`Slide ${index + 1}`} />
                </div>
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {images.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-7 h-1 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-indigo-700 scale-125 shadow-lg" : "bg-white/50 hover:bg-white"}`} />
                ))}
            </div>
        </div>
    )
}

export default ImageSlider;