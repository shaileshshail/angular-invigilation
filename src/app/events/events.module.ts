import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventComponent } from './event/event.component';
import { EventsService } from '../services/events.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [EventsComponent,EventComponent],
  providers:[EventsService],
  imports: [
    CommonModule,FormsModule
  ],
  exports:[EventsComponent],/** sending EventsComponent to app.module for use in app-events in app.html */
})
export class EventsModule { }
