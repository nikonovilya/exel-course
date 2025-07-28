import { ExelComponent } from 'Scripts/core/ExelComponent';

export class Exel {
  constructor(selector, options = {}) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = document.createElement('div');
    $root.classList.add('exel');

    this.components.forEach((Component) => {
      const component = new Component(this.$el, {});
      $root.insertAdjacentHTML('beforeend', component.toHTML());
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
