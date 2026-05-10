import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeIcon from '../Icons/HomeIcon';
import DeviceIcon2 from '../Icons/DeviceIcon2';
import ProfileIcon from '../Icons/ProfileIcon';
import SettingIcon from '../Icons/SettingIcon';
import { cn } from '../../lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'home', label: t('home.tab_home'), icon: <HomeIcon /> },
    { id: 'device', label: t('home.tab_device'), icon: <DeviceIcon2 /> },
    { id: 'profile', label: t('home.tab_profile'), icon: <ProfileIcon /> },
    { id: 'setting', label: t('home.tab_setting'), icon: <SettingIcon /> },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 flex justify-around items-end pb-4 bg-nav-bg rounded-t-[35px] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] border-t border-white/30 px-2 z-50">
      {tabs.map((tab) => (
        <div 
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex flex-col items-center gap-1 cursor-pointer mb-1 relative transition-all duration-300",
            activeTab === tab.id ? "text-black" : "text-text-dark"
          )}
        >
          {activeTab === tab.id && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 bg-background rounded-full flex items-center justify-center border-4 border-transparent z-0">
              <div className="w-16 h-16 bg-nav-bg rounded-full flex flex-col items-center justify-center text-black border-4 border-F8F8F8 shadow-md">
                {tab.icon}
              </div>
            </div>
          )}
          <div className={cn("transition-all duration-300", activeTab === tab.id ? "opacity-0" : "opacity-100")}>
            {tab.icon}
          </div>
          <span className={cn("text-sm font-bold transition-all duration-300", activeTab === tab.id ? "mt-6" : "mt-0")}>
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BottomNavigation;
