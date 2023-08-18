import classes from './NewPost.module.css';
import { useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom'; // useLocation 추가
import AWS from 'aws-sdk';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
} from "mdb-react-ui-kit";
import { Button, Container, Row, Col } from 'react-bootstrap';

function Logout({setId,setToken}) {
    const [responseMessage, setResponseMessage] = useState('');
    const location = useLocation(); // useLocation 훅 사용
    
    const navigate = useNavigate(); //라우팅 전환 객체

    function setLogoutHandler(event){
        event.preventDefault();
        handlePostRequest();
    }
 
    function setWithdrawalHandler(event){
        event.preventDefault();
        handleDeleteRequest();
    }
    // console.log("setToken",setToken);
    // console.log("setId",setId);

  const handlePostRequest = async (event) => {
      
      try {
        const token = setToken
        const payload = {
        "ID": setId,
        "Index": 1
        };
        const lambdaEndpoint = "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner/user";
        const response = await fetch(lambdaEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // 토큰을 "Bearer" 스타일로 전달
            },
        });

      if (response.ok) {
        // 로그아웃 성공 후 다른 페이지로 이동 값 전달
        console.log(response);
        navigate('/');
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    //   console.log(token);
      const responseData = await response.json();
      console.log('POST response:', responseData);
      setResponseMessage(responseData.message);
    } catch (error) {
      console.error('Error making Logout Post request:', error);
    }
    
    
    
   
    
  };

  const handleDeleteRequest = async (event) => {
      
    try {
      const token = setToken
      const lambdaEndpoint = "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner/user";
      const response = await fetch(lambdaEndpoint, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` // 토큰을 "Bearer" 스타일로 전달
          },
      });

    if (response.ok) {
      // 회원탈퇴 성공 후 다른 페이지로 이동 값 전달
      console.log(response);
      navigate('/');
    } else {
      console.error("API Error:", response.status, response.statusText);
    }
  //   console.log(token);
    const responseData = await response.json();
    console.log('DELETE response:', responseData);
    setResponseMessage(responseData.message);
  } catch (error) {
    console.error('Error making Logout DELETE request:', error);
  }
  
  
  
 
  
};
  
  return (
    
        <div>
            <Container>
            <Row>
                <Col md={230} className="d-flex justify-content-end">
                    <button class="btn btn-primary" onClick={setLogoutHandler} role="button">로그아웃</button>
                    <Button variant="danger" onClick={setWithdrawalHandler}>회원탈퇴</Button>
                </Col>
            </Row>
            </Container>
        </div>   
    

         
        
   
    
    
    
    
  );
}

export default Logout;