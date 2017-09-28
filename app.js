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

if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);

const html = pug.renderFile(path.join(__dirname, 'src', 'views', 'index.pug'));
writeFile('index.html', html);

const data = fs.readFileSync(path.join(cssDir, 'master.styl'), { encoding: 'utf8' });
stylus(data)
  .include(cssDir)
  .include(path.join(__dirname, 'node_modules', 'iconfonts', 'stylesheets'))
  .render((err, css) => {
    if (err) throw err;
    writeFile('styles.css', css);
  });

writeFile('CNAME', 'thaddeusreid.com');
