"use client";
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const QQProfileLink: React.FC<{ qqNumber: string }> = ({ qqNumber }) => {
  const pcQQUrl = `https://user.qzone.qq.com/${qqNumber}`;// QQ空间主页URL
  const mobileQQUrl = `mqqapi://card/show_pslcard?src_type=internal&card_type=person&uin=${qqNumber}`; // 移动端QQ协议（部分浏览器支持）
  const handleClick = () => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    try {
      if (isMobile) {
        window.location.href = mobileQQUrl;// 尝试打开移动端协议
        setTimeout(() => {
          window.location.href = pcQQUrl;
        }, 500);
      } else {
        window.open(pcQQUrl, '_blank', 'noopener,noreferrer');// 协议未生效时跳转网页版
      }
    } catch (e) {
      console.error('跳转异常:', e);
    }
  };

  return (
    <Container fluid className="text-center px-3" style={{ marginTop: '20px' }}>
  {/* 按钮行 - 移动端自动堆叠 */}
  <Row className="justify-content-center g-3">
    <Col xs={12} md={6} className="d-flex justify-content-center">
      <Button 
        variant="primary" 
        onClick={handleClick}
        aria-label={`访问QQ：${qqNumber}`}
        className="px-4 py-2"  // 增加按钮内边距
      >
        点击跳转我的QQ
      </Button>
    </Col>
  </Row>

  {/* 图片行 - 移动端自适应处理 */}
  <Row className="mt-3 justify-content-center">
    <Col xs={10} md={6} lg={4}>
      <Image 
        src="QQ.jpg" 
        alt="QQ二维码"
        fluid  // 关键响应式属性
        style={{ maxWidth: '300px', height: 'auto' }} // 限制最大宽度
        className="img-thumbnail"  // 增加边框效果
      />
    </Col>
  </Row>
</Container>
  );
};

// 使用示例
const ExampleUsage = () => (
  <QQProfileLink qqNumber="2134361910" />
);

export default QQProfileLink;