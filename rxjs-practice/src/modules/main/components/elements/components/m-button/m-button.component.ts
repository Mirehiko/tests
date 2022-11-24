import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';



@Component({
  selector: '[m-button]',
  templateUrl: './m-button.component.html',
  styleUrls: ['m-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'm-btn'
  }
})
export class MButtonComponent {
}
