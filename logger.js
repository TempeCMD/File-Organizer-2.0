const { formatBytes } = require("./utils");

function stats(result){
  console.log("================================");
  console.log("FILE DIPINDAH :", result.moved);
  console.log("UKURAN TOTAL  :", formatBytes(result.totalSize));
  console.log("[REALTYPE]", signature(file.path));
  console.log("================================");

  for(const key in result.stats){
    console.log(key + " :", result.stats[key]);
  }

  console.log("================================");
}

module.exports = { stats };