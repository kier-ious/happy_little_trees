import React, { useEffect, useState } from 'react';

const AirdateComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/airdate')
      .then(response => response.json())
      .then(
        data => {
          setData(data);
          console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Airdate Data</h2>
      <ul>
        {data.map((item) => (
          <><li>{item.episode_id}</li>
          <li>{item.painting_title}</li>
          <li>{item.original_broadcast_date}</li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default AirdateComponent;
