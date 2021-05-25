import axios from 'axios';
import React, { useState, useEffect } from 'react';
import EmployeeCard from './EmployeeCard';

const Employees = () => {
  useEffect(() => {
    callLoadEmps();
    return () => {};
  }, []);

  const [emps, setEmps] = useState([]);

  async function callLoadEmps() {
    const result = await axios.get('employees');
    if (result) {
      console.log(result.data);
      setEmps(result.data);
    }
  }

  return (
    <div className='flex flex-wrap justify-center gap-5'>
      {emps
        .sort((a, b) => a.lastName - b.lastName)
        .map((props) => (
          <EmployeeCard {...props} />
        ))}
    </div>
  );
};

export default Employees;
