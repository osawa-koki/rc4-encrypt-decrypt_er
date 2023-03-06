import Env from './next.config.js';
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: Env.basePath,
  title: '🦨 RC4 暗号化・復号サイト 🦨',
  waitingTime: 1000,
};

export default setting;
