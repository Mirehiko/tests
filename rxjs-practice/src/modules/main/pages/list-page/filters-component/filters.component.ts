import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GoodStorageService } from '../../../services/good-storage.service';

export interface IPort {
  name: string;
  id: number;
}

export interface IFilter {
  ports: IPort[];
  types: string[];
}

@Component({
  selector: 'filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.scss']
})
export class FiltersComponent {
  form: FormGroup;
  filter: IFilter;

  constructor(
    private goodStorage: GoodStorageService
  ) {
    this.filter = {
      ports: [
        {name: 'tag 1', id: 1},
        {name: 'tag 2', id: 2},
        {name: 'tag 3', id: 3},
      ],
      types: ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato']
    };

    this.initForm();
  }

  private async initForm(): Promise<void> {
    this.form = new FormGroup({
      name: new FormControl(''),
      ports: new FormControl([]),
      type: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(values => {
      console.log(values)
      this.goodStorage.goods$.next({
        from: '',
        items: this.goodStorage.goods.filter(data => data.name.includes(values.name))
      });
    });
  }
}
