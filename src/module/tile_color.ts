const colors: string[] =
  ['#8063db', '#DB4851', '#58a4db', '#dbcd42',
    '#47db9b', '#be51db', '#dc766e', '#DB244a',
    '#a0db42', '#DB3BDA', '#8144db', '#dba160',
    '#4b63db', '#dbd643', '#39aedb', '#bc44db', 'dba15a'];

const colors2: string[] = [
  '#8080ff', '#8178d0', '#1d2951', '#000080',
  '#101d6b', '#01ffff', '#4683b7', '#0147ab',
  '#0d52db', '79f6fc', '#588bae', '#57a0d3',
  '#1035ac', '#003152', '#008ecc', '87cdee', '42e0d1'
];

const colors3: string[] = [
  '#add8e6', '#89cff0', '#00ffef', '#0abab5',
  '#00b7eb', '#6495ed', '#007fff', '#4666ff',
  '#4166f5', '#4169e1', '#0072bb', '#0067a5',
  '#0047ab', '#0f4d92', '#000080', '#191970', 'black'
];

const fontSize: string[] =
  ['2.0rem', '2.0rem', '2.0rem', '2.0rem',
    '2.0rem', '2.0rem', '1.75rem', '1.75rem',
    '1.75rem', '1.5rem', '1.5rem', '1.5rem',
    '1.5rem', '1.25rem', '1.25rem', '1.25rem', '1.25rem'];

export default colors3.reduce((acc, ele, idx) => {
  const key = String(2 ** (idx + 1));
  acc[key] = {
    backColor: ele,
    fontSize: fontSize[idx]
  }
  return acc
}, {});