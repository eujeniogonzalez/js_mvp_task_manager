import AbstractView from '../framework/view/abstract-view.js';
import { render } from '../framework/render.js';
import { PROJECT_NAME } from '../const.js';

function createFooterTemplate() {
  return `
    <footer>
      <div class="footer-domain">${PROJECT_NAME}</div>
    </footer>
  `;
}

export default class FooterView extends AbstractView {
  #bodyElement = null;

  constructor({ bodyElement }) {
    super();

    this.#bodyElement = bodyElement;
  }

  get template() {
    return createFooterTemplate();
  }

  render() {
    render(this, this.#bodyElement);
  }
}
