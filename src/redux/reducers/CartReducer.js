import {
  ADD_TO_CART,
  CART_CLEAR,
  DELETE_CART_ITEM,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  PRODUCT_REVIEWS,
  ADS,
  TOP_PRODUCTS,
} from "../Types";

const initialState = {
  cartData: [],
  reviewData: [],
  ads: [],
  topProducts: [],
};
const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cartData: [...state.cartData, action.payload],
      };
    }
    case CART_CLEAR:
      return {
        ...state.cartData,
        cartData: [],
      };
    case DELETE_CART_ITEM: {
      let deleted_index = state.cartData.findIndex(
        (cartData) => cartData?.productitem?.id === action.payload
      );
      state.cartData.splice(deleted_index, 1);
      return {
        ...state,
      };
    }
    case INCREMENT_QUANTITY: {
      let UpdateCart = state.cartData.map((curElem) => {
        if (curElem.productitem?.id === action.payload) {
          return { ...curElem, quantity: curElem.quantity + 1 };
        }
        return curElem;
      });

      return { ...state, cartData: UpdateCart };
    }

    case DECREMENT_QUANTITY: {
      let UpdateCart = state.cartData
        .map((curElem) => {
          if (curElem.productitem?.id === action.payload) {
            return { ...curElem, quantity: curElem.quantity - 1 };
          }
          return curElem;
        })
        .filter((curElem) => {
          return curElem?.quantity !== 0;
        });
      return { ...state, cartData: UpdateCart };
    }

    case PRODUCT_REVIEWS: {
      return Object.assign({}, state, {
        ...state,
        reviewData: action.payload,
      });
    }
    case ADS: {
      return Object.assign({}, state, {
        ...state,
        ads: action.payload,
      });
    }

    case TOP_PRODUCTS: {
      return Object.assign({}, state, {
        ...state,
        topProducts: action.payload,
      });
    }

    default:
      return state;
  }
};
export default CartReducer;
