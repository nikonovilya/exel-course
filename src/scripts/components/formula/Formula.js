import { ExelComponent } from 'Scripts/core/ExelComponent';

export class Formula extends ExelComponent {
  static className = 'formula'
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }
}
