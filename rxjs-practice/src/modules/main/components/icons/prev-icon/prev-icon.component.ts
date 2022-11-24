import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconDirective } from '../base-icon.directive';


@Component({
  selector: '[icon-prev]',
  templateUrl: './prev-icon.component.html',
  styleUrls: ['prev-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrevIconComponent extends BaseIconDirective {
  override fillColor = '#3C474C';
}
