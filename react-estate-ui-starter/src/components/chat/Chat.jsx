import { useState } from "react";
import "./chat.scss";
import { useAuthContext } from "../../context/Auth.Context";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
function Chat({ chats }) {
  //console.log(chats);
  const { currentUser } = useAuthContext();
  //console.log(currentUser);
  const [chat, setChat] = useState(null);

  const handleOpenChat = async (chatId, reciver) => {
    //console.log(chatId);
    try {
      const chat = await apiRequest.get("/chats/" + chatId);
      console.log("from handle open chat ", chat.data);
      setChat({ ...chat.data, reciver });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(chat);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const text = formData.get("text");
      console.log("asdfasdfnajbsdfahjsbdf", text);
      if (!text) {
        return;
      }

      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>

        {chats?.map((c) => (
          <div
            key={c.id}
            className="message"
            style={{
              backgroundColor: c.seenBy.includes(currentUser.id)
                ? "white"
                : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.reciver)}
          >
            <img
              width={40}
              height={40}
              src={
                c.reciver.avatar ||
                "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt=""
            />
            <span>{c.reciver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatbox">
          <div className="top">
            <div className="user">
              <img
                width={40}
                height={40}
                src={
                  chat.reciver.avatar ||
                  "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt=""
              />
              {chat.reciver.username}
            </div>
            <span onClick={() => setChat(null)} className="close">
              X
            </span>
          </div>
          <div className="center">
            {chat.messages?.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
