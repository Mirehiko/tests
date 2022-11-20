import { Pipe, PipeTransform } from '@angular/core';
import { IListItem } from '../base-list.component';


@Pipe({ name: 'appFilter' })
export class FilterPipe<T> implements PipeTransform {
  transform(items: IListItem<T>[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(it => it.fields!.filter(field => field.value.toLowerCase().includes(searchText)).length);
  }
}
