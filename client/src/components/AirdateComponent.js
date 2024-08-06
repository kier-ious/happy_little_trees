import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AirdateComponent = () => {
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/airdates')
            .then(response => {
                setPaintings(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div>
            <h2>Paintings</h2>
            {paintings.length === 0 ? (
                <p>No paintings available</p>
            ) : (
                <ul>
                    {paintings.map(painting => (
                        <li key={painting._id}>
                            <h3>{painting.painting_title}</h3>
                            <Link to={`/painting/${painting._id}`}>View Details</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AirdateComponent;
