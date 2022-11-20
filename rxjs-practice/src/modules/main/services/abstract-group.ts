export class BaseGroupList<T extends {id: number}> {
  private _childCount: number = 0;
  private _list: T[] = [];

  constructor(name: string, items: T[] = []) {
    this._list = items;
  };

  public insertTo(item: any, position?: number): void {
    if (position) {
      this._list.splice(position, 0, item);
    }
    else {
      this._list.push(item);
    }
  }

  public updateItem(item: T): void {
    this._list.map(i => i.id == item.id ? item : i);
  }

  public remove(item: T): void {
    this._list = this.list.filter(i => item.id !== i.id);
  }

  public get list(): T[] {
    return this._list;
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
    this._childCount = 0;
  }
}
