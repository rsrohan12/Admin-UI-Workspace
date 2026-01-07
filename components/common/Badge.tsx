'use client';
import React from 'react';

type TProps = {
  type:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'not_started'
    | 'in_progress'
    | 'completed'
    | 'ready_for_review'
  message: React.ReactNode;
};

const getClassName = (text: string) => {
  let cls = '';
  if (text === 'primary') {
    cls = 'text-primary bg-primary bg-opacity-25';
  } else if (text === 'success') {
    cls = 'text-success bg-success bg-opacity-25';
  } else if (text === 'danger') {
    cls = 'text-danger bg-danger bg-opacity-25';
  } else if (text === 'warning') {
    cls = 'text-warning bg-warning bg-opacity-25';
  } else if (text === 'info') {
    cls = 'text-info bg-info bg-opacity-25';
  } else if (text === 'dark') {
    cls = 'text-dark bg-dark bg-opacity-25';
  } else if (text === 'secondary') {
    cls = 'text-secondary bg-secondary bg-opacity-25';
  }else if (text === 'not_started') {
    cls = 'text-danger bg-danger bg-opacity-10';
  }else if (text === 'completed') {
    cls = 'text-[#2B6FEE] bg-[#2B6FEE] bg-opacity-10';
  }
  else if (text === 'in_progress') {
    cls = 'text-[#FF7722] bg-[#FF7722] bg-opacity-10';
  }
  else if (text === 'ready_for_review') {
    cls = 'text-[#039855] bg-[#039855] bg-opacity-10';
  }
   else {
    cls = 'text-primary bg-primary bg-opacity-25';
  }
  return cls;
};


export const Badge = ({ type, message }: TProps) => {
  return (
    <span className={`badge ${getClassName(type)} capitalize`}>{message}</span>
  );
};

export function StatusBadge({ status }: { status?: string }) {
  if (status === 'active') {
    return <Badge type="success" message="Active" />;
  } else if (status === 'pending') {
    return <Badge type="warning" message="Pending" />;
  } else if (status === 'inactive') {
    return <Badge type="danger" message="Inactive" />;
  }
  else if (status === 'not_started') {
    return <Badge type="not_started" message="not_started" />;
  }
  else if (status === 'in_progress') {
    return <Badge type="in_progress" message="in_progress" />;
  }
  else if (status === 'ready_for_review') {
    return <Badge type="ready_for_review" message="ready_for_review" />;
  }
  
  else {
    return <Badge type="info" message={status} />;
  }
}
