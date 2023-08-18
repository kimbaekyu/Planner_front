import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import moment from "moment";

import MainHeader from './MainHeader'
import NewPost from './NewPost';
import Modal from './Modal';

import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import './CustumCalendar.css';
import ReadPost from './ReadPost';


function Planner({onResponse}) {
  const [lambdaData, setLambdaData] = useState(null);
  const [value, onChange] = useState(new Date());
  const [inputmodalIsVisible, setInputModalIsVisible] = useState(false);
  const [updatemodalIsVisible, setUpdateModalIsVisible] = useState(false);
  const [deletemodalIsVisible, setDeleteModalIsVisible] = useState(false);
  const [data, setData] = useState([]);
  
  function showinputModalHandler(){
    setInputModalIsVisible(true);
  }

  function hideinputModalHandler(){
    setInputModalIsVisible(false);
  }

  function showupdateModalHandler(){
    setUpdateModalIsVisible(true);
  }

  function hideupdateModalHandler(){
    setUpdateModalIsVisible(false);
  }

  function showdeleteModalHandler(){
    setDeleteModalIsVisible(true);
  }

  function hidedeleteModalHandler(){
    setDeleteModalIsVisible(false);
  }
  
  
  useEffect(() => {
    const fetchLambdaData = async () => {
      try {
        const token = "eyJraWQiOiJNOHhQNjlxVFJIZFBVZ3hmYnJYcU43YW5HSFMxYjNBWlBjYlp5dDNHbVV3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1N2I0MjhiNS05YWM3LTQ0MDctYTc4Mi0yY2FiNTQ4ZjQ0ZjUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTJfbnJpU0lYbHVIIiwiY2xpZW50X2lkIjoiMjMyYzkza2diNWtxNTA5cXU0NXY4NWEyM20iLCJvcmlnaW5fanRpIjoiMTExNTM3NjctZTRhYy00MmZhLWEwN2EtODU5ZWMwY2ExYjM0IiwiZXZlbnRfaWQiOiI1MmE4NTM0OC1hMDU3LTQ3YmYtOGZkMC0yZjk1YmZhYzFhYTkiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjkyMjQ5Njk2LCJleHAiOjE2OTIyNTMyOTYsImlhdCI6MTY5MjI0OTY5NiwianRpIjoiZTIwZTRmODQtYzhiMy00OTU4LTlhZmEtMTIyY2U4OWI0YTQxIiwidXNlcm5hbWUiOiJhbHN3bnMifQ.HkN5RcqJbZDVPqGAz1-chwLqI69_WspB-GzdjWq9zcxF8j5AgI-JFZcAByoNzTmuM1_4_5aslfV46vSbdQsnNSWSnOraCTORNoB7XcJQeSsr42j8yRE0-1RFvu6CK8oE2W6XRbeKhKyvqPzb4oK4RVmsAFvdN0S5Y8_000UN0G17GyEyujYuLg2B5yqlqSMo3UyNTwCIvTyHb4DVM6mt4cJG-PVxcCvl0hBOpefoGXH31wFw1dWbFUj_B_5H_9FDZArqi9Hu8BJCz0pfMz7_Sy8YaCiX6trYBKXQwP0z9BUahF7BvQAAWp66MYJXYxGxnv0K9bxHdiFhBNdJkMV_jw";
        const lambdaEndpoint = "https://zie1snhqwd.execute-api.ap-northeast-2.amazonaws.com/test";
        const response = await fetch(lambdaEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // 토큰을 "Bearer" 스타일로 전달
          },
        }) 
        // const response = await fetch('https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner',
        // {
        //   method: 'GET', // 필요한 HTTP 메서드 사용
        // });
        // const jsonData = await response.json();
        // // console.log('Lambda response:', data);
       
        
        
        const jsonData = await response.json();
        // 받아온 JSON 데이터의 body 부분을 출력합니다.
        setLambdaData(jsonData.body);
        if (Array.isArray(jsonData.body)) {
          setData(jsonData.body);
        } else {
          console.error('Fetched data is not an array:', jsonData);
        }
      } catch (error) {
        console.error('Error fetching Lambda data:', error);
      }
    };

    fetchLambdaData();
  }, []);
  const marks = [];
  const dateList = data.map(item => item.date); // 날짜만 추출하여 리스트로 저장
  const date = moment(value).format("YYYY-MM-DD") ;
  
  return (
    <>
    
    <MainHeader onInputPost={showinputModalHandler} onUpdatePost={showupdateModalHandler} onDeletePost={showdeleteModalHandler}></MainHeader>
    
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정      
      
        tileContent={({ date, view }) => {

          let html = [];
          if (dateList.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<div className="dot"></div>);
            
          }
          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  {html}
                </div>
              </>
          );
        }}
        
      /> 
    </div>
    
    {/* 일정 확인 창 */}
    <div className="text-gray-500 mt-4">
    
    
    

   
    
   
    {
    inputmodalIsVisible ===true ? 
    <Modal onClose={hideinputModalHandler}>    
      <NewPost onCancel={hideinputModalHandler} onDate={date}></NewPost>
    </Modal>
    :null
    }

    {
    updatemodalIsVisible ===true ? 
    <Modal onClose={hideupdateModalHandler}>    
      <UpdatePost onCancel={hideupdateModalHandler} onDate={date}></UpdatePost>
    </Modal>
    :null
    }

    {
    deletemodalIsVisible ===true ? 
    <Modal onClose={hidedeleteModalHandler}>    
       <DeletePost onCancel={hidedeleteModalHandler} onDate={date}></DeletePost>
    </Modal>
    :null
    }
     
   
    
    <ReadPost onResponse={onResponse} onDate={date}></ReadPost>
    {/* {moment(value).format("YYYY년 MM월 DD일")}  */}
    
    </div>
    
  </>
  );
}

export default Planner;
