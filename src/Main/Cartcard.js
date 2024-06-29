import React from 'react';
import './card.css'; // Assuming you have a CSS file for styling

export default class Cartcard extends React.Component {
  render() {
    const { image, name, cost, qty } = this.props; // Destructured correctly
    return (
      <div className="card">
        <img src={image} alt={name} className="card-image" />
        <div className="card-content">
          <h2 className="card-name">{name}</h2>
          <p className='card-qty'>Qty: {qty}</p> {/* Correctly displaying quantity */}
          <p className="card-cost">₹{cost}</p> {/* Correct currency symbol */}
        </div>
      </div>
    );
  }
}
