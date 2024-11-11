import React from 'react';
import { AppProvider } from './AppContext';

const Provider = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

export default Provider;
