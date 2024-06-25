import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ContainerComponent } from "./components/container/container.component";
import { CardComponent } from "./components/card/card.component";
import { AddingCardComponent } from "./components/adding-card/adding-card.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbInputDatepicker, NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { ValidateInputDirective } from "../shared/directives/validate-input.directive";

const components = [ContainerComponent, CardComponent, AddingCardComponent, DatepickerComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbInputDatepicker,
    ValidateInputDirective,
    NgOptimizedImage,
    NgbToast
  ],
  exports: [...components]
})
export class FormCreationModule {
}
