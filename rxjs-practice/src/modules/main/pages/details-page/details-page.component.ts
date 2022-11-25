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
  public namePlaceholder: string = 'Title';
  protected selectedSub$ = new Subscription();
  public directors: string;
  public species: string;

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
        this.directors = this.goodIn.director.map(d => d.name).join(', ');
        this.species = this.goodIn.species.map(d => d.name).join(', ');
        this.goodIn.createdAt = new Date(this.goodIn.createdAt).toLocaleDateString();
        if (this.form) {
          this.form.patchValue({
            name: this.goodIn.title,
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
    // this.close();
  }
}
