import { Directive,Input } from '@angular/core';
import {  AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/switchMap';
/**
 * Generated class for the UserValidateDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[user-validate][formControlName],[user-validate][formControl],[user-validator][ngModel]', // Attribute selector
  providers: [{provide: NG_VALIDATORS, useExisting: UserValidateDirective, multi: true}]
})
export class UserValidateDirective {
  @Input() check: string;
  past:boolean;
  constructor(public authen:AuthService) {
    console.log('Hello UserValidateDirective Directive');
  }

  private get isCheck() {
      if (!this.check) return false;
      return this.check === 'true' ? true: false;
  }
  validate(c: AbstractControl): {[key: string]: any} {
    let regExp = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

    if(this.isCheck){
      console.log('////////////////isCheck///////////');
      if (!regExp.test(c.value)) {
        return {"invalidText": true};
      }
      // this.checkUser(c.value);
      // if(!this.past){
      //     return {"invalidText": true};
      // }
      //   else return null;
      }
      

    else{ if (!regExp.test(c.value)) {
        return {"invalidText": true};
      }

      return null;
    }
  }

  checkUser(data){
    this.authen.checkUser(data).subscribe(
      (success)=>{
        console.log('////////////////director///////////');
        console.log(success);
        console.log(data);
        this.past=success;
      });
  }
}
