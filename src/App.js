import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Dropdown from 'react-bootstrap/Dropdown';

function App() {
  const [message,setMessage] = useState("")
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])

  const [group, setGroup] = useState("global")
  const [name, setName] = useState("guest")
 
  useEffect(()=>{
    const resultSocket = io("http://localhost:4000")
    setSocket(resultSocket)
  },[])

  useEffect(()=>{
    if(socket){
      socket.emit('initialRoom',{room:group})
    }
    console.log(group)
    setMessages([])
  },[group])
  
  useEffect(()=>{
    if(socket){
      socket.on("messageBe",(data)=>{
        setMessages((current)=>[...current,data])
        console.log(data)
      })
      console.log(socket)
    }
  },[socket])

  const handleMessage = () =>{
    let data = {message,name,group}
    console.log(data)
    socket.emit('message',data)
    setMessage("")
  }
  

  return (
    <div className="App container m-5" >
      
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       {group}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>setGroup("global")}>global</Dropdown.Item>
        <Dropdown.Item onClick={()=>setGroup("javascript")}>javascript</Dropdown.Item>
        <Dropdown.Item onClick={()=>setGroup("php")}>php</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>


        <input type="text" value={name} name="name" onChange={(e)=>setName(e.target.value)} />

      <ul>
      {messages.map((item,index)=>(
          <li key={index+1}>{item.message} : {item.message}  - {item.date}</li>
        ))}
        </ul>
      <input type="text" value={message} name="message" onChange={(e)=>setMessage(e.target.value)} />
      <br />
      <button onClick={handleMessage}>send</button>
    </div>
  );
}

export default App;
