import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-modal w-full max-w-modal-max-width p-8 shadow-xl animate-in fade-in zoom-in duration-300">
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
