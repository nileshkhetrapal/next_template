import Link from 'next/link';
import Image from 'next/image';
import background from '../public/background.jpg'; // Place your background.jpg in the public directory

const Home = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background.src})` }}>
      <div className="flex items-center justify-center h-screen">
        <div className="backdrop-blur-md bg-white/30 p-10 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our App</h1>
          <p className="text-white mb-6">The best place to start your projects with great UI components.</p>
          <Link href="/login" className="btn btn-primary">
            Get Started
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Home;
