import { ExelComponent } from 'Scripts/core/ExelComponent';

export class Header extends ExelComponent {
  static className = 'header';
  toHTML() {
    return `
      <div class="header"><input class="input" type="text" value="Новая таблица" />
        <div class="header__icons">
          <div class="button"><i class="material-icons">exit_to_app</i></div>
          <div class="button"><i class="material-icons">delete</i></div>
        </div>
      </div>
    `;
  }
}
