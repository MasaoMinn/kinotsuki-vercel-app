"use client";
import Header from "@/components/layout/Header";
import { Button, Col, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useTheme ,lightTheme ,darkTheme } from "@/components/boxed/ThemeProvider";
import Rimage from "react-bootstrap/Image";
import OI from "@/components/layout/OI";
const Main =() => {
  const { theme } = useTheme();
  return (
    <Container className="h-100 w-100 d-flex flex-column justify-content-center text-center align-items-center" style={theme==='light'? {...lightTheme,}:{...darkTheme}} fluid>
      <Row className="w-100 mb-3"><Col><Header /></Col></Row>
      <Row className="w-80 mb-3 g-0" style={{borderColor:"lightblue",borderWidth:"1px",borderStyle:"solid",borderRadius:"10px"}}>
        <Col className="" style={{width:"16vw"}}>
          <Rimage src="/head.jpg" alt="头像加载失败" width={"100%"}/>
        </Col>
        <Col className="" style={{}}>
          <div className="" style={theme=="light"?{backgroundColor:"#F4FFC8",color:"#00211F"}:{backgroundColor:"#161712",color:"#D5FFFA"}}>
            <h3>I`m <b>Masao Minn</b></h3>
            <p></p>
            <p>by now a college sophomore from SCUT,major in software engineering.</p>
            <p>I fell in love with C++ programming in high school,that`s why I chose this major</p>
            <p>I`m stydying React.js(Next.js) full-stack framework,This page is my first React product</p>
            <p>I`m stydying English for TOFEL and Japanese for JLPT N2.I wacth Family Guy and Big Bang to improve my English accumulation</p>
            <p>I`m planing to take further education in Tojyo,Japan,where I too a trip and it was amazing</p>
            <p>In my free time,I write minigames or useful tools on WEB.I enjoy the sense of acheivement after completing a small project</p>
            <p>I like Pokemons.The monster on the left is a abstract kemono-styled blue fox which I regard as a virtual figure of mine</p>
            <p>my motto :<b>relax but not lying flat</b></p>
          </div>
        </Col>
      </Row>
      <Row className="w-60" style={{marginBottom:"1vw"}}>
        <OI />
      </Row>
      <Row className="" style={{width:"50%"}}>
        <Col style={{borderColor:"blue",borderWidth:"1px",borderStyle:"solid",borderRadius:"10px",marginRight:"10vw"}}>
          <Stack gap={0}>
            <div className="p-1"><h4><b>小游戏</b></h4></div>
            <div className="hr" />
            <div className="p-1"><Button href="/BWIte/index.html" variant={theme} className="w-100">最强大脑-黑白迭代</Button></div>
            <div className="p-1"><Button href="/Color/index.html" variant={theme} className="w-100">我色感超6</Button></div>
            <div className="p-1"><Button href="/LightMaze" variant={theme} className="w-100">最强大脑-点灯新世界</Button></div>
          </Stack>
        </Col>
        <Col style={{borderColor:"blue",borderWidth:"1px",borderStyle:"solid",borderRadius:"10px"}}>
          <Stack gap={1}>
            <div className="p-2"><h4><b>实用工具</b></h4></div>
            <div className="hr" />
            <div className="p-2"><Button href="/" variant={theme} className="w-100">敬请期待</Button></div>
            <div className="p-2"><Button href="/Furry" variant={theme} className="w-100">Furry扩列条</Button></div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
export default Main;
