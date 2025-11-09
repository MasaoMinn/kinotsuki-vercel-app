"use client";
import React from 'react';
import { Col, Container, Row, Image, Accordion } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ImgCarousel from './Carousel';
import { useTranslation } from 'react-i18next'
import { introStyle } from './style';
import { useTheme, darkTheme, lightTheme } from '@/components/boxed/ThemeProvider';
const QQProfileLink: React.FC = () => {
  const qqNumber = '2134361910'; // QQ号
  const QQUrl = `https://qm.qq.com/q/QTfus78dqe`;// QQ主页URL
  const { theme } = useTheme();

  const { t } = useTranslation();
  return (
    <Container fluid className="text-center px-3" style={theme === 'dark' ? darkTheme : lightTheme}>
      <Row className="justify-content-center g-1">
        <Col
          xs={12}
          lg={8}
          xl={6}
          className="justify-content-center mt-3"
          style={{ border: "2px solid blue", borderRadius: "10px", padding: "10px", backgroundColor: "white" }}
        >
          <ImgCarousel />
        </Col>
      </Row>
      <Row className="justify-content-center g-1">
        <Col xs={10} md={9} lg={8} className="d-flex justify-content-center">
          <p style={introStyle}>{t('furry.intro')}</p>
        </Col>
      </Row>

      <Row className="justify-content-center g-1">
        <Col xs={9} md={6} className="d-flex justify-content-center">
          <Button variant="info" href={QQUrl} aria-label={`访问QQ：${qqNumber}`} className="px-4 py-2" >
            <Image src='contact/QQicon.png' alt="QQ图标" width="20" height="20" className="me-2" />
            点击跳转我的QQ
          </Button>
        </Col>
      </Row>
      <Row className="mt-1 justify-content-center">
        <Col xs={10} md={6} lg={4}>
          <Accordion defaultActiveKey={null} flush className="my-3" style={{ borderColor: "blue", borderWidth: "2px", borderStyle: "solid", borderRadius: "10px" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="text-primary me-2">
                  <i className="bi bi-chevron-down" />
                </span>
                查看QQ二维码
              </Accordion.Header>
              <Accordion.Body>
                <Image src="contact/QQ.jpg" alt="QQ二维码" fluid className="img-thumbnail hover-shadow"
                  style={{ height: 'auto', transform: 'scale(0.98)', transition: 'transform 0.3s ease' }}
                  onLoad={(e) => { e.currentTarget.style.transform = 'scale(1)' }} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <Row className="justify-content-center g-1">
        <Col xs={9} md={6} className="d-flex justify-content-center">
          <Button variant="info" href="https://www.xiaohongshu.com/user/profile/649132e3000000000f004dc5?xhsshare=userQrCode" aria-label={`访问小红书：5514710200`} className="px-4 py-2" >
            <Image src='contact/xiaohongshuicon.png' alt="小红书图标" width="20" height="20" className="me-2" />
            点击跳转我的小红书
          </Button>
        </Col>
      </Row>
      <Row className="mt-1 justify-content-center">
        <Col xs={10} md={6} lg={4}>
          <Accordion defaultActiveKey={null} flush className="my-3" style={{ borderColor: "blue", borderWidth: "2px", borderStyle: "solid", borderRadius: "10px" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="text-primary me-2">
                  <i className="bi bi-chevron-down" />
                </span>
                查看小红书二维码
              </Accordion.Header>
              <Accordion.Body>
                <Image src="contact/xiaohongshu.jpg" alt="小红书二维码" fluid className="img-thumbnail hover-shadow"
                  style={{ height: 'auto', transform: 'scale(0.98)', transition: 'transform 0.3s ease' }}
                  onLoad={(e) => { e.currentTarget.style.transform = 'scale(1)' }} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <Row className="justify-content-center g-0">
        <Col xs={9} md={6} className="d-flex justify-content-center">
          <Button variant="info" href="https://www.douyin.com/user/MS4wLjABAAAA3ZnB6dr1lknUupJiF0XZrWZ1mUtsvpRJfuSgmT94WRJpfkvO5S4Jja5h4yFo9vyM?from_tab_name=main" aria-label={`访问小红书：5514710200`} className="px-4 py-2" >
            <Image src='contact/douyinicon.png' alt="抖音图标" width="20" height="20" className="me-2" />
            点击跳转我的抖音
          </Button>
        </Col>
      </Row>
      <Row className="mt-0 justify-content-center">
        <Col xs={10} md={6} lg={4}>
          <Accordion defaultActiveKey={null} flush className="my-3" style={{ borderColor: "blue", borderWidth: "2px", borderStyle: "solid", borderRadius: "10px" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="text-primary me-2">
                  <i className="bi bi-chevron-down" />
                </span>
                查看抖音二维码
              </Accordion.Header>
              <Accordion.Body>
                <Image src="contact/douyin.png" alt="抖音二维码" fluid className="img-thumbnail hover-shadow"
                  style={{ height: 'auto', transform: 'scale(0.98)', transition: 'transform 0.3s ease' }}
                  onLoad={(e) => { e.currentTarget.style.transform = 'scale(1)' }} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};


export default QQProfileLink;