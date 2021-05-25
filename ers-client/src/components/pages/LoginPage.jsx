import { Transition } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import LoginForm from '../LoginForm';

const LoginPage = ({ login, user }) => {
  useEffect(() => {
    fadeInLoginForm();
    return () => {};
  }, []);

  const [isShowing, setIsShowing] = useState(false);

  function fadeInLoginForm() {
    setIsShowing(true);
  }

  return (
    <div>
      <Transition
        appear={true}
        show={isShowing}
        enter='transition-opacity duration-1000'
        enterTo='opacity-100'
        enterFrom='opacity-0'
      >
        <Transition.Child
          enter='transition ease-in-out duration-300 transform'
          enterFrom='translate-y-full'
          enterTo='translate-y-0'
        >
          <div className='flex flex-col text-gray-800 justify-center  pt-36 pb-10'>
            <h2 className='mx-auto text-6xl font-mono tracking-widest text-gray-700	title-shadow'>
              ERS
            </h2>
            <h1 className='mx-auto uppercase'>Employee Reimbursement System</h1>
          </div>
        </Transition.Child>
      </Transition>
      <Transition
        appear={true}
        show={isShowing}
        enter='transition-opacity duration-1000'
        enterTo='opacity-100'
        enterFrom='opacity-0'
      >
        <Transition.Child
          enter='transition ease-in-out duration-500 transform'
          enterFrom='translate-y-full'
          enterTo='translate-y-0'
        >
          <LoginForm login={login} user={user} />
        </Transition.Child>
      </Transition>
    </div>
  );
};

export default LoginPage;
