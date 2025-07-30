export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    $el.focus().addClass('selected');
    this.group.push($el);
    this.current = $el;
  }

  clear() {
    this.group.forEach((el) => el.removeClass('selected'));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach((el) => el.addClass('selected'));
  }
}
