import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import GetFileType from './get-file-type';

const TestFiles = [
  'rest.js',
  'rest.o',
  'rest.t'
];

class Repo {
  observer;
  observable;

  directory = '';
  index = '';
  isNpm = false;
  detail = {};

  fileTypesAmounts = {};
  fileAmount = 0;
  loadingFiles = true;

  constructor(_dir, _index) {
    this.directory = _dir;
    this.index = _index;
    this.refreshInformation();

    this.observable = new Observable(observer => {
      this.observer = observer;
      return () => { };
    })
  }

  subscribe(fn) {
    this.observable.subscribe(fn);
  }

  fillFileByName(name) {
    const type = GetFileType(name);
    if (this.fileTypesAmounts[type]) {
      this.fileTypesAmounts[type] += 1;
    } else {
      this.fileTypesAmounts[type] = 1;
    }
  }

  refreshFileAmounts() {
    this.loadingFiles = true;
    this.fileAmount = 0;
    this.fileTypesAmounts = {};
    return new Promise(() => {
      setTimeout(() => {
        const files = [...TestFiles];
        this.fileAmount = files.length;
        files.forEach(fileName => this.fillFileByName(fileName));
        this.loadingFiles = false;
        this.observer.next();
      }, 2000);
    });
  }

  refreshInformation() {
    const packagePath = path.resolve(this.directory, 'package.json');
    this.isNpm = fs.existsSync(packagePath);
    this.refreshFileAmounts();
    if (!this.isNpm) { return; }
    this.detail = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  }

  name = '';
  get Information() {
    return {
      name: this.name
    };
  }

  get FilesPercentages() {
    const Percentages = {};
    Object.keys(this.fileTypesAmounts).map(v => {
      Percentages[v] = this.fileTypesAmounts[v] / this.fileAmount;
    });
    return Percentages;
  }

  get Data() {
    return {
      index: this.index,
      directory: this.directory,
      isNpm: this.isNpm,
      detail: this.detail,
      filesPercentages: this.FilesPercentages,
      loading: this.loadingFiles,
      loadingFiles: this.loadingFiles
    };
  }
  toString() {
    return 'REPO -> ' + this.directory;
  }
}

export default Repo;
