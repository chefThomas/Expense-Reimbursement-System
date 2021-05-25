import React, { useState, useEffect } from 'react';
import DescpriptionModal from './DescpriptionModal';
import Record from './Record';
import RefreshIcon from '../svg-icons/refresh';

const PendingRequestTable = ({
  getReqs,
  getAllReqs,
  user,
  approveReq,
  rejectReq,
  manView,
  view,
}) => {
  const [reqs, setReqs] = useState([]);
  const [modalText, setModalText] = useState(null);
  const [searchForm, setSearchForm] = useState('');

  const isManager = user.roleId == 1;
  const isResolved = manView == 'managerResolved';
  const empIsResolved = view == 'resolved';

  useEffect(() => {
    load();
    console.log('load top');
    return () => {
      clearReqs();
    };
  }, [manView, view]);

  function filterByUser() {
    if (searchForm.search(/\d/) > -1) {
      const result = reqs.find((req) => req.authorId == searchForm);
      console.log('RESULT: ', result);
      if (result) {
        const allReqByEmpId = reqs.filter((req) => req.authorId == searchForm);
        setReqs(allReqByEmpId);
      } else {
        setReqs([]);
        setTimeout(() => {
          load();
        }, 2000);
      }
    } else {
      // search by name
      const result = reqs.filter((req) =>
        `${req.authorFirstName} ${req.authorLastName}`
          .toLowerCase()
          .includes(searchForm.toLowerCase())
      );

      if (result) {
        setReqs(result);
      } else {
        setReqs([]);
        setTimeout(() => {
          load();
        }, 2000);
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    filterByUser();
  }

  function closeModal() {
    setModalText(null);
  }

  function makeDescriptionModal(text) {
    setModalText(text);
  }

  async function handleApproveReq(id) {
    const result = await approveReq(id);
    if (result.data) {
      load();
    }
  }

  async function handleDenyReq(id) {
    const result = await rejectReq(id);
    if (result.data) {
      load();
    }
  }

  async function load() {
    let result;

    if (view) {
      switch (view) {
        case 'resolved':
          result = await getReqs();
          setReqs(
            result
              .sort((a, b) => a.id - b.id)
              .filter((req) => req.status !== 'pending')
          );
          break;
        case 'pending':
          result = await getReqs();
          setReqs(result.sort((a, b) => a.id - b.id));
          break;
        default:
      }
    }
    if (!isManager && !empIsResolved) {
      result = await getReqs();
      console.log(result);
      setReqs(result.sort((a, b) => a.id - b.id));
    } else {
      switch (manView) {
        case 'managerPending':
          result = await getAllReqs();
          setReqs(
            result
              .filter((req) => req.status === 'pending')
              .sort((a, b) => a.id - b.id)
          );
          break;
        case 'managerResolved':
          result = await getAllReqs();
          setReqs(
            result
              .filter((req) => req.status !== 'pending')
              .sort((a, b) => a.id - b.id)
          );
          break;
        default:
      }
    }
  }

  function clearReqs() {
    setReqs([]);
  }

  function handleSearchChange(e) {
    setSearchForm(e.target.value);
  }

  return (
    <div
      class={`container mx-auto px-4 sm:px-8 ${
        isManager ? '' : empIsResolved ? 'max-w-5xl' : 'max-w-3xl'
      }`}
    >
      <div class='py-8'>
        <div class='flex flex-row mb-1 sm:mb-0 justify-between w-full'>
          <h2 class='text-xl leading-tight'>
            {isResolved || empIsResolved
              ? 'Resolved Requests'
              : 'Pending Requests'}
          </h2>
          <div class='text-end'>
            <form
              onSubmit={handleSubmit}
              class='flex w-full max-w-sm space-x-3'
            >
              <div class=' relative '>
                <input
                  onChange={handleSearchChange}
                  value={searchForm}
                  type='text'
                  name='search-form'
                  id='"form-subscribe-Filter'
                  class=' block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline'
                  placeholder={
                    isManager
                      ? 'search by employee name or id'
                      : 'search by description'
                  }
                />
              </div>
              <div class='flex justify-center'>
                <input
                  class='shadow form-btn focus:shadow-outline focus:outline-none text-white text-xs font-bold py-2 px-4'
                  type='submit'
                  value='Search'
                />
              </div>
              <button
                onClick={() => load()}
                className='flex flex-col justify-center cursor-pointer'
              >
                <RefreshIcon />
              </button>
            </form>
          </div>
        </div>
        <div class='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div class='inline-block min-w-full shadow overflow-hidden'>
            <table
              class='min-w-full leading-normal'
              style={{ overflowY: 'auto' }}
            >
              <thead>
                <tr>
                  <th
                    scope='col'
                    class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm text-left uppercase font-normal'
                  >
                    ID
                  </th>
                  {isManager && (
                    <th
                      scope='col'
                      class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm text-left uppercase font-normal'
                    >
                      Employee
                    </th>
                  )}
                  {(isResolved || empIsResolved) && (
                    <th
                      scope='col'
                      class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm text-left uppercase font-normal'
                    >
                      Status
                    </th>
                  )}

                  <th
                    scope='col'
                    class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm text-left uppercase font-normal'
                  >
                    amount
                  </th>
                  <th
                    scope='col'
                    class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm text-left uppercase font-normal'
                  >
                    type
                  </th>
                  <th
                    scope='col'
                    class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    submitted
                  </th>
                  {(isResolved || empIsResolved) && (
                    <>
                      <th
                        scope='col'
                        class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        resolved
                      </th>
                      <th
                        scope='col'
                        class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        manager
                      </th>
                    </>
                  )}
                  <th
                    scope='col'
                    class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                  >
                    desc.
                  </th>
                  <th
                    scope='col'
                    class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                  >
                    receipt
                  </th>
                  {!isResolved && isManager && (
                    <th
                      scope='col'
                      class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                    >
                      action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className='relative'>
                {modalText && (
                  <DescpriptionModal closeModal={closeModal} text={modalText} />
                )}
                {reqs &&
                  reqs.map(({ ...props }) => (
                    <Record
                      {...props}
                      makeDescriptionModal={makeDescriptionModal}
                      isManager={isManager}
                      isResolved={isResolved}
                      empIsResolved={empIsResolved}
                      view={view}
                      manView={manView}
                      handleApproveReq={handleApproveReq}
                      handleDenyReq={handleDenyReq}
                    />
                  ))}
              </tbody>
            </table>
            <div class='px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between'>
              <div class='flex items-center'>
                {/* <button
                  type='button'
                  class='w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100'
                >
                  <svg
                    width='9'
                    fill='currentColor'
                    height='8'
                    class=''
                    viewBox='0 0 1792 1792'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z'></path>
                  </svg>
                </button>
                <button
                  type='button'
                  class='w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 '
                >
                  1
                </button>
                <button
                  type='button'
                  class='w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100'
                >
                  2
                </button>
                <button
                  type='button'
                  class='w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100'
                >
                  3
                </button>
                <button
                  type='button'
                  class='w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100'
                >
                  4
                </button>
                <button
                  type='button'
                  class='w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100'
                >
                  <svg
                    width='9'
                    fill='currentColor'
                    height='8'
                    class=''
                    viewBox='0 0 1792 1792'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z'></path>
                  </svg>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingRequestTable;
