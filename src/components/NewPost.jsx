import classes from './NewPost.module.css';
import { useState } from 'react';

import AWS from 'aws-sdk';

function NewPost({onCancel,onDate}) {
  const [responseMessage, setResponseMessage] = useState('');
  const [enteredMemo, setEnteredMemo] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");
  const [enteredId, setEnteredId] = useState("");
  
  
  var id;
  var title;
  var endDate;
  var memo;


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
      id:enteredId,
      title:enteredTitle,
      date: {onDate},
      endDate:enteredEndDate,
      memo: enteredMemo
    };
    console.log(postData);
    handlePutRequest();
    onCancel();
  }

  const handlePutRequest = async () => {
    try {
      const response = await fetch('https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
        id:enteredId,
        title:enteredTitle,
        date: {onDate},
        endDate:enteredEndDate,
        memo: enteredMemo
        }),
      });

      const responseData = await response.json();
      console.log('POST response:', responseData);
      setResponseMessage(responseData.message);
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
    
  
    
    console.log({onDate});
    
  };

  
  return (
      
    <form className={classes.form} onSubmit={submitHandler}>
    <p>
      <label htmlFor="input">Input</label>
   </p>
   <p>
      <label htmlFor="id">ID</label>
      <input type="text" id="id" required onChange={idChangeHandler}/>
    </p>
    <p>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" required onChange={titleChangeHandler}/>
    </p>
    <p>
      <label htmlFor="date">Date</label>
      <input type="text" id="date" required />
    </p>
    <p>
      <label htmlFor="enddate">End Date</label>
      <input type="text" id="enddate" required onChange={endDateChangeHandler}/>
    </p>
    <label htmlFor="memo">memo</label>
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

export default NewPost;