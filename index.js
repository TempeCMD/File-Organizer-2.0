const fs = require("fs");
const path = require("path");
const readline = require("readline");

const scan = require("./scanner");
const move = require("./mover");
const { signature } = require("./signature");
const { scanLarge } = require("./spacekiller");
const { resolveShortcut } = require("./utils");

const {
  now,
  formatBytes
} = require("./utils");

function line(){
  console.log("======================================");
}

function ask(text, callback){

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(text, answer => {
    rl.close();
    callback(answer.trim());
  });
}

function help(){

  line();
  console.log("FILE ORGANIZER HELP");
  line();

  console.log("node index.js");
  console.log("  buka menu");

  console.log("");
  console.log('node index.js organize "D:\\TEST"');
  console.log("  organize folder target");

  console.log("");
  console.log("node index.js undo");
  console.log("  undo perpindahan terakhir");

  console.log("");
  console.log("node index.js help");
  console.log("  tampilkan panduan");

  console.log("");
  console.log("INFO:");
  console.log("- default scan = root only");
  console.log("- subfolder tidak diproses");
  console.log("- folder organizer auto prefix");

  line();
}

function summary(target, scanResult, result, startTime){

  line();
  console.log("SESSION SUMMARY");
  line();

  console.log("Target Folder :", target);
  console.log("Scan Mode     : Root Only");
  console.log("Files Found   :", scanResult.files.length);
  console.log("Moved         :", result.moved);
  console.log("SkippedFolder :", scanResult.skippedFolders.length);
  console.log("Errors        :", result.errors);
  console.log("Size Moved    :", formatBytes(result.totalSize));
  console.log(
    "Time          :",
    ((now() - startTime)/1000).toFixed(2),
    "sec"
  );

  console.log("");

  if(result.createdFolders.length){
    console.log("Created Folders:");
    result.createdFolders.forEach(x=>console.log("- " + x));
  }

  console.log("");

  console.log("Category Stats:");
  for(const key in result.stats){
    console.log("- " + key + ": " + result.stats[key]);
  }

  line();
}

function organize(folder){

  if(!folder){
    ask("Masukkan path folder: ", organize);
    return;
  }

  folder = resolveShortcut(folder);

  if(!fs.existsSync(folder)){
    console.log("Folder tidak ditemukan.");
    return;
  }

  const startTime = now();

  console.log("[START]", folder);
  console.log("[MODE] Root Only");

  const scanResult = scan(folder);

  console.log("[FOUND]", scanResult.files.length, "files");

  if(scanResult.skippedFolders.length){
    console.log("[SKIP SUBFOLDER]", scanResult.skippedFolders.length);
  }

  if(scanResult.files.length === 0){
    console.log("Tidak ada file.");
    return;
  }

  line();
  console.log("Preview:");
  scanResult.files.slice(0,10).forEach(f=>{
    console.log("- " + f.name);
  });
  line();

  ask("Lanjut organize? (y/n): ", ans => {

    if(ans.toLowerCase() !== "y"){
      console.log("Dibatalkan.");
      return;
    }

    const result = move(folder, scanResult.files);

    console.log("[DONE]", result.moved, "moved");

    summary(folder, scanResult, result, startTime);
  });
}

function undo(){

  if(!fs.existsSync("history.json")){
    console.log("Belum ada history.");
    return;
  }

  const data = JSON.parse(
    fs.readFileSync("history.json")
  );

  let count = 0;

  for(const item of data.reverse()){

    try{

      if(fs.existsSync(item.to)){

        const dir = path.dirname(item.from);

        if(!fs.existsSync(dir)){
          fs.mkdirSync(dir,{recursive:true});
        }

        fs.renameSync(item.to,item.from);
        count++;
      }

    }catch{}
  }

  console.log("Undo selesai.");
  console.log("Restored:", count);
}

function menu(){
  line();
  console.log("FILE ORGANIZER");
  line();

  console.log("1. Organize Folder");
  console.log("2. Undo Last");
  console.log("3. Space");
  console.log("4. Help");
  console.log("5. Exit");

  line();

  ask("Pilih menu (1-5): ", ans => {

    if(ans === "1") return organize();
    if(ans === "2") return undo();
    if(ans === "3"){
      space();
      return menu();
    }
    if(ans === "4"){
      help();
      return menu();
    }
    if(ans === "5"){
      process.exit();
    }

    process.exit();
  });
}

const cmd = process.argv[2];

if(cmd === "help"){
  help();
}
else if(cmd === "undo"){
  undo();
}
else if(cmd === "organize"){
  organize(process.argv[3]);
}
if(cmd === "space"){
 const data = scanLarge(process.argv[3], 100);

 console.log("Large files:");
 data.forEach(x=>{
   console.log(x.name, "-", x.sizeMB + " MB");
 });
}
else{
  menu();
}