import { useState, useEffect } from "react";

const ItemList = [
  { name: "A", price: 500, id: 1, quantity: 0 },
  { name: "B", price: 400, id: 2, quantity: 0 },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (item) => {
    setCart((prev) => {
      const isExist = prev.find((cartItem) => cartItem.id === item.id);

      if (isExist) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (item) => {
    // setCart((prev) =>
    //   prev
    //     .map((cartItem) => {
    //       if (cartItem.id === item.id) {
    //         return null;
    //       }
    //       return cartItem;
    //     })
    //     .filter(Boolean)
    // );
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== item.id));
  };

  const incrementItem = (item) => {
    setCart((prev) =>
      prev.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          return cartItem;
        }
      })
    );
  };

  const decrementItem = (item) => {
    setCart((prev) =>
      prev
        .map((cartItem) => {
          if (cartItem.id === item.id) {
            if (item.quantity === 1) {
              return null;
            } else {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
          } else {
            return cartItem;
          }
        })
        .filter(Boolean)
    );
  };

  useEffect(() => {
    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
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
            <li key={item.id}>
              {item.name}-{item.price}円 ✖️ {item.quantity}
              <button onClick={() => incrementItem(item)}>+</button>
              <button onClick={() => decrementItem(item)}>-</button>
              <button onClick={() => removeItem(item)}>Remove from Cart</button>
            </li>
          );
        })
      )}
      <h3>Total</h3>
      <div>{cart.length > 0 ? `${total}円` : "カートが空です"}</div>
    </div>
  );
};

export default Cart;
