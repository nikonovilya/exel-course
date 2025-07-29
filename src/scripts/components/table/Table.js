import { ExelComponent } from 'Scripts/core/ExelComponent';
import { createTable } from './table.template';

export class Table extends ExelComponent {
  static className = 'table';
  toHTML() {
    return createTable(20);
  }
}
