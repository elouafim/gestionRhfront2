const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// servir les fichiers Angular compilés
app.use(express.static(path.join(__dirname, 'dist/gestionrhfront')));

// rediriger toutes les routes vers index.html (Angular router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/gestionrhfront/index.html'));
});

app.listen(port, () => {
  console.log(`✅ Angular app running on http://localhost:${port}`);
});
