import React, { useState } from 'react';
import AccordionCard from './AccordionCard';

const Accordion = ({ title, data, isNested, isLast }) => {
    const [showDropdown, setShowDropdown] = useState(true);

    return (
        <div className={`w-full mb-3 ${isNested ? (isLast ? "" : "border-b border-gray-200 pb-3") : ""}`}>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => setShowDropdown(!showDropdown)}>
                <p className='text-lg font-medium'>
                    {title} ({data.length})
                </p>
                <i className={`fa-solid ${showDropdown ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
            </div>

            {showDropdown && (
                <div className='mt-2'>
                    {data.map((item, index) => (
                        <AccordionCard
                            key={index}
                            info={item.card.info}
                            isLast={index === data.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Accordion;
