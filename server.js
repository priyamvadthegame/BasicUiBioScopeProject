const express = require('express');

const app = express();

app.use(express.static('./dist/bio-scope-project'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/bio-scope-project/'}
  );
  });

  app.listen(process.env.PORT || 9090);