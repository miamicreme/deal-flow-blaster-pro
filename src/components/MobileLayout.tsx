
import { ReactNode } from 'react';
import BottomNavigation from './BottomNavigation';

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const MobileLayout = ({ children, showBottomNav = true }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {children}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};

export default MobileLayout;
