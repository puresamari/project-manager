import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { PUSH_NAME } from '../../server/actions/data';

@Injectable()
export class DataService {
  private url = 'http://localhost:3000';
  private socket;

  private createObserverForName(name) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on(PUSH_NAME, (data) => {
        if (data.name === name) {
          observer.next(data.value);
        }
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  getProjectsObserver() {
    return this.createObserverForName('repos');
  }

  constructor() { }

}
