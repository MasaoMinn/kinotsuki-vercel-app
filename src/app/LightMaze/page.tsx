"use client";
import { Container, Row, Col } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useState } from "react";

const LightMaze = () => {
  const [status, setStatus] = useState(0);
  const [size, setSize] = useState(10);
  const WIDTH: number = 1200;
  const Len: number = WIDTH / size / 2;

  class ADJ {
    adj: boolean[][] = [];
    constructor() {
      this.adj = Array.from({ length: size }, () =>
        new Array(size).fill(false)
      );
      const cnt: boolean[] = new Array(size).fill(false);
      cnt[0] = true;
      let u: number = 0;
      for (let index = 0; index < size - 1; index++) {
        let len: number = Math.floor(Math.random() * size);
        while (cnt[(u + len) % size]) len++;
        cnt[(u + len) % size] = true;
        this.adj[u][(u + len) % size] = true;
        this.adj[(u + len) % size][u] = true;
        u = (u + len) % size;
      }
      const degree: number[] = new Array(size).fill(0);
      for (let i = 0; i < size; i++) {
        degree[i] = Math.floor(Math.random() * (size / 30)) + size / 60 + 1;//size/10 ~ size/10+size/6
      }
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (this.adj[i][j]) degree[i]--;
        }
        while (degree[i]-- > 0) {
          let len = Math.floor(Math.random() * size), cnt = 0;
          while (this.adj[i][(i + len) % size] && cnt < size) { len++; cnt++; }
          this.adj[i][(i + len) % size] = true;
          this.adj[(i + len) % size][i] = true;
        }
      }
    }
  }
  const adj = new ADJ().adj;
  const AdjacencyGrid = () => {
    return (
      <>
        <Container fluid className="h-100 w-100" style={{ margin: '0 auto', fontSize: Len }}>
          <Row key="col-header" className="flex-nowrap" style={{ height: Len, flexShrink: 0 }}>
            <Col className="p-0 border" style={{ minWidth: Len, flexBasis: Len, aspectRatio: '1' }} />
            {adj[0]?.map((_, index) => (
              <Col key={`col-head-${index}`}
                className="p-0 border d-flex justify-content-center align-items-center fw-bold"
                style={{ minWidth: Len, flexBasis: Len, aspectRatio: '1', backgroundColor: '#f8f9fa' }}>
                {index + 1}
              </Col>
            ))}
          </Row>
          {adj.map((row, rowIndex) => (
            <Row key={rowIndex} className="flex-nowrap" style={{ height: Len, flexShrink: 0 }}>
              <Col className="p-0 border d-flex justify-content-center align-items-center fw-bold"
                style={{ minWidth: Len, flexBasis: Len, aspectRatio: '1', backgroundColor: '#f8f9fa' }}>
                {rowIndex + 1}
              </Col>

              {row.map((cell, cellIndex) => (
                <Col key={cellIndex} className="p-0 border position-relative"
                  style={{ backgroundColor: cell ? 'black' : 'white', minWidth: Len, flexBasis: Len, aspectRatio: '1' }}>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </>
    );
  };

  const [grid, setGrid] = useState(Array(size).fill(0));
  const [first, setFirst] = useState(true);
  type pair = [number, number];
  const solve = (pos: number) => {
    if (grid[pos]) return;
    const vis: boolean[] = Array(size).fill(false);
    const queue: pair[] = [];
    const newGrid = grid;
    queue.push([pos, 0]);
    while (queue.length) {
      const cur = queue.shift()!;
      if (vis[cur[0]]) continue;
      vis[cur[0]] = true;
      newGrid[cur[0]] = first ? 1 : 2;
      if (cur[1] >= 2) continue;
      for (let j = 0; j < size; j++) {
        if (adj[cur[0]][j] && !vis[j]) {
          queue.push([j, cur[1] + 1]);
        }
      }
    }
    setGrid(newGrid);
    setFirst(!first);
    setCnt1(grid.filter(x => x === 1).length);
    setCnt2(grid.filter(x => x === 2).length);
  }
  const [cnt1, setCnt1] = useState(0);
  const [cnt2, setCnt2] = useState(0);
  const GameGrid = () => {
    const cols = 10;
    const rows = Array.from({ length: size / cols }, (_, i) =>
      grid.slice(i * cols, (i + 1) * cols)
    );
    return (
      <Container fluid className="h-100 w-100"
        style={{ margin: '0 auto', fontSize: Len * 5, }}>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} className="flex-nowrap"
            style={{ height: Len * 5, flexShrink: 0 }}>
            {Array.from({ length: cols }, (_, cellIndex) => {
              const cellNumber = rowIndex * cols + cellIndex + 1;
              return (
                <Col key={cellIndex} className="p-0 border d-flex justify-content-center align-items-center position-relative"
                  style={{
                    backgroundColor: row[cellIndex] ?
                      (row[cellIndex] === 1 ? 'red' : 'blue') : 'white',
                    minWidth: Len * 5,
                    flexBasis: Len * 5,
                    aspectRatio: '1'
                  }}
                  onDoubleClick={() => { solve(rowIndex * cols + cellIndex) }}>
                  <span style={{
                    color: row[cellIndex] ? 'white' : 'black',
                    fontWeight: 'bold',
                    fontSize: Len * 1.5,
                    userSelect: 'none',
                  }}>
                    {cellNumber}
                  </span>
                </Col>
              );
            })}
          </Row>
        ))}
        <Row style={{ userSelect: 'none' }}>
          <Col><h5>双击来点灯，当前操作方为：{first ? "红方" : "蓝方"}</h5></Col>
        </Row>
        <Row style={{ userSelect: 'none' }}>
          {<Col><h2>Red {cnt1}:{cnt2} Blue</h2></Col>}
        </Row>
        <Row style={{ userSelect: 'none' }}>
          {cnt1 + cnt2 == size && <Col>
            {cnt1 > cnt2 && <h1 color="red">Red Wins</h1>}
            {cnt1 == cnt2 && <h1 color="green">Draw</h1>}
            {cnt1 < cnt2 && <h1 color="blue">Blue Wins</h1>}
          </Col>}
        </Row>
      </Container>
    );
  };

  return (
    <>
      <Container style={{ width: '100%' }} className="d-flex flex-column justify-content-center text-center align-items-center" fluid>

        <div style={{ backgroundColor: 'gray', width: '40%', color: 'red' }} className="">
          <Row style={{ userSelect: 'none' }}>
            <Col>
              <h2>点灯新世界</h2>
            </Col>
          </Row>
          <Row style={{ userSelect: 'none' }}>
            <Col>
              <p>随机生成彼此相关联的n盏灯，两个人观察记忆这n盏灯的联通矩阵。随后，两位选手在灯阵中依次点亮其中一盏灯，使与之一级关联的灯及二级关联的灯变成自己的颜色。红色为先手，蓝色为后手。当灯全部被点亮则游戏结束，点亮灯数更多者获胜</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {!status && <Button onClick={() => { setSize(30); setStatus(1) }}>n=30</Button>}
            </Col>
            <Col>
              {!status && <Button onClick={() => { setSize(60); setStatus(1) }}>n=60</Button>}
            </Col>
            <Col>
              {!status && <Button onClick={() => { setSize(120); setStatus(1) }}>n=120</Button>}
            </Col>
            <Col>
              {!status && <Button onClick={() => { setSize(180); setStatus(1) }}>n=180(原版)</Button>}
            </Col>
          </Row>
        </div>
        <Row className="mt-4 w-80 justify-content-center">
          {status == 1 && <AdjacencyGrid />}
          {status == 1 && <Col className="w-50"><Button onClick={() => { setStatus(2) }} variant="success">Start</Button></Col>}
          {status >= 2 && <GameGrid />}
        </Row>
        <Row>
          {status > 0 && <Col className="w-50"><Button href="./LightMaze" variant="warning">restart</Button></Col>}
        </Row>
        <Row>
          <Col className="w-50"><Button href="./" variant="danger">return to main</Button></Col>
        </Row>
      </Container>
    </>
  )
}

export default LightMaze;