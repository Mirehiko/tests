import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: '[item-body]',
  templateUrl: './item-body-block.component.html',
  styleUrls: ['item-body-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'item-body__block'
  }
})
export class ItemBodyBlockComponent {
}
