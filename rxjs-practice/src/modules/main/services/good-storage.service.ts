import { Injectable } from "@angular/core";
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { DirectorResponseDto } from '../../../app/dto/director-response-dto';
import { SpeciesResponseDto } from '../../../app/dto/species-response-dto';
import { MainModule } from "../main.module";
import { GoodRequestDto } from "src/app/dto/good-request-dto";
import { GoodResponseDto } from "src/app/dto/good-response-dto";
import { ISearchData, ISearchFilter } from '../pages/list-page/filters-component/filters.component';
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
  public filters: ISearchData = {
    species: [],
    directors: []
  };
  public filters$ = new BehaviorSubject<ISearchData>(this.filters);
  public initialFilter: ISearchFilter = {};
  public iSearchFilter: ISearchFilter = {};
  public page = {prev: 0, current: 1, next: 2};
  public page$ = new BehaviorSubject(this.page);

  constructor(
    private goodRestService: GoodRestService
  ) {
    this.getGoods();
  }

  public setPage(page: any) {
    this.page = page;
    this.page$.next(this.page);
  }

  public getGoods(): void {
    this.goodRestService.getList(this.page.current).subscribe(list => {
      this.filters.directors = list.map(item => item.director)
        .reduce((acc, cur) => [...acc, ...cur], [])
        .filter((spec: DirectorResponseDto) => !this.filters.directors.map(item => item.id).includes(spec.id));
      this.filters.species = list.map(item => item.species)
        .reduce((acc, cur) => [...acc, ...cur], [])
        .filter((spec: SpeciesResponseDto) => !this.filters.species.map(item => item.id).includes(spec.id));

      this.filters$.next(this.filters);
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
    // this.goods$.next-icon({from: '', items: this.goods});
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

  public update(id: number, good: GoodRequestDto, from: string): void {
    let goodTmp = this.goods.find(good => good.id === id)!;

    this.goodRestService.update(id, good).subscribe(updatedGood => {
      goodTmp = Object.assign(goodTmp, updatedGood);
      this.goods = this.goods.map(sGood => sGood.id === id ? { ...goodTmp } : sGood);
      this.goods$.next({from, items: this.goods });
      if (this.selectedGoodId = id) {
        goodTmp.title = good.title || goodTmp.title;
        this.selectedGood$.next({from, item: goodTmp});
      }
    });
  }

  public async delete(id: number): Promise<void> {
    await this.goodRestService.delete(id);
    this.goods = this.goods.filter(good => good.id !== id);
    if (this.selectedGoodId === id) {
      this.selectedGood$.next(this.initialGoodChange);
    }
    this.goods$.next({from: 'detail', items: this.goods });
  }
}
