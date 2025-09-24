"use client";
import { Button, Col, Image, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useTheme, lightTheme, darkTheme } from "@/components/boxed/ThemeProvider";
import { useTranslation } from 'react-i18next'
import React, { useEffect } from "react";
import Experience from "@/components/layout/Experience";
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import axios from "axios";
import { getLikesResponse } from "@/app/api/utils/types/likes";

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
  const thumbsUp = async (id: number, type: 'like' | 'dislike') => {
    setThumbsData(prev => prev.map((thumb, index) => index === id - 1 ? { ...thumb, data: { ...thumb.data, [type]: thumb.data[type] + 1 } } : thumb));
    try {
      await axios.post('/api/mainpage/like', {
        id,
        type
      });
    } catch (err) {
      console.log(err);
    }
  }

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
              <button
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
              </button>
            ))}
          </div>
          <div style={{ width: '60%' }}>
            <Experience type={activeTab} />
          </div>
        </Col>
      </Row>
      <Row className="text-center" style={{ width: "100%" }}>
        <Col style={{ borderColor: "blue", borderWidth: "2px", borderStyle: "solid", borderRadius: "10px", marginRight: "3vw" }}>
          <Stack gap={0}>
            <div className="p-2"><h3><b>{t('mainpage.minigame.title')}</b></h3></div>
            <div className="p-2 text-primary">{t('mainpage.minigame.description')}</div>
            <div className="hr" />
            <div className="p-2">
              <Button href="/BWIte/index.html" variant={theme} className="">{t('mainpage.minigame.bwite')}</Button>
              <ThumbsUp onClick={() => thumbsUp(1, 'like')} /> <span >[{thumbsData[0].data.like}]</span>
              <ThumbsDown onClick={() => thumbsUp(1, 'dislike')} /> <span >[{thumbsData[0].data.dislike}]</span>
            </div>
            <div className="p-2">
              <Button href="/Color/index.html" variant={theme} className="">{t('mainpage.minigame.color')}</Button>
              <ThumbsUp onClick={() => thumbsUp(2, 'like')} /> <span >[{thumbsData[1].data.like}]</span>
              <ThumbsDown onClick={() => thumbsUp(2, 'dislike')} /> <span >[{thumbsData[1].data.dislike}]</span>
            </div>
            <div className="p-2">
              <Button href="/LightMaze" variant={theme} className="">{t('mainpage.minigame.light')}</Button>
              <ThumbsUp onClick={() => thumbsUp(3, 'like')} /> <span >[{thumbsData[2].data.like}]</span>
              <ThumbsDown onClick={() => thumbsUp(3, 'dislike')} /> <span >[{thumbsData[2].data.dislike}]</span>
            </div>
          </Stack>
        </Col>
        <Col style={{ borderColor: "blue", borderWidth: "2px", borderStyle: "solid", borderRadius: "10px" }}>
          <Stack gap={1}>
            <div className="p-2"><h3><b>{t('mainpage.tools.title')}</b></h3></div>
            <div className="p-2 text-primary">{t('mainpage.tools.description')}</div>
            <div className="hr" />
            <div className="p-2">
              <Button href="/" variant={theme} className="w-100">{t('mainpage.tools.tobe')}</Button>
              <ThumbsUp onClick={() => thumbsUp(4, 'like')} /> <span >[{thumbsData[3].data.like}]</span>
              <ThumbsDown onClick={() => thumbsUp(4, 'dislike')} /> <span >[{thumbsData[3].data.dislike}]</span>
            </div>
            <div className="p-2">
              <Button href="/Furry" variant={theme} className="w-100">{t('mainpage.tools.furry')}</Button>
              <ThumbsUp onClick={() => thumbsUp(5, 'like')} /> <span >[{thumbsData[4].data.like}]</span>
              <ThumbsDown onClick={() => thumbsUp(5, 'dislike')} /> <span >[{thumbsData[4].data.dislike}]</span>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
export default Main;
