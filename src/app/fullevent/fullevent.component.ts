import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { EventsService } from '../services/events.service';
import { Event } from '../interfaces/event';


@Component({
  selector: 'app-fullevent',
  templateUrl: './fullevent.component.html',
  styleUrls: ['./fullevent.component.css']
})
export class FulleventComponent implements OnInit{
  constructor(private activatedRouter:ActivatedRoute,private eventService:EventsService,private ref: ChangeDetectorRef){}
  id:number=0;
  event:any={};

  retriveData(){
    this.id=Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.eventService.getEvent(this.id).subscribe((data) =>{
      this.event=data;
      console.log(data);      this.ref.detectChanges();

    });
  }
  ngOnInit(){
    this.retriveData();
  }
  isLoading(){
    return this.eventService.isLoading;
  }
  updateEvent(){
    this.eventService.updateEvent(this.id,this.event).subscribe(
      (data)=>{console.log(data);this.retriveData()}
    )

  }
  deleteEvent(){
    console.log('deleted');
  }

}
