"use client";
// import Picture from "@/components/boxed/Picture"
import { useTheme } from "@/components/boxed/ThemeProvider"
import Image from "next/image"
import { Container, Row,Col } from "react-bootstrap";
import NextWordmark from "../../../public/Next_logo";
const About = () => {
    const { theme } = useTheme();
    return (
        <Container fluid style={{height :"100vh"}}>
            <Row>
                <Col><Image src={`/logo_${theme}.svg`} alt="wordmark" width={100} height={100}/></Col>
                <Col><NextWordmark /></Col>
            </Row>
            
            <p>hello world</p>
        </Container>
    )
}
export default About;