let counter = 1
const data = [
  {
    id: 1,
    text: 'text',
    isDone: true
  }
]

// Создает уникальный id задаче 
export function initCounter() {
    if (data.length === 0){
        return
    }
    data.forEach(element => {
        if (element.id >= counter) {
            counter = element.id + 1
        }
    });
}

export function getData() {
    return JSON.stringify(data)
}
// Создание новой задачи
export function createTask(inputData) {
    const item = {
      id: counter++,
      ...inputData
    }
    data.push(item)
    return JSON.stringify(item)
}
// Находим один элемент вмасиве
export function changeStatus(id) {
    const item = data.find(i => i.id === id)
    if (item === undefined) {
        // Объект не найден Error 404
    }
    item.isDone = !item.isDone
    return JSON.stringify(item)
}

export function deleteTask(id) {
    const idx = data.findIndex(i => i.id === id)
    if (idx ===  -1) {
        console.log('Такого id не существует')
        return
    }
    data.splice(idx, 1)
    return 1
}