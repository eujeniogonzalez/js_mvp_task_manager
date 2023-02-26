import FooterView from '../view/footer-view.js';

export default class FooterPresenter {
  #footerView = null;
  #bodyElement = null;

  constructor({ bodyElement }) {
    this.#bodyElement = bodyElement;
    this.#footerView = new FooterView({ bodyElement: this.#bodyElement });
  }

  init() {
    this.#footerView.render();
  }
}
