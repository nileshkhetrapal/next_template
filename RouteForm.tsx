import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

const RouteForm = ({ onSave, onClose, initialData = {} }) => {
    const [name, setName] = useState('');
    const [method, setMethod] = useState('');
    const [url, setUrl] = useState('');
    const [functions, setFunctions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load initial data into form
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setMethod(initialData.method || '');
            setUrl(initialData.url || '');
            setFunctions(initialData.functions || []);
        }
    }, [initialData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const pb = new PocketBase('http://127.0.0.1:8090');
        try {
            const data = {
                name,
                method,
                url,
                functions
            };
            if (initialData.id) {
                await pb.collection('routes').update(initialData.id, data);
            } else {
                await pb.collection('routes').create(data);
            }
            onSave();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{initialData.id ? 'Edit Route' : 'Create Route'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Method:
                    <input
                        type="text"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        required
                    />
                </label>
                <label>
                    URL:
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Related Functions (comma-separated):
                    <input
                        type="text"
                        value={functions.join(', ')}
                        onChange={(e) => setFunctions(e.target.value.split(',').map(func => func.trim()))}
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>{initialData.id ? 'Update' : 'Create'}</button>
                <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
            </form>
        </div>
    );
};

export default RouteForm;
