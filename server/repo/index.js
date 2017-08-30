import fs from 'fs';
import _ from 'lodash';
import path from 'path';

import Repo from './repo';

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
