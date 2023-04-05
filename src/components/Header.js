import
{
    Container,
    FormControl,
    Nav,
    Navbar,
    Dropdown,
    Badge,
    Button
} 
from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/ContextAPI";
import "./Header.css";

const Header = () => {
  const {state: {cart},dispatch,FilterDispatch} = useContext(CartContext);
  return (
    <Navbar bg="dark" variant="dark" style={{height: 60,marginBottom: 10}}>
        <Container>
            <Navbar.Brand>
                <Link to = "/" style={{fontSize: 30}}>Shopping Cart</Link>
            </Navbar.Brand>
            <Navbar.Text className="searchbar">
                <FormControl 
                    placeholder = "Search the Products..."
                    style = {{width : 500}}
                    className = "m-auto"
                    onChange={(e) => {FilterDispatch({type: "Filter_by_Search",payload: e.target.value})}}
                />
            </Navbar.Text>
            <Nav>
                <Dropdown align={{ sm:"right" }}>
                    <Dropdown.Toggle variant = "success">
                        <FaShoppingCart />
                        <Badge bg="">{cart.length}</Badge>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{minWidth : 300,padding: 10}}>
                    {
                        cart.length > 0 ? (
                        <>
                            {cart.map((item) => {
                                return(
                                <span className="eachcartItem" key={item.id}>
                                    <img
                                        src={item.image}
                                        className="eachcartItemImage"
                                        alt={item.name}
                                    />
                                    <div className="cartItemBody">
                                    <span>{item.name}</span>
                                    <span>₹ {item.price.split(".")[0]}</span>
                                    </div>
                                    <AiFillDelete
                                        style={{ cursor: "pointer" }}
                                        onClick={() => dispatch({type: "Remove_from_Cart",payload: item,})}
                                    />
                                </span>
                            )})}
                            <Link to="/cart">
                                <Button style={{width: "95%",margin: "0 10px"}}>Go to Cart</Button>
                            </Link>
                        </>
                        ) : (<span style={{padding : 8}}>Your Cart is Empty!</span>)
                    }
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header