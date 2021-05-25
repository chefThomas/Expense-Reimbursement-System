import { Transition } from '@headlessui/react';
import React, { useState } from 'react';
import Page from '../Page';
import employeeNavCards from '../EmployeeNavCards';
import Employees from '../Employees';
import managerNavCards from '../ManagerNavCards';
import EmployeeRequestForm from '../EmployeeRequestForm';
import PendingRequestTable from '../PendingRequestTable';
import ManagerRequestTable from '../PendingRequestTable';

import { Redirect } from 'react-router';

const Main = ({
  user,
  addReq,
  getOneEmpsReqs,
  getAllReqs,
  updateReq,
  getEmployees,
  approveReq,
  rejectReq,
  getReqs,
}) => {
  const [manView, setManView] = useState(null);
  const [empView, setEmpView] = useState(null);

  const manViewStateControl = {
    allReqs: function () {
      setManView('managerPending');
    },

    allResolved: function () {
      setManView('managerResolved');
    },

    allEmployees: function () {
      setManView('managerEmployees');
    },
  };

  const empViewStateControl = {
    //TODO implement manager views
    request: function () {
      setEmpView('request');
    },
    resolved: function () {
      setEmpView('resolved');
    },
    pending: function () {
      setEmpView('pending');
      // display pending table
    },
  };

  function generateMainView() {
    const view = empView || manView;
    switch (view) {
      case 'request':
        return (
          <Transition
            appear={true}
            show={empView && empView == 'request'}
            enter='transition ease-in-out duration-350 transform'
            enterTo='translate-y-0'
            enterFrom='translate-y-20'
          >
            <Transition.Child
              enter='transition-opacity duration-200'
              enterTo='opacity-100'
              enterFrom='opacity-0'
            >
              <EmployeeRequestForm addReq={addReq} clearMain={clearMainView} />
            </Transition.Child>
          </Transition>
        );
      case 'pending':
        console.log('pending');
        return (
          <PendingRequestTable
            view={view}
            user={user}
            getReqs={getOneEmpsReqs}
          />
        );
      case 'resolved':
        console.log('resolved emp');
        return (
          <PendingRequestTable view={view} user={user} getReqs={getReqs} />
        );
      case 'managerPending':
        return (
          <ManagerRequestTable
            view={view}
            user={user}
            getAllReqs={getAllReqs}
            updateReq={updateReq}
            approveReq={approveReq}
            rejectReq={rejectReq}
            manView={manView}
          />
        );
      case 'managerResolved':
        return (
          <ManagerRequestTable
            view={view}
            user={user}
            getAllReqs={getAllReqs}
            updateReq={updateReq}
            approveReq={approveReq}
            rejectReq={rejectReq}
            manView={manView}
          />
        );
      case 'managerEmployees':
        return <Employees view={view} getEmployees={getEmployees} />;
      default:
        return null;
    }
  }

  function clearMainView() {
    setEmpView(null);
    setManView(null);
  }

  return !user ? (
    <Redirect to='/login' />
  ) : (
    <Page class='bg-gray-200'>
      <h1 style={{ fontSize: 'calc(1.3rem + .6vw)' }}>Reimbursements</h1>
      <h3 className='ext-l uppercase text-gray-500 mb-10'>
        {user.roleId == 1 ? 'Manager' : 'Employee'}
      </h3>
      <div
        name='card-container'
        className='flex flex-wrap gap-x-3 gap-y-3 justify-center mb-9'
      >
        {user.roleId == 1
          ? managerNavCards(manViewStateControl)
          : employeeNavCards(empViewStateControl)}
      </div>
      <div
        className='main-content flex justify-center relative'
        name='main-content'
      >
        {empView || manView ? generateMainView() : null}
      </div>
    </Page>
  );
};

export default Main;
