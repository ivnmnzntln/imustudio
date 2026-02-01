import React from 'react';
import { useCart } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, total, clear } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.productId} className="card mb-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                {item.image && <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />}
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                  className="input w-16"
                />
                <p className="font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="card h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>${(total() * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>$10.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>${(total() * 1.1 + 10).toFixed(2)}</span>
            </div>
          </div>

          <button onClick={() => navigate('/checkout')} className="btn-primary w-full mb-2">
            Checkout
          </button>
          <button onClick={() => clear()} className="btn-secondary w-full text-gray-700">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
