import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import RouteForm from '../../../RouteForm'; // This will be your form component for adding or editing routes

const Dashboard = () => {
    const [routes, setRoutes] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your Pocketbase server URL
            const result = await pb.collection('routes').getList(1, 30);
            setRoutes(result.items);
        };
        fetchData();
    }, []);

    const handleCreateRoute = () => {
        setShowCreateForm(true);
    };

    const handleCloseForm = () => {
        setShowCreateForm(false);
    };

    const handleSaveRoute = async () => {
        setShowCreateForm(false);
        // Refresh the list of routes after saving
        const pb = new PocketBase('http://127.0.0.1:8090');
        const result = await pb.collection('routes').getList(1, 30);
        setRoutes(result.items);
    };

    return (
        <>
            <h1>Routes Dashboard</h1>
            <button onClick={handleCreateRoute}>Create Route</button>
            {routes.map((route) => (
                <div key={route.id}>
                    <p>Name: {route.name}</p>
                    <p>Method: {route.method}</p>
                    <p>URL: {route.url}</p>
                    <p>Related Functions: {route.functions.join(', ')}</p>
                </div>
            ))}
            {showCreateForm && (
                <RouteForm
                    onSave={handleSaveRoute}
                    onClose={handleCloseForm}
                />
            )}
        </>
    );
};

export default Dashboard;
