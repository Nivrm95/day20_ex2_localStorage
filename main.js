"use strict";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement("li");
        li.innerHTML = `
        <label>
          <input type="checkbox" onchange="toggleCompletion(${task.id})" 
          ${task.completed && "checked"} id="task-${task.id}">
          ${task.text}
        </label>
        <button type="button" id="delete-${task.id}" 
        onclick="deleteTask(${task.id})">Delete</button>
      `;

    li.className = task.completed ? "completed" : "not-completed";
    taskList.appendChild(li);
  }
}

function addTask(event) {
    event.preventDefault();
    console.log(Date.now(), "Date.now()");
    const task = {
      id: Date.now(),
      text: taskInput.value,
      completed: false,
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
  }

  
  function toggleCompletion(id) {
    for (let i = 0; i < tasks.length; i++) {
      tasks[id]; 
      const currentTask = tasks[i];
      if (currentTask.id === id) {
        currentTask.completed = !currentTask.completed;
    }
}
localStorage.setItem("tasks", JSON.stringify(tasks));
renderTasks();
}

function deleteTask(id) {
    const taskIndex = tasks.findIndex(function (task) {
      return task.id === id;
    });
    if (taskIndex !== -1 && tasks[taskIndex].completed) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    } else {
      alert("Not Completed, please complete the task!");
    }
  }

taskForm.addEventListener("submit", addTask);
