const fs = require('fs');
const path = require('path');

class StripNgVersionPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('StripNgVersionPlugin', () => {
      const outputPath = compiler.options.output.path;

      function processFile(filePath) {
        if (filePath.endsWith('.js')) {
          let content = fs.readFileSync(filePath, 'utf-8');
          content = content.replace(/\["ng-version","[0-9.]*"\]/g, '[]');
          fs.writeFileSync(filePath, content, 'utf-8');
        }
      }

      function walk(dir) {
        fs.readdirSync(dir).forEach(file => {
          const fullPath = path.join(dir, file);
          if (fs.statSync(fullPath).isDirectory()) walk(fullPath);
          else processFile(fullPath);
        });
      }

      walk(outputPath);
    });
  }
}

module.exports = {
  plugins: [new StripNgVersionPlugin()]
};
