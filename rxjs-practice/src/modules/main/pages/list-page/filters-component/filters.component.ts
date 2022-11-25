import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DirectorResponseDto } from '../../../../../app/dto/director-response-dto';
import { SpeciesResponseDto } from '../../../../../app/dto/species-response-dto';
import { GoodStorageService } from '../../../services/good-storage.service';

export interface ISearchData {
  directors: DirectorResponseDto[];
  species: SpeciesResponseDto[];
}
export interface ISearchFilter {
  species?: SpeciesResponseDto[];
  director?: DirectorResponseDto;
  title?: string;
}

@Component({
  selector: 'filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.scss']
})
export class FiltersComponent implements OnDestroy {
  form: FormGroup;
  filter: ISearchData;
  sub$: Subscription = new Subscription();
  constructor(
    private goodStorage: GoodStorageService
  ) {

    this.initForm();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  private async initForm(): Promise<void> {
    this.form = new FormGroup({
      title: new FormControl(''),
      species: new FormControl([]),
      director: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.sub$.add(
      this.goodStorage.filters$.subscribe(value => {
        this.filter = value
      }),
    );

    this.sub$.add(this.form.valueChanges.subscribe(values => {
      const speciesIds = values.species.map((s: SpeciesResponseDto) => s.id);
      this.goodStorage.iSearchFilter = {
        title: `${values.title}` || '',
        director: values.director || '',
        species: [...values.species]
      };
      this.goodStorage.goods$.next({from: '', items: this.goodStorage.goods});
    }));
  }
}
