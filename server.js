const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// 👉 Servir les fichiers Angular compilés (dossier browser en Angular 17+)
app.use(express.static(path.join(__dirname, 'dist/gestionrhfront/browser')));

// 👉 Rediriger toutes les routes vers index.html (Angular router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/gestionrhfront/browser/index.html'));
});

app.listen(port, () => {
  console.log(`✅ Angular app running on http://localhost:${port}`);
});
