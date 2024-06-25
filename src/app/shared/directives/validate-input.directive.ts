import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { FormControl, NgControl } from "@angular/forms";
import { InputColor } from "../enum/input-color";

@Directive({
  selector: '[appValidateInput]',
  standalone: true
})
export class ValidateInputDirective {
  @Input() public appValidateInput: string = '';
  @Input() public validateControl!: FormControl;

  constructor(private readonly _el: ElementRef,
              private readonly _renderer: Renderer2,
              private readonly _ngControl: NgControl) {
  }

  @HostListener('focusout') onFocusout(): void {
    this._validateInput();
  }

  private _validateInput(): void {
    if (!this._ngControl) {
      return;
    }
    const control = this._ngControl.control;
    const styleColor = control?.valid ? InputColor.Valid : InputColor.Invalid;
    this._setInputBorder(styleColor);
    const errorMessage = control?.invalid ? `Please provide a correct ${this.appValidateInput}` : '';
    this._setValidationMessage(errorMessage);
  }

  private _setValidationMessage(message: string) {
    const parent = this._el.nativeElement.parentElement;
    const errorElement = parent.querySelector('.validation-message');

    if (errorElement) {
      parent.removeChild(errorElement);
    }

    if (message) {
      const div = this._renderer.createElement('div');
      const text = this._renderer.createText(message);
      this._renderer.addClass(div, 'validation-message');
      this._renderer.setStyle(div, 'color', InputColor.Invalid);
      this._renderer.appendChild(div, text);
      this._renderer.appendChild(parent, div);
    }
  }

  private _setInputBorder(styleColor: InputColor) {
    const inputElement = this._el.nativeElement;
    this._renderer.setStyle(inputElement, 'border', `1px solid ${styleColor}`);
  }
}
