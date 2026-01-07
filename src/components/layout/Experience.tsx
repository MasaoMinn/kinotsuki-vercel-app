import { Accordion } from "react-bootstrap"
import { useTheme, lightTheme, darkTheme } from "../boxed/ThemeProvider"
import { useTranslation } from 'react-i18next';
import Link from "next/link";
import type { AccordionProps } from "react-bootstrap";
type ExperienceProps = AccordionProps & {
  type: 'OI' | 'Developper' | 'Language';
}

const Experience: React.FC<ExperienceProps> = (props) => {
  const { theme, currentTheme } = useTheme();
  const { t } = useTranslation();
  const timeline = t(`mainpage.${props.type.toLowerCase()}.timeline`, { returnObjects: true }) as string[];
  const headerStyle = theme === 'light' ? { ...lightTheme[currentTheme] } : { ...darkTheme[currentTheme] };
  return (
    <Accordion {...props}>
      <Accordion.Item eventKey="0" style={theme == 'light' ? { ...lightTheme[currentTheme] } : { ...darkTheme[currentTheme] }}>
        <Accordion.Header style={headerStyle}>
          <span>{t(`mainpage.${props.type.toLowerCase()}.title`)}</span>
        </Accordion.Header>
        <Accordion.Body>
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="oi-timeline-item"
              style={{
                transition: 'background 0.2s, color 0.2s',
                borderRadius: '6px',
                padding: '6px 10px',
                cursor: 'pointer',
                marginBottom: '4px'
              }}
            >
              {item}
              {idx == 6 && props.type == 'OI' && <Link href='https://www.luogu.com.cn/problem/P1972' target="_blank">P1972 [SDOI2009]</Link>}
              {idx == 10 && props.type == 'OI' && <Link href='https://www.luogu.com.cn/problem/P1748' target="_blank">P1748</Link>}
              {idx == 12 && props.type == 'OI' && <Link href='https://www.luogu.com.cn/problem/P3810' target="_blank">P3810</Link>}
            </div>
          ))}
          <style jsx>{`
              .oi-timeline-item:hover {
                background: #e0f7fa;
                color: #00796b;
              }
            `}</style>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}



export default Experience;
