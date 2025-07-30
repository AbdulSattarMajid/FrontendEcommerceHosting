import React, { useState, useEffect } from 'react'
import Furniture1 from '../../Images/Furniture1.jpg'
import Gaming from '../../Images/Gaming.png'
import SmartTech from '../../Images/SmartTech.png'
import Fashion from '../../Images/Fashion.jpg'
import Toys from '../../Images/Toys.jpeg'
import Sports from '../../Images/Sports.jpeg'

const slides = [
    {
        image: Furniture1,
        title: 'Modern Furniture',
        subtitle: 'Comfort and elegance for every room.',
        textColor: 'text-white',
    },
    {
        image: Gaming,
        title: 'Enter the Game Zone',
        subtitle: 'Latest gear for hardcore gamers.',
        textColor: 'text-white',
    },
    
    {
        image: Toys,
        title: 'Toys & Games',
        subtitle: 'Fun, educational, and playful picks for all ages.',
        textColor: 'text-white',
    },
        {
        image: SmartTech,
        title: 'Smart Tech & Gadgets',
        subtitle: 'Laptops, phones, tablets—everything to upgrade your lifestyle.',
        textColor: 'text-white',
    },
    {
        image: Sports,
        title: 'Sports & Fitness',
        subtitle: 'Gear up and push your limits.',
        textColor: 'text-white',
    },
    {
        image: Fashion,
        title: 'Trending Fashion',
        subtitle: 'Stay in style with the latest trends.',
        textColor: 'text-white',
    },
]

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            )
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    const { image, title, subtitle, textColor } = slides[currentIndex]

    return (
        <div className="relative w-full h-[95vh] overflow-hidden">
            {/* Background Image */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Dark overlay for text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

            {/* Foreground Content */}
            <div className="relative z-20 flex flex-col justify-center items-center text-center h-full px-4">
                <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${textColor}`}>
                    {title}
                </h1>
                <p className={`text-lg md:text-xl max-w-xl ${textColor}`}>
                    {subtitle}
                </p>
            </div>
            
        </div>
        
    )
}

export default HeroSection
