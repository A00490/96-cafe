import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Role } from './types';

// Pages
import { Login } from './pages/Login';
import { StaffDashboard } from './pages/StaffDashboard';
import { StaffTables } from './pages/StaffTables';
import { StaffOrders } from './pages/StaffOrders';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { CustomerMenu } from './pages/CustomerMenu';
import { CustomerReservations } from './pages/CustomerReservations';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('guest');
  const [activePage, setActivePage] = useState<string>('dashboard');

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setRole('guest');
    setActivePage('dashboard');
  };

  // Render Content Switcher
  const renderContent = () => {
    if (role === 'staff') {
      switch (activePage) {
        case 'dashboard': return <StaffDashboard />;
        case 'tables': return <StaffTables />;
        case 'orders': return <StaffOrders />;
        case 'reservations': return <StaffTables showReservationsOnly={true} />; // Re-using tables for now or could be a list
        default: return <StaffDashboard />;
      }
    } else if (role === 'customer') {
      switch (activePage) {
        case 'dashboard': return <CustomerDashboard onNavigate={setActivePage} />;
        case 'menu': return <CustomerMenu />;
        case 'reservations': return <CustomerReservations />;
        default: return <CustomerDashboard onNavigate={setActivePage} />;
      }
    }
    return null;
  };

  if (role === 'guest') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-coffee-50 font-sans text-coffee-900">
      <Sidebar 
        role={role} 
        activePage={activePage} 
        onNavigate={setActivePage} 
        onLogout={handleLogout}
      />
      
      <main className="flex-1 ml-20 lg:ml-64 p-6 lg:p-10 transition-all duration-300">
        <div className="max-w-7xl mx-auto animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;