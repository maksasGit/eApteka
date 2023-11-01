import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';

function App(){
  const [products, setProducts] = useState();

const getProducts = async () =>{
  try
  {
    const response = await api.get("/products");
    console.log(response.data);
    setProducts(response.data);
  }
  catch(err){
    console.log(err);
  }
}

useEffect(() => {
getProducts();
}, []) 
  return (
    <div className="App">
      
    </div>
  );

  }

export default App;
