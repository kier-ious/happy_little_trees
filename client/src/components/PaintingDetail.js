import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaintingDetail = () => {
    const { id } = useParams();
    const [painting, setPainting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/paintings/${id}`)
            .then(response => {
                setPainting(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div>
            {painting ? (
                <div>
                    <h3>{painting.painting_title}</h3>
                    <img src={painting.img_src} alt={painting.painting_title}/>
                    <p>Season: {painting.season}</p>
                    <p>Episode: {painting.episode}</p>
                    <p>Colors: {painting.colors.join(', ')}</p>
                    <p>Color Hexes: {painting.color_hex.join(', ')}</p>
                    <p>YouTube: <a href={painting.youtube_src}>Watch</a></p>
                    <p>Date: {painting.Month}/{painting.Day}/{painting.Year}</p>
                </div>
            ) : (
                <p>No painting details available</p>
            )}
        </div>
    );
};

export default PaintingDetail;
