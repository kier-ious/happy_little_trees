import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AirdateComponent = ({ selectedColors = [] }) => {
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

    const filteredPaintings = paintings.filter(painting =>
        selectedColors.every(color => painting.colors[0].match(color))
    );
    console.log(filteredPaintings)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div>
            <h2>Paintings</h2>
            {filteredPaintings.length === 0 ? (
                <p>No paintings available</p>
            ) : (
                <ul>
                    {filteredPaintings.map(painting => (
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
