import React from 'react';
import axios from 'axios';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import User from './components/User.js';
import Message from './components/Message.js';
import Publish from './components/Publish.js';


import '../style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    
    this.state={
        authors:[],
        author:''
        
    };
    this.getAllUsers=this.getAllUsers.bind(this);
}


//get all users from the database
getAllUsers(){
  console.log("updated all user");
       //storing all the authors in author array
       this.setState({
         author:''
       });
    axios.get(`/users`)
      .then(results => {
         if (results.data.length > 0) {
          this.setState({
            authors: results.data.map(auth => auth.author)
          });
     }
      })
      .catch((error) => {
        console.log(error);
      });
      
}
    // Reload messages when page changes
  componentDidUpdate(prevProps, prevState){
    if(prevState.author != this.state.author){
      this.getAllUsers();
    }
   
  }
  




 componentDidMount() {
    this.getAllUsers();
   //alert('Welcome to The Letterbox !! Please register below');
  }
  


render() {  
    return <div className="app">
    
        <Header />
        <User author={this.state.author} getAllUsers={this.getAllUsers} /> 
        <Message authors={this.state.authors}  />
        <Publish authors={this.state.authors}  />
        <Footer />
</div>;

}
    
}
export default App;