import classes from './UpdatePost.module.css';
import { useState } from 'react';



function UpdatePost({onCancel,onDate}) {
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredMemo, setEnteredMemo] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");
  const [responseMessage, setResponseMessage] = useState('');
  
  var title;
  var endDate;
  var memo;
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

  function submitHandler(event){
    event.preventDefault();
    const postData = {
      title:enteredTitle,
      date: enteredDate,
      endDate:enteredEndDate,
      memo: enteredMemo
    };

    title = postData.title;
    endDate = postData.endDate;
    memo = postData.memo;
    console.log(postData);
    console.log({onDate});
    handleUpdateRequest();
    onCancel();
    
  }

  const handleUpdateRequest = async () => {
    try {
      const response = await fetch('YOUR_API_GATEWAY_URL', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title:enteredTitle,
          date: enteredDate,
          endDate:enteredEndDate,
          memo: enteredMemo, 
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
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required onChange={titleChangeHandler}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input type="text" id="date" required onChange={dateChangeHandler}/>
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

export default UpdatePost;