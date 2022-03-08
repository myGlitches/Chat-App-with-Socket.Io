import io from 'socket.io-client'
import Chat from './components/Chat'
import {useState} from 'react'

const socket = io.connect(`http://localhost:5000`)



function App() {

  const [username, setUsername] = useState('')
  const [roomID, setRoomID] = useState('')

  const joinRoom = () => {
    if(username !== "" && roomID !== "") {
      socket.emit("join_room", roomID)
    }
  }

  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input type="text" placeholder="ex:- Surya" onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Room Name" onChange={(e) => setRoomID(e.target.value)} />
      <button onClick={joinRoom}>Join</button>
      <Chat socket={socket} roomID={roomID} username={username} />
    </div>
  );
}

export default App;
