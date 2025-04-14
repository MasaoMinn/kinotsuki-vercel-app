import { Accordion } from "react-bootstrap"
import { useTheme ,lightTheme,darkTheme } from "../boxed/ThemeProvider"

export default () => {
  const { theme } = useTheme();
    return (
      <div>
        <Accordion>
        <Accordion.Item eventKey="0" style={theme == 'light' ? {...lightTheme} : {...darkTheme}}>
          <Accordion.Header>我的OI-ACM生涯</Accordion.Header>
          <Accordion.Body>
            {main()}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </div>
    )
}
function main() {
    return (
        <>
        <p>2020/9  开始接触信息学奥赛</p>
        <p>2021/5  安顺市信息学强基竞赛全市第二名</p>
        <p>2021/8/21  开始使用洛谷</p>
        <p>2021/11/20  NOIP2021省级二等奖</p>
        <p>2022/2/7 通过<strong>100</strong>道题 ！</p>
        <p>2022/5  安顺市信息学强基竞赛全市第一名</p>
        <p>2022/6/1 通过第一道蓝色题！ <a href="https://www.luogu.com.cn/problem/P1972">P1972 [SDOI2009] HH的项链</a></p>
        <p>2022/8/2 通过<strong>200</strong>道题！</p>
        <p>2022/11  高中OI生涯以NOIP2022 <strong>WA0</strong>遗憾告终（多组数据但数组没初始化）</p>
        <hr />
        <p>2023/7    考入<strong>华南理工大学</strong>，准备尝试ACM竞赛</p>
        <p>2023/10/11 通过<strong>300</strong>道题！<a href="https://www.luogu.com.cn/problem/P1748">第300道题</a></p>
        <p>2024/4/6 参加广东工业大学ACM校赛，但只过了一题</p>
        <p>2024/4/7 通过第一道紫色题！
        <a href="https://www.luogu.com.cn/problem/P3810">P3810 【模板】三维偏序（陌上花开）</a></p>
        <p>2024/4/13 蓝桥杯广东<strong>省一等奖</strong></p>
        <p>2024/4/14 组队参加学校校赛，只过了两题，被大佬吊着打，排名 <em>31/50</em> </p>
        <p>2024/4/15~5/31 开摆</p>
        <p>2024/6/2 蓝桥杯<strong>国赛优秀奖</strong></p>
        <p>2024/6/4 解锁<strong>Java</strong>语言</p>
        <p>2024/6/4 通过<strong>400</strong>道题！</p>
        <p>2024/6/5~8/5 再次开摆</p>
        <p>2024/9/8 CCPC网络赛，过了 <em>3</em> 题，小组排名学校末位</p>
        <p>2024/9/21 ICPC网络预选赛，过了 <em>5</em> 题，排名仍旧不理想</p>
        <p>2024/11/3 ,11/10 参加学校新生赛，状态勉勉强强</p>
        <p>2024/12 入坑<strong>JavaScript开发</strong>，开发了自己的小网站（目前仍在开发！
        url:<a href="https://masaominn.github.io/">https://masaominn.github.io/</a> ）</p>
        <p>2025/1/11~1/18 寒假集训</p>
        <p>2025/3 学习<strong>React前端</strong>，试水项目：<a href="https://github.com/MasaoMinn/ReactWeb--CodeforcesChecker">ReactWeb--CodeforcesChecker</a></p>
        <p>2025/3/20 要好好冲刺acm竞赛了</p>
        <hr />
        </>
    )
}
