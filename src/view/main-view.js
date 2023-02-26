import AbstractView from '../framework/view/abstract-view.js';
import { render } from '../framework/render.js';

function createMainTemplate() {
  return `
    <main class="main">
      <div class="page-title">
        <h3>Планировщик задач</h3>
      </div>

      <div class="tasks-control"></div>

      <div class="section_splitter"></div>

      <div class="tasks-list"></div>
    </main>
  `;
}

export default class MainView extends AbstractView {
  #bodyElement = null;

  constructor({ bodyElement }) {
    super();

    this.#bodyElement = bodyElement;
  }

  get template() {
    return createMainTemplate();
  }

  render() {
    render(this, this.#bodyElement);
  }
}
