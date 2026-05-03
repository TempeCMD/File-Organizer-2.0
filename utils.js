const aliases = require("./paths");
const path = require("path");

function ext(name){
  return path.extname(name).toLowerCase();
}

function hidden(name){
  return name.startsWith(".");
}

function now(){
  return Date.now();
}

function formatBytes(bytes){
  const sizes = ['B','KB','MB','GB','TB'];

  if(bytes === 0) return "0 B";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return (
    Math.round((bytes / Math.pow(1024,i)) * 100) / 100
  ) + " " + sizes[i];
}

function prefixFromFolder(folderPath){

  const p = folderPath.toLowerCase();

  if(p.includes("downloads")) return "DL";
  if(p.includes("desktop")) return "DT";
  if(p.includes("documents")) return "DC";
  if(p.includes("pictures")) return "PC";
  if(p.includes("music")) return "MS";
  if(p.includes("videos")) return "VD";

  const base = path.basename(folderPath).replace(/[^a-z0-9]/gi,"");

  if(base.length === 0) return "FD";

  return base.substring(0,2).toUpperCase();
}

function resolveShortcut(input){

  if(!input) return input;

  const lower = input.toLowerCase();

  if(aliases[lower]) return aliases[lower];

  for(const key in aliases){
    if(lower.startsWith(key + "\\")){
      const remain = input.slice(key.length + 1);
      return path.join(aliases[key], remain);
    }
  }

  return input;
}

module.exports = {
  ext,
  hidden,
  now,
  formatBytes,
  resolveShortcut,
  prefixFromFolder
};
