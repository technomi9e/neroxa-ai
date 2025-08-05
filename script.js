const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Add message to the chat UI
function addMessage(message, isUser) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", isUser ? "user" : "ai");
  messageDiv.innerText = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show loading circle while AI is "typing"
function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message", "ai", "typing");
  typingDiv.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typingDiv;
}

// Simulate AI reply (replace this with real API call)
function getAIReply(userMessage) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeResponse = `You said: "${userMessage}"`;
      resolve(fakeResponse);
    }, 1500);
  });
}

// Send user message
async function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  addMessage(message, true);
  userInput.value = "";

  const typingDiv = showTyping();

  const aiReply = await getAIReply(message);

  typingDiv.remove();
  addMessage(aiReply, false);
}

// Handle Enter key and send button
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
