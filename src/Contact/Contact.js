import React from 'react'
import { NavLink } from 'react-router-dom';
import '../Main/main.css'
export default class Contact extends React.Component {
  render() {
    return (
      <div>
        <div className='navbar'>
            <NavLink to='/home' className='homecs'>Home</NavLink>
            <NavLink to='/cart' className='cart'>Cart</NavLink>
            <NavLink to='/about' className='aboutcs'>About</NavLink>
            <NavLink to='/contact' className='contactcs'>Contact</NavLink>
        </div>
        Contact
        </div>
    )
  }
}
