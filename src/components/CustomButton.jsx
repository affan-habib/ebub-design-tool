import React from 'react';
import { Icon } from "@iconify/react";

const CustomButton = ({ iconType, buttonText, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    };

    return (
        <button onClick={handleClick} className={`flex items-center bg-gray-800 text-white rounded h-[40px] border-gray-400 border w-full`}>
            <Icon icon={iconType} className={`mr-2 bg-gray-500 w-[40px] h-full rounded-l p-2`} />
            {buttonText}
        </button>
    )
}

export default CustomButton;