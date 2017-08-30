import { Injectable } from '@angular/core';
import Extensions from 'github-colors/lib/extensions.json';
import _ from 'lodash';

const DEFAULT_CAT = {
  ace_mode: "undefined",
  aliases: ["undefined"],
  codemirror_mime_type: "",
  codemirror_mode: "",
  color: "#ccc",
  extensions: [],
  filenames: [],
  language_id: -1,
  tm_scope: "",
  type: "undefined"
}

class File {
  private filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }
  private getLastOfSplit(_str: string, split: string): string {
    const splits = _str.split(split);
    return splits[splits.length - 1];
  }
  get Name(): string {
    return this.getLastOfSplit(this.filePath, '/');
  }
  get Extension(): string {
    const fileParts = ''
    return this.getLastOfSplit(this.Name, '.').toLowerCase();
  }
}

@Injectable()
export class FileCategoriesService {

  constructor() {
    console.log('EXTENSIONS', Extensions);
  }

  private _getFileCategoryFromKey(key: string, file: File): boolean {
    const EXT = Extensions[key];
    return EXT.extensions.indexOf(`.${file.Extension}`) >= 0;
  }
  private _getFileCategory(file: File): string {
    return Object.keys(Extensions).find(k => this._getFileCategoryFromKey(k, file));
  }
  getCategoryData(key) {
    const CAT = Extensions[key];
    return CAT || DEFAULT_CAT;
  }
  getFileCategoriesKeys(files: string[]) {
    return files.map(file => this._getFileCategory(new File(file)));
  }
  getFileCategories(files: string[]) {
    const Keys = files.map(file => this._getFileCategory(new File(file)));
    const cats = {};
    Keys.forEach(key => {
      if (!cats[key]) {
        cats[key] = {
          amount: 0
        };
      }
      cats[key].amount += 1;
    });
    const categories: object[] = [];
    Object.keys(cats).forEach(key => {
      cats[key].percentage = cats[key].amount / files.length;
      cats[key].data = this.getCategoryData(key);
      cats[key].key = key;
      categories.push(cats[key]);
    });
    const categories2 = _.orderBy(categories, 'percentage', 'desc');
    return _.sortBy(categories2, ({ key }) => key === 'undefined');
  }
  getFileCategoryKey(file: string) {
    return this._getFileCategory(new File(file));
  }
}

