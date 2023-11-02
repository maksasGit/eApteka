import { publicRequest } from '../../requestMethods';
import { handleError, handleSuccess } from '../toast';
// create order

export const makeOrder = async (address, cartId, amount) => {
  try {
    const response = await publicRequest.post('/purchases/create', {
      shippingAddress: address,
      cartId,
      amount,
    });
    const { data } = response; // Directly access the 'data' property on the response object
    return data;
  } catch (error) {
    console.log(error);
    handleError(error);
    
  }
};

// get orders

export const getOrders = async (userId, setOrdersLoad) => {
  try {
    const res = await publicRequest.get(`/purchases/${userId}`);
    setOrdersLoad(true);
    return res;
  } catch (error) {
    handleError(error);
    console.log(error);
  }
};

// ---- --DELETE ORDER -- ----
export const deleteOrder = async (orderId) => {
  console.log(orderId);
  try {
    const res = await publicRequest.delete(`/purchases/${orderId}`);
    handleSuccess('removedOrder');
    return res;
  } catch (error) {
    handleError(error);
    console.log(error);
    
  }
};

// DATE FORMATTING FUNCTION

export const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return formattedDate;
};
