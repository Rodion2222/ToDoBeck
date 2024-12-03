import { createServer } from 'node:http';
import fs from 'node:fs'
import { changeStatus, createTask, getData, initCounter, deleteTask } from './storage.js';

// const pages = ''
const hostname = '127.0.0.1';
const port = 3000;

function init() {
  initCounter()
}

const server = createServer((req, res) => {
  const url = req.url
  const method = req.method
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  // Загружаем данные на сервер для создания или обновления задачи
  if (url === '/tasks' && method === 'POST') {
    let body = []
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString(); // Объединение и преобразование данных
      const item = JSON.parse(body)
      const result = createTask(item)
      console.log(result);
      res.end(result)
    });
  }
    
  // Изменения элемента по id 
  if (url === '/tasks' && method === 'PATCH') {
    let body = []
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const requestData = JSON.parse(body)
      const changedData = changeStatus(requestData.id)
      res.end(changedData)
    });
  }

  // Удаление задачи по заданному id
  if (url === '/tasks' && method === 'DELETE') {
    let body = []
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const requestData = JSON.parse(body)
      const result = deleteTask(requestData.id)
      res.end()
    });
  }

  // Обработка запросов (извлекает данные)
  if (url === '/tasks' && method === 'GET') {
    const result = getData()
    res.end(result)
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
