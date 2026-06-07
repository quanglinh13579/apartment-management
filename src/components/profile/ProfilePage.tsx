import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import mockContacts from '../../data/familyContacts.json';
import { useAppSelector } from '../../redux/store';
import AddContactModal from './components/AddContactModal';
import EditContactModal from './components/EditContactModal';
import DeleteContactModal from './components/DeleteContactModal';
import type { ContactData } from './components/EditContactModal';
import EditProfilePage from './EditProfilePage';
import {
  StarIcon,
  PhoneIcon,
  EditIcon,
  TrashIcon,
  PencilIcon,
} from '../Icons';

interface FamilyContact extends ContactData {
  isMainContact: boolean;
}

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector(state => state.auth.user);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const STORAGE_KEY = 'family_contacts';

  const [contacts, setContacts] = useState<FamilyContact[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as FamilyContact[];
    } catch (error) {
      console.error('Error loading contacts from localStorage:', error);
    }
    return mockContacts as FamilyContact[];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedContact, setSelectedContact] = useState<FamilyContact | null>(null);
  if (showEditProfile) {
    return <EditProfilePage onBack={() => setShowEditProfile(false)} />;
  }

  const handleAddSave = (data: { name: string; relationship: string; phone: string }) => {
    const newContact: FamilyContact = {
      id: Date.now().toString(),
      isMainContact: false,
      ...data,
    };
    setContacts(prev => [...prev, newContact]);
    setShowAdd(false);
  };

  const handleEditOpen = (contact: FamilyContact) => {
    setSelectedContact(contact);
    setShowEdit(true);
  };

  const handleEditSave = (updated: ContactData) => {
    setContacts(prev =>
      prev.map(c => c.id === updated.id ? { ...c, ...updated } : c)
    );
    setShowEdit(false);
    setSelectedContact(null);
  };

  const handleDeleteOpen = (contact: FamilyContact) => {
    setSelectedContact(contact);
    setShowDelete(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedContact) {
      setContacts(prev => prev.filter(c => c.id !== selectedContact.id));
    }
    setShowDelete(false);
    setSelectedContact(null);
  };

  const handleToggleStar = (id: string) => {
    setContacts(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, isMainContact: !c.isMainContact }
          : c.isMainContact
            ? { ...c, isMainContact: false }
            : c
      )
    );
  };

  const displayName = user
    ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
    : '';
  const displayPhone = user?.phoneNumber ?? '';
  const displayEmail = user?.email ?? '';

  return (
    <div className="flex flex-col h-full bg-F8F8F8">
      <div className="flex flex-col items-center pt-6 pb-4 px-6">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full bg-[#C4C4C4] border-4 border-white shadow-md" />
          <button
            onClick={() => setShowEditProfile(true)}
            className="absolute bottom-1 right-1 w-7 h-7 bg-[#F3F3F3] rounded-full flex items-center justify-center shadow hover:bg-gray-100 transition-colors active:scale-95"
          >
            <PencilIcon />
          </button>
        </div>

        <div className="text-xl font-bold text-black mb-2">{displayName}</div>

        <div className="flex items-center gap-2 bg-[#DCDCDC] rounded-full px-4 py-1.5 border border-border-default mb-2 shadow-sm">
          <span className="text-sm text-text-dark font-normal">{displayPhone}</span>
        </div>
        <div className="flex items-center gap-2 bg-[#DCDCDC] rounded-full px-4 py-1.5 border">
          <span className="text-sm text-text-dark font-normal">{displayEmail}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-bold text-black">{t('profile.family_contacts')}</span>
          <button
            id="add-contact-btn"
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 bg-[#858585] text-white text-sm font-normal px-4 py-1.5 rounded-full hover:opacity-80 active:scale-95 transition-all shadow"
          >
            {t('profile.add')}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {contacts.length === 0 && (
            <div className="text-center py-10 text-text-muted text-sm italic">
              {t('profile.no_contacts')}
            </div>
          )}
          {contacts.map(contact => (
            <div
              key={contact.id}
              className="bg-white rounded-[15px] px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-base text-black">{contact.name}</span>
                    {contact.isMainContact && (
                      <>
                        <button
                          onClick={() => handleToggleStar(contact.id)}
                          className="hover:opacity-70 transition-opacity active:scale-95"
                          title={t('profile.set_main_contact')}
                        >

                        </button>
                        <span className="flex items-center gap-2 text-xs font-normal text-black border bg-[#F1F1F1] px-2 py-0.5 rounded-full">
                          <StarIcon size={16} />
                          {t('profile.main_contact')}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xm text-black mb-1.5">{contact.relationship}</p>
                  <div className="flex items-center gap-1.5">
                    <PhoneIcon />
                    <span className="text-base text-black">{contact.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-2">
                  {!contact.isMainContact && (
                    <button
                      onClick={() => handleToggleStar(contact.id)}
                      className="hover:opacity-70 transition-opacity active:scale-95"
                      title={t('profile.set_main_contact')}
                    >
                      <StarIcon />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteOpen(contact)}
                    className="text-text-muted hover:text-sos-active transition-colors active:scale-95"
                    title={t('profile.delete')}
                  >
                    <TrashIcon />
                  </button>
                  <button
                    onClick={() => handleEditOpen(contact)}
                    className="text-text-muted hover:text-black transition-colors active:scale-95"
                    title={t('profile.edit')}
                  >
                    <EditIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddContactModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={handleAddSave}
      />
      <EditContactModal
        isOpen={showEdit}
        onClose={() => { setShowEdit(false); setSelectedContact(null); }}
        onSave={handleEditSave}
        contact={selectedContact}
      />
      <DeleteContactModal
        isOpen={showDelete}
        onClose={() => { setShowDelete(false); setSelectedContact(null); }}
        onConfirm={handleDeleteConfirm}
        contactName={selectedContact?.name}
      />
    </div>
  );
};

export default ProfilePage;
