'use strict';

import Api from './github';

class Controllers {
  constructor(app) {
    this.app =  app;
  }

  startAPIs() {
    this.app.use(Api);
  }
}

export default Controllers;
