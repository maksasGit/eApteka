import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { mobile } from '../responsive';
import { getProductsFunction } from '../utils/logic/products.js';

// ui
import Loading from './ui/Loading';
import Pagination from './ui/Pagination';

const Container = styled.section`
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ alignItems: 'center', justifyContent: 'center' })}
`;

const Products = ({ tag, filters, sort, query }) => {
  // Status to store products and filtered products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // State to control pagination
  const [showPagination, setShowPagination] = useState(true);

  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  // Handles the page change

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to get the products
  const getProducts = useCallback(async () => {
    const res = await getProductsFunction(currentPage, pageSize, tag, query);
    // Update the status of the products and the total number of pages
    if (res.data.products) {
      setProducts(res.data.products);
    } else if (res.data) {
      setProducts(res.data);
    } else {
      setProducts([]);
    }
    setTotalPages(res.data.totalPages);
  }, [tag, currentPage, pageSize, query]);

  // Call the getProducts function when mounting the component or when parameters change
  useEffect(async () => {
    await getProducts();
  }, [getProducts]);

  // Filter products based on filter parameters and update filtered products
  useEffect(() => {
    if (products.length > 0) {
      if (tag || query) {
        const filtered = filters
          ? products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key] ? item[key].includes(value) : false,
              ),
            )
          : products;
        setFilteredProducts(filtered);
        setShowPagination(filtered.length > 8);
      } else {
        setFilteredProducts(products);
        setShowPagination(products.length > 8);
      }
    }
  }, [products, tag, filters, query]);

  // Sorts the products according to the selected order type (newest, asc, desc)
  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt),
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price),
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price),
      );
    }
  }, [sort]);

  return (
    // renders the products and if they did not load, renders the Loading component
    <Container id="Products">
      {products.length > 0 ? (
        <Wrapper>
          {tag || query
            ? filteredProducts.map((product) => (
                <Product
                  product={product}
                  key={product._id}
                  price={product.price}
                />
              ))
            : products.map((product) => (
                <Product
                  product={product}
                  key={product._id}
                  price={product.price}
                />
              ))}
        </Wrapper>
      ) : (
        <Loading />
      )}

      {/* Render Pagination */}

      <Pagination
        filteredProducts={filteredProducts}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default Products;
