import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';


@Component({
  selector: 'm-label',
  templateUrl: './m-label.component.html',
  styleUrls: ['m-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'm-label'
  }
})
export class MLabelComponent {
}
