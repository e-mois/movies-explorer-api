const allowedCors = [
  'https://emoiseev.diploma.nomorepartiesxyz.ru/',
  'http://emoiseev.diploma.nomorepartiesxyz.ru/',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
