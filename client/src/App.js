import io from 'socket.io-client'
import Chat from './components/Chat'
import {useState} from 'react'

const socket = io.connect(`http://localhost:5000`)



function App() {

  const [username, setUsername] = useState('')
  const [roomID, setRoomID] = useState('')
  const [chatRoom, setChatRoom] = useState(false)

  const joinRoom = () => {
    if(username !== "" && roomID !== "") {
      socket.emit("join_room", roomID)
      setChatRoom(true)
    }
  }

  return (
    <div className="App">
      {!chatRoom ? (<div className='join-dashboard'>
      <h3>Join Chat</h3>
      <input type="text" placeholder="ex:- Surya" onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Room Name" onChange={(e) => setRoomID(e.target.value)} />
      <button onClick={joinRoom}>Join</button>
      </div>) :
      (<Chat socket={socket} roomID={roomID} username={username} />)}
    </div>
  );
}

export default App;
