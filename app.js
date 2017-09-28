const fs = require('fs');
const path = require('path');
const pug = require('pug');
const stylus = require('stylus');

const buildDir = path.join(__dirname, 'dist');
const cssDir = path.join(__dirname, 'src', 'assets', 'css');

function writeFile(filename, data) {
  fs.writeFile(path.join(buildDir, filename), data, (err) => {
    if (err) throw err;
  });
}


// build the `dist` directory if it doesn't exist
if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);

// tranform pug -> html
writeFile('index.html', pug.renderFile(path.join(__dirname, 'src', 'views', 'index.pug')));

// transform stylus -> css
stylus(fs.readFileSync(path.join(cssDir, 'master.styl'), { encoding: 'utf8' }))
  .include(cssDir)
  .include(path.join(__dirname, 'node_modules', 'iconfonts', 'stylesheets'))
  .render((err, css) => {
    if (err) throw err;
    writeFile('styles.css', css);
  });

// include CNAME for gh-pages DNS resolution
writeFile('CNAME', 'thaddeusreid.com');
