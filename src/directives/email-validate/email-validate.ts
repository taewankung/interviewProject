import { Directive, } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';


/**
 * Generated class for the EmailValidateDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[email-validator][formControlName],[email-validator][formControl],[email-validator][ngModel]', // Attribute selector
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidateDirective, multi: true}]
})
export class EmailValidateDirective {

  constructor() {
    console.log('Hello EmailValidateDirective Directive');
  }
  validate(c: AbstractControl): {[key: string]: any} {
    let regExp = /(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/

    if (!regExp.test(c.value)) {
      return {"invalidEmail": true};}

    return null;
  }
}
