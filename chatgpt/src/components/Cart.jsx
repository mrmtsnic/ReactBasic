import { useState, useEffect } from "react";

const ItemList = [
  { name: "A", price: 500, id: 1 },
  { name: "B", price: 400, id: 2 },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (item) => {
    setCart((prev) => [...prev, { ...item, id: generateId() }]);
  };

  const removeItem = (item) => {
    const newCartItems = cart.filter((i) => i.id !== item.id);
    setCart(newCartItems);
  };

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(newTotal);
    console.log(cart);
  }, [cart]);

  return (
    <div className="cart">
      <h1>Cart</h1>
      <h2>ItemList</h2>
      <ul>
        {ItemList.map((item) => {
          return (
            <li key={item.id}>
              {item.name}-{item.price}円
              <button onClick={() => addItem(item)}>Add to Cart</button>
            </li>
          );
        })}
      </ul>
      <h2>カートの中身</h2>
      {cart.length === 0 ? (
        <p>カートは空です</p>
      ) : (
        cart.map((item) => {
          return (
            <>
              <li key={item.name}>
                {item.name}-{item.price}円
                <button onClick={() => removeItem(item)}>
                  Remove from Cart
                </button>
              </li>
            </>
          );
        })
      )}
      <h3>Total</h3>
      <div>{total}円</div>
    </div>
  );
};

export default Cart;
