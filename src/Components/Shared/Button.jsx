import { useState } from 'react';

const Button = ({ value }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            type='submit'
            className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-red-500 text-white font-semibold  px-4 rounded-md ${isHovered ? 'shadow-md' : 'shadow'
                }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {value}
        </button>
    );
};

export default Button;
