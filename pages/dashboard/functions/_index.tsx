import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import FunctionForm from '../../FunctionForm';

const Functions = () => {
  const [functions, setFunctions] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your Pocketbase server URL
      const result = await pb.collection('functions').getList(1, 30);
      setFunctions(result.items);
    };
    fetchData();
  }, []);

  const handleCreateFunction = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  const handleSaveFunction = async () => {
    setShowCreateForm(false);
    // Refresh the list of functions after saving
    const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your Pocketbase server URL
    const result = await pb.collection('functions').getList(1, 30);
    setFunctions(result.items);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Functions Dashboard</h1>
      <div className="mb-4">
        <button className="btn btn-primary" onClick={handleCreateFunction}>
          Create Function
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Environment</th>
              <th>Trigger</th>
              <th>Entry Point</th>
              <th>Status</th>
              <th>Last Deployed</th>
            </tr>
          </thead>
          <tbody>
            {functions.map((func) => (
              <tr key={func.id} className="hover">
                <td>{func.name}</td>
                <td>{func.environment_id}</td>
                <td>{func.trigger}</td>
                <td>{func.entrypoint}</td>
                <td>{func.status}</td>
                <td>{func.last_deployed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showCreateForm && <FunctionForm onClose={handleCloseForm} onSave={handleSaveFunction} />}
    </>
  );
};

export default Functions;