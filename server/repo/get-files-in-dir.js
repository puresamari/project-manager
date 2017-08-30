import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const exclude = /(node_modules|.git)/;

const GetFilesInAbsoluteDir = dir => {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const isPath = fs.lstatSync(fullPath).isDirectory();
    if (isPath) {
      if (exclude.test(fullPath)) { return; }
      files = [
        ...files,
        ...GetFilesInAbsoluteDir(fullPath)
      ];
    } else {
      files.push(fullPath);
    }
  });
  return files;
};

const GetFilesInDir = dir => {
  return GetFilesInAbsoluteDir(dir).map(v => v.replace(dir, ''));
};

export default GetFilesInDir;
