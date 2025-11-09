"use client";
import React from 'react';
import { useModalStore } from '@/app/store/ModalStore';
import ModalComp from './modal/Modal';

const GlobalModals: React.FC = () => {
  const modals = useModalStore(s => s.modal);
  const hideModal = useModalStore(s => s.hideModal);

  if (!modals || modals.length === 0) return null;

  return (
    <>
      {modals.map(m => (
        <ModalComp key={m.id} modal={m} onClose={() => hideModal(m.id)} />
      ))}
    </>
  );
};

export default GlobalModals;
