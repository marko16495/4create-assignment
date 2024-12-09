import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Injectable, inject} from '@angular/core';
import {SnackbarComponent} from './snackbar.component';
import {SnackbarConfig} from './snackbar.config';

@Injectable()
export class SnackbarService {

  private readonly _overlay = inject(Overlay);

  private _overlayRef?: OverlayRef;

  info(text: string) {
    this.open({
      text: text,
    });
  }

  open(snackbarConfig: Partial<SnackbarConfig>) {
    this._detach(this._overlayRef);
    const overlayRef = this._overlay.create({
      panelClass: 'app-snackbar-panel',
      positionStrategy: this._overlay.position().global().bottom('50px').centerHorizontally()
    });
    const snackbarComponentPortal = new ComponentPortal(SnackbarComponent);
    const componentRef = overlayRef.attach(snackbarComponentPortal);
    componentRef.instance.color = snackbarConfig.color ?? 'primary';
    componentRef.instance.text = snackbarConfig.text;
    setTimeout(() => this._detach(overlayRef), snackbarConfig.duration ?? 2000);
    componentRef.instance.dismiss.subscribe(() => this._detach(overlayRef));
    this._overlayRef = overlayRef;
  }

  private _detach(overlayRef?: OverlayRef) {
    overlayRef?.detach();
  }

}
