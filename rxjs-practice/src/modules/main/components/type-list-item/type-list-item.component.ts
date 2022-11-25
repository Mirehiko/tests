import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { GoodResponseDto } from '../../../../app/dto/good-response-dto';
import { IListItemField } from '../list-module/base-list.component';
import { BaseListItemComponent } from '../list-module/list-items/base-list-item.component';


@Component({
  selector: '[type-list-item]',
  templateUrl: './type-list-item.component.html',
  styleUrls: ['type-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeListItemComponent extends BaseListItemComponent<GoodResponseDto> {
  @Output() fieldClicked: EventEmitter<IListItemField> = new EventEmitter<IListItemField>();
  onFieldClicked(field: IListItemField): void {
    this.fieldClicked.emit(field);
  }
}
