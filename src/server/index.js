import colors from 'colors';
import express from 'express';
import path from 'path';
import Controllers from './controllers';
import bodyParser from 'body-parser';

const app = express();
const dir = (src) => path.resolve(__dirname, src);

// Settings:
app.set('port', 3000);
app.set('iface', '0.0.0.0');
app.set('x-powered-by', false);

// Middlewares:
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded.
app.use(bodyParser.json()); // Parse application/json.
app.use('/fonts',   express.static(dir('../frontend/assets/fonts'))); // Public assets.
app.use('/scripts', express.static(dir('../frontend/assets/js')));
app.use('/styles',  express.static(dir('../frontend/assets/css')));
app.use('/images',  express.static(dir('../frontend/assets/img')));
app.use('/app',     express.static(dir('../bundles')));
app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) {
    next();
  } else {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1, user-scalable=no'>
        <meta http-equiv="X-UA-Compatible" content="IE=10; IE=9; IE=8; IE=7; IE=EDGE">
        <meta charset="utf-8">
        <meta name='description' content=''>
        <meta name='keywords' content=''>
        <meta name='author' content=''>
        <link rel='shorcut icon' href='/images/favicon.ico' type='image/x-icon' />
        <link rel="stylesheet" href="/app/styles.css" media="screen" title="no title" charset="utf-8" />
        <title>GItHub Test API</title>
      </head>
      <body>
        <main id='app'></main>
        <script src='/app/frontend.js'></script>
      </body>
    </html>`);
  }
});

const server = app.listen(app.get('port'), app.get('iface'), () => {
  const controllers = new Controllers(app);
  controllers.startAPIs();
  console.log(`Server running at http://${app.get('iface')}:${app.get('port')} in ${process.env.NODE_ENV} environment`.yellow);
});
