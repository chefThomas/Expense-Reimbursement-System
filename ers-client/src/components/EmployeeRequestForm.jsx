import React, { useState } from 'react';
import CloseIcon from '../svg-icons/close';

const typeOptions = [
  { id: 1, expense_type: 'Lodging' },
  { id: 2, expense_type: 'Travel' },
  { id: 3, expense_type: 'Food' },
  { id: 4, expense_type: 'Other' },
];

const initVals = {
  desc: '',
  amount: 0,
  typeId: 1,
};

function EmployeeRequestForm({ addReq, clearMain }) {
  const [form, setForm] = useState(initVals);

  function handleRequestSubmit(e) {
    e.preventDefault();
    addReq(form);
    setForm(initVals);
  }

  function handleReqFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCloseReqForm() {
    setForm(initVals);
    clearMain();
  }

  const { desc, amount, typeId } = form;

  return (
    <div class='w-full max-w-xs text-sm'>
      <h2 class='text-2xl action-text form-title text-center mb-3'>
        Reimbursement Request
      </h2>
      <form
        onSubmit={handleRequestSubmit}
        className='bg-gray menu-card relative px-8 pt-6 pb-8 mb-4'
        action='emp-request'
      >
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='type'
        >
          Type
        </label>
        <select
          value={typeId}
          name='typeId'
          onChange={handleReqFormChange}
          className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 mb-6 shadow-sm leading-tight focus:outline-none focus:shadow-outline'
        >
          {typeOptions.map(({ id, expense_type }) => (
            <option value={id} key={id}>
              {id} - {expense_type}
            </option>
          ))}
        </select>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='amount'
        >
          Amount
        </label>
        <input
          onChange={handleReqFormChange}
          className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm mb-6 text-sm leading-tight focus:outline-none focus:shadow-outline'
          type='number'
          name='amount'
          value={amount}
        />
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='amount'
        >
          Description
        </label>
        <textarea
          name='desc'
          value={desc}
          onChange={handleReqFormChange}
          class='hover:border-gray-500 form-textarea mt-1 block w-full border border-gray-200 px-2 py-2 mb-5'
          rows='3'
          placeholder='Additional information'
        ></textarea>

        <div class='flex justify-center'>
          <input
            onClick={handleRequestSubmit}
            class='shadow form-btn focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4'
            type='submit'
            value='Submit Request'
          />
        </div>
      </form>
    </div>
  );
}

export default EmployeeRequestForm;
