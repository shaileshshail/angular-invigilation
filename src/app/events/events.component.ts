import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../interfaces/event';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  constructor(private eventService: EventsService, private router: Router, private ref: ChangeDetectorRef) {

  } /** whenever class is created get data */
  events: any[] = [];
  newEvent: any = {
    id: 0,
    title: '',
    session: 'FN',
    date: '',
    classrooms: '[ ]',
  };

  isLoading() {
    return false;
  }
  handleChildReturn(id: number) {
    this.eventService.deleteEvent(id).subscribe(
      (data) =>{ console.log(data);this.loadAll();}
    );
  }

  loadAll() {
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
    });
  }
  ngOnInit(): void {
    this.loadAll();
  }

  addEvent() {
    this.eventService.addEvents(this.newEvent).subscribe(
      (data) => { console.log(data);    this.loadAll();
      }
    );
  }


}
