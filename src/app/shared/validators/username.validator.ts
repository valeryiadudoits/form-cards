import { UserCheckService } from "../../form-creation/services/user-check.service";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, of } from "rxjs";

export class UsernameValidator {
  static createUsernameValidator(userCheckService: UserCheckService): AsyncValidatorFn {
    let controlValue = '';
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        controlValue = '';
        return of({ required: true })
      }
      if (controlValue !== control.value) {
        controlValue = control.value;
        return userCheckService
          .validate(control)
          .pipe(
            map(({ isAvailable }) =>
              isAvailable ? null : { usernameAlreadyExists: true }
            )
          );
      }
      return of(control.errors)
    }
  }
}
