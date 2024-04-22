// pages/login.tsx
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');
  const [errorDetails, setErrorDetails] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent the default form submission behavior
    const pb = new PocketBase('http://127.0.0.1:8090');
  
    try {
      if (activeTab === 'login') {
        // Attempt to log in with email and password
        const response = await pb.collection('users').authWithPassword(email, password);
        console.log("Working", response);  // Log success message and response object
        router.push('/dashboard/environments');  // Navigate to the dashboard upon successful login
      } else {
        // Handle registration tab
        if (registerPassword !== registerConfirmPassword) {
          setError('Passwords do not match');
          return;
        }
  
        // Attempt to create a new user record
        const response = await pb.collection('users').create({
          email: registerEmail,
          password: registerPassword,
          passwordConfirm: registerConfirmPassword,
        });
        console.log("User created:", response);  // Log the response from user creation
        setActiveTab('login');  // Switch to the login tab after successful registration
      }
    } catch (error: any) {  // Using 'any' to handle errors of unknown type
      if (error.response && error.response.data) {
        // Initialize an array to hold error messages
        let errorMessages: string[] = [];
    
        // Check for email and password error messages and add them to the errorMessages array
        if (error.response.data.email && error.response.data.email.message) {
          errorMessages.push(`Email: ${error.response.data.email.message}`);
        }
        if (error.response.data.password && error.response.data.password.message) {
          errorMessages.push(`Password: ${error.response.data.password.message}`);
        }
    
        // Join all error messages into a single string with a space in between
        const errorMessage = errorMessages.join(' ');
    
        // If there are any error messages, set the error state to that message
        if (errorMessage) {
          setError(`Failed to process request: ${errorMessage}`);
        } else {
          // If there are no specific field errors, use a generic error message
          setError('Failed to process request. Please check your input and try again.');
        }
    
        // Log detailed error information
        console.error('Error status:', error.response.status);
        console.error('Error details:', error.response.data);
      } else {
        // If the error does not have a response or data, log a generic error and set it
        console.error('Error:', error);
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
      }}
    >
      <div className="backdrop-blur-md bg-white/30 p-8 rounded-lg">
        <div role="tablist" className="tabs tabs-boxed mb-4">
          <a
            role="tab"
            className={`tab ${activeTab === 'login' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === 'register' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </a>
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
              <pre>{errorDetails}</pre>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.form
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full mb-4"
              value={activeTab === 'login' ? email : registerEmail}
              onChange={(e) => activeTab === 'login' ? setEmail(e.target.value) : setRegisterEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-4"
              value={activeTab === 'login' ? password : registerPassword}
              onChange={(e) => activeTab === 'login' ? setPassword(e.target.value) : setRegisterPassword(e.target.value)}
            />
            {activeTab === 'register' && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full mb-4"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              />
            )}
            <button type="submit" className="btn btn-primary w-full">
              {activeTab === 'login' ? 'Log in' : 'Register'}
            </button>
          </motion.form>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Login;
