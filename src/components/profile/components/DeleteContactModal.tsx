import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../home/components/BaseModal';

interface DeleteContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contactName?: string;
}

const DeleteContactModal: React.FC<DeleteContactModalProps> = ({ isOpen, onClose, onConfirm, contactName }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="flex flex-col items-center text-center">
        <h2 className="text-xl font-bold text-black mb-2">
          {t('profile.modal_delete_title')}
        </h2>
        <p className="text-sm text-text-muted leading-relaxed mb-8">
          {t('profile.modal_delete_desc', { name: contactName ?? '' })}
        </p>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-4 bg-secondary text-white font-bold rounded-full hover:bg-opacity-90 transition-all active:scale-95"
          >
            {t('profile.save')}
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

export default DeleteContactModal;
