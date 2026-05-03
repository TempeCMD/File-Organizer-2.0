const fs = require("fs");
const path = require("path");

function scanLarge(folder, minMB = 100) {
  const result = [];
  const items = fs.readdirSync(folder);

  for (const item of items) {
    const full = path.join(folder, item);

    try {
      const stat = fs.statSync(full);

      if (stat.isFile()) {
        const mb = stat.size / 1024 / 1024;

        if (mb >= minMB) {
          result.push({
            name: item,
            sizeMB: mb.toFixed(2)
          });
        }
      }
    } catch {}
  }

  return result;
}

module.exports = { scanLarge };