import config from './config/general.config';
import app from '@src/app';

app.listen(config.port, config.host, () => {
  console.log(`Server running on port ${config.port}`);
});
