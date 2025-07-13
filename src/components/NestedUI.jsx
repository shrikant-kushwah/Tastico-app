import React from 'react';
import Accordion from './Accordion ';

const NestedUI = ({ title, data }) => {
  return (
    <div className='w-full'>
      <p className='text-lg font-bold mb-2'>{title}</p>
      <div>
        {data.map((item, index) => (
          <Accordion
            key={index}
            title={item.title}
            data={item.itemCards}
            isNested={true}
            isLast={index === data.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default NestedUI;
