import React from 'react';
import Navbar from './Navbar';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="p-0">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
