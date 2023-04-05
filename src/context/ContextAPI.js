import { createContext, useReducer} from "react";
import {faker} from '@faker-js/faker';
import {CartReducer} from "./CartReducer";
import {FilterReducer} from "./FilterReducer";

export const CartContext = createContext();
faker.seed(99);

const ContextAPI = ({children}) => {
    const items = [...Array(15)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.image(),
        inStock: faker.helpers.arrayElement([0,2,4,6,8]),
        fastDelivery: faker.datatype.boolean(),
        rating: faker.helpers.arrayElement([1,2,3,4,5])
    }));

    const INITIAL_STATE = 
    {
        items: items,
        cart: []
    }

    const [state,dispatch] = useReducer(CartReducer,INITIAL_STATE);

    const INITIAL_FILTER_STATE =
    {
        byStock : false,
        byFastDelivery: false,
        byRating: 0,
        searchItem: "",
    }

    const[FilterState,FilterDispatch] = useReducer(FilterReducer,INITIAL_FILTER_STATE);

    return(
        <CartContext.Provider value = {{state,dispatch,FilterState,FilterDispatch}}>
            {children}
        </CartContext.Provider>
    )
};

export default ContextAPI;