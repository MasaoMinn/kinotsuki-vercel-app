"use client";
// import Picture from "@/components/boxed/Picture"
import { useTheme } from "@/components/boxed/ThemeProvider"
import Image from "react-bootstrap/Image"
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import Link from "next/link";
const About = () => {
    const { theme } = useTheme();
    return (
        <Container className="justify-content-center align-items-center text-center" fluid>
        <Row>
        <Stack direction="horizontal" className="justify-content-center align-items-center" gap={3}>
        <div className="p-2"><Image src={`/logo_${theme}.svg`} alt="wordmark" height={100} width={100}/></div>
        <div className="vr" />
        <div className="p-2"><Image src={`/next.svg`} alt="next" height={100} width={100}/></div>
        </Stack>
        </Row>
        <Row><div style={{backgroundColor:"#DBFFD1",color:"#633D3D"}}>
            <Col>
            <h3>Developper: <Link href={"https://github.com/MasaoMinn"}>MasaoMinn</Link></h3>
            <h3>This project is developped using Next.js and React.js</h3>
            <h3>The dependencies this project used are following:</h3>
            <Image src={`/dep.png`} alt="picture error" height={500} width={500}/>
            </Col></div>
        </Row>
        <Row>
            <Col>
            <Button variant="danger" href="./">BACK</Button>
            </Col>
        </Row>

        </Container>
    )
}
export default About;