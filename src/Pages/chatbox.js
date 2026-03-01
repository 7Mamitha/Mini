import { useState, useEffect } from "react";
import "./chatbox.css";

function ChatBox() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showTip, setShowTip] = useState(false);

  // Keywords for banking queries
  const keywords = ["account", "deposit", "withdraw", "balance", "pin", "atm"];

  // Greetings
  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon"];

  // Show initial greeting message and tip popup
  useEffect(() => {
    setMessages([
      {
        from: "bot",
        text: "Hi! I’m Eazy Bot 🤖. I’m here to help you with your banking queries.",
      },
    ]);

    // Show popup tip for 3 seconds
    setShowTip(true);
    const timer = setTimeout(() => setShowTip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg = { from: "user", text: message };
    setMessages((prev) => [...prev, userMsg]);

    const lowerMsg = message.toLowerCase().trim();

    // 1️⃣ Handle greetings first
    if (greetings.includes(lowerMsg)) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Hello! I’m Eazy Bot 🤖. How can I help you today?",
        },
      ]);
    }
    // 2️⃣ Handle keywords
    else {
      const matchedKeyword = keywords.find((k) => lowerMsg.includes(k));
      if (matchedKeyword) {
        let responseText = "";
        switch (matchedKeyword) {
          case "account":
            responseText =
              "You want info about account types or details? I can help!";
            break;
          case "deposit":
            responseText =
              "Deposits are easy! You can deposit via cash, cheque, or online transfer.";
            break;
          case "withdraw":
            responseText =
              "Withdrawals can be done at ATMs or through branch counters.";
            break;
          case "balance":
            responseText =
              "To check your balance, use your online account or ATM.";
            break;
          case "pin":
            responseText =
              "You can reset your PIN at any ATM or online portal.";
            break;
          case "atm":
            responseText =
              "ATM-related queries? I can guide you to locate or manage your ATM card.";
            break;
          default:
            responseText =
              "Sorry, I can only help with Account, Deposit, Withdraw, Balance, PIN, or ATM queries.";
        }
        setMessages((prev) => [...prev, { from: "bot", text: responseText }]);
      } else {
        // 3️⃣ Fallback for unknown messages
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "Sorry, I can only help with Account, Deposit, Withdraw, Balance, PIN, or ATM queries.",
          },
        ]);
      }
    }

    setMessage(""); // clear input
  };

  return (
    <>
      {/* Chat Icon with Tip */}
      <div className="chat-icon-container">
        <div className="chat-icon" onClick={() => setOpen(!open)}>
          💬
        </div>

        {/* Tip popup */}
        {showTip && !open && (
          <div className="chat-tip">
            Need help? Click here to ask me anything!
          </div>
        )}
      </div>

      {/* Chat Box */}
      {open && (
        <div className="chatbox">
          <div className="chat-header">
            Eazy Bank Support
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;