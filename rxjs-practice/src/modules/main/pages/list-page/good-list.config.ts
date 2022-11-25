import { GoodResponseDto } from '../../../../app/dto/good-response-dto';
import { IListConfig } from '../../components/list-module/base-list.component';


export const goodListConfig: IListConfig<GoodResponseDto> = {
  listDescription: [
    {
      field: 'title',
      header: 'Title',
    },
    {
      field: 'director',
      header: 'Director',
      valueGetter(data: GoodResponseDto) {
        return data.director.map(d => d.name).join(', ');
      }
    },
    {
      field: 'createdAt',
      header: 'Created',
      valueGetter(data: GoodResponseDto) {
        return new Date(data.createdAt).toLocaleDateString();
      }
    },

  ],
  editableItem: true,
  navigateTo: '/goods/item',
}
