'use client';

import { useState, useEffect } from 'react';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      if (typeof window !== 'undefined') {
        const cartData = localStorage.getItem('cart');
        setCart(cartData ? JSON.parse(cartData) : []);
        setIsLoaded(true);
      }
    };
    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
      // Trigger storage event for other components (like Navbar)
      window.dispatchEvent(new Event('storage'));
    }
  }, [cart, isLoaded]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const existingItem = cart.find(i => i.productId === item.productId);

    if (existingItem) {
      setCart(cart.map(i =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + (item.quantity || 1) }
          : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: item.quantity || 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(cart.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const removeItem = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getSubTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTax = (taxRate: number = 0.20) => {
    return getSubTotal() * taxRate;
  };

  const getTotal = (taxRate: number = 0.20) => {
    return getSubTotal() + getTax(taxRate);
  };

  return {
    cart,
    isLoaded,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    itemCount: getItemCount(),
    subTotal: getSubTotal(),
    tax: getTax(),
    total: getTotal(),
  };
}
