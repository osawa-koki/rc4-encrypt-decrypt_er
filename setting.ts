import Env from './next.config.js';
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: Env.basePath,
  title: 'π¦¨ RC4 ζε·εγ»εΎ©ε·γ΅γ€γ π¦¨',
  waitingTime: 1000,
};

export default setting;
