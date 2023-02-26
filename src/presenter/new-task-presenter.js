import NewTaskView from '../view/new-task-view.js';
import LoaderView from '../view/loader-view.js';
import { render } from '../framework/render.js';
import { LOADER_COLOR_CLASSES } from '../const.js';

export default class NewTaskPresenter {
  #tasksControlElement = null;
  #tasksModel = null;
  #tasksPresenter = null;
  #newTaskView = null;
  #loaderView = new LoaderView({ loaderColorClass: LOADER_COLOR_CLASSES.WHITE });
  #taskFilterPresenter = null;

  constructor({ tasksControlElement, tasksModel, tasksPresenter, taskFilterPresenter }) {
    this.#tasksControlElement = tasksControlElement;
    this.#tasksModel = tasksModel;
    this.#tasksPresenter = tasksPresenter;
    this.#newTaskView = new NewTaskView({
      onTaskCreate: this.#createTask,
      loaderView: this.#loaderView
    });
    this.#taskFilterPresenter = taskFilterPresenter;
  }

  render() {
    render(this.#newTaskView, this.#tasksControlElement);
  }

  #createTask = async ({ taskText }) => {
    this.#taskFilterPresenter.blockFilter();

    const newTask = await this.#tasksModel.createTask({ taskText });

    this.#tasksPresenter.renderTask(newTask);

    this.#taskFilterPresenter.unblockFilter();
  };
}
