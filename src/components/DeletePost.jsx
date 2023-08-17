import classes from './DeletePost.module.css';
import { useState } from 'react';


function DeletePost({onCancel,onDate}) {
  const [responseMessage, setResponseMessage] = useState('');
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");

  function submitHandler(event){
    event.preventDefault();
    const postData = {
      title:enteredTitle,
      date:{onDate}    
    };
    console.log(postData);
    handleDeleteRequest();
    onCancel();
  }

  const handleDeleteRequest = async () => {
    try {
      const response = await fetch('YOUR_API_GATEWAY_URL', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
        title:enteredTitle,
        date: {onDate}
        }),
      });

      const responseData = await response.json();
      console.log('PUT response:', responseData);
      setResponseMessage(responseData.message);
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
    
  
    
    console.log({onDate});
    
  };
  return (
      
      <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="title">Delete Title</label>
        <input type="text" id="date" />
      </p>
      
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" >Submit</button>
      </p>
      </form>
      
    
    
    
    
  );
}

export default DeletePost;