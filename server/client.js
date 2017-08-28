import fs from 'fs';
import path from 'path';
import Repo, { GetReposInDir } from './repo';
import { PUSH_NAME, SET_DIRECTORIES } from '../src/actions/data';

const HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const DIRES = `${HOME}/projects`;

class Client {

  client = null;
  interval = null;

  constructor(client) {
    this.client = client;
    this.client.on('event', this.onEvent.bind(this));
    this.client.on('disconnect', this.onDisconnect.bind(this));
    this.log('CONNECTED');
    this.init();
  }

  get Id() {
    return this.client.id;
  }

  log(...params) {
    console.log(`CLIENT "${this.Id}"`, ...params);
  }

  push(name, value) {
    this.client.emit(`${name}`, value);
    this.log('pushed', name, value);
  }

  pushData(name, value) {
    this.push(PUSH_NAME, {
      name: name,
      value
    })
  }

  tick = 0;

  refresh() {
    this.repos = GetReposInDir(DIRES);
    this.pushData('repos', this.repos.map(v => v.Data));
  }

  init() {
    this.refresh();
    clearInterval(this.interval);
  }

  onEvent(data) {
    this.log('EVENT', data);
  }

  onDisconnect(data) {
    clearInterval(this.interval);
    this.log('DISCONNECT');
  }

}

export default Client;
