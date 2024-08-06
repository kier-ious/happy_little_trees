import React, { useEffect, useState } from 'react';
import './wheelMenu.css';
import './colorWheel.css';

const colors = [
  { name: "Alizarin Crimson", img: "images/Alizarin-Crimson.jpg" },
  { name: "Bright Red", img: "images/Bright-Red.jpg" },
  { name: "Cadmium Yellow", img: "images/Cadmium-Yellow.jpg" },
  { name: "Phthalo Green", img: "images/Phthalo-Green.jpg" },
  { name: "Prussian Blue", img: "images/Prussian-Blue.jpg" },
  { name: "Sap Green", img: "images/Sap-Green.jpg" },
  { name: "Titanium White", img: "images/Titanium-White.jpg" },
  { name: "Van Dykes Brown", img: "images/Van-Dykes-Brown.jpg" },
  { name: "Black Gesso", img: "images/Black-Gesso.jpg" },
  { name: "Burnt Umber", img: "images/Burnt-Umber.jpg" },
  { name: "Dark Sienna", img: "images/Dark_Sienna.jpg" },
  { name: "Indian Red", img: "images/Indian_Red.jpg" },
  { name: "Indian Yellow", img: "images/Indian_Yellow.jpg" },
  { name: "Liquid Black", img: "images/Liquid_Black.jpg" },
  { name: "Liquid Clear", img: "images/Liquid_Clear.jpg" },
  { name: "Midnight Black", img: "images/Midnight_Black.jpg" },
  { name: "Phthalo Blue", img: "images/Phthalo-Blue.jpg" },
  { name: "Yellow Ochre", img: "images/Yellow-Ochre.jpg" }
];

const ColorWheel = () => {
  const [colorName, setColorName] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event, name) => {
    const wheelContainer = document.getElementById('wheel-container');
    const colorNameDisplay = document.getElementById('color-name-display');
    setColorName(name);
    setPosition({
      top: wheelContainer.offsetTop + wheelContainer.offsetHeight / 2 - colorNameDisplay.offsetHeight / 2,
      left: wheelContainer.offsetLeft + wheelContainer.offsetWidth + 20,
    });
  };

  const handleMouseLeave = () => {
    setColorName('');
  };

  useEffect(() => {
    // Equivalent to jQuery.wheelmenu setup can be done here if necessary
    // Using a library or custom implementation for the wheel menu
  }, []);

  return (
    <div>
      <a href="#wheel2" className="wheel-button">
        <span>+</span>
      </a>

      <div id="wheel-container">
        <ul id="wheel2" className="wheel">
          {colors.map((color) => (
            <li
              key={color.name}
              className="item"
              data-color={color.name}
              onMouseEnter={(event) => handleMouseEnter(event, color.name)}
              onMouseLeave={handleMouseLeave}
            >
              <a href="">
                <img src={color.img} alt={color.name} />
              </a>
            </li>
          ))}
        </ul>
        <div
          id="color-name-display"
          className="color-name"
          style={{
            top: position.top,
            left: position.left,
            display: colorName ? 'block' : 'none',
          }}
        >
          {colorName}
        </div>
      </div>
    </div>
  );
};

export default ColorWheel;
