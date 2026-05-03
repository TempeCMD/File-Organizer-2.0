const os = require("os");
const path = require("path");

const home = os.homedir();

module.exports = {
  dl: path.join(home, "Downloads"),
  desk: path.join(home, "Desktop"),
  doc: path.join(home, "Documents"),
  pic: path.join(home, "Pictures"),
  mus: path.join(home, "Music"),
  vid: path.join(home, "Videos"),

  dtest: "D:\\TEST",
  proj: "D:\\Project-JavascriptAW",
  game: "D:\\Games"
};