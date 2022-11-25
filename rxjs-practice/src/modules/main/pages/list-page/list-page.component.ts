import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoodRequestDto } from 'src/app/dto/good-request-dto';
import { GoodResponseDto } from '../../../../app/dto/good-response-dto';
import { SpeciesResponseDto } from '../../../../app/dto/species-response-dto';
import { IListItemField } from '../../components/list-module/base-list.component';
import { IListItemChanged } from '../../components/list-module/list-items/base-list-item.component';
import { CoreService } from '../../services/core.service';
import { GoodStorageService } from '../../services/good-storage.service';
import { goodListConfig } from './good-list.config';


@Component({
  selector: 'list-page-app',
  templateUrl: 'list-page.component.html',
  styleUrls: ['list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
  public goodList$: Observable<GoodResponseDto[]>
  public goodListConfig = goodListConfig;
  private sub$ = new Subscription();
  public goodList: GoodResponseDto[] = [];
  public isChildActive: boolean = false;
  private initiated: any;
  public page: FormControl;

  private subscription: any;
  private child: any

  constructor(
    public goodStorageService: GoodStorageService,
    private core: CoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.core.setTitle('Goods');
    this.page = new FormControl(this.goodStorageService.page);

    this.initiated = this.router.events.subscribe(e => {
        this.detectRouteChanges();
        this.initiated.unsubscribe();
    });

    this.sub$.add(this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd && this.child !== this.route.firstChild) {
        this.detectRouteChanges();
      }
    }));

    this.sub$.add(this.page.valueChanges.subscribe(p => {
      this.goodStorageService.page = p;
      this.goodStorageService.getGoods();
    }));

    this.sub$.add(this.goodStorageService.goods$
      .pipe(
        filter(data => data.from === 'detail' || data.from === ''),
        map(data => data.items),
      )
      .subscribe(items => {
        const speciesIds = this.goodStorageService.iSearchFilter.species?.map((s: SpeciesResponseDto) => s.id);
        this.goodList = items.filter(data => {
          let isName = true;
          if (this.goodStorageService.iSearchFilter.title) {
            isName = data.title.toLowerCase().includes(this.goodStorageService.iSearchFilter.title.toLowerCase());
          }
          let isDirector = true;
          if (this.goodStorageService.iSearchFilter.director) {
            isDirector = data.director.map(d => d.id).includes(this.goodStorageService.iSearchFilter.director.id)
          }
          let isSpecies = true;
          if (this.goodStorageService.iSearchFilter.species?.length) {
            isSpecies = !!data.species.map(s => s.id).filter(id => speciesIds!.includes(id)).length
          }
          return isName && isDirector && isSpecies;
        })
      }));
  }

  private detectRouteChanges(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.child = this.route.firstChild;
    this.subscription = this.route.firstChild!.url.subscribe(x => {
      this.isChildActive = !!x.length;
    });
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
  }

  onContentChanged(change: IListItemChanged<GoodResponseDto>) {
    const requestDto: GoodRequestDto = { ...change.item.data, ...{[`${change.fieldName}`]: change.content}};
    this.goodStorageService.update(change.item.id, requestDto, 'list');
  }

  onFieldClicked(field: IListItemField): void {
    // console.log(field)
  }

  onItemClicked(id: number | string) {
    this.router.navigate([`goods/item/${id}`]);
    // this.goodList = this.goodStorageService.goods$.value.items;
    this.goodStorageService.selectGood(id, 'list');
  }
}
