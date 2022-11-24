import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconDirective } from '../base-icon.directive';


@Component({
  selector: '[icon-arrow]',
  templateUrl: './arrow-icon.component.html',
  styleUrls: ['arrow-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrowIconComponent extends BaseIconDirective {
  override fillColor = '#2962FF';
}
