import { List } from '@/components/block-master';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Block Master',
};

const blockMaster = () => {
  return (
    <>
      <List />
    </>
  );
};

export default blockMaster;
