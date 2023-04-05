import { Card } from "react-bootstrap"
import { Ratings } from "./Ratings"
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../context/ContextAPI";
import "./SingleItem.css";
export const SingleItem = ({item}) => {
  const {
    state: {cart},
    dispatch
  } = useContext(CartContext);
  return (
    <div className="singleItem">
      <Card>
        <Card.Img variant='top' src = {item.image} alt={item.name}/>
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Subtitle style={{paddingBottom: 10}}>
            <span>
              ₹ {item.price.split(".")[0]}
            </span>
            {item.fastDelivery ? (<div>Fast Delivery</div>) : (<div>3 days Delivery</div>)}
            <Ratings rating={item.rating}/>
          </Card.Subtitle>
          {
            cart.some(cartId => cartId.id === item.id) ? (
            <Button 
              onClick={() => {dispatch({type: 'Remove_from_Cart',payload: item})}}
              variant="danger"
            >Remove from Cart
            </Button>) : (
            <Button
              onClick={() => {dispatch({type: 'Add_to_Cart',payload: item})}}
              disabled={!item.inStock}
            >
              {!item.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>)
          }
        </Card.Body>
      </Card>
    </div>
  )
}
