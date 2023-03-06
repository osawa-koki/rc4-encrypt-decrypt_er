import Env from './next.config.js';
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: Env.basePath,
  title: '🐸 Next.js Template 🐸',
};

export default setting;
