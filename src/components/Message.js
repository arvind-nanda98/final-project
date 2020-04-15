import React from 'react';
import axios from 'axios';




class Message extends React.Component {
    constructor(props) {
        super(props);
   
    //binding the change functions
      
        this.handleAuthorChange=this.handleAuthorChange.bind(this);
        this.handleTitleChange=this.handleTitleChange.bind(this);
        this.handleMessageChange=this.handleMessageChange.bind(this);
         this.onSubmit=this.onSubmit.bind(this);
   
   
   
        this.state={
            author:'',
            message:'',
            title:'',
            date:new Date(),
        };
 
    }
    
    
    //author change function
    handleAuthorChange(event){
        this.setState({
            author: event.target.value
        });
    }
    
    
    //message change function 
    handleMessageChange(event){
        this.setState({
            message: event.target.value
        });
    }
    
     //title change function 
    handleTitleChange(event){
        this.setState({
            title: event.target.value
        });
    }
    
    
    //date of birth change function 
    handleDateChange(date){
        this.setState({
            date: date
        });
    }
    
  componentDidMount() {
      //storing all the authors in author array
          this.setState({
            authors: this.props.authors.map(auth => auth.author),
        });
        
    }

 

//handler function for submitting the form
onSubmit(event){
    event.preventDefault();
        
    const messageData={
        author: this.state.author,
        message:this.state.message,
        title:this.state.title,
        date: this.state.date
        
    };
    
    
           // let authorData = this.props.authors.;
    axios.post('/messages/add',messageData)
        .then((res) => {
             alert(`Congratulations!! ${messageData.author}. Message Published`);
        }).catch((error) => {
            alert(error);
            console.log(error);
        
        });
               
        //clearing the input fields after submission  
         this.setState({
            author:'',
            title:'',
            message:''
        }); 
    
    }
 
 
render() {  
   
    return <div className="MessageMaker2">
    
            <h1>Publish</h1>
    <div className="formMessageMaker">
       <form onSubmit={this.onSubmit}>

       <h3>   <label>Choose your Username </label><br/>
         <select ref="userInput" name="author"
              value={this.state.author}
              onChange={this.handleAuthorChange}>
              {
                this.props.authors.map(function(author) {
                  return <option 
                    key={author}
                    value={author}>{author}
                    </option>;
                })
              }
          </select>
          </h3>
        
        
        <h3>  <label>Title</label></h3>
          <input type="text"  value={this.state.title} onChange={this.handleTitleChange}/>
          
        <h3>  <label>Message</label></h3>
          <textarea rows="3" id="messageInputArea" value={this.state.message} onChange={this.handleMessageChange}>
          </textarea>
        
       

         <h3>  <input type="submit" value="Submit" id="submit"/></h3>
          </form>
        
         </div>
    </div>;

    }
    
}
export default Message;