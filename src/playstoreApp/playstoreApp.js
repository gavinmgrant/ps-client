import React from 'react';
import './playstoreApp.css';

export default function PlaystoreApp(props) {
    return (
        <div className="ps">
            <h2 className="ps-name">{ props.App }</h2>
            <div className="ps-rating">Rating: { props.Rating }</div>
            <div className="ps-details">Genre: { props.Genres }</div>
            <div className="ps-size">Size: { props.Size }</div>
        </div>
    );
}