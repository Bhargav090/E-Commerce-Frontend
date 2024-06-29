import React from 'react'
import './card.css'
import url from '../url'
import axios from 'axios';
export default class Card extends React.Component {
  constructor(){
    super();
    this.state = {
      Qty:1
    }
  }
  inc=()=>{
    this.setState({
      Qty:this.state.Qty+1
    })
  }
  dec = ()=>{
    this.setState((prevState) => ({
      Qty: prevState.Qty > 0 ? prevState.Qty - 1 : 1
    }));
  }
  handleAddToCart = async() => {
    const { id, cost, name, userId,image} = this.props;
    const {Qty}=this.state
    const obj = {
      P_Id: id,
      P_Image:image,
      P_Cost: cost,
      P_Name: name,
      Qty: Qty,
      User_Id: userId
    };
    try{
      const adding = await axios.post(url+'/cart',obj)
      if(adding.data.resp==="Added Item"){
        alert("Product added to cart successfully")
      }
      }
      catch(err){
        console.log(err)
      }


    // Make an API call to add the item to the cart
    // fetch(url+'/cart', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(cartItem)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   // Optionally, you can update the state or show a success message
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   // Optionally, you can show an error message
    // });
  };
  render() {
    const {image, name, description,cost}= this.props;
    return (
      <div className='card'>
        <img src={image} alt={name} className='card-image'/>
        <div className='card-content'>
          <h2 className='card-name'>{name}</h2>
          <p className='card-discription'>{description}</p>
          <p className='card-cost'>₹{cost}</p><br></br><br></br>
          <div className='thbtn'>
            <button className='addbtn' onClick={this.inc}>+</button>
            <p className='qty'>{this.state.Qty}</p>
            <button className='addbtn' onClick={this.dec}>-</button>
            <button className='btn-cart' onClick={this.handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    )
  }
}
