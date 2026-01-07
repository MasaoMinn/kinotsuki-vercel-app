"use client";
// import Picture from "@/components/boxed/Picture"
import { useTheme, lightTheme, darkTheme } from "@/components/boxed/ThemeProvider"
import Image from "react-bootstrap/Image"
import { Button, Col, Container, Row } from "react-bootstrap";
import { RotateDiv, DefaultDiv, BoldDiv, BababoiDiv } from "@/components/boxed/MotionComponents";
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import GradientText from "@/components/GradientText";

const About = () => {
  const { theme, currentTheme } = useTheme();
  const { i18n } = useTranslation();
  const [logoSize, setLogoSize] = useState<number>(100); // 使用useState管理logoSize

  // 将依赖库分成framework和dependencies两类
  const frameworks = [
    {
      src: `/deps/logo_${theme}.svg`,
      alt: "wordmark",
      name: "React",
      desc: "A JavaScript library for building user interfaces.",
      component: RotateDiv,
      onClick: () => {
        if (i18n.language === 'zh') window.open('https://zh-hans.react.dev/', '_blank');
        else if (i18n.language === 'jp') window.open('https://ja.react.dev/', '_blank');
        else window.open('https://react.dev/', '_blank');
      }
    },
    {
      src: `/deps/next.svg`,
      alt: "next",
      name: "Next.js",
      desc: "A React framework for building server-rendered applications.",
      component: DefaultDiv,
      onClick: () => {
        if (i18n.language === 'zh') window.open('https://nextjscn.org/', '_blank');
        else if (i18n.language === 'jp') window.open('https://nextjsjp.org/', '_blank');
        else window.open('https://nextjs.org/', '_blank');
      }
    },
    {
      src: `/deps/ts-logo.svg`,
      alt: "typescript",
      name: "TypeScript",
      desc: "A typed superset of JavaScript that compiles to plain JavaScript.",
      component: BababoiDiv,
      onClick: () => {
        window.open('https://www.typescriptlang.org/', '_blank');
      }
    },
    {
      src: `/deps/nodejsStacked${theme === 'light' ? 'Dark' : 'Light'}.svg`,
      alt: "nodejs",
      name: "Node.js",
      desc: "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
      component: DefaultDiv,
      onClick: () => {
        if (i18n.language === 'zh') window.open('https://nodejs.cn/', '_blank');
        else window.open('https://nodejs.org/', '_blank');
      }
    }
  ];

  const dependencies = [
    {
      src: `/deps/react-bootstrap-logo.svg`,
      alt: "react-bootstrap",
      name: "React-Bootstrap",
      desc: "A popular React library for building responsive and mobile-first websites.",
      component: DefaultDiv,
      onClick: () => {
        window.open('https://react-bootstrap.github.io/', '_blank');
      }
    },
    {
      src: `/deps/tailwindcss-mark.svg`,
      alt: "tailwindcss",
      name: "Tailwind CSS",
      desc: "A utility-first CSS framework for rapidly building custom user interfaces.",
      component: DefaultDiv,
      onClick: () => {
        if (i18n.language === 'zh') window.open('https://www.tailwindcss.cn/', '_blank');
        else if (i18n.language === 'jp') window.open('https://tailwindcss.jp/', '_blank');
        else window.open('https://tailwindcss.com/', '_blank');
      }
    },
    {
      src: `/deps/motion-react.png`,
      alt: "morion",
      name: "motion",
      desc: "A library for animating React components.",
      component: BababoiDiv,
      onClick: () => {
        window.open('https://www.motion.dev/', '_blank');
      }
    },
    {
      src: `/deps/i18n.svg`,
      alt: "i18next",
      name: "i18next",
      desc: "A popular internationalization library for React.",
      component: DefaultDiv,
      onClick: () => {
        window.open('https://www.i18next.com/', '_blank');
      }
    },
    {
      src: `/deps/reactbits-gh-${theme === 'light' ? 'black' : 'white'}.svg`,
      alt: "react-bits",
      name: "React-Bits",
      desc: "A collection of React components and hooks.",
      component: DefaultDiv,
      onClick: () => {
        window.open('https://www.reactbits.dev/', '_blank');
      }
    }, {
      src: `/deps/zustand-original.svg`,
      alt: "zustand",
      name: "Zustand",
      desc: "A small, fast, and scalable state management library for React.",
      component: BababoiDiv,
      onClick: () => {
        if (i18n.language === 'zh') window.open('https://zustand.nodejs.cn/', '_blank');
        else window.open('https://zustand.docs.pmnd.rs/getting-started/introduction', '_blank');
      }
    }, {
      src: `deps/turbopack-hero-logo-dark.svg`,
      alt: "turbopack",
      name: "Turbopabk",
      desc: "A high-performance build system for JavaScript and TypeScript.",
      component: BababoiDiv,
      onClick: () => {
        if (i18n.language === 'zh') window.open('https://turbo.net.cn/', '_blank');
        else window.open('https://turbo.build/', '_blank');
      }
    }, {
      src: `/deps/lucide_logo_${theme}.svg`,
      alt: "lucide-react",
      name: "Lucide-React",
      desc: "A collection of React components for Lucide icons.",
      component: RotateDiv,
      onClick: () => {
        window.open('https://lucide.dev/', '_blank');
      }
    }
  ];

  return (
    <Container className="text-center min-vh-100" fluid style={{
      ...(theme === 'light' ? lightTheme[(currentTheme + 1) % lightTheme.length] : darkTheme[(currentTheme + 1) % darkTheme.length]),
      position: 'relative' // 设置相对定位，以便滑动条绝对定位
    }}>
      <Container className="mt-10 mb-16">
        <Row><h2>Frameworks</h2></Row>
        <Row className="justify-content-center">
          <div className="d-flex flex-wrap justify-content-center gap-16">
            {frameworks.map((logo, index) => {
              const LogoComponent = logo.component;
              return (
                <div key={index} className="d-flex flex-column align-items-center mb-5" onClick={logo.onClick}>
                  <LogoComponent>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      height={logoSize}
                      width={logoSize}
                      style={{ cursor: 'pointer', margin: '1vw' }}
                    />
                  </LogoComponent>
                  <div style={{ maxWidth: '12vw' }}>
                    <GradientText
                      className="mt-2"
                      animationSpeed={8}
                      colors={theme === 'dark' ? ['#FF6B6B', '#4ECDC4', '#FFD166'] : ['#8338EC', '#3A86FF', '#FF006E']}
                    >{logo.name}</GradientText>
                    <BoldDiv>
                      {logo.desc}
                    </BoldDiv>
                  </div>
                </div>
              );
            })}
          </div>
        </Row>
      </Container>
      <Container className="mt-10 mb-16">
        <Row><h2>Dependices</h2></Row>
        <Row className="justify-content-center">
          <div className="d-flex flex-wrap justify-content-center gap-16">
            {dependencies.map((logo, index) => {
              const LogoComponent = logo.component;
              return (
                <div key={index} className="d-flex flex-column align-items-center mb-5" onClick={logo.onClick}>
                  <LogoComponent>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      height={logoSize}
                      width={logoSize}
                      style={{ cursor: 'pointer', margin: '1vw' }}
                    />
                  </LogoComponent>
                  <div style={{ maxWidth: '12vw' }}>
                    <GradientText
                      className="mt-2"
                      animationSpeed={8}
                      colors={theme === 'dark' ? ['#FF6B6B', '#4ECDC4', '#FFD166'] : ['#8338EC', '#3A86FF', '#FF006E']}
                    >{logo.name}</GradientText>
                    <BoldDiv>
                      {logo.desc}
                    </BoldDiv>
                  </div>
                </div>
              );
            })}
          </div>
        </Row>
      </Container>

      {/* 滑动条控制 - 垂直放在页面右侧 */}
      <div style={{
        position: 'absolute',
        right: '1vw',
        top: '10vw',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100
      }}>
        {/* <Form.Label style={{
          color: theme === 'light' ? '#333' : '#fff',
          marginBottom: '10px',
          whiteSpace: 'nowrap'
        }}>
          {logoSize}px
        </Form.Label> */}
        <input
          type="range"
          min="60"
          max="160"
          step="1"
          value={logoSize}
          onChange={(e) => setLogoSize(parseInt(e.target.value))}
          style={{
            accentColor: theme === 'light' ? '#333' : '#fff',
            transform: 'rotate(90deg)', // 旋转90度使滑动条垂直
            width: '30vh', // 垂直方向的长度
            height: '10vw'
          }}
        />
      </div>
      <Container className="">
        <Row><h2>Developper</h2></Row>
        <Row className="justify-content-center">
          <div className="d-flex flex-column align-items-center" onClick={() => window.open('https://github.com/MasaoMinn', '_blank')}>
            <BababoiDiv>
              <Image
                src="/head.svg"
                alt="MasaoMinn"
                height={logoSize * 5}
                width={logoSize * 5}
                style={{ cursor: 'pointer' }}
              />
            </BababoiDiv>
            <GradientText
              className=""
              animationSpeed={8}
              colors={theme === 'dark' ? ['#FF6B6B', '#4ECDC4', '#FFD166'] : ['#8338EC', '#3A86FF', '#FF006E']}
            >MasaoMinn</GradientText>
            <BoldDiv>
              A student in South China University of Technology
            </BoldDiv>
          </div>
        </Row>
      </Container>
      <Row>
        <Col>
          <Button variant="danger" href="./">BACK</Button>
        </Col>
      </Row>

    </Container>
  )
}
export default About;