import { useState } from 'react';
import PocketBase from 'pocketbase';

const EnvironmentForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    builder_image: '',
    poolsize: '',
    min_cpu: '',
    max_cpu: '',
    min_memory: '',
    max_memory: '',
    external_net: '',
    grace_time: '',
    namespace: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your Pocketbase server URL
    await pb.collection('environments').create(formData);

    onSave();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="backdrop-blur-md bg-white/30 p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Create Environment</h2>
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Name
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="grow" placeholder="Environment name" required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Image
            <input type="text" name="image" value={formData.image} onChange={handleInputChange} className="grow" placeholder="Image" required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Builder Image
            <input type="text" name="builder_image" value={formData.builder_image} onChange={handleInputChange} className="grow" placeholder="Builder image" required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Pool Size
            <input type="number" name="poolsize" value={formData.poolsize} onChange={handleInputChange} className="grow" placeholder="Pool size" required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Min CPU
            <input type="number" name="min_cpu" value={formData.min_cpu} onChange={handleInputChange} className="grow" placeholder="Min CPU" required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Max CPU
            <input type="number" name="max_cpu" value={formData.max_cpu} onChange={handleInputChange} className="grow" placeholder="Max CPU" required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Min Memory
            <input type="number" name="min_memory" value={formData.min_memory} onChange={handleInputChange} className="grow" placeholder="Min memory" required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Max Memory
            <input type="number" name="max_memory" value={formData.max_memory} onChange={handleInputChange} className="grow" placeholder="Max memory" required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            External Net
            <input type="text" name="external_net" value={formData.external_net} onChange={handleInputChange} className="grow" placeholder="External net" required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Grace Time
            <input type="text" name="grace_time" value={formData.grace_time} onChange={handleInputChange} className="grow" placeholder="Grace time" required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Namespace
            <input type="text" name="namespace" value={formData.namespace} onChange={handleInputChange} className="grow" placeholder="Namespace" required />
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

export default EnvironmentForm;