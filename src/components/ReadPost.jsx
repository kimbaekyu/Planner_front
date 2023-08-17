import React, { useState, useEffect } from 'react';

function ReadPost() {
  const [lambdaData, setLambdaData] = useState(null);

  useEffect(() => {
    const fetchLambdaData = async () => {
      try {
        const response = await fetch('https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner',
        {
          method: 'GET', // 필요한 HTTP 메서드 사용
          headers: {
            // Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 전달 에러발생
          },
        });
        const data = await response.json();
        console.log('Lambda response:', data);
        // 받아온 JSON 데이터의 body 부분을 출력합니다.
        setLambdaData(data.body);
      } catch (error) {
        console.error('Error fetching Lambda data:', error);
      }
    };

    fetchLambdaData();
  }, []);

  function setClickHandler(){
    return console.log(JSON.stringify(lambdaData, null, 2));
  }
  return (
    
    <div>
      <button onClick={setClickHandler}>클릭</button>
      <h1>Lambda 함수로부터 반환된 데이터</h1>
      {lambdaData && (
        <>
        {/* <pre>{JSON.stringify(lambdaData, null, 2)}</pre> */}
        {/* body 데이터 출력 */}
        {/* <pre>{lambdaData}</pre> */}
        </>
      )}
      
    </div>
  );
}

export default ReadPost;
