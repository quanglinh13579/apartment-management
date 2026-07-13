import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Bell, Mail, Smartphone, Volume2,
  MapPin, Settings, Tv, Shield,
  Key, LogOut, ChevronRight
} from 'lucide-react';
import { Switch } from '../ui/switch';
import AlertRulesPage from './AlertRulesPage';

const SettingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const showAlertRules = searchParams.get('subpage') === 'alert-rules';

  const [settings, setSettings] = useState({
    emailAlerts: false,
    inAppAlerts: true,
    pushAlerts: false,
    alertSound: true,
    vibrationMode: false,
    awayMode: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (showAlertRules) {
    return <AlertRulesPage onBack={() => navigate(-1)} />;
  }

  return (
    <div className="flex flex-col pb-4">
      <div className="bg-setting-card rounded-[20px] p-4 mb-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
          <Bell size={20} className="text-black" />
          <h2 className="text-base font-bold text-black">{t('setting.notification_title')}</h2>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start gap-3">
              <Mail size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.email_alerts_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.email_alerts_desc')}</span>
              </div>
            </div>
            <Switch checked={settings.emailAlerts} onCheckedChange={() => toggleSetting('emailAlerts')} />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start gap-3">
              <Bell size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.in_app_alerts_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.in_app_alerts_desc')}</span>
              </div>
            </div>
            <Switch checked={settings.inAppAlerts} onCheckedChange={() => toggleSetting('inAppAlerts')} />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start gap-3">
              <Smartphone size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.push_alerts_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.push_alerts_desc')}</span>
              </div>
            </div>
            <Switch checked={settings.pushAlerts} onCheckedChange={() => toggleSetting('pushAlerts')} />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start gap-3">
              <Volume2 size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.alert_sound_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.alert_sound_desc')}</span>
              </div>
            </div>
            <Switch checked={settings.alertSound} onCheckedChange={() => toggleSetting('alertSound')} />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start gap-3">
              <Smartphone size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.vibration_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.vibration_desc')}</span>
              </div>
            </div>
            <Switch checked={settings.vibrationMode} onCheckedChange={() => toggleSetting('vibrationMode')} />
          </div>
        </div>
      </div>

      <div className="bg-setting-card rounded-[20px] p-4 mb-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
          <Shield size={20} className="text-black" />
          <h2 className="text-base font-bold text-black">{t('setting.safety_title')}</h2>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start gap-3">
              <MapPin size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.away_mode_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.away_mode_desc')}</span>
              </div>
            </div>
            <Switch checked={settings.awayMode} onCheckedChange={() => toggleSetting('awayMode')} />
          </div>

          <div
            onClick={() => {
              setSearchParams(prev => {
                const newParams = new URLSearchParams(prev);
                newParams.set('subpage', 'alert-rules');
                return newParams;
              });
            }}
            className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0 cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex items-start gap-3">
              <Volume2 size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.alert_rules_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.alert_rules_desc')}</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </div>
      </div>

      <div className="bg-setting-card rounded-[20px] p-4 mb-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
          <Settings size={20} className="text-black" />
          <h2 className="text-base font-bold text-black">{t('setting.information_title')}</h2>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0 cursor-pointer">
            <div className="flex items-start gap-3">
              <Tv size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.device_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.device_desc')}</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0 cursor-pointer">
            <div className="flex items-start gap-3">
              <Shield size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.policy_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.policy_desc')}</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </div>
      </div>

      <div className="bg-setting-card rounded-[20px] p-4 mb-2">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
          <Settings size={20} className="text-black" />
          <h2 className="text-base font-bold text-black">{t('setting.setting_title')}</h2>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0 cursor-pointer">
            <div className="flex items-start gap-3">
              <Key size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.reset_password_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.reset_password_desc')}</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0 cursor-pointer">
            <div className="flex items-start gap-3">
              <LogOut size={22} className="text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-black text-sm">{t('setting.logout_label')}</span>
                <span className="text-xs text-gray-500">{t('setting.logout_desc')}</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
