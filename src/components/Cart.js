import React from 'react'
import { useContext,useState,useEffect } from "react";
import { CartContext } from "../context/ContextAPI";
import { Button,Form,Image } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Cart.css";
import { AiFillDelete } from "react-icons/ai";
import { Ratings } from "./Ratings";


const Cart = () => {
  const [totalPrice,setTotalPrice] = useState();
  const {state: {cart},dispatch} = useContext(CartContext);
  useEffect(() => {
    setTotalPrice(cart.reduce((acc,current) => acc+ Number(current.price)*current.quantity,0));
  },[cart])
  return (
    <div className='Homepage'>
      <div className='CartItemDiv'>
        <ListGroup>
          {
            cart.map((item) => {return(
            <ListGroup.Item>
              <Row>
                <Col md={2 }>
                  <Image src={item.image} alt={item.name} fluid rounded/>
                </Col>
                <Col md={2 }>
                  <span>{item.name}</span>
                </Col>
                <Col md={2 }>
                  <span>₹ {item.price}</span>
                </Col>
                <Col md={2 }>
                  <Ratings rating={item.rating}/>
                </Col>
                <Col md={2 }>
                  <Form.Control
                   as="select"
                   value={item.quantity}
                   onChange={(e) => dispatch({
                    type: "Change_Item_Quantity",
                    payload: {
                      id: item.id,
                      quantity: e.target.value
                    }
                  })}
                  >
                    {[...Array(item.inStock).keys()].map(num => (
                      <option key={num+1}>{num + 1}</option>))}
                  </Form.Control>
                </Col>
                <Col md={2 }>
                  <Button
                    onClick={() => dispatch({type: "Remove_from_Cart",payload: item})}
                  >
                    <AiFillDelete fontSize="20px"/>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            )})
          }
        </ListGroup>
      </div>
      <div className='filter subtotal'>
        <span className='title'>Subtotal ({cart.length}) Items</span>
        <span>Total : ₹ {totalPrice} </span>
        <Button disabled={cart.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  )
}

export default Cart
