"use client";
import type { ToastPayload } from '@/app/store/ModalStore';
import { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useModalStore } from '@/app/store/ModalStore';
import { useTheme, darkTheme, lightTheme } from './ThemeProvider';
export const MyToast = (props: ToastPayload) => {
  const { t } = useTranslation();
  const hideModal = useModalStore(s => s.hideModal);
  const { theme } = useTheme();
  const [show, setShow] = useState(true);
  const { type, title: pTitle, message: pMessage } = props ?? { type: null, title: null, message: null };
  useEffect(() => {
    setShow(true);
  }, [type, pTitle, pMessage]);

  useEffect(() => {
    const delay = 2500;
    if (!type) return;
    const timer = setTimeout(() => {
      setShow(false);
      hideModal();
    }, delay + 50);
    return () => clearTimeout(timer);
  }, [type, pTitle, pMessage, hideModal]);

  if (!props || !props.type) return null;

  const finalTitle = props.title ?? (props.type !== 'error' ? t(`toast.${props.type}_title`) : null);
  const finalMessage = props.message ?? (props.type !== 'error' ? t(`toast.${props.type}_message`) : null);

  const handleClose = () => {
    setShow(false);
    hideModal();
  };

  return (
    <ToastContainer className="p-3" position='bottom-center' >
      <Toast
        show={show}
        onClose={handleClose}
        delay={2500}
        autohide
        style={theme === 'light' ? { ...lightTheme } : { ...darkTheme }}
      >
        <Toast.Header>
          <strong className="me-auto">{finalTitle}</strong>
          <small>{new Date().toLocaleTimeString()}</small>
        </Toast.Header>
        <Toast.Body>{finalMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
