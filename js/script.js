{
  const tasks = [
    {
      content: "zjeść obiad",
      done: true,
    },
    {
      content: "siłownia",
    },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const render = () => {
    let tasksHTMLContent = "";

    for (const task of tasks) {
      tasksHTMLContent += `
            <li class="tasks__item js-task">
            <button class="tasks__button tasks__button--toggleDone js-done">${
              task.done ? "✔️" : ""
            }</button>
            <span class="tasks__content ${
              task.done ? "tasks__content--done" : ""
            }">${task.content}</span>
            <button class="tasks__button tasks__button--remove js-remove">🗑️</button>
            </li>
            `;
    }
    document.querySelector(".js-tasks").innerHTML = tasksHTMLContent;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
