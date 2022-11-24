import {
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
  Component,
  OnInit,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { nanoid } from 'nanoid';
import { IListItemChanged } from './list-items/base-list-item.component';


export type BaseList<T> = T[];

export interface IListGroup {
  name: string;
  type: any;
}

export interface IListItemFieldDescription {
  field: string;
  header: string;
  valueGetter?: (params: any) => string;
  template?: string;
  hidden?: boolean;
}

export class IBaseListItem<T> {
  id: number;
  data: any;
  position?: number;
  selected?: boolean;
  groupId?: string;
}

export interface IListItemField extends IListItemFieldDescription {
  value: any;
}

export class IListItem<T> extends IBaseListItem<T>{
  fields?: IListItemField[];
}

export interface IListConfig<T> {
  listDescription: IListItemFieldDescription[];
  groups?: IListGroup[];
  groupDivider?: (data: T[], type: any) => T[];
  selectable?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  editableItem?: boolean;
  navigateTo?: string;
  checkboxOnly?: boolean;
  lockNavigateToItemOnKey?: boolean;
}

@Component({
  selector: 'app-base-list',
  templateUrl: 'base-list.component.html',
  styleUrls: ['base-list.component.scss']
})
export class BaseListComponent<T extends {id: number}> implements OnInit, OnChanges {
  @Input() listName: string = '';
  @Input() selectedId: number | string | null;
  @Input() dataList: T[] | null = [];
  @Input() config: IListConfig<T>;
  @Output() itemClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() contentChanged: EventEmitter<IListItemChanged<T>> = new EventEmitter<IListItemChanged<T>>();
  @Output() lastChange: EventEmitter<IListItemChanged<T>> = new EventEmitter<IListItemChanged<T>>();
  @Output() itemAction: EventEmitter<IListItemAction> = new EventEmitter<IListItemAction>();
  @ContentChild('customTemplate') customTemplate: TemplateRef<any>;
  public sortWay: SORT_WAY = SORT_WAY.INC;
  public selectedField: string;
  public SORT_WAY = SORT_WAY;

  public searchText = '';
  filteredList: any[] = [];
  groupDivider: (data: any[], type: any) => any[];
  groupedList: BaseGroupList<IListItem<T>>;

  constructor(
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.groupedList = new BaseGroupList<T>(this.listName);
    this.selectedField = this.config.listDescription[0].field;
    this.groupDivider = this.config.groupDivider ? this.config.groupDivider : this.groupDivider;
    this.refresh();
  }

  identify(index: number, item: IListItem<T>): number {
    return item.data;
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (!this.groupedList) { return; }

    if (changes['dataList']) {
      this.dataList = changes['dataList'].currentValue;
      this.refresh();
      this.groupedList.list[0].sort(this.selectedField, this.sortWay);
    }

    if (changes['selectedId']) {
      this.groupedList.list[0].list = this.groupedList.list[0].list.map((i => {
        i.selected = i.id === this.selectedId ? true : false;
        return i;
      }));
    }

  }

  async refresh(): Promise<void> {
    await this.divideOnGroups();
  }

  async divideOnGroups(): Promise<void> {
    this.groupedList.clear();
    if (this.config.groups && this.config.groups.length && this.config.groupDivider) {
      this.config.groups.forEach(group => {
        const groupInst = new BaseListOfGroup<IListItem<T>>(group.name);
        const filteredGroupData = this.groupDivider(this.dataList!, group.type);
        filteredGroupData.map(item => {
          groupInst.insertTo(this.getMappedItem(item));
        });
        this.groupedList.addGroup(groupInst);
      });
    }
    else {
      const groupInst = new BaseListOfGroup<IListItem<T>>('');
      this.dataList!.forEach(item => {
        groupInst.insertTo(this.getMappedItem(item));
      });
      this.groupedList.addGroup(groupInst);
    }
  }

  private getMappedItem(item: any): IListItem<T> {
    const dataItem: IListItem<T> = {
      id: item.id,
      data: item,
      fields: [],
    };
    dataItem.selected = typeof this.selectedId === 'number' && this.selectedId === item.id;
    this.config.listDescription.map((listDesc: IListItemFieldDescription) => {
      dataItem?.fields?.push({
        value: listDesc.valueGetter ? listDesc.valueGetter(item) : item[listDesc.field],
        ...listDesc
      });
    });
    return dataItem;
  }

  sortBy(field: string, way: SORT_WAY): void {
    if (!this.config.listDescription.length) {
      return;
    }
    this.selectedField = field;
    this.sortWay = way === SORT_WAY.INC ? SORT_WAY.DEC : SORT_WAY.INC;
    this.groupedList.list[0].sort(this.selectedField, this.sortWay);
  }

  onItemClicked(item: IListItem<T>): void {
    this.itemClicked.emit(item.id);
  }

  onContentChanged(change: IListItemChanged<T>): void {
    this.contentChanged.emit(change);
    this.groupedList.list[0].sort(this.selectedField, this.sortWay);
  }

  onItemAction(id: number, action: ListItemOption): void {
    this.itemAction.emit({id, action});
  }

  onKeyBoardEvent(event: KeyboardEvent): void {
    // TODO: handle keyboardEvent
  }
}

export enum SORT_WAY {
  INC,
  DEC
}


export class BaseListOfGroup<T> {
  private _list: IListItem<T>[] = [];
  private _name: string;
  readonly _id: string;


  constructor(name: string, items: any = []) {
    this._name = name;
    this._list = items;
    this._id = nanoid();
  };

  public set name(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public insertTo(item: IListItem<T>, position?: number): void {
    if (position) {
      this._list.splice(position, 0, item);
    }
    else {
      this._list.push(item);
    }
  }

  public remove(item: IListItem<T>): void {
    this._list = this.list.filter(i => item.id !== i.id);
  }

  public get list(): IListItem<T>[] {
    return this._list;
  }

  public set list(list: IListItem<T>[]) {
    this._list = list;
  }

  public sort(field: string, sortWay: SORT_WAY): IListItem<T>[] {
    this._list = [...this._list].sort((a,b) => {
      const fieldValA = a.fields!.find(f => f.field === field);
      const fieldValB = b.fields!.find(f => f.field === field);

      if (fieldValA!.value < fieldValB!.value) {
        return sortWay === SORT_WAY.DEC ? 1 : -1;
      }
      if (fieldValA!.value > fieldValB!.value) {
        return sortWay === SORT_WAY.DEC ? -1 : 1;
      }
      return 0;
    });
    return this._list;
  }

  public get id(): string {
    return this._id;
  }

  public setItemPosition(id: number, position: number): void {
    const currentItemPosition = this._list.findIndex(d => d.id === id);
    if (currentItemPosition === -1) {
      return;
    }
    const element = this._list.splice(currentItemPosition, 1);
    this._list.splice(position, 0, element[0]);
  }

  public clear(): void {
    this._list = [];
  }
}

export class BaseGroupList<T> {
  private _list: BaseListOfGroup<T>[] = [];
  private _name: string;
  readonly _pinnedRows: BaseListOfGroup<T>;

  constructor(name: string, items: BaseListOfGroup<T>[] = []) {
    this._name = name;
    this._list = items;
    this._pinnedRows = new BaseListOfGroup<T>('Pinned');
  };

  public set name(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public addGroup(group: BaseListOfGroup<T>): void {
    this._list.push(group);
  }

  public get list(): BaseListOfGroup<T>[] {
    return this._list;
  }

  public pin(groupId: string, item: IListItem<T>): void {
    this._pinnedRows.insertTo(item);
    this._list.map(group => {
      if (group._id === groupId) {
        group.remove(item);
      }
    });
  }

  public unpin(groupId: string, item: IListItem<T>): void {
    this._pinnedRows.remove(item);
    this._list.map(group => {
      if (group._id === groupId) {
        group.insertTo(item);
      }
    });
  }

  public removeGroup(id: string): void {
    this._list = this._list.filter(g => g.id !== id);
  }

  public clear(): void {
    this._list = [];
  }

}

export enum InsertListItem {
  BEFORE,
  AFTER
}

export interface IListItemAction {
  id: number;
  action: ListItemOption;
}

export enum ListItemOption {
  SELECT = 'selectTask',
  CHANGE_POSITION = 'changePosition',
  ADD_CHILD = 'addChild',
  PIN = 'pin',
  MOVE = 'move',
  COPY = 'copy',
  DELETE = 'delete',
  MOVE_TO_TRASH = 'moveToTrash',
  COPY_LINK = 'copyLink',
}

export interface IActionListItem<T> {
  name: string;
  action: T;
}
