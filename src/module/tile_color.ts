interface ITileColor {
  [key: string]: {
    backColor: string;
    fontSize: string;
  }
}

const colors: string[] =
  ['#8063db', '#DB5340', '#58a4db', '#dbcd42',
    '#47db9b', '#be51db', '#db766e', '#DB4851',
    '#a0db42', '#DB3BDA', '#8144db', '#dba160',
    '#4b63db', '#dbd643', '#39aedb', '#bc44db', 'dba15a'];

const fontSize: string[] =
  ['1.0rem', '1.0rem', '1.0rem', '1.0rem',
    '1.0rem', '1.0rem', '1.0rem', '1.0rem',
    '1.0rem', '1.0rem', '1.0rem', '1.0rem',
    '1.0rem', '1.0rem', '1.0rem', '1.0rem', '1.0rem'];

const ret: ITileColor = {};
colors.forEach((ele, idx) => {
  const key = 2 ** (idx + 1);
  ret[key] = {
    backColor: ele,
    fontSize: fontSize[idx]
  }
})

export default ret;