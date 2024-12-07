const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Новый клиент подключился"); // Получаем сообщение на сервер когда подключается клиент

  ws.send(
    JSON.stringify({
      type: "system",
      content: "Добро пожаловать в чат!",
    })
  ); // Отправляем приветсвенное сообщение клиенту

  ws.on("message", (message) => {
    let parseMessage;
    try {
      parseMessage = JSON.parse(message);
      console.log("Получено сообщение:", parseMessage);
    } catch (error) {
      console.error("Произошла ошибка при обработке сообщения", error);
      return;
    } // Принимаем сообщение на сервер от клиента

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parseMessage));
      }
    }); // Отображаем сообщение который отправил клиент для других клиентов
  });
}); //работает событие connection когда кто-то подключается на один ws

console.log("Сервер запущен на port: 8080");
