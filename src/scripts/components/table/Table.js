import { ExelComponent } from 'Scripts/core/ExelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';

export class Table extends ExelComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(45);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    console.log(this.$root.find('[data-id="0:0"]'))
    this.selection.select(this.$root.find('[data-id="0:0"]'));
    console.log('init')
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
