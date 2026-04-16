const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
        filelist = walkSync(path.join(dir, file), filelist);
      }
    }
    else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const files = walkSync(process.cwd());

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    // Buttons and badges
    .replace(/bg-primary text-white hover:bg-secondary/g, 'bg-brand-gradient text-white hover:brightness-110 hover:scale-[1.02]')
    .replace(/bg-primary text-white/g, 'bg-brand-gradient text-white')
    .replace(/bg-secondary text-white/g, 'bg-brand-gradient text-white')
    
    // Rounded corners update (upscale roundness)
    .replace(/rounded-md/g, 'rounded-lg')
    .replace(/rounded-lg/g, 'rounded-xl')
    
    // Shadows
    .replace(/shadow-sm/g, 'shadow-md')
    .replace(/shadow /g, 'shadow-md ');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated styling in: ' + file);
  }
});
console.log('Styling update complete!');
