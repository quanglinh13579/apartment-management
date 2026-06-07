import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../home/components/BaseModal';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: { name: string; relationship: string; phone: string }) => void;
}

const AddContactModal: React.FC<AddContactModalProps> = ({ isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');

  const handleClose = () => {
    setName('');
    setRelationship('');
    setPhone('');
    onClose();
  };

  const handleSave = () => {
    if (!name.trim() || !phone.trim()) return;
    onSave({ name: name.trim(), relationship: relationship.trim(), phone: phone.trim() });
    setName('');
    setRelationship('');
    setPhone('');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="flex flex-col items-center text-center">
        <h2 className="text-xl font-bold text-black mb-2">
          {t('profile.modal_add_title')}
        </h2>
        <p className="text-sm text-text-muted leading-relaxed mb-6">
          {t('profile.modal_add_desc')}
        </p>

        <div className="w-full flex flex-col gap-3 mb-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t('profile.full_name')}
            className="w-full px-4 py-3 rounded-full border border-border-default text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary transition-all"
          />
          <input
            type="text"
            value={relationship}
            onChange={e => setRelationship(e.target.value)}
            placeholder={t('profile.relationship')}
            className="w-full px-4 py-3 rounded-full border border-border-default text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary transition-all"
          />
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder={t('profile.phone_number')}
            className="w-full px-4 py-3 rounded-full border border-border-default text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary transition-all"
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleSave}
            disabled={!name.trim() || !phone.trim()}
            className="w-full py-4 bg-secondary text-white font-bold rounded-full hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            {t('profile.save')}
          </button>
          <button
            onClick={handleClose}
            className="w-full py-4 bg-white border border-border-default text-secondary font-bold rounded-full hover:bg-gray-50 transition-colors"
          >
            {t('modals.cancel')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddContactModal;
