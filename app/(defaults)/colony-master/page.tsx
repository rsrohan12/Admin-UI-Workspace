import { List } from '@/components/colony-master';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Colony Master',
};

const colonyMaster = () => {
  return (
    <>
      <List />
    </>
  );
};

export default colonyMaster;
