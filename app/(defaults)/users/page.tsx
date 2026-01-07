import { List } from '@/components/users';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Users',
};

const Users = () => {
  return (
    <>
      <List />
    </>
  );
};

export default Users;
