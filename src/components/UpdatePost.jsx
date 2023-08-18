import classes from './UpdatePost.module.css';
import { useState } from 'react';



function UpdatePost({onCancel,onDate}) {
  const [enteredId, setEnteredId] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredMemo, setEnteredMemo] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");
  const [responseMessage, setResponseMessage] = useState('');
  
  var ID;
  var Title;
  var EndDate;
  var Memo;
  function dateChangeHandler(event) {
    setEnteredDate(event.target.value);
  }

  function memoChangeHandler(event) {
    setEnteredMemo(event.target.value);
  }

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }

  function endDateChangeHandler(event) {
    setEnteredEndDate(event.target.value);
  }

  function idChangeHandler(event) {
    setEnteredId(event.target.value);
  }
  function submitHandler(event){
    event.preventDefault();
    const postData = {
      ID:enteredId,
      Title:enteredTitle,
      DATE: onDate,
      EndDate:enteredEndDate,
      Memo: enteredMemo
    };

    console.log(postData);
    handleUpdateRequest();
    onCancel();
    
  }

  const handleUpdateRequest = async () => {
    try {
      const token = "eyJraWQiOiJNOHhQNjlxVFJIZFBVZ3hmYnJYcU43YW5HSFMxYjNBWlBjYlp5dDNHbVV3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1N2I0MjhiNS05YWM3LTQ0MDctYTc4Mi0yY2FiNTQ4ZjQ0ZjUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTJfbnJpU0lYbHVIIiwiY2xpZW50X2lkIjoiMjMyYzkza2diNWtxNTA5cXU0NXY4NWEyM20iLCJvcmlnaW5fanRpIjoiMTExNTM3NjctZTRhYy00MmZhLWEwN2EtODU5ZWMwY2ExYjM0IiwiZXZlbnRfaWQiOiI1MmE4NTM0OC1hMDU3LTQ3YmYtOGZkMC0yZjk1YmZhYzFhYTkiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjkyMjQ5Njk2LCJleHAiOjE2OTIyNTMyOTYsImlhdCI6MTY5MjI0OTY5NiwianRpIjoiZTIwZTRmODQtYzhiMy00OTU4LTlhZmEtMTIyY2U4OWI0YTQxIiwidXNlcm5hbWUiOiJhbHN3bnMifQ.HkN5RcqJbZDVPqGAz1-chwLqI69_WspB-GzdjWq9zcxF8j5AgI-JFZcAByoNzTmuM1_4_5aslfV46vSbdQsnNSWSnOraCTORNoB7XcJQeSsr42j8yRE0-1RFvu6CK8oE2W6XRbeKhKyvqPzb4oK4RVmsAFvdN0S5Y8_000UN0G17GyEyujYuLg2B5yqlqSMo3UyNTwCIvTyHb4DVM6mt4cJG-PVxcCvl0hBOpefoGXH31wFw1dWbFUj_B_5H_9FDZArqi9Hu8BJCz0pfMz7_Sy8YaCiX6trYBKXQwP0z9BUahF7BvQAAWp66MYJXYxGxnv0K9bxHdiFhBNdJkMV_jw";
      const payload = {
      "ID": "alswns",
      "Index": 1
      };
    const lambdaEndpoint = "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner";
    const response = await fetch(lambdaEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // 토큰을 "Bearer" 스타일로 전달
    },
    body: JSON.stringify({ 
      ID:enteredId,
      Title:enteredTitle,
      DATE: onDate,
      EndDate:enteredEndDate,
      Memo: enteredMemo
      }),
    });
      
      const responseData = await response.json();
      console.log('PUT response:', responseData);
      setResponseMessage(responseData.message);
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
    
  };

  
  return (
      
      <form className={classes.form} onSubmit={submitHandler}>
    
      <p>
        <label htmlFor="title">UPDATE</label>
     </p>
      <p>
      <label htmlFor="id">id</label>
      <input type="text" id="id" required onChange={idChangeHandler}/>
      </p>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required onChange={titleChangeHandler}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <label>{onDate}</label>
      </p>
      <p>
        <label htmlFor="enddate">End Date</label>
        <input type="text" id="enddate" required onChange={endDateChangeHandler}/>
      </p>
      <label htmlFor="memo">Memo</label>
        <textarea  id="memo" required rows={3}  onChange={memoChangeHandler}/>
      <p>
        
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" >Submit</button>
      </p>
      </form>
      
    
    
    
    
  );
}

export default UpdatePost;