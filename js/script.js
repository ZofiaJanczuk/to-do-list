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

    const render = () => {
        let tasksHTMLContent = "";

        for(const task of tasks) {
            tasksHTMLContent +=`
            <li class="tasks__item js-task">
            <button class="tasks__button tasks__button--toggleDone">${task.done ? "✔️" : ""}</button>
            <span class="tasks__content${task.done ? "tasks__content--done" : ""}">${task.content}</span>
            <button class="tasks__button tasks__button--remove">🗑️</button>
            </li>
            `;

            document.querySelector(".js-tasks").innerHTML = tasksHTMLContent;
        }
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const onFormSubmit = (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if(newTaskContent === "") {
                return;
            }
 
            addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (onFormSubmit));

    };

    init();
}