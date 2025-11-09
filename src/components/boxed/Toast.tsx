"use client";
import type { ToastPayload } from '@/app/store/ToastStore';
import { useEffect, useState, useRef } from 'react';
import { Toast } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@/app/store/ToastStore';
import { useTheme, darkTheme, lightTheme } from './ThemeProvider';
import './toast.css';

export const MyToast = (props: ToastPayload) => {
  const { t } = useTranslation();
  const hideModal = useToastStore(s => s.hideToast);
  const { theme } = useTheme();
  const [show, setShow] = useState(true);
  const closeTimerRef = useRef<number | null>(null);
  const removeTimerRef = useRef<number | null>(null);
  const { type, title: pTitle, message: pMessage } = props ?? { type: null, title: null, message: null };
  useEffect(() => {
    setShow(true);
  }, [type, pTitle, pMessage]);

  useEffect(() => {
    const DISPLAY_MS = 2500;
    const FADE_MS = 240; // should match CSS transition duration
    if (!type) return;

    // Start auto close (sets show -> false to trigger CSS fade)
    closeTimerRef.current = window.setTimeout(() => {
      setShow(false);
    }, DISPLAY_MS);

    // Remove from store after fade completes
    removeTimerRef.current = window.setTimeout(() => {
      hideModal(props?.id);
    }, DISPLAY_MS + FADE_MS);

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      if (removeTimerRef.current) {
        clearTimeout(removeTimerRef.current);
        removeTimerRef.current = null;
      }
    };
  }, [type, pTitle, pMessage, hideModal, props?.id]);

  if (!props || !props.type) return null;

  const finalTitle = props.title ?? (props.type !== 'error' ? t(`toast.${props.type}_title`) : null);
  const finalMessage = props.message ?? (props.type !== 'error' ? t(`toast.${props.type}_message`) : null);

  const handleClose = () => {
    // Stop any pending timers and trigger fade-out, then remove after FADE_MS
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (removeTimerRef.current) {
      clearTimeout(removeTimerRef.current);
      removeTimerRef.current = null;
    }
    const FADE_MS = 240;
    setShow(false);
    window.setTimeout(() => hideModal(props?.id), FADE_MS);
  };

  return (
    <Toast
      show={show}
      onClose={handleClose}
      className="fade"
      style={theme === 'light' ? { ...lightTheme } : { ...darkTheme }}
    >
      <Toast.Header>
        <strong className="me-auto">{finalTitle}</strong>
        <small>{new Date().toLocaleTimeString()}</small>
      </Toast.Header>
      <Toast.Body>{finalMessage}</Toast.Body>
    </Toast>
  );
};
