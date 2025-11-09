"use client";
import React from 'react';
import { Modal as BsModal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import type { ModalPayload } from '@/app/store/ModalStore';
import { useTheme, lightTheme, darkTheme } from '../../boxed/ThemeProvider';
import { ModalStyle } from './layout';

type Props = {
  modal: ModalPayload;
  onClose: (id?: string) => void;
};

const Modal: React.FC<Props> = ({ modal, onClose }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  if (!modal) return null;

  // ModalPayload now provides explicit title and message parts
  const title = modal.title ?? (modal.type === 'cookie' ? t('modal.cookie_title') : '');
  const first = modal.firstMessage ?? (modal.type === 'cookie' ? t('modal.cookie_message') : '');
  const second = modal.secondMessage ?? null;
  const picture = modal.pictureURL ?? null;

  return (
    <BsModal show onHide={() => onClose(modal.id)}>
      <BsModal.Header closeButton style={theme === 'light' ? { ...lightTheme } : { ...darkTheme }}>
        <BsModal.Title>{title}</BsModal.Title>
      </BsModal.Header>
      <BsModal.Body style={theme === 'light' ? { ...lightTheme } : { ...darkTheme }}>
        {picture && (
          <div style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
            {/* next/image lint disabled because src may be external and dynamic */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={picture} alt={title} style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} />
          </div>
        )}
        <div style={ModalStyle.firstmsg}>{first}</div>
        {second && (
          <div style={ModalStyle.secondmsg}>{second}</div>
        )}
      </BsModal.Body>
      <BsModal.Footer>
        <Button variant="secondary" onClick={() => onClose(modal.id)}>{t('modal.close') ?? 'Close'}</Button>
      </BsModal.Footer>
    </BsModal>
  );
};

export default Modal;
