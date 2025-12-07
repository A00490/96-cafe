import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types'; 
import { ShoppingBag, Plus, Minus, X, CreditCard, CheckCircle } from 'lucide-react';

// Define the expected structure of a Cart Item
interface CartItem extends MenuItem {
  quantity: number;
}

export const CustomerMenu: React.FC = () => {
  // New State for Live Menu Data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Existing Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  //1. Fetch Menu Data on Component Load ===
  useEffect(() => {
  const fetchMenu = async () => {
    try {
      setFetchError(null); // Clear previous errors
      setIsLoading(true);
      
      // Use the relative path, assuming Vite proxy forwards this to localhost:5000
const response = await fetch('/api/v1/menu');
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
     
      if (data && data.data && Array.isArray(data.data.items)) {
           setMenuItems(data.data.items); // <--- THIS IS THE CORRECT LINE
      } else {
           // Handle case where API response is unexpectedly structured or empty
           throw new Error("Invalid data structure received from server.");
      }
      // --------------------------------------------------------

    } catch (error) {
      console.error("Failed to fetch menu:", error);
      // Display a generic error message to the user
      setFetchError("Sorry, we couldn't load the menu right now. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchMenu();
}, []);


  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const itemId = (item as any)._id || item.id; 
      const existing = prev.find(i => ((i as any)._id || i.id) === itemId);
      
      if (existing) {
        return prev.map(i => ((i as any)._id || i.id) === itemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setOrderComplete(false);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      // Use item._id to match the database ID
      if (((item as any)._id || item.id) === itemId) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(i => i.quantity > 0));
  };
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // TODO: Replace this timeout with a real API POST call to submit the order
    setTimeout(() => {
      setIsCheckingOut(false);
      setCart([]);
      setOrderComplete(true);
      setTimeout(() => setOrderComplete(false), 5000);
    }, 1500);
  };
  // ---------------------------------------------------

  return (
    <div className="relative min-h-[calc(100vh-100px)]">
      {/* Toast Notification */}
       {orderComplete && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 bg-green-100 text-green-800 border border-green-200 animate-fade-in">
          <CheckCircle size={20} />
          <span className="font-medium text-sm">Order placed successfully!</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-coffee-900">Menu</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Menu Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cart.length > 0 ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3'} gap-8 flex-1 transition-all duration-500`}>
          
          {/* === 2. Conditional Rendering for Loading/Error States === */}
          {isLoading && (
              <p className="col-span-full text-center text-xl text-coffee-600 p-12">☕ Loading today's menu...</p>
          )}

          {fetchError && (
              <p className="col-span-full text-center text-xl text-red-600 p-12">{fetchError}</p>
          )}
          
          {/* Show a message if loaded but empty */}
          {!isLoading && menuItems.length === 0 && !fetchError && (
             <p className="col-span-full text-center text-xl text-coffee-600 p-12">
                 The menu is currently empty. Please check the database.
             </p>
          )}

          {/*3. Map over the fetched menuItems state === */}
          {!isLoading && !fetchError && menuItems.length > 0 && menuItems.map((item) => (
            <div key={(item as any)._id || item.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-coffee-50 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group">
              <div className="w-full h-56 mb-6 overflow-hidden rounded-[24px] bg-coffee-50 relative">
                 <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                 />
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-coffee-900 font-bold text-sm shadow-sm">
                   BHD {item.price.toFixed(2)}
                 </div>
              </div>
              
              <h3 className="text-2xl font-bold text-coffee-900 mb-2">{item.name}</h3>
              <p className="text-coffee-500 text-sm mb-6 line-clamp-2">{item.description}</p>
              
              <button 
                onClick={() => addToCart(item)}
                className="mt-auto bg-coffee-100 text-coffee-800 px-8 py-3 rounded-full font-bold hover:bg-coffee-800 hover:text-white transition-all w-full flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                <Plus size={18} /> Add to Order
              </button>
            </div>
          ))}
        </div>

        {/* Cart Sidebar / Card */}
        {cart.length > 0 && (
          <div className="w-full lg:w-96 sticky top-8 animate-pulse-in">
            <div className="bg-white rounded-[32px] shadow-xl border border-coffee-100 overflow-hidden">
              <div className="p-6 bg-coffee-800 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={24} />
                  <h2 className="text-xl font-bold">Current Order</h2>
                </div>
                <span className="bg-coffee-700 px-3 py-1 rounded-full text-xs font-bold">{cart.reduce((a, b) => a + b.quantity, 0)} items</span>
              </div>

              <div className="p-6 max-h-[calc(100vh-400px)] overflow-y-auto space-y-6">
                {cart.map((item) => (
                  <div key={(item as any)._id || item.id} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-coffee-900 text-sm">{item.name}</h4>
                      <p className="text-coffee-500 text-xs">BHD {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-coffee-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity((item as any)._id || item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white text-coffee-600 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold text-coffee-900 w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity((item as any)._id || item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white text-coffee-600 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => updateQuantity((item as any)._id || item.id, -item.quantity)}
                      className="text-coffee-300 hover:text-red-500 transition-colors ml-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-coffee-50 border-t border-coffee-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-coffee-500 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-coffee-900">BHD {total.toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut || cart.length === 0}
                  className="w-full py-4 bg-coffee-800 text-white rounded-xl font-bold hover:bg-coffee-900 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    'Processing...'
                  ) : (
                    <>
                      Checkout <CreditCard size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};