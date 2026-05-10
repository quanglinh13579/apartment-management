import React from 'react';
import { useTranslation } from 'react-i18next';
import DeviceIcon from '../Icons/DeviceIcon';
import WarningIcon from '../Icons/WarningIcon';
import InfoIcon from '../Icons/InfoIcon';
import type { Alert } from '@/types/Home';

interface RecentAlertProps {
  alerts: Alert[];
  onResolve: (id: string) => void;
  onHelp: (id: string) => void;
}

const RecentAlert: React.FC<RecentAlertProps> = ({ alerts, onResolve, onHelp }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold text-black">{t('home.recent_alert')}</div>
        <button className="text-lg font-normal text-text-link hover:underline">
          {t('home.load_more')}
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {alerts.length > 0 ? alerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-card p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-4">
                <div className="bg-alert-icon-bg rounded-full h-fit text-text-dark">
                  {alert.type === 'device' && <DeviceIcon />}
                  {alert.type === 'warning' && <WarningIcon />}
                  {alert.type === 'info' && <InfoIcon />}
                </div>
                <div>
                  <h4 className="font-normal text-black text-base">{alert.title}</h4>
                  <p className="text-sm text-text-muted">{alert.description}</p>
                </div>
              </div>
              <span className="text-sm text-text-muted whitespace-nowrap">{alert.time}</span>
            </div>
            <div className="flex mt-4">
              <button 
                onClick={() => onHelp(alert.id)}
                className="flex-1 py-2 text-base font-normal text-text-muted hover:text-black transition-colors"
              >
                {t('home.request_help')}
              </button>
              <button 
                onClick={() => onResolve(alert.id)}
                className="flex-1 bg-secondary text-white text-sm font-normal rounded-full hover:bg-opacity-90 transition-colors"
              >
                {t('home.im_safe')}
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 text-text-muted">
            {t('home.no_alerts') || 'No new alerts'}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentAlert;
