import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './BaseModal';
import WarningIcon from '../../Icons/WarningIcon';

interface FalseAlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const FalseAlarmModal: React.FC<FalseAlarmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="bg-alert-icon-bg p-6 rounded-full mb-8 scale-150">
          <WarningIcon />
        </div>
        
        <div className="text-xl font-bold text-black mb-3">
          {t('modals.false_alarm_title')}
        </div>
        
        <p className="text-sm text-text-muted leading-relaxed mb-10 px-2">
          {t('modals.false_alarm_desc')}
        </p>
        
        <div className="w-full flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full py-4 bg-secondary text-white font-bold rounded-full hover:bg-opacity-90 transition-colors"
          >
            {t('modals.false_alarm_btn')}
          </button>
          
          <button 
            onClick={onClose}
            className="w-full py-4 bg-white border border-border-default text-secondary font-bold rounded-full hover:bg-gray-50 transition-colors"
          >
            {t('modals.cancel')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FalseAlarmModal;
