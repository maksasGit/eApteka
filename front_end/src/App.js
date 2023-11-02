import 'normalize.css'; // Normalize CSS styles across different browsers
import './app.css';
import { useSelector } from 'react-redux'; // React Redux hook to access global state
import { ThemeProvider } from 'styled-components'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { darkTheme, lightTheme } from './utils/theme.js'; 
import { useState } from 'react';
// pages
import Home from './pages/Home'; 
import Cart from './pages/Cart'; 
import Product from './pages/Product'; 
import Success from './pages/Success'; 
import Register from './pages/Register'; 
import ProductList from './pages/ProductList';

const REACT_APP_GOOGLEID = process.env.REACT_APP_GOOGLEID;

const App = () => {
  const user = useSelector((state) => state.user.currentUser); // Gets the current user from the global state
  const getDarkModePreference = () => {
    const preference = localStorage.getItem('darkMode'); // Gets the dark mode preference stored in local storage
    return preference !== null ? JSON.parse(preference) : false;
  };
  const [darkMode, setDarkMode] = useState(getDarkModePreference());

  const setDarkModePreference = (preference) => {
    localStorage.setItem('darkMode', JSON.stringify(preference)); // Store dark mode preference to local storage
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode; // Change dark mode status
    setDarkMode(newDarkMode);
    setDarkModePreference(newDarkMode);
  };

  return (
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLEID}>
      {' '}
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
              {/* Home page with dark mode support */}
            </Route>
            <Route path="/products/:category">
              <ProductList
                darkMode={darkMode}
                setDarkMode={handleDarkModeToggle}
              />
              {/* List of products in a category with dark mode support */}
            </Route>
            <Route path="/product/:id">
              <Product darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
              {/* Individual product page with dark mode support */}
            </Route>
            <Route path="/cart">
              <Cart darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
            </Route>
            <Route path="/success">
              <Success /> {/*Success page after placing the order */}
            </Route>
            <Route path="/auth">
              {user ? <Redirect to="/" /> : <Register />}
              {/* Redirects to home page if user is already logged in, otherwise shows registration form */}
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
