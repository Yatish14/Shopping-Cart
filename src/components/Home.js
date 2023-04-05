import { SingleItem } from "./SingleItem"
import { useContext } from "react"
import {CartContext} from "../context/ContextAPI"
import {FilterItems} from "./FilterItems";
import "./Home.css"
const Home = () => {
    const {
      state : {items},
      FilterState: {byStock,byFastDelivery,byRating,sort,searchItem}
  } = useContext(CartContext);
  const FilteredItems = () =>{
    let filteredItems = items;
    if(sort)
    {
      filteredItems = filteredItems.sort((a,b) => 
        sort === "asc" ? a.price - b.price : b.price - a.price
      );
    }
    if(!byStock)
    {
      filteredItems = filteredItems.filter((item) => item.inStock);
    }
    if(byFastDelivery)
    {
      filteredItems = filteredItems.filter((item) => item.fastDelivery);
    }
    if(byRating)
    {
      filteredItems = filteredItems.filter((item => item.rating >= byRating));
    }
    if (searchItem)
    {
      filteredItems = filteredItems.filter((item) => item.name.toLowerCase().includes(searchItem));
    }
    return filteredItems;
  } 
  return (
    <div className="Homepage">
      <FilterItems/>
      <div className="cardItem">
        {FilteredItems().map((item) => {
            return <SingleItem item={item} key={item.id}/>
        })}
      </div>
    </div>
  )
}

export default Home
