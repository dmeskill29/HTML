const fs = require('fs');
const path = require('path');

const title = 'My Page';
const description = 'This is my page.';

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

const newPagePath = path.join(__dirname, `${title}.html`);

fs.writeFile(newPagePath, newPageContent, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});