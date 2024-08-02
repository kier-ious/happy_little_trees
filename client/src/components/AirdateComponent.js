import React, { useEffect, useState } from 'react';

const AirdateComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/airdate')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Airdate Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AirdateComponent;
