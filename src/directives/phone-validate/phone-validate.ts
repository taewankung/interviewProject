import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
//import { PhoneNumberUtil } from 'google-libphonenumber';

export const PHONE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PhoneValidateDirective),
  multi: true
};

@Directive({
    selector: '[validatePhone][formControlName],[validatePhone][formControl],[validatePhone][ngModel]',
    providers: [ PHONE_VALIDATOR ]
})

export class PhoneValidateDirective implements Validator {
  constructor() {
    console.log('Hello EmailValidateDirective Directive');
  }
  validate(c: AbstractControl): {[key: string]: any} {
    let regExp = /^[0-9\+]{1,}[0-9\-]{3,15}$/

    if (!regExp.test(c.value)) {
      return {"invalidPhone": true};}

    return null;
  }
}