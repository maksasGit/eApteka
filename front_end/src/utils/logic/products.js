import { publicRequest } from '../../requestMethods'
import { handleError } from '../toast'

// ---- --GET PRODUCTS -- ----

// get product by ID

export const productById = async (id, setProduct, setColor, setSize) => {
  try {
    const res = await publicRequest.get(`/products/${id}`);
    const productResponse = { productId: res.data._id, ...res.data };
    setProduct(productResponse); // sets the products state in the response
    setColor(productResponse.color[0]); // sets the color to the first color returned
    setSize(productResponse.size[0]); // sets the size to the first size returned
  } catch (error) {
    console.log(error);
    handleError(error);
  
  }
};

// Search products

export const SearchProducts = async (query) => {
  try {
    const response = await publicRequest.get(`/products/search?q=${query}`);
    return response;
  } catch (error) {
    console.log(error);
    handleError(error);
    
  }
};

// product by tag

export const getProductByTags = async (tag, currentPage, pageSize) => {
  // gets the related products and asks the backend for the necessary pagination
  try {
    const response = await publicRequest.get(
      `/products/tag?tag=${tag}&page=${currentPage}&size=${pageSize}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    handleError(error);
    const response = await publicRequest.get(
      `/products/tag?tag=${tag}&page=${currentPage}&size=${pageSize}`,
    );
    if (response.data) {
      return response;
    } else {
      return null;
    }
  }
};
// GET ALL PRODUCTS

export const getAllProducts = async (currentPage, pageSize) => {
  // gets all the products and asks the backend for the necessary pagination
  try {
    const response = await publicRequest.get(
      `/products?page=${currentPage}&size=${pageSize}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    handleError(error);
    const response = await publicRequest.get(
      `/products?page=${currentPage}&size=${pageSize}`,
    );
    return response;
  }
};

// productJsx function
export const getProductsFunction = async (
  currentPage,
  pageSize,
  tag,
  query,
) => {
  if (tag) {
    const res = await getProductByTags(tag, currentPage, pageSize);
    return res;
  } else if (query) {
    const res = await SearchProducts(query);
    return res;
  } else {
    const res = await getAllProducts(currentPage, pageSize);
    return res;
  }
};

