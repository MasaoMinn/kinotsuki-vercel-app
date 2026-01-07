"use client";
import { Col, Row, Stack, Button, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useTheme, lightTheme, darkTheme } from "@/components/boxed/ThemeProvider";
import { useTranslation } from 'react-i18next'
import React, { useEffect, useRef, useState } from "react";
import { useModalStore } from "@/store/ModalStore";
import { useLocalStorageStore } from "@/store/LocalStorageStore";
import { CookieModal } from "@/components/layout/modals/CookieModal";
import { BoldButton } from "@/components/boxed/MotionComponents";
import Experience from "@/components/layout/Experience";
import Bubble from "@/components/layout/Bubble";
import MatterDemo, { BubblesBoardHandle } from "@/components/layout/BubblesBoard";

const Introduction = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="" style={theme == "light" ? { backgroundColor: "#F4FFC8", color: "#00211F" } : { backgroundColor: "#161712", color: "#D5FFFA" }}>
      <h3>{t('intro.iam')} <b>{t('intro.name')}</b></h3>
      <p></p>
      <p>{t('intro.college')}</p>
      <p>{t('intro.cpp')}</p>
      <p>{t('intro.react')}</p>
      <p>{t('intro.language')}</p>
      <p>{t('intro.japan')}</p>
      <p>{t('intro.hobby')}</p>
      <p>{t('intro.pokemon')}</p>
      <p>{t('intro.motto')}</p>
    </div>
  )
}

const App = () => {
  const { t } = useTranslation();
  const { theme, currentTheme } = useTheme();
  const { modal, showModal } = useModalStore();

  // 检查并显示cookie同意弹窗
  useEffect(() => {
    const { cookiePermission, cookieQueryShown, setCookieQueryShown } = useLocalStorageStore.getState();
    // 只有当用户没有同意cookie且弹窗还没有显示过时，才显示弹窗
    if (!cookiePermission && !cookieQueryShown) {
      // 标记弹窗已显示
      setCookieQueryShown();
      // 显示弹窗
      showModal({ type: "cookie", title: "Cookie 同意", message: "本网站使用cookie来提升您的浏览体验。" });
    }
  }, [showModal]);

  const isCookieModalVisible = modal.type === "cookie";

  // 定义统一的Stack样式
  const stackStyles = {
    borderRadius: "12px",
    border: "2px solid",
    borderColor: theme === 'light' ? lightTheme[currentTheme].borderColor : darkTheme[currentTheme].borderColor,
    boxShadow: theme === 'light' ? `0 0 20px ${lightTheme[currentTheme].borderColor}80` : `0 0 20px ${darkTheme[currentTheme].borderColor}80`,
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",

  };

  // 定义统一的按钮样式
  const buttonStyles = {
    borderRadius: "12px",
    fontWeight: 500,
    transition: "all 0.3s ease",
    borderWidth: "2px",
    backgroundColor: theme === 'light' ? lightTheme[currentTheme].borderColor : darkTheme[currentTheme].borderColor,
    color: theme === 'light' ? lightTheme[currentTheme].color : darkTheme[currentTheme].color,
    transform: "translateY(0)",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  };

  const [activeTab, setActiveTab] = React.useState<'OI' | 'Developper' | 'Language'>('OI');
  const tabTitles = [
    { key: 'OI', label: t('mainpage.oi.label') },
    { key: 'Developper', label: t('mainpage.developper.label') },
    { key: 'Language', label: t('mainpage.language.label') }
  ];

  const ref = useRef<BubblesBoardHandle>(null);
  const list = ['furry', 'cpp', 'react', 'pingpong', 'mbti'];
  const [bubbleSize, setBubbleSize] = React.useState<number[]>(Array.from({ length: list.length }, () => 100));

  return (
    <Container className="min-vh-100 text-center" style={theme === 'light' ? { ...lightTheme[currentTheme] } : { ...darkTheme[currentTheme] }} fluid>
      <Row className="justify-content-center align-items-center" style={{ minHeight: "260px", marginBottom: "2rem" }}>
        <Col xs={12} md={4} className="d-flex justify-content-center align-items-center">
          <Image
            src="/head.jpg"
            alt="header"
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              border: theme === 'light' ? "2px solid #F4FFC8" : "2px solid #161712"
            }}
            fluid
          />
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
          <Introduction />
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center" style={{ minHeight: "120px", marginBottom: "1vw" }}>
        <Col className="d-flex flex-column align-items-center">
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
            {tabTitles.map(tab => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'OI' | 'Developper' | 'Language')}
                style={{
                  fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                  fontSize: '1.2rem',
                  background: activeTab === tab.key ? '#e0f7fa' : 'transparent',
                  color: activeTab === tab.key ? '#00796b' : 'inherit',
                  border: 'none',
                  borderBottom: activeTab === tab.key ? '2px solid #00796b' : '2px solid transparent',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </Button>
            ))}
          </div>
          <div style={{ width: '60%' }}>
            <Experience type={activeTab} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <MatterDemo ref={ref} width={1200} height={600} gravity={0.3} ground interact backgroundColor={theme === 'light' ? '#e8faa2ff' : '#002b13ff'}>
            {list.map((item, index) => (
              <Bubble key={index} shape={`circle ${bubbleSize[index]}`} x={200 + index * 100} y={60} text={t(`mainpage.bubbles.${item}`)}
                style={{ backgroundColor: theme === 'light' ? '#00eb79ff' : '#00796b' }}
                onClick={() => setBubbleSize(prev => prev.map((size, i) => i === index ? size + 10 : size))}
              />
            ))}
          </MatterDemo>

        </Col>
      </Row>
      <Row>
        <Col>
          <div className="space-x-2 d-flex justify-content-center align-items-center">
            <Button
              onClick={() => ref.current?.reset()}
              className="px-3 py-1 bg-blue-500 rounded"
              variant={theme}
            >
              🔄 Reset Animation
            </Button>
          </div>
        </Col>
      </Row>

      <CookieModal show={isCookieModalVisible} />
    </Container>
  );
}

export default App;