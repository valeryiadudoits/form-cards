import { AbstractControl, ValidatorFn } from "@angular/forms";
import { COUNTRIES } from "../consts/country.consts";

export function countryValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: { value: string } } | null => {
    const forbidden = !COUNTRIES.includes(control.value);
    return forbidden ? { forbiddenCountry: { value: control.value } } : null;
  };
}
