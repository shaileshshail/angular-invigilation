import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private eventService: EventsService, private router: Router, private ref: ChangeDetectorRef) {

  } /** whenever class is created get data */
  addMessage!: any;
  events: any[] = [];
  newEvent: any = {
    id: 0,
    title: '',
    session: 'FN',
    date: (new Date).toISOString().split('T')[0],
    classrooms: '[ ]',
  };

  isLoading() {
    return false;
  }

  handleChildReturn(id: number) {
    this.eventService.deleteEvent(id).subscribe(
      (data) => {
        console.log(data);
      }, (error) => { },
       () => {
        this.events=[]

        this.loadAllEvents();
      }
    );
  }
  hand(event: any) {
    this.newEvent.classrooms = JSON.stringify(event);
    console.log(this.newEvent.classroom);

  }




  loadAllEvents() {
    console.log('here')
    this.eventService.getEvents().subscribe((data) => {
      this.events = data.map((d) => {
        return {
          date: d.date,
          classrooms: d.classrooms,
          title: d.title,
          session: d.session,
          id: d.id,
        };
      });
      this.ref.detectChanges();
    }, (error) => {
      console.log(error)
    });
  }
  ngOnInit(): void {
    this.loadAllEvents();
  }

  addEvent() {
    console.log(this.newEvent)
    this.eventService.addEvents(this.newEvent).subscribe(
      (data) => {
        console.log(data);

        this.addMessage = data;
        this.loadAllEvents();
      }
    );
  }


}
