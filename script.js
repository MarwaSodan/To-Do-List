const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const notification = document.getElementById('notification');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on load
window.onload = () => {
  tasks.forEach(renderTask);
};

// Add Task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    showNotification('Task cannot be empty!', 'error');
    return;
  }

  const task = { text: taskText, completed: false };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTask(task);
  taskInput.value = '';
  showNotification('Task added successfully!', 'success');

  // Alert for add
  alert('Task has been added successfully!');
});

// Render Task
function renderTask(task) {
  const li = document.createElement('li');

  const taskText = document.createElement('span');
  taskText.textContent = task.text;
  if (task.completed) taskText.classList.add('completed');

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  editBtn.addEventListener('click', () => editTask(task, taskText));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => deleteTask(task, li));

  const completeBtn = document.createElement('button');
  completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
  completeBtn.addEventListener('click', () => toggleComplete(task, taskText, completeBtn));

  li.append(taskText, editBtn, deleteBtn, completeBtn);
  taskList.appendChild(li);
}

// Edit Task
function editTask(task, taskText) {
  const newText = prompt('Edit Task', task.text);
  if (newText !== null) {
    const oldText = task.text; // Save old text for the alert
    task.text = newText.trim();
    taskText.textContent = task.text;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showNotification('Task edited successfully!', 'success');

    // Alert for edit
    alert(`Task "${oldText}" has been updated to "${task.text}" successfully!`);
  }
}

// Delete Task
function deleteTask(task, li) {
  const taskName = task.text; // Save task name for the alert
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  li.remove();
  showNotification('Task deleted successfully!', 'success');

  // Alert for delete
  alert(`Task "${taskName}" has been deleted successfully!`);
}

// Toggle Complete
function toggleComplete(task, taskText, completeBtn) {
  task.completed = !task.completed;
  taskText.classList.toggle('completed');
  completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
  localStorage.setItem('tasks', JSON.stringify(tasks));
  showNotification('Task status updated!', 'success');

  // Alert for toggle
  const status = task.completed ? 'completed' : 'incomplete';
  alert(`Task "${task.text}" has been marked as ${status}!`);
}

// Show Notification
function showNotification(message, type) {
  notification.textContent = message;
  notification.style.backgroundColor = type === 'success' ? '#2ecc71' : '#e74c3c';
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('hidden'), 2000);
}
