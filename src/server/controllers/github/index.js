'use strict';

import express from 'express';
import request from 'request';
import {isArrayAndContainsValues, isObjectPlainAndContainsValues} from '../../../shared/methods.js';

const router = express.Router();

var obj = {
  options: {
    headers: {
      'User-Agent': 'request',
      'Accept': 'application/vnd.github.v3+json'
    }
  }
};

function github(url) {
  return (req, res) => {
    let source = '/api/github';

    if (req.url.startsWith('/api/github') || req.url.startsWith('/api/github/')) {
      this.options.url = `https://api.github.com${req.url.substring(source.length)}`;
    } else {
      if (url) this.options.url = url;
    }

    request(this.options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      } else {
        res.status(400).json({error});
      }
    });
  };
}

router.get(`/api/github*`, github.call(obj));

export default router;
