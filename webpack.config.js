const fs = require('fs');
const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// Dynamically read all directories under `src/` to create entry points
const getEntries = () => {
  const srcDir = path.resolve(__dirname, 'src');
  const entries = {};

  // Read all directories under `src/`
  fs.readdirSync(srcDir).forEach((folder) => {
    const folderPath = path.join(srcDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      // Each directory becomes an entry point
      entries[folder] = path.join(folderPath, 'index.js');
    }
  });

  return entries;
};

module.exports = {
  ...defaultConfig,
  entry: getEntries(),  // Dynamically set entry points based on src/ folder structure
  output: {
    ...defaultConfig.output,
    filename: '[name].bundle.js', // Use the folder name as the output filename
  },
};
