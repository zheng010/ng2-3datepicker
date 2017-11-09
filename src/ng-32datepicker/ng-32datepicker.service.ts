import { NodeEvent } from './ng-32datepicker.events';
import { Observable, Subject } from 'rxjs/Rx';
import { ElementRef, Inject, Injectable } from '@angular/core';


@Injectable()
export class D3datepickerService {


    public fNextMonth$: Subject<NodeEvent> = new Subject<NodeEvent>();
    public fBackMonth$: Subject<NodeEvent> = new Subject<NodeEvent>();
    public fSelectedNode$:Subject<NodeEvent> = new Subject<NodeEvent>();

    setNextMonth(message: string) {
        this.fNextMonth$.next({ text: message });
    }

    setBackMonth(message: string) {
        this.fBackMonth$.next({ text: message });
    }

    setSelectedNode(node: any){
        this.fSelectedNode$.next(node);
    }
}