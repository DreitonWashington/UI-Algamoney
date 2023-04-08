import { Component, Input, OnInit } from '@angular/core';
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
  @Input() control: any;
  @Input() text: string = '';

  temErro():any{
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
