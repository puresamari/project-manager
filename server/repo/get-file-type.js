const otherType = 'other';
const types = [
  {
    test: /^.*\.(ts)$/,
    type: 'typescript'
  },
  {
    test: /^.*\.(js)$/,
    type: 'javascript'
  },
  {
    test: /^.*\.(html|ejs)$/,
    type: 'html'
  }
];

const GetFileType = filename => {
  let retType = otherType;
  types.forEach(({ test, type }) => {
    if(test.test(filename)) {
      retType = type;
    }
  });
  return retType;
};

export default GetFileType;
