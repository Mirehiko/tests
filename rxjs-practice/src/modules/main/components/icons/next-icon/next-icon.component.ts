import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconDirective } from '../base-icon.directive';


@Component({
  selector: '[icon-next]',
  templateUrl: './next-icon.component.html',
  styleUrls: ['next-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextIconComponent extends BaseIconDirective {
  override fillColor = '#347CFF';
}
