import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormCreationService } from "../../services/form-creation.service";
import { FormArray, FormGroup } from "@angular/forms";
import { MAX_USERS_NUMBER } from "../../../shared/consts/form.consts";
import { finalize, interval, map, Observable, Subject, take, takeUntil, tap } from "rxjs";
import { INTERVAL_TIME, TIME_PAD_THRESHOLD, TIMER_DELAY, ZERO_MINUTES } from "../../../shared/consts/time.consts";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit, OnDestroy {
  public timer$: Observable<string> | null = null;
  private _stopTimer$ = new Subject<void>();
  private _timerInSeconds = 0;

  public get formArray(): FormArray {
    return this._formCreationService.userForm;
  }

  public get cardGroup(): FormGroup[] {
    return this._formCreationService.userForm.controls as FormGroup[];
  }

  public get formLimitExceed(): boolean {
    return !(this.cardGroup.length < MAX_USERS_NUMBER);
  }

  public get showToast(): boolean {
    return this._formCreationService.showToast;
  }

  constructor(private readonly _formCreationService: FormCreationService) {
  }

  public ngOnInit() {
    this.addNewUser();
  }

  public ngOnDestroy() {
    this._stopTimer$.next();
    this._stopTimer$.complete();
  }

  public addNewUser(): void {
    this._formCreationService.addFormGroup();
  }

  public onSubmitBtnClicked(): void {
    this._disableForm();
    this.timer$ = interval(INTERVAL_TIME).pipe(take(TIMER_DELAY),
      map(res => TIMER_DELAY - ++res),
      tap(res => this._timerInSeconds = res),
      map(res => ZERO_MINUTES + (res < TIME_PAD_THRESHOLD ? ('0' + res) : res)),
      takeUntil(this._stopTimer$),
      finalize(() =>
        this.onTimerCancel()
      )
    );
  }

  public onTimerCancel(): void {
    if (!this._timerInSeconds) {
      this._sendForm();
    }
    this._stopTimer$.next();
    this.timer$ = null;
    this._enableForm();
  }

  public onHideToast() {
    this._formCreationService.hideToast();
  }

  private _disableForm(): void {
    this.formArray.disable();
  }

  private _enableForm(): void {
    this.formArray.enable();
  }

  private _sendForm(): void {
    this._formCreationService.sendForm();
  }
}
