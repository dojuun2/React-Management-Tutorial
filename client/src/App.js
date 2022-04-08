import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import { Paper } from '@mui/material';
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { withStyles } from '@mui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: "auto"   // x축으로 오버플로가 발생할 수 있도록 처리하겠다..
  },
  table: {
    minWidth: 1080    // 화면이 줄어도 테이블이 무조건 1080이라서 스크롤바 생김
  },
  progress: {
  }
})

// index.html에 있는 root에 App 컴포넌트가 그려지게 된다~
// 계층구조
class App extends Component {   // 컴포넌트란 웹 문서에서 어떠한 내용을 보여주기 위한 기본적인 단위

  // 변경될 수 있는 변수
  state = {
    customers: "",
    completed: 0
  }

  // api 서버에 접근해서 데이터를 받아오는 작업 => 비동기적으로
  componentDidMount() {
    this.timer = setInterval(this.progress, 100);    // 0.02초마다
    // this.callApi()
    //   .then(res => this.setState({ customers: res }))
    //   .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers')
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          {/* 테이블의 속성 */}
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          {/* 테이블의 내용 */}
          <TableBody>
            { // this.state.customers ? 참일 때 출력 : 거짓일 때 출력
              this.state.customers ? this.state.customers.map(c => {
                return (
                  <Customer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                )
              }) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);