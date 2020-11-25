'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(key) {
        this.todoData.forEach(item => {
            if (key === item.key) {
                this.todoData.delete(key);
            }
        });
    }

    completedItem(key) {
        this.todoData.forEach(item => {
            if (key === item.key) {
                item.completed = !item.completed;
            }
        });
    }

    editItem(elem) {
        const todoText = elem.querySelector('.text-todo');
        todoText.contentEditable = 'true';

        document.addEventListener('click', event => {
            const target = event.target;

            if (!target.classList.contains('text-todo') && !target.classList.contains('todo-edit')) {
                this.todoData.forEach(item => {
                    if (elem.key === item.key) {
                        item.value = todoText.innerHTML;
                    }
                    this.render();
                });
            }
        });


    }

    handler() {
        document.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('todo-remove')) {
                target = target.closest('.todo-item');
                this.deleteItem(target.key);
                this.render();
            } else if (target.classList.contains('todo-complete')) {
                target = target.closest('.todo-item');
                this.completedItem(target.key);
                this.render();
            } else if (target.classList.contains('todo-edit')) {
                target = target.closest('.todo-item');
                this.editItem(target);
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
