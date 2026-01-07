"use client";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useModalStore } from "@/store/ModalStore";
import { useLocalStorageStore } from "@/store/LocalStorageStore";
import { useTheme, lightTheme, darkTheme } from "@/components/boxed/ThemeProvider";
import { useTranslation } from "react-i18next";
import Image from "next/image";

interface CookieModalProps {
  show: boolean;
}

export const CookieModal: React.FC<CookieModalProps> = ({ show }) => {
  const { hideModal } = useModalStore();
  const { theme, currentTheme } = useTheme();
  const { t } = useTranslation();
  const currentThemeConfig = theme === 'light' ? lightTheme[currentTheme] : darkTheme[currentTheme];

  const { acceptCookies, declineCookies, setThemeCookie } = useLocalStorageStore();

  const handleAccept = () => {
    // 使用CookieStore的方法接受cookie
    acceptCookies();
    // 存储当前主题到cookie
    setThemeCookie(theme);
    hideModal();
  };

  const handleDecline = () => {
    try {
      // 使用CookieStore的方法拒绝cookie
      declineCookies();
      hideModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      show={show}
      onHide={hideModal}
      centered
      backdrop="static"
      dialogClassName="cookie-modal"
      className="align-center justify-content-center"
      size="lg"
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: currentThemeConfig.backgroundColor,
          color: currentThemeConfig.color,
          borderBottom: `1px solid ${currentThemeConfig.borderColor}`,
        }}
      >
        <Modal.Title>{t('cookie.title')}</Modal.Title>
      </Modal.Header>
      <Image
        src="/cookie.png"
        alt="Cookie"
        width={500}
        height={400}
        className="mb-4 mx-auto d-block"
        style={{ backgroundColor: currentThemeConfig.backgroundColor }}
      />
      <Modal.Body
        style={{
          backgroundColor: currentThemeConfig.backgroundColor,
          color: currentThemeConfig.color,
        }}
      >
        <p>{t('cookie.content')}</p>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: currentThemeConfig.backgroundColor,
          color: currentThemeConfig.color,
          borderTop: `1px solid ${currentThemeConfig.borderColor}`,
        }}
      >
        <Button
          variant="outline-secondary"
          onClick={handleDecline}
          style={{
            borderColor: currentThemeConfig.borderColor,
            color: currentThemeConfig.color,
          }}
        >
          {t('cookie.reject')}
        </Button>
        <Button
          variant="primary"
          onClick={handleAccept}
          style={{
            backgroundColor: currentThemeConfig.borderColor,
            borderColor: currentThemeConfig.borderColor,
          }}
        >
          {t('cookie.accept')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};