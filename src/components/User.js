import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class User extends React.Component {
    constructor(props) {
        super(props);

        //binding the change functions
       
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleAuthorChange=this.handleAuthorChange.bind(this);
        this.handleDOBChange=this.handleDOBChange.bind(this);
         this.onSubmit=this.onSubmit.bind(this);   
        
        this.state={
            username:'',
            author:'',
            dob: new Date(),
            messages:[]
        };
 
    }
    
       // Reload the author array when new author is added
  componentDidUpdate(prevProps, prevState){
    if(prevState.author != this.state.author){
      this.props.getAllUsers();
    }
  }
    
    
   
    
    //name change function
    handleNameChange(event){
        this.setState({
            username: event.target.value
        });
    }
    
    
    //author change function 
    handleAuthorChange(event){
        this.setState({
            author: event.target.value
        });
    }
    
    
    //date of birth change function 
    handleDOBChange(date){
        this.setState({
            dob: date.getDate()
        });
    }
    
    //handler function for submitting the form
    onSubmit(event){
        event.preventDefault();
        const userData={
            username: this.state.username,
            author:this.state.author,
            dob: this.state.dob
        };
            
            
    axios.post('/users/add', userData)
       .then((res) => {
                 alert(`Welcome ${userData.username}`);
            }).catch((error) => {
                alert(error);
            });
           
   
    //clearing the input fields after submission      
        this.setState({
            username:'',
            author:'',
            dob:new Date()
        });   
}
 


render() {  
 
    return <div className="MessageMaker">
          
    <h1>Register</h1>
    <div className="formMessageMaker">
       <form onSubmit={this.onSubmit}>
        <h3> <label>First Name:</label></h3>
          <input type="text"  value={this.state.username} onChange={this.handleNameChange}/>
        <h3> <label>Enter a unique User Name</label></h3>
          <input type="text"  value={this.state.author} onChange={this.handleAuthorChange}/>
          <h3> <label>Enter your date of birth</label></h3>
          <DatePicker selected={this.state.dob} onChange={this.handleDOBChange} />

          <h3> <input type="submit" value="Submit" id="submit" /></h3>
          </form>
          <p id="warning_message"><i>*You must be 19 years old to publish something</i></p>
          <p id="warning_message"><i>*If you are already registered just choose the username and start publishing.</i></p>
         </div>
    </div>;

    }
    
}
export default User;