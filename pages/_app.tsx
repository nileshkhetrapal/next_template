import { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import DashboardLayout from '../components/DashboardLayout';

function MyApp({ Component, pageProps, router }: AppProps) {
  // This function determines the layout based on the route
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => {
    // Check if the route starts with '/dashboard'
    if (router.pathname.startsWith('/dashboard')) {
      // Wrap the page in the DashboardLayout if the route is under the dashboard directory
      return (<DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="backdrop-blur-md bg-white/30 p-8 rounded-lg">
            {page}
            </div>
            </div>
            </DashboardLayout>);
    }
    // If not a dashboard route, do not use the DashboardLayout
    return page;
  });

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
