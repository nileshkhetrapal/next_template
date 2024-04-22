import Link from 'next/link';
import React from 'react';
import { FloatingNav } from './ui/floating-navbar'; // Ensure this path matches your actual component location
import { IconLayoutDashboard, IconFunction, IconFileText, IconSettings } from '@tabler/icons-react';

const Navbar = () => {
  const navItems = [
    {
      name: "Environments",
      link: "/dashboard/environments",
      icon: <IconLayoutDashboard className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Functions",
      link: "/dashboard/functions",
      icon: <IconFunction className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Logs",
      link: "/dashboard/logs",
      icon: <IconFileText className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
      icon: <IconSettings className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Navbar;
