import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IListItem } from '../base-list.component';


export interface IListItemChanged<T> {
  content: string;
  fieldName: string;
  item: IListItem<T>
}
@Component({
  selector: 'app-base-list-item',
  templateUrl: './base-list-item.component.html',
  styleUrls: ['base-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseListItemComponent<T> {
  @Input() item: IListItem<T>;
  @Input() selectable: boolean = false;
  @Input() selected: boolean = false;
  @Input() editable: boolean = true;
  @Output() contentChanged: EventEmitter<IListItemChanged<T>> = new EventEmitter<IListItemChanged<T>>();
  @Output() clicked: EventEmitter<IListItem<T>> = new EventEmitter<IListItem<T>>();

  @HostBinding('class.selected') get class() {
    return this.selected;
  };

  onContentChanged(content: string, fieldName: string): void {
    this.item.data[fieldName] = content;
    this.contentChanged.emit({ content: content.replace(/<[^>]*>/g, ''), fieldName, item: this.item });
  }

  onClicked(): void {
    this.clicked.emit(this.item);
  }
}
