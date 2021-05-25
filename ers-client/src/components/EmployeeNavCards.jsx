import Card from './Card';

import time from '../svg-icons/time';
import bank from '../svg-icons/bank';
import fatStacks from '../svg-icons/fatStacks';

const employeeNavCards = ({ request, resolved, pending }) => {
  return (
    <>
      <Card
        action={request}
        icon={fatStacks}
        title='Request'
        desc='Submit a new request for reimbursement'
      />
      <Card
        action={pending}
        icon={time}
        title='Pending'
        desc='View all pending reimbursement requests'
      />
      <Card
        action={resolved}
        icon={bank}
        title='Resolved'
        desc='View all approved/rejected reimbursement requests'
      />
    </>
  );
};

export default employeeNavCards;
