import React, { useState, useEffect } from 'react';
//게이트웨이 내 aws계정과 연결됨 수정해야함
import Planner from './Planner';
function ReadPost({onDate,setId, setToken}) {
  const [lambdaData, setLambdaData] = useState(null);
  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchLambdaData = async () => {
      try {
        
        const lambdaEndpoint = "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner";
        
        const response = await fetch(lambdaEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${setToken}`, // 토큰을 "Bearer" 스타일로 전달
          },
        }) 
        
        const jsonData = await response.json();
            
        // 받아온 JSON 데이터의 body 부분을 출력합니다.
        setLambdaData(jsonData.body);
        console.table(typeof jsonData);
        
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

  function setClickHandler(){
    return console.log(JSON.stringify(lambdaData, null, 2));
  }
  const dateList = data.map(item => item.DATE); // 날짜만 추출하여 리스트로 저장
 
  return (
    
    <div>
      <button onClick={setClickHandler}>모든 일정 조회</button>
      <h3>{onDate} 일정</h3>
      
      <ul>
        {data
          .filter(item => item.ID === setId) // 닉네임이 일치하는 항목만 필터링
          .filter(item => item.DATE === onDate) // 날짜가 일치하는 항목만 필터링
          .map((item, index) => (
          <li key={index}>
            index:{index} Title:{item.Title} Date: {item.DATE} EndDate:{item.EndDate} Memo:{item.Memo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadPost;
