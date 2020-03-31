import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';
import './App.css';


function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  
  const resFb = (res)=> {
    console.log(res);
    
    setData(res);
    setPicture(res.picture.data.url);

    if(res.accessToken){
      setLogin(true);
    }else {
      setLogin(false);
    }
  }
  return (
    <div className="container">
      <Card style={{ width:'600px' }}>
        <Card.Header>
          {
            !login && 
            <FacebookLogin
              appId= {process.env.REACT_APP_ID}
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={resFb}
            />
          }
          {
            login && 
            <Image src={picture} roundedCircle />
          }
        </Card.Header>

        {
          login && 
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>{data.email}</Card.Text>
          </Card.Body>
        }
      </Card>
    </div>
  );
}

export default App;
