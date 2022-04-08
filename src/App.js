import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
  {
    'id': 1,
    'image': 'https://placeimg.com/64/64/1',
    'name': '박도준',
    'birthday': '981116',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/2',
    'name': '홍길동',
    'birthday': '981116',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/3',
    'name': '이하람',
    'birthday': '990425',
    'gender': '여자',
    'job': '취준생'
  }
]

// index.html에 있는 root에 App 컴포넌트가 그려지게 된다~
// 계층구조
class App extends Component {   // 컴포넌트란 웹 문서에서 어떠한 내용을 보여주기 위한 기본적인 단위
  render() {
    return (
      <div>
        {
          customers.map(c => {
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
          })
        }
      </div>
    );
  }
}

export default App;