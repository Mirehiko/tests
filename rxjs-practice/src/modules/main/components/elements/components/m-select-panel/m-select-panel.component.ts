import {
  ChangeDetectionStrategy,
  Component, ElementRef, OnDestroy, OnInit
} from '@angular/core';
import { fromEvent, Subject, Subscription, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogService } from '../../services/dialog.service';


@Component({
  selector: 'm-select-panel',
  templateUrl: './m-select-panel.component.html',
  styleUrls: ['m-select-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'm-select-panel'
  }
})
export class MSelectPanelComponent implements OnInit, OnDestroy {
  public static counter = 0;
  private _destroy$ = new Subject<void>();
  private sub$ = new Subscription();

  constructor(
    private el: ElementRef,
    private dialogService: DialogService
  ) {
    MSelectPanelComponent.counter++;
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngOnInit(): void {
    const documentClick$ = fromEvent(document, 'click');
    this.sub$.add(documentClick$.pipe(
      map((evt: any) => {
        evt.stopPropagation();
        if (evt.target.closest('.m-select-panel')) {
          return;
        }
        if (evt.type === 'click' && evt.target.closest('.m-dialog-overlay')) {
          this.dialogService.removeComponent();
        }
      }),
      takeUntil(this._destroy$)
    ).subscribe());
  }
}
