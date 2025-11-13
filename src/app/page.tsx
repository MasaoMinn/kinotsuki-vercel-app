"use client";
import { Button, Col, Image, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useTheme, lightTheme, darkTheme } from "@/components/boxed/ThemeProvider";
import { useTranslation } from 'react-i18next'
import React, { useEffect } from "react";
import Experience from "@/components/layout/Experience";
import axios from "axios";
import { getLikesResponse } from "@/app/api/utils/types/likes";
import ThumbVote from '@/components/boxed/ThumbVote';
import Bubble from "@/components/layout/Bubble";
import MatterDemo, { BubblesBoardHandle } from "@/components/layout/BubblesBoard";
import { useRef } from "react";
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
const Main = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = React.useState<'OI' | 'Developper' | 'Language'>('OI');
  const tabTitles = [
    { key: 'OI', label: t('mainpage.oi.label') },
    { key: 'Developper', label: t('mainpage.developper.label') },
    { key: 'Language', label: t('mainpage.language.label') }
  ];

  const initialThumb = React.useMemo(() => ({
    status: 200,
    message: '',
    data: { like: 0, dislike: 0, upd_time: '' }
  }), []);
  const initialThumbs = React.useMemo(() => Array.from({ length: 5 }, () => initialThumb), [initialThumb]);
  const [thumbsData, setThumbsData] = React.useState<getLikesResponse[]>(initialThumbs);
  const [hasStorageAccess, setHasStorageAccess] = React.useState<boolean>(false);

  // Check if localStorage/cookie access is available
  const checkStorageAccess = React.useCallback(() => {
    try {
      // Test localStorage access
      const testKey = 'storage_test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      setHasStorageAccess(true);
    } catch (error) {
      console.log(error);
      setHasStorageAccess(false);
    }
  }, []);

  // Check storage access on component mount
  React.useEffect(() => {
    checkStorageAccess();
  }, [checkStorageAccess]);


  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      axios.get('/api/mainpage/like', { params: { id: i } }).then((res) => {
        setThumbsData(prev => prev.map((thumb, index) => index === i - 1 ? { ...thumb, data: res.data.data } : thumb));
      }).catch((err) => {
        console.log(err);
        setThumbsData(prev => prev.map((thumb, index) => index === i - 1 ? { ...thumb, data: { like: 0, dislike: 0, upd_time: new Date().toLocaleString() } } : thumb));
      })
    }
  }, []);
  const ref = useRef<BubblesBoardHandle>(null);
  const list = ['furry', 'cpp', 'react', 'pingpong', 'mbti'];
  const [bubbleSize, setBubbleSize] = React.useState<number[]>(Array.from({ length: list.length }, () => 100));
  return (
    <Container className="" style={theme === 'light' ? { ...lightTheme } : { ...darkTheme }} fluid>
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
      <Row className="text-center" style={{ width: "67%", margin: "0 auto" }}>
        <Col style={{ borderColor: "blue", borderWidth: "2px", borderStyle: "solid", borderRadius: "10px", marginRight: "3vw" }}>
          <Stack gap={0}>
            <div className="p-2"><h3><b>{t('mainpage.minigame.title')}</b></h3></div>
            <div className="p-2 text-primary">{t('mainpage.minigame.description')}</div>
            {!hasStorageAccess && (
              <div className="p-2 text-warning" style={{ fontSize: '0.9rem' }}>
                ⚠️ {t('error.cookie_message')}
              </div>
            )}
            <div className="hr" />
            <div className="p-2">
              <Button href="/BWIte/index.html" variant={theme} className="">{t('mainpage.minigame.bwite')}</Button>
              <ThumbVote id={1} likes={thumbsData[0].data.like} dislikes={thumbsData[0].data.dislike} hasStorageAccess={hasStorageAccess} setThumbsData={setThumbsData} />
            </div>
            <div className="p-2">
              <Button href="/Color/index.html" variant={theme} className="">{t('mainpage.minigame.color')}</Button>
              <ThumbVote id={2} likes={thumbsData[1].data.like} dislikes={thumbsData[1].data.dislike} hasStorageAccess={hasStorageAccess} setThumbsData={setThumbsData} />
            </div>
            <div className="p-2">
              <Button href="/LightMaze" variant={theme} className="">{t('mainpage.minigame.light')}</Button>
              <ThumbVote id={3} likes={thumbsData[2].data.like} dislikes={thumbsData[2].data.dislike} hasStorageAccess={hasStorageAccess} setThumbsData={setThumbsData} />
            </div>
          </Stack>
        </Col>
        <Col style={{ borderColor: "blue", borderWidth: "2px", borderStyle: "solid", borderRadius: "10px" }}>
          <Stack gap={0}>
            <div className="p-2"><h3><b>{t('mainpage.tools.title')}</b></h3></div>
            <div className="p-2 text-primary">{t('mainpage.tools.description')}</div>
            <div className="hr" />
            <div className="p-2">
              <Button href="/" variant={theme} className="">{t('mainpage.tools.tobe')}</Button>
              <ThumbVote id={4} likes={thumbsData[3].data.like} dislikes={thumbsData[3].data.dislike} hasStorageAccess={hasStorageAccess} setThumbsData={setThumbsData} />
            </div>
            <div className="p-2">
              <Button href="/Furry" variant={theme} className="">{t('mainpage.tools.furry')}</Button>
              <ThumbVote id={5} likes={thumbsData[4].data.like} dislikes={thumbsData[4].data.dislike} hasStorageAccess={hasStorageAccess} setThumbsData={setThumbsData} />
            </div>
          </Stack>
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
    </Container>
  );
}
export default Main;
