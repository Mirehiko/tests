import { GoodResponseDto } from '../../../../app/dto/good-response-dto';
import { IListConfig } from '../../components/list-module/base-list.component';


export const goodListConfig: IListConfig<GoodResponseDto> = {
  listDescription: [
    {
      field: 'name',
      header: 'Название',
    },
  ],
  editableItem: true,
  navigateTo: '/goods/item',
}
