import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CarouselComponent.css'

const CarouselComponent = ({ paintings = [] }) => {

    return (
        
        <Carousel >
            {paintings.map(
                (painting, index) => (
                    <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={painting.img_src} 
                        alt={painting.painting_title}
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                )
        
            )}
        </Carousel>
    );
};

export default CarouselComponent;
