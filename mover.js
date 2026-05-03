const fs = require("fs");
const path = require("path");
const config = require("./config");
const { ext, prefixFromFolder } = require("./utils");

function category(extension){

  for(const key in config.categories){
    if(config.categories[key].includes(extension)){
      return key;
    }
  }

  return config.unknownFolder;
}

function unique(filePath){

  if(!fs.existsSync(filePath)) return filePath;

  const dir = path.dirname(filePath);
  const ex = path.extname(filePath);
  const base = path.basename(filePath,ex);

  let i = 1;

  while(true){

    const next = path.join(dir, `${base}_${i}${ex}`);

    if(!fs.existsSync(next)) return next;

    i++;
  }
}

function move(folder, files){

  const prefix = prefixFromFolder(folder);

  const history = [];
  const createdFolders = [];
  const stats = {};

  let moved = 0;
  let errors = 0;
  let totalSize = 0;

  for(const file of files){

    try{

      const cat = category(ext(file.name));
      const folderName = `${prefix}-${cat}`;

      const targetFolder = path.join(folder, folderName);

      if(!fs.existsSync(targetFolder)){
        fs.mkdirSync(targetFolder,{recursive:true});
        createdFolders.push(folderName);
      }

      let target = path.join(targetFolder,file.name);

      target = unique(target);

      fs.renameSync(file.path,target);

      history.push({
        from:file.path,
        to:target
      });

      stats[cat] = (stats[cat] || 0) + 1;

      moved++;
      totalSize += file.size;

    }catch{
      errors++;
    }
  }

  fs.writeFileSync(
    "history.json",
    JSON.stringify(history,null,2)
  );

  return {
    moved,
    errors,
    totalSize,
    createdFolders,
    stats
  };
}

module.exports = move;