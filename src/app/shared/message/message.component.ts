import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NgForm } from '@angular/forms';
// import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()" class="p-message p-message-error">
      {{text}}
    </div>
  `,
  styles: [
    `.p-message{
      margin: 3px!important;
    }`
  ]
})
export class MessageComponent {

  @Input() error: string = '';
  @Input() control?: AbstractControl | FormControl | any |null;
  @Input() text: string = '';

  temErro():Boolean{
    return this.control? this.control.hasError(this.error) && this.control.dirty:true;
  }
}
