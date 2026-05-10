import React from 'react';
import { useTranslation } from 'react-i18next';
import DoorIcon from '../Icons/DoorIcon';
import BatteryIcon from '../Icons/BatteryIcon';
import type { Device } from '@/types/Home';

interface DeviceSensorProps {
  devices: Device[];
  onToggle: (id: string) => void;
}

const DeviceSensor: React.FC<DeviceSensorProps> = ({ devices, onToggle }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold text-black">{t('home.device_sensor')}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {devices.map((device) => (
          <div 
            key={device.id} 
            onClick={() => onToggle(device.id)}
            className="bg-white rounded-card p-4 shadow-sm border border-transparent cursor-pointer hover:border-border-default transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="rounded-lg text-text-dark">
                <DoorIcon />
              </div>
              <div className="bg-status-safe px-2 py-0.5 rounded-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-text-muted rounded-full"></div>
                <span className="text-xs font-normal text-text-muted">{t(device.status)}</span>
              </div>
            </div>
            <div className="font-normal text-black text-xl">{t(device.name)}</div>
            <div className="text-base text-text-muted mb-3">{t(device.activeTime)}</div>
            <div className="flex justify-between items-center text-base text-text-muted">
              <span className="font-normal text-text-muted">
                {device.isOpen ? t('common.open') : t('common.closed')}
              </span>
              <div className="flex items-center gap-1 font-bold text-black">
                <BatteryIcon />
                <span className='text-text-muted font-normal'> {device.battery}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceSensor;
