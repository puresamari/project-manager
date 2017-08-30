import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import GetFileType from './get-file-type';
import GetFilesInDir from './get-files-in-dir';

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

  files = [];
  loadingFiles = true;

  constructor(_dir, _index) {
    this.directory = _dir;
    this.index = _index;

    this.observable = new Observable(observer => {
      this.observer = observer;
      this.refreshInformation();
      return () => { };
    });
  }

  subscribe(fn) {
    this.observable.subscribe(fn);
  }

  refreshFileAmounts() {
    this.loadingFiles = true;
    this.files = [];
    return new Promise(() => {
      this.files = GetFilesInDir(this.directory);
      this.loadingFiles = false;
      this.observer.next();
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

  get Data() {
    return {
      index: this.index,
      directory: this.directory,
      isNpm: this.isNpm,
      detail: this.detail,
      files: this.files,
      loading: this.loadingFiles,
      loadingFiles: this.loadingFiles
    };
  }
  toString() {
    return 'REPO -> ' + this.directory;
  }
}

export default Repo;
