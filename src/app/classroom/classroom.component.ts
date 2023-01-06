import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timestamp } from 'rxjs';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  constructor(private eventService:EventsService){}
  @Input() classroomList!:String[] ; /** Input from parent component */
  classrooms!:any[] ;
  isMasterSel!:any[] ;
  @Output() emitClassroomList = new EventEmitter<any[]>();/** EventEmitter -> angular core \ Event-> interface \ eventEmitter-> var to catch in parent html*/

  ngOnInit(){

    this.loadAllClassrooms();
    console.log(this.classroomList)

  }

  loadAllClassrooms() {

    this.eventService.getClassrooms().subscribe((data) => {
      this.isMasterSel = data[1].map((d: any) => {
        return {
          block: d, isSelected: false
        }
      })
      this.classrooms = data[0].map((d: any) => {
        return {
          classroom: d.room_no,
          block: d.block,
          isSelected: false
        }
      })
      console.log(this.classrooms)

    });
  }

  masterchange(block: any) {
    this.isMasterSel.forEach((master) => {
      if (block == master.block ) {
        if(master.isSelected){
          this.classrooms.forEach((element) => {
            if (element.block == block) {
              element.isSelected = true;
            }
          });
        }
        else if(!master.isSelected){
          this.classrooms.forEach((element) => {
            if (element.block == block) {
              element.isSelected = false;
            }
          });
        }

      }
    })
    console.log(this.classrooms);
    this.emitClassList();
  }
  handle(block:any) {
    this.isMasterSel.forEach((master)=>{
      if(block==master.block){
        master.isSelected=false;
      }
    })
    this.emitClassList();
  }
  emitClassList(){
    let classList:String[]=[];
    this.classrooms.forEach((element)=>{
      if(element.isSelected){
        classList.push(element.classroom)
      }
    })
    console.log(classList)
    this.emitClassroomList.emit(classList);
  }

}
