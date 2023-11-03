import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getCart = async () => {
      let data = await localStorage.getItem("cart");
      console.log(data);
      if (data.length > 0) {
        data = JSON.parse(data);
        setCart([...data]);
      }
    };
    getCart();
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom Hook

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
