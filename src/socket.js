import Socket from 'socket.io-client';
import { setData } from 'actions/data';

class _S {
  socket = null;
  constructor(store){
    this.store = store;
    this.socket = new Socket('http://localhost:3123');
    this.socket.on('connect', this.onConnect.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on('server:data', this.onData.bind(this));
    console.log(this.socket)
  }

  onConnect(){
    console.log('connected with id', this.socket.id);
  }

  onDisconnect(){
    console.log('disconnected');
  }

  onData(data){
    console.log('data', data);
    this.store.dispatch(setData(data.name, data));
  }
}

export default _S;
