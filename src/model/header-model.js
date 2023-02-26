import { userMock } from '../mock/user-mock.js';

export default class HeaderModel {

  // todo Удалить после интеграции с API
  #getUserDataSimulatedApi() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = userMock;
        return resolve(userData);
      }, 6000);
    });
  }

  async getUserData() {
    try {
      return await this.#getUserDataSimulatedApi(); // todo После интеграции API заменить на метод API
    } catch(err) {
      // Error
    }
  }
}
