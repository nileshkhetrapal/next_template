import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

const FunctionForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    environment_id: '',
    executor_type: '',
    min_scale: '',
    max_scale: '',
    min_cpu: '',
    max_cpu: '',
    min_memory: '',
    max_memory: '',
    secrets: '',
    config_maps: '',
    namespace: '',
    code: '',
  });
  const [environments, setEnvironments] = useState([]);

  useEffect(() => {
    const fetchEnvironments = async () => {
      const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your Pocketbase server URL
      const result = await pb.collection('environments').getList(1, 30);
      setEnvironments(result.items);
    };
    fetchEnvironments();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your Pocketbase server URL
    await pb.collection('functions').create(formData);

    onSave();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="backdrop-blur-md bg-white/30 p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Create Function</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Function name"
              required
            />
          </label>
          <div className="dropdown mb-4">
            <div tabIndex={0} role="button" className="btn m-1">
              {formData.environment_id ? environments.find((env) => env.id === formData.environment_id)?.name : 'Select Environment'}
            </div>
            <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-primary text-primary-content">
              <div className="card-body">
                {environments.map((env) => (
                  <div
                    key={env.id}
                    className="card-title cursor-pointer"
                    onClick={() => setFormData({ ...formData, environment_id: env.id })}
                  >
                    {env.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <label className="block mb-4">
            Executor Type
            <input
              type="text"
              name="executor_type"
              value={formData.executor_type}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Executor type"
              required
            />
          </label>
          <label className="block mb-4">
            Min Scale
            <input
              type="number"
              name="min_scale"
              value={formData.min_scale}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Min scale"
              required
            />
          </label>
          <label className="block mb-4">
            Max Scale
            <input
              type="number"
              name="max_scale"
              value={formData.max_scale}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Max scale"
              required
            />
          </label>
          <label className="block mb-4">
            Min CPU
            <input
              type="number"
              name="min_cpu"
              value={formData.min_cpu}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Min CPU"
              required
            />
          </label>
          <label className="block mb-4">
            Max CPU
            <input
              type="number"
              name="max_cpu"
              value={formData.max_cpu}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Max CPU"
              required
            />
          </label>
          <label className="block mb-4">
            Min Memory
            <input
              type="number"
              name="min_memory"
              value={formData.min_memory}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Min memory"
              required
            />
          </label>
          <label className="block mb-4">
            Max Memory
            <input
              type="number"
              name="max_memory"
              value={formData.max_memory}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Max memory"
              required
            />
          </label>
          <label className="block mb-4">
            Secrets
            <input
              type="text"
              name="secrets"
              value={formData.secrets}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Secrets"
              required
            />
          </label>
          <label className="block mb-4">
            Config Maps
            <input
              type="text"
              name="config_maps"
              value={formData.config_maps}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Config maps"
              required
            />
          </label>
          <label className="block mb-4">
            Namespace
            <input
              type="text"
              name="namespace"
              value={formData.namespace}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Namespace"
              required
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Code</span>
              <span className="label-text-alt">Function code</span>
            </div>
            <textarea
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="textarea textarea-bordered h-24"
              placeholder="Function code"
              required
            ></textarea>
            <div className="label">
              <span className="label-text-alt">Function code</span>
            </div>
          </label>
          <div className="flex justify-end">
            <button type="button" className="btn btn-ghost mr-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FunctionForm;