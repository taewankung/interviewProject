import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export const EQUAL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualValidatorDirective),
  multi: true
};

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [EQUAL_VALIDATOR]
})

export class EqualValidatorDirective implements Validator {

  @Input() validateEqual: string;
  @Input() reverse: string;

  private get isReverse() {
      if (!this.reverse) return false;
      return this.reverse === 'true' ? true: false;
  }

  validate(c: AbstractControl): { [key: string]: any } {

    // self value
    let v = c.value;
    console.log(this.validateEqual);
    let e = c.root.get(this.validateEqual);
    // value not equal
    if(!this.isReverse){
    		e.setValue('');
    }
    if(e.value!=v && this.isReverse ){
    	console.log("false");
    	return {validateEqual:false};
    }
    else if(e.value==v){
    	console.log("true");
    	return null;
    }
    return null;
  }
}