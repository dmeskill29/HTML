const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('./postslist.json', 'utf-8'));
  let postLinks = posts.map(post => `<a href="/Posts/${post.title}.html">${post.title}</a>`).join('<br>');
  
  const homeHtml = fs.readFileSync(path.join(__dirname, '/home.html'), 'utf-8');
  const updatedHomeHtml = homeHtml.replace('<div id="post-button">', `<div id="post-button">\n${postLinks}`);

  res.send(updatedHomeHtml);
});

app.get('/submit', (req, res) => {
  const { title, description } = req.query;

  const newPageContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
    </head>
    <body>
      <h1>${title}</h1>
      <p>${description}</p>
    </body>
    </html>
  `;

  const newPagePath = path.join(__dirname, '/Posts', `${title}.html`);

  fs.writeFile(newPagePath, newPageContent, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    const posts = JSON.parse(fs.readFileSync('./postslist.json', 'utf-8'));
    posts.push({ title, description });
    fs.writeFileSync('./postslist.json', JSON.stringify(posts));
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});