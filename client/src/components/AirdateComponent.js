import React, { useEffect, useState } from 'react';

const AirdateComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/airdate')
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Airdate Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item.episode_id}>
            <p>{item.episode_id}</p>
            <p>{item.painting_title}</p>
            <p>{formatDate(item.original_broadcast_date)}</p>
            <p>{item.img_src}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AirdateComponent;
