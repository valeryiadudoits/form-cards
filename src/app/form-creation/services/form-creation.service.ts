import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { countryValidator } from "../../shared/validators/country.validator";
import { UserCheckService } from "./user-check.service";
import { UsernameValidator } from "../../shared/validators/username.validator";
import { HttpClient } from "@angular/common/http";
import { catchError, EMPTY, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormCreationService {
  private _showToast = false;
  private _usersForm: FormArray = this._fb.array([]);

  public get userForm(): FormArray {
    return this._usersForm;
  }

  public get showToast(): boolean {
    return this._showToast;
  }

  constructor(private readonly _fb: FormBuilder,
              private readonly _userCheck: UserCheckService,
              private readonly _http: HttpClient) {
  }

  public addFormGroup(): void {
    const formGroup: FormGroup = this._fb.group({
      country: ['', [Validators.required, countryValidator()]],
      username: ['', {
        asyncValidators: [UsernameValidator.createUsernameValidator(this._userCheck)],
        updateOn: 'blur'
      }],
      birthday: ['', Validators.required],
    });
    this._usersForm.push(formGroup);
  }

  public sendForm(): void {
    if (this._usersForm.invalid) {
      return;
    }
    const requestBody = this._usersForm.getRawValue();
    this._http.post<{ region: string }>('/api/submitForm', { requestBody })
      .pipe(
        tap({
          next: () => {
            this._showToast = true;
            this._usersForm.clear();
            this.addFormGroup();
          },
          error: err => {
            console.log('Error: ', err)
          }
        }),
      ).subscribe();
  }

  public hideToast(): void {
    this._showToast = false;
  }
}
