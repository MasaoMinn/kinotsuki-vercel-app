"use client";
import React from 'react';
import { ToastContainer } from 'react-bootstrap';
import { useToastStore } from '@/app/store/ToastStore';
import { MyToast } from '../boxed/Toast';

const GlobalToasts: React.FC = () => {
  const toasts = useToastStore(s => s.toasts);

  return (
    <ToastContainer className="p-3" position="bottom-center">
      {toasts?.map(t => (
        <MyToast key={t.id} {...t} />
      ))}
    </ToastContainer>
  );
}

export default GlobalToasts;
