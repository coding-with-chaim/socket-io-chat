import React, {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import Message from "./components/Message/Message";
import User from "./components/User/User";
import "./App.css";

const App = () => {

  let savedID = "";
  const [textToSpeech, setTextToSpeech] = useState(true);
  const [currentMessage, setCurrentMessage] = useState("");
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');

    socketRef.current.on("your id", id => {
      savedID = id;
      setYourID(id);
    });

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    });

    socketRef.current.on("connectu", (username) => {
        onlineUsers.push(username);
      console.log("connectu: " + username);
    });

    socketRef.current.on("fuck", (array) => {
        setOnlineUsers(array);
    });
  }, []);

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;

    // Text to speech
    if (textToSpeech) {
      if (message.id === savedID) return;
      const speechSynthesis = new SpeechSynthesisUtterance();
      speechSynthesis.text = message.body;
      window.speechSynthesis.speak(speechSynthesis);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const messageObject = {
      body: currentMessage,
      id: yourID,
    };
    setCurrentMessage("");

    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(event) {
    event.preventDefault();

      setCurrentMessage(event.target.value);
    }

    function handleFontIncrease() {
        var el = document.getElementById("messages");
        var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style);
        el.style.fontSize = (fontSize + 3) + 'px';
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
    }
    function handleFontDecrease() {
        var el = document.getElementById("messages");
        var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style);
        el.style.fontSize = (fontSize - 3) + 'px';
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
    }

    function handleTextToSpeech() {
      setTextToSpeech(!textToSpeech);
    }

    return (
    <div className="App">
      <div className="container wrapper">
        <div className="row">
          <div className="col-9 p-3" style={{background: "white"}}>
            <div className="messages" id="messages">
             {messages.map((message, index) => {
                  if (message.id === yourID) {
                    return (
                    <Message key={index} message={message} your={true} />
                  )
                }
                return (
                  <Message key={index} message={message} />
                )
             })}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter your message..." aria-label="Message" onChange={handleChange} value={currentMessage}/>
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit"><i className="fas fa-paper-plane" /></button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-3 p-3" style={{background: "#f2f2f2"}}>
            <h4 style={{ color: "black" }}>Online users ({onlineUsers.length}):</h4>
            <div className = "Cards">
              {onlineUsers.map((username, index) => {
                return (
                  <User key={index} id={username} />
                  )
              })}
            </div>
            <div className="Controls">
                <button className="btn btn-primary mr-2" onClick={handleFontIncrease}><i className="fas fa-font" /><i className="fas fa-plus fa-xs" /></button>
                <button className="btn btn-primary" onClick={handleFontDecrease}><i className="fas fa-font" /><i className="fas fa-minus fa-xs" /></button>
                <button className="btn btn-primary float-right" onClick={handleTextToSpeech}>{textToSpeech ? <i className="fas fa-volume-up"/> : <i className="fas fa-volume-mute"/>}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
