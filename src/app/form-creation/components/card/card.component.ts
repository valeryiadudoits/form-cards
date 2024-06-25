import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { COUNTRIES } from "../../../shared/consts/country.consts";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() public userGroup!: FormGroup;
  @Input({ transform: booleanAttribute }) public disabledCard: boolean = false;

  public countries = [...COUNTRIES];

  public get calendarControl(): FormControl {
    return this.userGroup.controls['birthday'] as FormControl;
  }

}
