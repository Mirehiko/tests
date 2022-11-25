import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoodRequestDto } from '../../../../app/dto/good-request-dto';
import { GoodResponseDto } from '../../../../app/dto/good-response-dto';
import { CoreService } from '../../services/core.service';
import { GoodStorageService } from '../../services/good-storage.service';
import { BaseDetailPage } from '../base-detail-page';


@Component({
  selector: 'details-page-app',
  templateUrl: 'details-page.component.html',
  styleUrls: ['details-page.component.scss']
})
export class DetailsPageComponent extends BaseDetailPage implements OnInit, OnDestroy {
  form: FormGroup;
  public goodIn: GoodResponseDto;
  private goodOut: GoodRequestDto;
  public descriptionPlaceholder: string = 'Описание товара';
  public namePlaceholder: string = 'Название товара';
  protected selectedSub$ = new Subscription();

  constructor(
    injector: Injector,
    core: CoreService,
    private goodStorageService: GoodStorageService,
    private router: Router,
  ) {
    super(injector);
    this.core = core;
    core.setTitle('Details');
  }

  protected async initData(): Promise<void> {}

  close(): void {
    this.goodStorageService.selectGood();
    this.router.navigate(['/']);
  }

  private async initForm(): Promise<void> {
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    this.destroy();
    this.selectedSub$.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.selectedSub$.add(this.goodStorageService.selectedGood$
      .pipe(filter(data => data.from === 'list'), map(data => data.item))
      .subscribe(item => {
      this.goodIn = item as GoodResponseDto;
      if (this.form) {
        this.form.patchValue({
          name: this.goodIn.title,
          description: this.goodIn.director
        })
      }
    }));
  }

  reset(): void {
    this.goodIn = new GoodResponseDto();
    this.goodOut = new GoodRequestDto();
  }

  async save(data?: any): Promise<void> {
    this.goodOut = new GoodRequestDto();
    this.goodOut.title = this.form.value.name.replace(/<[^>]*>/g, '');
    this.goodOut.director = this.form.value.description.replace(/<[^>]*>/g, '');
    if (this.isNew) {
      await this.goodStorageService.create(this.goodOut);
      this.goodStorageService.selectGood('new');
      this.form.reset();
    }
    else {
      await this.goodStorageService.update(this.goodIn.id, this.goodOut, 'detail');
    }
  }

  async delete(): Promise<void> {
    if ( this.isNew ) {
      return;
    }
    await this.goodStorageService.delete(this.goodIn.id);
    this.close();
  }
}
