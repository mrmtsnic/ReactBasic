import { useState, useEffect } from "react";

const ItemList = [
  { name: "A", price: 500, id: 1, quantity: 0, stock: 2 },
  { name: "B", price: 400, id: 2, quantity: 0, stock: 3 },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemList, setItemList] = useState(ItemList);

  const addItem = (item) => {
    if (item.stock === 0) {
      alert("在庫がありません");
      return;
    }
    setItemList((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, stock: i.stock - 1 } : i))
    );

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
            increaseStock(cartItem.id);
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

  const clearCart = () => {
    setCart([]);
  };

  const changeQuantity = (value, itemId) => {
    const quantity = parseInt(value);

    const stock = itemList.find((item) => item.id === itemId).stock;
    if (quantity > stock) {
      alert("在庫を超えることはできません");
      return;
    }

    return setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      })
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

  const increaseStock = (id) => {
    ItemList[id];
  };

  return (
    <div className="cart">
      <h1>Cart</h1>
      <h2>ItemList</h2>
      <ul>
        {itemList.map((item) => {
          return (
            <li key={item.id}>
              {item.name}-{item.price}円 在庫：{item.stock}個
              <button disabled={item.stock === 0} onClick={() => addItem(item)}>
                Add to Cart
              </button>
            </li>
          );
        })}
      </ul>
      <h2>カートの中身</h2>
      {cart.length !== 0 ? (
        <button onClick={clearCart}>カートを空にする</button>
      ) : (
        ""
      )}
      {cart.length === 0 ? (
        <p>カートは空です</p>
      ) : (
        cart.map((item) => {
          return (
            <li key={item.id}>
              {item.name}-{item.price}円 ✖️
              <input
                type="number"
                min="1"
                step="1"
                value={item.quantity}
                onChange={(e) => changeQuantity(e.target.value, item.id)}
              ></input>
              ={item.price * item.quantity}円
              <button onClick={() => incrementItem(item)}>+</button>
              <button onClick={() => decrementItem(item)}>-</button>
              <button onClick={() => removeItem(item)}>Remove from Cart</button>
            </li>
          );
        })
      )}
      <h3>Total</h3>
      <div>{total}円</div>
    </div>
  );
};

export default Cart;
