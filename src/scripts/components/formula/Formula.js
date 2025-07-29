import { ExelComponent } from 'Scripts/core/ExelComponent';

export class Formula extends ExelComponent {
  static className = 'formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input']
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log('Formula: onInput', event.target.textContent.trim());
  }
}
