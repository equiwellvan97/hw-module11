const chat = document.getElementById("chat");
const form = document.getElementById("form_masseges");
const inputMess = document.getElementById("inputMessage");

const socket = new WebSocket("ws://localhost:8080");

socket.onopen = (e) => {
  console.log("Соединение установлено!");
}; // Получаем в консоль сообщение о подключении к серверу, сервер запущен

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const messageElement = document.createElement("div");

  if (message.type === "system") {
    messageElement.classList.add("system-message");
  }
  messageElement.textContent = message.content;
  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;
}; // Получаем сообщение от сервера и создаем новый div для отображения

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(
      `Соединение закрыто чисто, код=${event.code}, причина: ${event.reason}`
    );
  } else {
    console.log("Соединение прервано");
  }
}; // Обработка прекращения соединения сервера

socket.onerror = (error) => {
  console.log(`Ошибка: ${error.message}`);
}; // Обработка ошибок

form.onsubmit = (event) => {
  event.preventDefault();
  if (inputMess.value) {
    const message = {
      type: "client",
      content: inputMess.value,
    };
    socket.send(JSON.stringify(message));
    inputMess.value = "";
  } // Отправляем сообщения на сервер и дригим клиентам
};
