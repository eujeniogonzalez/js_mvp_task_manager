import TaskFilterView from '../view/task-filter-view.js';
import { render } from '../framework/render.js';

export default class TaskFilterPresenter {
  #taskFilterView = null;
  #tasksControlElement = null;
  #tasksModel = null;
  #tasksPresenter = null;

  constructor({ tasksControlElement, tasksModel, tasksPresenter }) {
    this.#taskFilterView = new TaskFilterView({ onFilterTasks: this.#filterTasks });
    this.#tasksControlElement = tasksControlElement;
    this.#tasksModel = tasksModel;
    this.#tasksPresenter = tasksPresenter;
  }

  get checked() {
    return this.#taskFilterView.checked;
  }

  render() {
    render(this.#taskFilterView, this.#tasksControlElement);
  }

  blockFilter() {
    this.#taskFilterView.blockFilter();
  }

  unblockFilter() {
    this.#taskFilterView.unblockFilter();
  }

  #filterTasks = ({ taskFilterChecked }) => {
    const filteredTasks = this.#tasksModel.getFilteredTasks({ taskFilterChecked });

    this.#tasksPresenter.renderTasks(filteredTasks);
  };
}
