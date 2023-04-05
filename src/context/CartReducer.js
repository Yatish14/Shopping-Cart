export const CartReducer = (state,action) => {
  switch(action.type){
    case "Add_to_Cart":
      return {...state, cart: [...state.cart,{...action.payload,quantity: 1}]};
    case "Remove_from_Cart":
      return {...state, cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id)};
    case "Change_Item_Quantity":
      return{...state,cart: state.cart.filter((q) => q.id === action.payload.id ? (q.quantity = action.payload.quantity) : (q.quantity))};
    default:
        return state;
  }
};