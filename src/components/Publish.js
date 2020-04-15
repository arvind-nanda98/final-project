import React from 'react';
import axios from 'axios';



class Publish extends React.Component {
    constructor(props) {
        super(props);
    
     this.state = {
      page:1,
      messages:[],
      author:this.props.author,
     
    };
    this.changePage = this.changePage.bind(this);
     this.handleAuthorChange=this.handleAuthorChange.bind(this);
}
 
  // Update state when new page chosen
  changePage(event){
    this.setState({
      page:event.target.value,
   
    });
  }
 
     //author change function
    handleAuthorChange(event){
        this.setState({
            author: event.target.value
        });
    }
    



//this message is called everytime the username is changed
  updateMessages(){
    // TODO update endpoint
    axios.get(`/messages/${this.state.author}`)
    .then(result=>{
      let messages = result.data;
      this.setState({
        messages:messages,
       authors:this.props.authors
      });
      
    })
    .catch(error=>console.log(error));
  }



  componentDidMount() {
    this.updateMessages();
  }
  
    // Reload messages when page changes
  componentDidUpdate(prevProps, prevState){
    if(prevState.page != this.state.page || prevState.author != this.state.author){
      this.updateMessages();
    }
   
  }
  

 
render() {  




     const indexLast = this.state.page * 2;
      const indexFirst = indexLast - 2;
      
      
return <div className="publisher" >
   <h1 div="letstry">Wall</h1>
   
   
   
   <form>
       <h4>   <label>Username </label> &nbsp;
         <select className="selectAlls" ref="userInput" value={this.state.author}
            onChange={this.handleAuthorChange} name="author">
              
              {
                this.props.authors.map(function(author) {
                  return <option 
                    key={author}
                    value={author}>{author}
                    </option>;
                })
              }
          </select>
          </h4>
          </form>
          <form>
          Page:
          <input type='number' min='1'max="5" id="pageNumber" value={this.state.page} onChange={(event)=>this.changePage(event)}/>
          </form>
  
            <ul>
      {this.state.messages.slice(indexFirst,indexLast).map(message=><li key={message._id}>
      <h5> Author: {message.author}</h5>
      <p className="datePublished"> <b>Published </b>{message.date}</p>
      <p>{message.message}</p>
      </li>)}
            </ul> 
        </div>;
     }
    
}


export default Publish;