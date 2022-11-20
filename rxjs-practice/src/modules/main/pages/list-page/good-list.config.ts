import { IListConfig } from '../../components/list-module/base-list.component';


export const goodListConfig: IListConfig = {
  listDescription: [
    {
      field: 'name',
    },
  ],
  searchable: true,
  editableItem: true,
  navigateTo: '/goods/item',
}
