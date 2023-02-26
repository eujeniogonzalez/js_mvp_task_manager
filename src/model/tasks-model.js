import { tasksMock } from '../mock/tasks-mock.js';
import { deepCloneArrayOrObject } from '../utils.js';
import { TASK_ACTIONS, RENDER_PLACES } from '../const.js';

const TASKS_SORTING_ORDER = {
  FROM_LATE_TO_EARLY: true,
  FROM_EARLY_TO_LATE: false
};

export default class HeaderModel {
  #tasks = null;
  // #tasksSortingOrder = TASKS_SORTING_ORDER.FROM_LATE_TO_EARLY;

  //============================================ FAKE API ========================================================
  // todo Удалить после интеграции с API
  #getTasksSimulatedApi() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = tasksMock;
        return resolve(tasks);
      }, 3000);
    });
  }

  // todo Удалить после интеграции с API
  #changeTaskStatusSimulatedApi({ action, id }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedTask = deepCloneArrayOrObject(this.#tasks.find((task) => task.id === id));

        switch (action) {
          case TASK_ACTIONS.HASHES.CLOSE:
            updatedTask.isDone = true;
            break;

          case TASK_ACTIONS.HASHES.OPEN:
            updatedTask.isDone = false;
            break;
        }

        return resolve(updatedTask);
      }, 3000);
    });
  }

  // todo Удалить после интеграции с API
  #createTaskSimulatedApi({ taskText }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          id: this.#tasks.reduce(((acc, curr) => acc > curr.id ? acc : curr.id), 0) + 1,
          date: new Date().toLocaleString().replace(',', ''),
          description: taskText,
          isDone: false
        };

        return resolve(newTask);
      }, 3000);
    });
  }
  //============================================ FAKE API ========================================================

  async getTasks() {
    try {
      const tasks = await this.#getTasksSimulatedApi();
      const adaptedTasks = await tasks.map(this.#adaptTaskToClient); // todo Проверить, нужен ли await

      this.#tasks = deepCloneArrayOrObject(adaptedTasks);

      this.#sortTasksByDate(this.#tasks, TASKS_SORTING_ORDER.FROM_LATE_TO_EARLY);

      return this.#tasks; // todo После интеграции API заменить на метод API
    } catch(err) {
      // Error
    }
  }

  async changeTaskStatus({ action, id }) {
    try {
      // todo После интеграции API заменить на метод API
      const updatedTaskFromServer = await this.#changeTaskStatusSimulatedApi({ action, id });
      const adaptedTask = this.#adaptTaskToClient(updatedTaskFromServer);

      const updatedTask = this.#tasks.find((task) => {
        if (task.id === id) {
          task.isDone = adaptedTask.isDone;

          return task;
        }
      });

      return updatedTask;
    } catch(err) {
      // Error
    }
  }

  async createTask({ taskText }) {
    try {
      const createdTaskFromServer = await this.#createTaskSimulatedApi({ taskText });
      const adaptedTask = this.#adaptTaskToClient(createdTaskFromServer);

      this.#tasks.push(deepCloneArrayOrObject(adaptedTask));

      this.#sortTasksByDate(this.#tasks, TASKS_SORTING_ORDER.FROM_LATE_TO_EARLY);

      return {
        task: adaptedTask,
        renderPlace: TASKS_SORTING_ORDER.FROM_LATE_TO_EARLY ? RENDER_PLACES.AFTERBEGIN : RENDER_PLACES.BEFOREEND
      };
    } catch (err) {
      // Error
    }
  }

  getFilteredTasks({ taskFilterChecked }) {
    if (!taskFilterChecked) {
      return this.#tasks;
    }

    const filteredTasks = this.#tasks.filter((task) => task.isDone !== taskFilterChecked);

    return filteredTasks;
  }

  #adaptTaskToClient = (task) => {
    const adaptedTask = {
      ...task,
      date: this.#splitDateAndTime(task).date,
      time: this.#splitDateAndTime(task).time
    };

    return adaptedTask;
  };

  #splitDateAndTime(task) {
    return {
      // todo Сделать изящнее, заменить цифры на объект
      date: task.date.split(' ')[0],
      time: task.date.split(' ')[1]
    };
  }

  #sortTasksByDate(tasks, fromLateToEarly = true) {
    tasks.sort((a, b) => {
      const dateA = new Date(this.#convertDateAndTimeToISO8601(a.date, a.time));
      const dateB = new Date(this.#convertDateAndTimeToISO8601(b.date, b.time));

      return fromLateToEarly ? dateB - dateA : dateA - dateB;
    });
  }

  #convertDateAndTimeToISO8601(date, time) {
    // todo Вынести символы в константу
    const transformedDate = date.split('.').reverse().join('-');

    return `${transformedDate}T${time}.000Z`;
  }
}

