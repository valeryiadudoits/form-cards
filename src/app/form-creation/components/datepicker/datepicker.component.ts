import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit {
  @Input() public calendarControl!: FormControl;
  @Input() public disabledDatepicker = false;

  public yesterday: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate() - 1
  };

  public ngOnInit(): void {
    this._setYesterday();
  }

  public focusInput(input: HTMLInputElement): void {
    input.focus();
  }

  private _setYesterday(): void {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    this.yesterday = {
      year,
      month,
      day
    }
  }
}
