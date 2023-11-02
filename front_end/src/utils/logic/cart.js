import { publicRequest } from '../../requestMethods';
import { handleError, handleSuccess } from '../toast';
import { addProduct } from '../../components/redux/cartRedux';
// add to cart

export const addToCart = async (cart, setUserCart) => {
  try {
    const response = await publicRequest.post('/carts/create', {
      products: cart.products,
    });
    setUserCart(response.data._id);
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

// redux functions

export const addToReduxCart = (
  dispatch,
  setQuantity,
  product,
  quantity,
  color,
  size,
) => {
  try {
    // Add a product to the Redux cart
    dispatch(addProduct({ ...product, quantity, color, size }));
    handleSuccess('added');
    setQuantity(1);
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

// Paid

export const payment = async (tokenId, amount, history, userCart) => {
  try {
    const res = await publicRequest.post('/purchases/payment', {
      tokenId,
      amount,
    });
    history.push('/success', {
      // redirects to the succes component on success
      stripeData: res.data,
      cartId: userCart,
    });
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
