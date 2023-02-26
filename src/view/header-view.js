import AbstractView from '../framework/view/abstract-view.js';
import { render } from '../framework/render.js';
import { PROJECT_NAME } from '../const.js';

function createHeaderTemplate() { // todo Удалить ссылки
  // todo Заменить одинарные кавычки двойными
  return `
    <header>
      <div class="header_content">
        <div class="header_section_left">
          <a class="header_site_name" href="https://personaltaskmanager.ru/user/">${PROJECT_NAME}</a>
        </div>

        <div class="header_section_center">
          <a id="logo" href="https://personaltaskmanager.ru">
            <img src="https://personaltaskmanager.ru/themes/main/private/private_images/logo/pingua.png" />
          </a>
        </div>

        <div class="header_section_right">
          <div class='login-menu'>
            <a href=''  class='login-menu-btn'>
              <div class='login-menu-btn-link'></div>
              <div class='login-menu-btn-pic'>
                <img src="/images/interface/private_profile_icon_50x50.png" />
              </div>
            </a>

            <div  class='login-menu-list'>
              <ul>
                <li><a href="#">Root</a></li>
                <li><a href="#">Задачи</a></li>
                <li><a href="#">Настройки</a></li>
                <li><a href="#">Выйти</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

export default class HeaderView extends AbstractView {
  #bodyElement = null;
  #userNameContainer = this.element.querySelector('.login-menu-btn-link');
  #loaderView = null;

  constructor({ bodyElement, loaderView }) {
    super();
    this.#bodyElement = bodyElement;
    this.#loaderView = loaderView;
  }

  get template() {
    return createHeaderTemplate();
  }

  render() {
    render(this, this.#bodyElement);
    this.#insertLoaderIntoUserName();
  }

  setUserName = (userData) => {
    this.#removeLoaderFromUserName();
    this.#userNameContainer.textContent = userData.name; // todo Экранировать данные с сервера
  };

  #insertLoaderIntoUserName() {
    render(this.#loaderView, this.#userNameContainer);
  }

  #removeLoaderFromUserName() {
    this.#userNameContainer.innerHTML = '';
    this.#loaderView.removeElement();
  }
}
