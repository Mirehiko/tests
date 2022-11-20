import { GoodResponseDto } from '../../../../app/dto/good-response-dto';
import { IListConfig, IListItem, SORT_WAY } from '../../components/list-module/base-list.component';


export const goodListConfig: IListConfig<GoodResponseDto> = {
  listDescription: [
    {
      field: 'name',
      header: 'Название'
    },
  ],
  sortFunction: (arr: IListItem<GoodResponseDto>[], field: string, sortWay: SORT_WAY): IListItem<GoodResponseDto>[] => {
    return arr.sort((a,b) => {
      const fieldValA = a.fields!.find(f => f.field === field);
      const fieldValB = b.fields!.find(f => f.field === field);

      if (fieldValA!.value < fieldValB!.value) {
        return 1;
      }
      if (fieldValA!.value > fieldValB!.value) {
        return -1;
      }
      return 0;
    })
  },
  searchable: true,
  editableItem: true,
  navigateTo: '/goods/item',
}
