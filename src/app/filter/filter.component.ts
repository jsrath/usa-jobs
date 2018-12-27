import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output()
  onFilter = new EventEmitter();
  filterValue;

  filterResults() {
    this.onFilter.emit(this.filterValue);
  }
}
