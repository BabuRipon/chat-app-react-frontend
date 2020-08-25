import React,{useEffect,useState} from 'react';
import io from 'socket.io-client';
import queryString from 'query-string'
import './chat.css'
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
const ENDPOINT='https://ripon-react-chat-app.herokuapp.com/';

let  socket;

const Chat =(props)=>{

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

  
    useEffect(()=>{
      const {name,room}=queryString.parse(props.location.search)
      setName(name);
      setRoom(room);

      socket=io(ENDPOINT);

      socket.emit('join',{name,room},()=>{
        //   alert(error)
      })

      return ()=>{
          socket.emit('disconnect',{},()=>{});

          socket.off();
      }

    },[ENDPOINT,props.location.search]);


  useEffect(() => {
      socket.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
      });

      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
      
  }, []);

  const sendMessage=(event)=>{
     event.preventDefault();
     if(message){
       socket.emit('sendMessage',message,()=>setMessage(''))
     }
     
  }

  // console.log(message,messages)

    return (
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users}/>
      </div>
    )
}

export default Chat;