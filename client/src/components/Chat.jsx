import { useEffect, useState } from "react"
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
      setChatLog((chat) => [...chat, messageData])
    }
  }

  useEffect(() => {
    socket.on("received_message", (data) => {
      setChatLog((chat) => [...chat, data])
    })
  }, [socket])

  return (
    <div className="chat-board">
      <div className="chat-border">
        <div>
          <div className="chatbox-header">Mumbles</div>
        </div>
        <div className="chatbox-body">
          <div className="messageTextsContainer">
            {chatLog.map((messageContent) => {
              return (
                <div className="messageBox">
                  <div className="message-author">
                    {messageContent.author} :
                  </div>
                  <div className="message-text">{messageContent.message}</div>
                </div>
              )
            })}
          </div>
        </div>

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
    </div>
  )
}

export default Chat
