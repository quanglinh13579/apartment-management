import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './BaseModal';

interface AdminCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AdminCheckModal: React.FC<AdminCheckModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-sos-bg rounded-lg mb-8"></div>
        
        <div className="text-xl font-bold text-black mb-3">
          {t('modals.admin_check_title')}
        </div>
        
        <p className="text-sm text-text-muted leading-relaxed mb-10 px-4">
          {t('modals.admin_check_desc')}
        </p>
        
        <div className="w-full flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full py-4 bg-secondary text-white font-bold rounded-full hover:bg-opacity-90 transition-colors"
          >
            {t('modals.admin_check_btn')}
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

export default AdminCheckModal;
