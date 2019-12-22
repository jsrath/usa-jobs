import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  filterValue: string;

  @Output()
  onFilter = new EventEmitter();

  @Output()
  onClearFilter = new EventEmitter();

  filterResults() {
    this.onFilter.emit(this.filterValue);
  }

  clearFilter() {
    this.filterValue = '';
    this.onClearFilter.emit();
  }
}
