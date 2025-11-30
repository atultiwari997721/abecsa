"use client";

import { useCart } from '@/context/CartContext';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Trash2, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const { isSignedIn, user } = useUser();

  const total = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return acc + price;
  }, 0);

  const handleWhatsAppOrder = () => {
    if (!isSignedIn || !user) return;

    const itemsList = cart.map(item => `- ${item.title} (${item.price})`).join('%0A');
    const message = `Hello Abecsa Software Solutions!%0A%0AI would like to place an order for the following website templates:%0A%0A${itemsList}%0A%0ATotal Amount: ₹${total}%0A%0ACustomer Details:%0AName: ${user.fullName || 'N/A'}%0AEmail: ${user.primaryEmailAddress?.emailAddress || 'N/A'}%0A%0APlease confirm my order and provide payment details.`;

    // WhatsApp Business Number
    const phoneNumber = "919876543210";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-8 pb-20 flex flex-col items-center justify-center container min-h-[60vh]">
          <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any templates yet.</p>
          <Link href="/websites" className="btn btn-primary">
            Browse Templates
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-8 pb-20 container">
      <h1 className="text-4xl font-bold font-heading mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="glass-panel p-4 flex gap-4 items-center">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-400">{item.category}</p>
                <p className="text-primary font-bold mt-1">{item.price}</p>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="glass-panel p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2 text-gray-400">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="border-t border-white/10 my-4 pt-4 flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {isSignedIn ? (
              <button 
                onClick={handleWhatsAppOrder}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} /> Order via WhatsApp
              </button>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-4">Please login to place your order</p>
                <SignInButton mode="modal">
                  <button className="btn btn-primary w-full">
                    Login to Order
                  </button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
