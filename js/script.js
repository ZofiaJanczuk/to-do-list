{
	let tasks = [];
	let hideDoneTasks = false;

	const removeTask = (taskIndex) => {
		tasks = tasks.filter((task, index) => taskIndex !== index);
		render();
	};

	const toggleTaskDone = (taskIndex) => {
		tasks = tasks.map((task, index) =>
			index === taskIndex ? { ...task, done: !task.done } : task
		);
		render();
	};

	const addNewTask = (newTaskContent) => {
		tasks = [...tasks, { content: newTaskContent }];
		render();
	};

	const markAllTasksDone = () => {
		tasks = tasks.map((task) => ({
			...task,
			done: true,
		}));
		render();
	};

	const toggleHideDoneTasks = () => {
		hideDoneTasks = !hideDoneTasks;
		render();
	};

	const bindRemoveEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, taskIndex) => {
			removeButton.addEventListener("click", () => {
				removeTask(taskIndex);
			});
		});
	};

	const bindToggleDoneEvents = () => {
		const toggleDoneButtons = document.querySelectorAll(".js-done");

		toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(taskIndex);
			});
		});
	};

	const renderTasks = () => {
		const tasksHTMLContent = (task) => `
			<li class="tasks__item ${
				task.done && hideDoneTasks ? "tasks__item--hidden" : ""
			} js-task">
				<button class="tasks__button tasks__button--toggleDone js-done">
				${task.done ? "✔️" : ""}
				</button>
				<span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
				${task.content}
				</span>
				<button class="tasks__button tasks__button--remove js-remove">
				🗑️
				</button>
			</li> 
			`;

		const tasksElement = document.querySelector(".js-tasks");
		tasksElement.innerHTML = tasks.map(tasksHTMLContent).join("");
	};

	const renderButtons = () => {
		const buttonsElement = document.querySelector(".js-buttons");

		if (!tasks.length) {
			buttonsElement.innerHTML = "";
			return;
		}

		buttonsElement.innerHTML = `
			<button class="buttons__button js-toggleHideDoneTasks">
				${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
			</button>
			<button class="buttons__button js-markAllDone"
			${tasks.every(({ done }) => done) ? " disabled" : ""}>
				Ukończ wszystkie
			</button>
		`;
	};

	const bindButtonEvents = () => {
		const markAllDoneButton = document.querySelector(".js-markAllDone");

		if (markAllDoneButton) {
			markAllDoneButton.addEventListener("click", markAllTasksDone);
		}

		const toggleHideDoneTasksButton = document.querySelector(
			".js-toggleHideDoneTasks"
		);

		if (toggleHideDoneTasksButton) {
			toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
		}
	};

	const render = () => {
		renderTasks();
		bindRemoveEvents();
		bindToggleDoneEvents();

		renderButtons();
		bindButtonEvents();
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newTaskElement = document.querySelector(".js-newTask");
		const newTaskContent = newTaskElement.value.trim();

		if (newTaskContent !== "") {
			addNewTask(newTaskContent);
			newTaskElement.value = "";
		}

		newTaskElement.focus();
	};

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};

	init();
}
