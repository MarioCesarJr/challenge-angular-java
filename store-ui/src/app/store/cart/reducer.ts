import { ActionTypes } from './actions';
import { Product } from '../../shop/home/home.component';
import produce from 'immer';

export interface InitialState {
  items: Array<Product>;
  cart: Array<Product>;
}
export const initialState = {
  items: [],
  cart: []
};

export function ShopReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.loadSuccess:
      return {
        ...state,
        items: [...action.payload]
      };
    case ActionTypes.add:
      return produce(state, draft => {
        const productIndex = draft.cart.findIndex(
          p => p.id === action.payload.id
        );

        if (productIndex >= 0) {
          draft.cart[productIndex].amount += 1;
        } else {
          draft.cart.push({ ...action.payload, amount: 1 });
        }
      });
    case ActionTypes.remove:
      return produce(state, draft => {
        const productIndex = draft.cart.findIndex(
          p => p.id === action.payload.id
        );

        if (productIndex >= 0) {
          draft.cart.splice(productIndex, 1);
        }
      });
    case ActionTypes.update: {
      if (action.amount <= 0) {
        return state;
      }

      return produce(state, draft => {
        const productIndex = draft.cart.findIndex(
          p => p.id === action.payload.id
        );

        if (productIndex >= 0) {
          draft.cart[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
