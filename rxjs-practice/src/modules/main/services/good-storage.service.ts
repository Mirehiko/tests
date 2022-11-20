import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MainModule } from "../main.module";
import { GoodRequestDto } from "src/app/dto/good-request-dto";
import { GoodResponseDto } from "src/app/dto/good-response-dto";
import { GoodRestService } from './rest/good-rest.service';


export interface IChanged<T> {
  from: string;
  item: T | null;
}

export interface IChangedList<T> {
  from: string;
  items: T[];
}

export interface IGoodChanged extends IChanged<GoodResponseDto> {}
export interface IGoodListChanged extends IChangedList<GoodResponseDto> {}

@Injectable({ providedIn: MainModule })
export class GoodStorageService {
  public goods: GoodResponseDto[] = [];
  public goods$ = new BehaviorSubject<IGoodListChanged>({from: '', items: []});
  public selectedGood$ = new BehaviorSubject<IGoodChanged>({ from: '', item: null });
  public selectedGoodId: number | string | null;
  public initialGoodChange: IGoodChanged = {from: '', item: null};
  public initialGoodListChange: IGoodListChanged = {from: '', items: []};

  constructor(
    private goodRestService: GoodRestService
  ) {
    this.getGoods();
  }

  public getGoods(): void {
    this.goodRestService.getList().subscribe(list => {
      this.goods = list;
      this.goods$.next({ from: '', items: this.goods });
    })
  }

  public selectGood(id?: number | string, from?: string): void {
    if (typeof id === 'undefined') {
      this.selectedGoodId = null;
      this.selectedGood$.next(this.initialGoodChange);
      return;
    }
    this.selectedGoodId = id;
    this.selectedGood$.next({from: from!, item: this.goods.find(good => good.id === id) || new GoodResponseDto()});
    // this.goods$.next({from: '', items: this.goods});
  }

  public async getGood(id: number): Promise<void> {
    this.goodRestService.getById(id).subscribe(good => {
      this.selectedGoodId = id;
      this.selectedGood$.next({ from: 'list', item: good });
    });
  }

  public async create(good: GoodRequestDto): Promise<void> {
    this.goodRestService.create(good).subscribe(result => {
      this.goods = [...this.goods, result];
      this.goods$.next({from: 'detail', items: this.goods });
    });
  }

  public async update(id: number, good: GoodRequestDto, from: string): Promise<void> {
    if (this.selectedGoodId = id) {
      this.selectedGood$.next({from, item: { id, ...good }});
    }

    this.goodRestService.update(id, good).subscribe(updatedGood => {
      this.goods = this.goods.map(good => good.id === id ? { ...updatedGood } : good);
      this.goods$.next({from, items: this.goods });
    });
  }

  public async delete(id: number): Promise<void> {
    this.goodRestService.delete(id);
    this.goods = this.goods.filter(good => good.id !== id);
    if (this.selectedGoodId === id) {
      this.selectedGood$.next(this.initialGoodChange);
    }
    this.goods$.next({from: 'detail', items: this.goods });
  }
}
