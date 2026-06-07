import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { setUser } from '../../redux/slices/authSlice';
import {
  BackIcon,
  CameraIconSm,
  CalendarIcon,
  ChevronDownIcon,
} from '../Icons';

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

interface DrumColumnProps {
  items: string[];
  index: number;
  onChange: (i: number) => void;
}

const DrumColumn: React.FC<DrumColumnProps> = ({ items, index, onChange }) => {
  const len = items.length;
  const prev = items[(index - 1 + len) % len];
  const current = items[index];
  const next = items[(index + 1) % len];

  const [draft, setDraft] = useState(current);
  const [editing, setEditing] = useState(false);
  const displayValue = editing ? draft : current;

  const commitValue = (val: string) => {
    setEditing(false);
    const v = val.trim();
    if (!v) return;

    const exact = items.findIndex(x => x.toLowerCase() === v.toLowerCase());
    if (exact >= 0) { onChange(exact); return; }

    const num = parseInt(v, 10);
    if (!isNaN(num)) {
      const padded = String(num).padStart(2, '0');
      const padMatch = items.findIndex(x => x === padded);
      if (padMatch >= 0) { onChange(padMatch); return; }
      const rawMatch = items.findIndex(x => x === String(num));
      if (rawMatch >= 0) { onChange(rawMatch); return; }
    }
    setDraft(current);
  };

  const accRef = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    accRef.current += e.deltaY;
    if (accRef.current > 40) { onChange((index + 1) % len); accRef.current = 0; }
    else if (accRef.current < -40) { onChange((index - 1 + len) % len); accRef.current = 0; }
  };

  return (
    <div
      className="flex flex-col items-center gap-1 flex-1 select-none"
      onWheel={handleWheel}
    >
      <div
        onClick={() => onChange((index - 1 + len) % len)}
        className="h-10 flex items-center justify-center w-full text-sm text-[#A6A5A5] cursor-pointer hover:text-black transition-colors"
      >
        {prev}
      </div>

      <div className="h-10 flex items-center justify-center w-full">
        <div className="border border-[#C0C0C0] rounded-xl bg-white px-3 py-1.5 min-w-[56px] flex items-center justify-center">
          <input
            type="text"
            value={displayValue}
            onFocus={() => { setDraft(current); setEditing(true); }}
            onChange={e => setDraft(e.target.value)}
            onBlur={e => commitValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
            }}
            className="text-sm font-bold text-black bg-transparent text-center outline-none"
            style={{ width: `${Math.max(current.length, 2) + 1}ch` }}
          />
        </div>
      </div>
      <div
        onClick={() => onChange((index + 1) % len)}
        className="h-10 flex items-center justify-center w-full text-sm text-[#A6A5A5] cursor-pointer hover:text-black transition-colors"
      >
        {next}
      </div>
    </div>
  );
};

interface DateValue { month: number; day: number; year: number }

interface DatePickerSheetProps {
  isOpen: boolean;
  value: DateValue;
  onSave: (v: DateValue) => void;
  onClose: () => void;
}

const DatePickerSheet: React.FC<DatePickerSheetProps> = ({ isOpen, value, onSave, onClose }) => {
  const { t } = useTranslation();
  const [month, setMonth] = useState(value.month);
  const [day, setDay] = useState(value.day);
  const [yearIdx, setYearIdx] = useState(YEARS.indexOf(String(value.year)) < 0 ? 0 : YEARS.indexOf(String(value.year)));

  React.useEffect(() => {
    if (isOpen) {
      setMonth(value.month);
      setDay(value.day);
      const yi = YEARS.indexOf(String(value.year));
      setYearIdx(yi < 0 ? 0 : yi);
    }
  }, [isOpen, value]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-[300] flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="w-full bg-[#F2F2F2] rounded-t-[20px] pb-6"
        style={{ animation: 'slide-up 0.28s cubic-bezier(0.32,0.72,0,1)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-[#CBCBCB] rounded-full" />
        </div>

        <p className="text-center font-bold text-base text-black mb-3">
          {t('edit_profile.date_of_birth')}
        </p>

        <div className="flex items-center px-6 mb-5">
          <DrumColumn items={MONTHS_SHORT} index={month} onChange={setMonth} />
          <span className="text-[#D0D0D0] text-lg mx-1 pb-1 select-none">|</span>
          <DrumColumn items={DAYS} index={day} onChange={setDay} />
          <span className="text-[#D0D0D0] text-lg mx-1 pb-1 select-none">|</span>
          <DrumColumn items={YEARS} index={yearIdx} onChange={setYearIdx} />
        </div>

        <div className="px-6">
          <button
            onClick={() => onSave({ month, day, year: Number(YEARS[yearIdx]) })}
            className="w-full py-4 bg-secondary text-white font-bold rounded-full hover:opacity-90 active:scale-95 transition-all"
          >
            {t('edit_profile.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

interface EditProfilePageProps {
  onBack: () => void;
}

const PROFILE_STORAGE_KEY = 'edit_profile_data';

interface StoredProfile {
  firstName: string;
  lastName: string;
  building: string;
  room: string;
  email: string;
  phone: string;
  dob: DateValue;
}

const loadProfile = (): StoredProfile | null => {
  try {
    const s = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!s) return null;

    return JSON.parse(s) as StoredProfile;
  } catch {
    return null;
  }
};

const EditProfilePage: React.FC<EditProfilePageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const saved = loadProfile();

  const [firstName, setFirstName] = useState(saved?.firstName ?? user?.firstName ?? '');
  const [lastName, setLastName] = useState(saved?.lastName ?? user?.lastName ?? '');
  const [building, setBuilding] = useState(saved?.building ?? '');
  const [room, setRoom] = useState(saved?.room ?? '');
  const [email, setEmail] = useState(saved?.email ?? user?.email ?? '');
  const [phone, setPhone] = useState(saved?.phone ?? user?.phoneNumber ?? '');
  const [dob, setDob] = useState<DateValue>(saved?.dob ?? { month: 7, day: 0, year: 1966 });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dobLabel = dob
    ? `${MONTHS_SHORT[dob.month]} ${DAYS[dob.day]}, ${dob.year}`
    : '';

  const handleSave = () => {
    const profileData: StoredProfile = { firstName, lastName, building, room, email, phone, dob };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
    if (user) {
      dispatch(setUser({ ...user, firstName, lastName, email, phoneNumber: phone }));
    }
    onBack();
  };

  const inputClass =
    'w-full px-4 py-3 rounded-full border border-border-default text-sm text-black placeholder:text-text-muted focus:outline-none focus:border-primary transition-all bg-white';

  return (
    <div className="absolute inset-0 z-[100] bg-F8F8F8 flex flex-col">
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
        >
          <BackIcon />
        </button>
        <span className="text-lg font-bold text-black">{t('edit_profile.title')}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="flex justify-center mb-8 mt-2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#C4C4C4] border-4 border-white" />
            <button className="absolute bottom-1 right-1 w-7 h-7 bg-white border border-[#ddd] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors active:scale-95">
              <CameraIconSm />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <input className={inputClass} placeholder={t('edit_profile.first_name')} value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input className={inputClass} placeholder={t('edit_profile.last_name')} value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
          <div className="flex gap-3">
            <input className={inputClass} placeholder={t('edit_profile.building_number')} value={building} onChange={e => setBuilding(e.target.value)} />
            <input className={inputClass} placeholder={t('edit_profile.room_number')} value={room} onChange={e => setRoom(e.target.value)} />
          </div>
          <input className={inputClass} type="email" placeholder={t('edit_profile.email')} value={email} onChange={e => setEmail(e.target.value)} />
          <input className={inputClass} type="tel" placeholder={t('edit_profile.phone_number')} value={phone} onChange={e => setPhone(e.target.value)} />

          <button
            onClick={() => setShowDatePicker(true)}
            className="w-full px-4 py-3 rounded-full border border-border-default text-sm bg-white flex items-center justify-between hover:border-primary transition-all"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon />
              <span className={dobLabel ? 'text-black' : 'text-text-muted'}>
                {dobLabel || t('edit_profile.date_of_birth')}
              </span>
            </div>
            <ChevronDownIcon />
          </button>
        </div>
      </div>

      <div className="flex-shrink-0 px-6 pb-8 pt-3 bg-F8F8F8">
        <button
          onClick={handleSave}
          className="w-full py-4 bg-secondary text-white font-bold rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md"
        >
          {t('edit_profile.save_changes')}
        </button>
      </div>

      <DatePickerSheet
        isOpen={showDatePicker}
        value={dob}
        onSave={v => { setDob(v); setShowDatePicker(false); }}
        onClose={() => setShowDatePicker(false)}
      />
    </div>
  );
};

export default EditProfilePage;
