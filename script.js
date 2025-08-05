const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");
const newChatBtn = document.getElementById("new-chat");

const API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // Replace this with your real key

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

newChatBtn.addEventListener("click", () => {
  chatMessages.innerHTML = "";
});

function appendMessage(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.innerText = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoading() {
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "message ai loading";
  loadingDiv.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  chatMessages.appendChild(loadingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return loadingDiv;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";

  const loadingDiv = showLoading();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    loadingDiv.remove();

    if (data.choices && data.choices.length > 0) {
      const aiMessage = data.choices[0].message.content;
      appendMessage("ai", aiMessage);
    } else {
      appendMessage("ai", "Sorry, I didn’t get that.");
    }
  } catch (error) {
    loadingDiv.remove();
    appendMessage("ai", "Error talking to AI. Check API key.");
    console.error(error);
  }
}
