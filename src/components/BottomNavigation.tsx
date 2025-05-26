
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Plus, Mail, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Buyers', path: '/buyers' },
    { icon: Plus, label: 'Add', path: '#', isAdd: true },
    { icon: Mail, label: 'Deals', path: '/deals' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleNavClick = (item: any) => {
    if (item.isAdd) {
      setShowAddDialog(true);
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center p-2 ${
                item.isAdd
                  ? 'bg-blue-600 text-white rounded-full p-3 -mt-6 shadow-lg'
                  : isActive(item.path)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <item.icon className={`${item.isAdd ? 'h-6 w-6' : 'h-5 w-5'}`} />
              {!item.isAdd && (
                <span className="text-xs mt-1">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>What would you like to add?</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              onClick={() => {
                setShowAddDialog(false);
                navigate('/add-property');
              }}
              className="h-20 flex flex-col gap-2"
            >
              <Home className="h-8 w-8" />
              <span>Property</span>
            </Button>
            <Button
              onClick={() => {
                setShowAddDialog(false);
                navigate('/add-buyer');
              }}
              variant="outline"
              className="h-20 flex flex-col gap-2"
            >
              <Users className="h-8 w-8" />
              <span>Buyer</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BottomNavigation;
