import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserCheckService {
  constructor(private readonly _http: HttpClient) {
  }

  public validate(control: AbstractControl): Observable<{ isAvailable: boolean }> {
    if (!control.value) {
      return of({ isAvailable: false });
    }
    return this._checkUsername(control.value);
  }

  private _checkUsername(username: string): Observable<{ isAvailable: boolean }> {
    return this._http.post<{ isAvailable: boolean }>('/api/checkUsername', { username });
  }
}
