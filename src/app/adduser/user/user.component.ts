import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @Input() user!:User ; /** Input from parent component */
  @Output() userEmitter = new EventEmitter<String>();/** EventEmitter -> angular core \ Event-> interface \ userEmitter-> var to catch in parent html*/

  deleteUser(){
    this.userEmitter.emit(this.user.email);
  }
}
