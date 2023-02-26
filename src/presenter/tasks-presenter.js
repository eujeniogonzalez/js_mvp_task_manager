import LoaderView from '../view/loader-view.js';
import TaskView from '../view/task-view.js';
import { render } from '../framework/render.js';
import { RENDER_PLACES, LOADER_COLOR_CLASSES } from '../const.js';

export default class TasksPresenter {
  #tasksModel = null;
  #tasksListContainerElement = null;
  #loaderView = new LoaderView({ loaderColorClass: LOADER_COLOR_CLASSES.GREY });
  #taskFilterPresenter = null;

  constructor({ tasksModel, tasksListContainerElement }) {
    this.#tasksModel = tasksModel;
    this.#tasksListContainerElement = tasksListContainerElement;
  }

  async renderTasks(filteredTasks) {
    let tasks;

    this.#taskFilterPresenter.blockFilter();

    if (!filteredTasks) {
      this.#insertTasksLoader();

      tasks = await this.#tasksModel.getTasks();
    } else {
      tasks = filteredTasks;
    }

    this.#clearTasksListContainer(this.#tasksListContainerElement);

    tasks.forEach((task) => {
      this.renderTask({ task });
    });

    this.#taskFilterPresenter.unblockFilter();
  }

  renderTask({ task, renderPlace }) {
    render(
      new TaskView({
        task,
        onTaskStatusChange: this.#changeTaskStatus
      }),
      this.#tasksListContainerElement,
      renderPlace ? renderPlace : RENDER_PLACES.BEFOREEND
    );
  }

  setTaskFilterPresenter({ taskFilterPresenter }) {
    this.#taskFilterPresenter = taskFilterPresenter;
  }

  #insertTasksLoader() {
    this.#tasksListContainerElement.append(this.#loaderView.element);
  }

  #clearTasksListContainer(container) {
    container.innerHTML = '';

    this.#loaderView.removeElement();
  }

  #changeTaskStatus = async ({ action, id, element }) => {
    this.#taskFilterPresenter.blockFilter();

    const updatedTask = await this.#tasksModel.changeTaskStatus({ action, id });

    if (this.#taskFilterPresenter.checked && action === 'close') {
      this.#tasksListContainerElement.removeChild(element);
    }

    this.#taskFilterPresenter.unblockFilter();

    return updatedTask;
  };
}
