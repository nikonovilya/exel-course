import { DomListener } from 'Scripts/core/DomListener';

export class ExelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';

    this.prepare();
  }

  prepare() {
    
  }
  // Возвращает шаблон компонента в виде HTML строки
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
