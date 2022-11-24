import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';


@Component({
  selector: '[m-icon]',
  templateUrl: './m-icon.component.html',
  styleUrls: ['m-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'm-icon'
  }
})
export class MIconComponent {
}
