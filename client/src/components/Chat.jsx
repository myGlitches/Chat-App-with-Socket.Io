import { useState } from "react"
import { FaArrowAltCircleRight as Send } from "react-icons/fa"

function Chat({ socket, roomID, username }) {
  const [typedText, setTypedText] = useState("")
  const [chatLog, setChatLog] = useState([])

  const sendMessage = async () => {
    if (typedText !== "") {
      const messageData = {
        message: typedText,
        author: username,
        room: roomID,
      }
      await socket.emit("sent_message", messageData)
    }
  }

  return (
    <div>
      <div className="chatbox-header">Mumbles</div>
      <div className="chatbox-body"></div>
      <div className="chatbox-footer">
        <input
          type="text"
          name="message"
          placeholder="Type Here..."
          onChange={(e) => setTypedText(e.target.value)}
        />
        <button onClick={sendMessage}>
          <Send />
        </button>
      </div>
    </div>
  )
}

export default Chat
