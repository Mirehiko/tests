import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';


@Component({
  selector: 'm-select-trigger',
  templateUrl: './m-select-trigger.component.html',
  styleUrls: ['m-select-trigger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'm-select-trigger'
  }
})
export class MSelectTriggerComponent {
  constructor() {
  }
}
