const fs = require("fs");
const path = require("path");
const { hidden } = require("./utils");

function scan(folder){

  const items = fs.readdirSync(folder);
  const files = [];
  const skippedFolders = [];

  for(const item of items){

    if(hidden(item)) continue;

    const full = path.join(folder,item);

    let stat;

    try{
      stat = fs.statSync(full);
    }catch{
      continue;
    }

    if(stat.isFile()){
      files.push({
        name:item,
        path:full,
        size:stat.size
      });
    }

    if(stat.isDirectory()){
      skippedFolders.push(item);
    }
  }

  return {
    files,
    skippedFolders
  };
}

module.exports = scan;