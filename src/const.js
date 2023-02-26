const PROJECT_NAME = 'Personal Task Manager';

const SYMBOLS = {
  HASH: '#',
  EMPTY: ''
};

const TASK_ACTIONS = {
  HASHES: {
    OPEN: 'open',
    CLOSE: 'close'
  },
  ANCHORS: {
    OPEN: 'Возобновить',
    CLOSE: 'Закрыть',
    LOADING: 'Меняем...'
  }
};

const TASK_STATUSES = {
  CLOSED: 'Закрыто',
  ACTIVE: 'В работе'
};

const RENDER_PLACES = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend'
};

const LOADER_COLOR_CLASSES = {
  GREY: 'typing_loader_grey',
  WHITE: 'typing_loader_white'
};

export {
  PROJECT_NAME,
  SYMBOLS,
  TASK_ACTIONS,
  TASK_STATUSES,
  RENDER_PLACES,
  LOADER_COLOR_CLASSES
};
