import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import EnvironmentForm from '../../EnvironmentForm';

const Dashboard = () => {
  const [environments, setEnvironments] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your Pocketbase server URL
      const result = await pb.collection('environments').getList(1, 30);
      setEnvironments(result.items);
    };
    fetchData();
  }, []);

  const handleCreateEnvironment = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  const handleSaveEnvironment = async () => {
    setShowCreateForm(false);
    // Refresh the list of environments after saving
    const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your Pocketbase server URL
    const result = await pb.collection('environments').getList(1, 30);
    setEnvironments(result.items);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Environments Dashboard</h1>
      <div className="mb-4">
        <button className="btn btn-primary" onClick={handleCreateEnvironment}>
          Create Environment
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Builder Image</th>
              <th>Pool Size</th>
              <th>Min CPU</th>
              <th>Max CPU</th>
              <th>Min Memory</th>
              <th>Max Memory</th>
              <th>External Net</th>
              <th>Grace Time</th>
              <th>Namespace</th>
            </tr>
          </thead>
          <tbody>
            {environments.map((env) => (
              <tr key={env.id} className="hover">
                <td>{env.name}</td>
                <td>{env.image}</td>
                <td>{env.builder_image}</td>
                <td>{env.poolsize}</td>
                <td>{env.min_cpu}</td>
                <td>{env.max_cpu}</td>
                <td>{env.min_memory}</td>
                <td>{env.max_memory}</td>
                <td>{env.external_net}</td>
                <td>{env.grace_time}</td>
                <td>{env.namespace}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showCreateForm && <EnvironmentForm onClose={handleCloseForm} onSave={handleSaveEnvironment} />}
    </>
  );
};

export default Dashboard;