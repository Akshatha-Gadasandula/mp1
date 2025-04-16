import React from 'react';
import './ExpenseItem.css'; // Optional CSS file

const ExpenseItem = ({ title, amount, date }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="expense-item">
      <div className="expense-date">{formattedDate}</div>
      <div className="expense-title">{title}</div>
      <div className="expense-amount">${amount}</div>
    </div>
  );
};

export default ExpenseItem;
