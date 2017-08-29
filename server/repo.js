import fs from 'fs';
import path from 'path';
import _ from 'lodash';

class Repo {
  directory = '';
  index = '';
  isNpm = false;
  detail = {};
  constructor(_dir, _index) {
    this.directory = _dir;
    this.index = _index;
    this.refreshInformation();
  }

  refreshInformation() {
    const packagePath = path.resolve(this.directory, 'package.json');
    this.isNpm = fs.existsSync(packagePath);
    if(!this.isNpm) { return; }
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
      detail: this.detail
    };
  }
  toString() {
    return 'REPO -> ' + this.directory;
  }
}

const GetDirectories = _dir => fs.readdirSync(_dir).filter(file => fs.lstatSync(path.join(_dir, file)).isDirectory());
const GetIsRepo = _dir => {
  let t = fs.readdirSync(_dir).filter(file => { return file === '.git'; });
  return t.length > 0;
}
const GetRepos = _dir => {
  if (!GetIsRepo(_dir)) {
    return GetDirectories(_dir).map(v => GetRepos(`${_dir}/${v}`));
  } else {
    return [_dir];
  }
}
const FlattenRepoDir = (_arr) => {
  const rs = _.flattenDeep(_arr);
  return rs.map((v, i) => new Repo(v, i));
}

export const GetReposInDir = _dir => {
  let _repos = GetRepos(_dir);
  return FlattenRepoDir(_repos);
}

export default Repo;
