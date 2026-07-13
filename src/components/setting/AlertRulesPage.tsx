import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Moon, Sun, Plane, AlertCircle, ChevronDown, Calendar
} from 'lucide-react';
import { Switch } from '../ui/switch';
import { BackIcon } from '../Icons';
import DateRangePickerModal from './DateRangePickerModal';

interface AlertRulesPageProps {
  onBack: () => void;
}

const AlertRulesPage: React.FC<AlertRulesPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [vacationMode, setVacationMode] = useState(false);
  const [waitingTime, setWaitingTime] = useState(24);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const formatDate = (d: Date | null) => {
    if (!d) return 'dd/mm/yyyy';
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div className="absolute inset-0 z-[100] flex flex-col bg-setting-bg">
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
        >
          <BackIcon />
        </button>
        <span className="text-lg font-bold text-black">{t('alert_rules.title')}</span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-8">
        <div className="bg-setting-card rounded-setting-card p-4 mb-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-300">
            <Moon size={22} className="text-black" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-black leading-tight">{t('alert_rules.wake_sleep_title')}</span>
              <span className="text-xs text-gray-500 mt-1">{t('alert_rules.wake_sleep_desc')}</span>
            </div>
          </div>

          <div className="flex flex-col mt-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
              <div className="flex items-start gap-3 flex-1">
                <Sun size={22} className="text-gray-500 mt-0.5" />
                <div className="flex flex-col flex-1 pr-2">
                  <span className="font-semibold text-black text-sm">{t('alert_rules.wake_time_label')}</span>
                  <span className="text-xs text-gray-500">{t('alert_rules.wake_time_desc')}</span>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-setting-btn border border-gray-300 rounded-full px-3 py-1.5 active:scale-95 transition-transform">
                <span className="text-sm font-semibold text-black">6:00</span>
                <ChevronDown size={16} className="text-gray-600" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
              <div className="flex items-start gap-3 flex-1">
                <Moon size={22} className="text-gray-500 mt-0.5" />
                <div className="flex flex-col flex-1 pr-2">
                  <span className="font-semibold text-black text-sm">{t('alert_rules.sleep_time_label')}</span>
                  <span className="text-xs text-gray-500">{t('alert_rules.sleep_time_desc')}</span>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-setting-btn border border-gray-300 rounded-full px-3 py-1.5 active:scale-95 transition-transform">
                <span className="text-sm font-semibold text-black">23:00</span>
                <ChevronDown size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-setting-card rounded-setting-card p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1 pr-4">
              <Plane size={24} className="text-gray-600 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-bold text-black text-[15px]">{t('alert_rules.vacation_mode_label')}</span>
                <span className="text-xs text-gray-500 mt-0.5">{t('alert_rules.vacation_mode_desc')}</span>
              </div>
            </div>
            <Switch checked={vacationMode} onCheckedChange={setVacationMode} />
          </div>

          {vacationMode && (
            <div className="relative pl-[42px] mt-4 pt-4 border-t border-gray-200">
              <div className="absolute left-[15px] top-7 bottom-[52px] w-[2px] bg-gray-200"></div>
              <div className="relative mb-5">
                <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-gray-400"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-black">{t('alert_rules.start_date_label')}</span>
                  <span className="text-[11px] text-gray-500 mb-2">{t('alert_rules.start_date_desc')}</span>

                  <button
                    onClick={() => setShowDatePicker(true)}
                    className="flex items-center justify-between bg-transparent border border-gray-300 rounded-btn-sm px-3 py-2 w-full active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-gray-500" />
                      <span className={`text-sm ${startDate ? 'text-black font-semibold' : 'text-[#C4C4C4]'}`}>
                        {formatDate(startDate)}
                      </span>
                    </div>
                    <ChevronDown size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-gray-400"></div>

                <div className="flex flex-col">
                  <span className="text-sm font-bold text-black">{t('alert_rules.end_date_label')}</span>
                  <span className="text-[11px] text-gray-500 mb-2">{t('alert_rules.end_date_desc')}</span>

                  <button
                    onClick={() => setShowDatePicker(true)}
                    className="flex items-center justify-between bg-transparent border border-gray-300 rounded-btn-sm px-3 py-2 w-full active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-gray-500" />
                      <span className={`text-sm ${endDate ? 'text-black font-semibold' : 'text-[#C4C4C4]'}`}>
                        {formatDate(endDate)}
                      </span>
                    </div>
                    <ChevronDown size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-setting-card rounded-setting-card p-4 mb-4">
          <div className="flex items-start gap-3 pb-3 border-b border-gray-300">
            <AlertCircle size={22} className="text-black mt-0.5" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-black leading-tight">{t('alert_rules.inactivity_title')}</span>
              <span className="text-xs text-gray-500 mt-1">{t('alert_rules.inactivity_desc')}</span>
            </div>
          </div>

          <div className="pt-4 pb-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-black">{t('alert_rules.waiting_time_label')}</span>
              <span className="text-sm font-semibold text-black">{waitingTime} {t('alert_rules.waiting_time_unit')}</span>
            </div>

            <div className="relative w-full h-2 bg-gray-300 rounded-full mb-2">
              <div
                className="absolute top-0 left-0 h-full bg-btn-save rounded-full"
                style={{ width: `${((waitingTime - 12) / 24) * 100}%` }}></div>

              <input
                type="range"
                min="12" max="36" step="12"
                value={waitingTime}
                onChange={(e) => setWaitingTime(parseInt(e.target.value))}
                className="absolute top-1/2 -translate-y-1/2 w-full h-4 opacity-0 cursor-pointer z-10"
              />

              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-btn-save rounded-full shadow-sm pointer-events-none transition-all"
                style={{ left: `calc(${((waitingTime - 12) / 24) * 100}% - 8px)` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 mb-6">
              <span>12 {t('alert_rules.waiting_time_unit')}</span>
              <span>24 {t('alert_rules.waiting_time_unit')}</span>
              <span>36 {t('alert_rules.waiting_time_unit')}</span>
            </div>

            <div className="bg-setting-bg border border-gray-200 rounded-setting-inner p-3 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-setting-icon-bg flex items-center justify-center shrink-0">
                <AlertCircle size={14} className="text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pt-0.5">
                {t('alert_rules.alert_info_before')} <span className="font-bold">{waitingTime} {t('alert_rules.waiting_time_unit')}</span> {t('alert_rules.alert_info_after')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 px-6 pb-8 pt-3 bg-setting-bg">
        <button
          onClick={onBack}
          className="w-full py-4 bg-btn-save text-white font-bold rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md"
        >
          {t('alert_rules.save_button')}
        </button>
      </div>

      <DateRangePickerModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        initialStart={startDate}
        initialEnd={endDate}
        onSave={(s, e) => {
          setStartDate(s);
          setEndDate(e);
        }}
      />
    </div>
  );
};

export default AlertRulesPage;
