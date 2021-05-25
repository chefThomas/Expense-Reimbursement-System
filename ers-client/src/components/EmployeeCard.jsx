import React from 'react';
import EmailIcon from '../svg-icons/email';

const EmployeeCard = ({ id, email, firstName, lastName }) => {
  function handleCopyEmail() {
    navigator.clipboard.writeText(email);
    alert(`${email} copied to clipboard`);
  }

  return (
    <div class='custom-w-12'>
      <div class=' menu-card px-2 py-8 bg-white h-25 overflow-hidden relative shadow bg-white shadow-sm hover:shadow-lg '>
        <div className='mb-7'></div>
        <img
          className='absolute top-1 right-1 w-10'
          src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
          alt='employee initials'
        />
        <h3 class='py-2 absolute top-1 left-2 font-semi-bold text-sm mb-5'>
          ID {id}
        </h3>
        <div></div>
        <div class=' leading-none justify-start w-full'>
          <div class=' mr-3 text-center leading-none tracking-wider py-1 '>
            {firstName} {lastName}
          </div>
          <div class=' inline-flex items-center leading-none text-sm'></div>
        </div>
        <button
          onClick={() => handleCopyEmail(email)}
          class='text-sm absolute bottom-1 right-2 action-text'
        >
          <EmailIcon />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
