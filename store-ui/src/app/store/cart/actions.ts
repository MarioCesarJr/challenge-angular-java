export enum ActionTypes {
  add = '[Product] Add to cart',
  remove = '[Product] Remove from cart',
  loadItems = '[Products] Load items from server',
  loadSuccess = '[Products] Load success',
  update = '[Product] Update cart'
}

export const addToCart = payload => {
  return {
    type: ActionTypes.add,
    payload
  };
};

export const getItems = () => ({
  type: ActionTypes.loadItems
});

export const removeFromCart = payload => ({
  type: ActionTypes.remove,
  payload
});

export const loadItems = payload => ({
  type: ActionTypes.loadSuccess,
  payload
});

export const updateAmount = (payload, amount) => {
  return {
    type: ActionTypes.update,
    payload,
    amount
  };
};
