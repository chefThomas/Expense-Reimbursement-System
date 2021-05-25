import React from 'react';
import Close from '../svg-icons/close';

const DescpriptionModal = ({ text, closeModal }) => {
  return (
    <div class=' absolute absolute-center-custom  bg-gray-50 pt-10 pb-8 px-6 flex items-start border border-indigo-300 text-gray-800 my-4 shadow-2xl fixed-width-md'>
      <div class=' px-3'>
        <h3 class=' absolute top-2 left-2 tracking-wider action-text'>
          Description
        </h3>
        <p class='py-2 text-left'>{text}</p>
        <div class='space-x-6 text-right'>
          <button
            onClick={() => closeModal()}
            class='font-semibold tracking-wider hover:underline focus:outline-none absolute top-2 right-2'
          >
            <Close />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescpriptionModal;
