import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../ui/logo';
import NotificationIcon from '../Icons/NotificationIcon';
import { cn } from '../../lib/utils';
import { useAppSelector } from '../../redux/store';
import Spinner from '../ui/spinner';
import DeviceSensor from './DeviceSensor';
import RecentAlert from './RecentAlert';
import BottomNavigation from './BottomNavigation';
import ConfirmSafeModal from './components/ConfirmSafeModal';
import FalseAlarmModal from './components/FalseAlarmModal';
import AdminCheckModal from './components/AdminCheckModal';
import type { Alert, Device } from '@/types/Home';
import DevicePage from '../device/DevicePage';

const HomePage = () => {
  const { t } = useTranslation();
  const user = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [showConfirmSafe, setShowConfirmSafe] = useState(false);
  const [showFalseAlarm, setShowFalseAlarm] = useState(false);
  const [showAdminCheck, setShowAdminCheck] = useState(false);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [isSOSActive, setIsSOSActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));

        setDevices([
          { id: '1', name: t('home.device_main_door'), type: 'door', status: 'home.status_active', activeTime: t('home.active_time_ago', { time: '2 hours' }), battery: 100, isOpen: false },
          { id: '2', name: t('home.device_fridge'), type: 'fridge', status: 'home.status_active', activeTime: t('home.status_active'), battery: 100, isOpen: true },
        ]);

        setAlerts([
          { id: '1', title: t('home.alert_device_issue_title'), description: t('home.alert_device_issue_desc'), time: 'Aug 4, 10:32', type: 'device' },
          { id: '2', title: t('home.alert_no_activity_title'), description: t('home.alert_no_activity_desc'), time: 'Aug 4, 10:32', type: 'warning' },
          { id: '3', title: t('home.alert_fridge_open_title'), description: t('home.alert_fridge_open_desc'), time: 'Aug 4, 10:32', type: 'info' },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSOS = () => {
    if (!isSOSActive) {
      setIsSOSActive(true);
    } else {
      setShowFalseAlarm(true);
    }
  };

  const handleDeviceToggle = (id: string) => {
    setDevices(prev => prev.map(d =>
      d.id === id ? { ...d, isOpen: !d.isOpen } : d
    ));
  };

  const handleResolveClick = (id: string) => {
    setSelectedAlertId(id);
    setShowConfirmSafe(true);
  };

  const handleHelpClick = (id: string) => {
    setSelectedAlertId(id);
    setShowAdminCheck(true);
  };

  const confirmResolve = () => {
    if (selectedAlertId) {
      setAlerts(prev => prev.filter(a => a.id !== selectedAlertId));
    }
    setShowConfirmSafe(false);
    setSelectedAlertId(null);
  };

  const confirmHelp = () => {
    alert(`Help requested for alert: ${selectedAlertId}`);
    setShowAdminCheck(false);
    setSelectedAlertId(null);
  };

  const confirmFalseAlarm = () => {
    setIsSOSActive(false);
    setShowFalseAlarm(false);
  };

  if (loading) {
    return (
      <div className="auth-container flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="auth-container bg-F8F8F8 !p-0 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-6 pt-9 pb-6">
        <Logo size="sm" />
        <div className="flex items-center gap-4">
          <button className="text-text-main hover:opacity-70 transition-opacity">
            <NotificationIcon />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-border-default cursor-pointer">
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32">
        {activeTab === 'home' ? (
          <>
            <div className="bg-white rounded-card p-4 mb-6 border border-card-border">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-black mb-2">
                    {t('home.greeting', { name: user?.firstName || 'Mine' })}
                  </h2>
                  {isSOSActive ? (
                    <div className="flex flex-col gap-1">
                      <div className="inline-flex items-center gap-2 bg-status-safe px-4 py-1.5 rounded-full">
                        <div className="w-3 h-3 bg-sos-active rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-sos-active">{t('home.status_sos_sent')}</span>
                      </div>
                      <p className="text-xs text-text-muted px-4 font-medium">{t('home.status_arranging_help')}</p>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-status-safe px-4 py-1.5 rounded-full">
                      <div className="w-3 h-3 bg-text-muted rounded-full"></div>
                      <span className="text-base font-medium text-text-dark">{t('home.status_safe')}</span>
                    </div>
                  )}
                </div>
                <span className="text-base text-text-muted mt-auto">
                  {t('home.active_time_ago', { time: '1 hour' })}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-card p-4 mb-6 border border-card-border flex items-center gap-6">
              <button
                onClick={handleSOS}
                className={cn(
                  "flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-[inset_0_4px_4px_rgba(0,0,0,0.1)] active:scale-95 transition-all duration-300",
                  isSOSActive ? "bg-sos-active" : "bg-sos-inactive"
                )}
              >
                {t('home.sos_button')}
              </button>
              <p className="text-text-dark font-bold text-lg leading-tight flex-1">
                {isSOSActive ? t('home.sos_false_alarm_instruction') : t('home.sos_call_instruction')}
              </p>
            </div>
            <DeviceSensor devices={devices} onToggle={handleDeviceToggle} />
            <RecentAlert
              alerts={alerts}
              onResolve={handleResolveClick}
              onHelp={handleHelpClick}
            />
          </>
        ) : activeTab === 'device' ? (
          <DevicePage />
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-20 text-center">
            <div className="text-2xl font-bold text-black mb-2 capitalize">
              {t('home.page_title', { name: activeTab })}
            </div>
            <p className="text-text-muted italic">{t('home.coming_soon')}</p>
          </div>
        )}
      </div>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <ConfirmSafeModal
        isOpen={showConfirmSafe}
        onClose={() => setShowConfirmSafe(false)}
        onConfirm={confirmResolve}
      />
      <FalseAlarmModal
        isOpen={showFalseAlarm}
        onClose={() => setShowFalseAlarm(false)}
        onConfirm={confirmFalseAlarm}
      />
      <AdminCheckModal
        isOpen={showAdminCheck}
        onClose={() => setShowAdminCheck(false)}
        onConfirm={confirmHelp}
      />
    </div>
  );
};

export default HomePage;
