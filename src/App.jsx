import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [count, setCount] = useState(1);
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const [getResponse, setGetResponse] = useState([]);
  const [postResponse, setPostResponse] = useState([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      // Make GET request
      const getResponse = await axios.get("https://melodious-wry-tablecloth.glitch.me/messages");
      console.log("GET Response:", getResponse.data);
      setGetResponse(getResponse.data.reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = async (id) => {
    try {
      await fetch(`https://melodious-wry-tablecloth.glitch.me/messages/${id}`, {
        method: "DELETE",
      });

      getMessages();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentTime = new Date().toLocaleTimeString();

    setTime(currentTime);

    setCount((prev) => prev + 1);

    try {
      const response = await axios.post("https://melodious-wry-tablecloth.glitch.me/messages", {
        id: count,
        from: from,
        text: text,
        time: currentTime,
      });
      console.log("POST Response:", response.data);
      setGetResponse([response.data, ...getResponse]);
    } catch (error) {
      console.error("Error:", error);
    }
    getMessages();

  };

  return (
    <div className="container">
      <div className="cards">
        {getResponse.map((item, index) => (
          <div className="card" key={index}>
            <div className="inner-card">
              <span className="msg">{item.text}</span>
              <span className="from">
              <strong>{item.from}:</strong>
              </span>
              <span className="date">{item.time}</span>
            </div>
            <div className="btn-grid">
              <button
                className="close-btn"
                onClick={() => handleClose(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          onChange={(e) => setFrom(e.target.value)}
          type="text"
          name="from"
          placeholder="Your Name"
          required
        />

        <input
          className="msg-input"
          onChange={(e) => setText(e.target.value)}
          type="text"
          name="text"
          placeholder="The message..."
          required
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
