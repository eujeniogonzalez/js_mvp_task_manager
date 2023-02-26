import HeaderView from '../view/header-view.js';
import LoaderView from '../view/loader-view.js';
import { LOADER_COLOR_CLASSES } from '../const.js';

export default class HeaderPresenter {
  #loaderView = new LoaderView({ loaderColorClass: LOADER_COLOR_CLASSES.GREY });
  #headerView = null;
  #bodyElement = null;
  #headerModel = null;

  constructor({ bodyElement, headerModel }) {
    this.#bodyElement = bodyElement;
    this.#headerModel = headerModel;
    this.#headerView = new HeaderView({ bodyElement: this.#bodyElement, loaderView: this.#loaderView });
  }

  init() {
    this.#headerView.render();

    this.#headerModel.getUserData().then(this.#headerView.setUserName);
  }
}
