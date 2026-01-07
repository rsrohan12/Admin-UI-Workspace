import { List } from '@/components/survey';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'GIS Survey',
};

const survey = () => {
  return (
    <>
      <List />
    </>
  );
};

export default survey;
