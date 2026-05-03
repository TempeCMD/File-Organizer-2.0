const fs = require("fs");

function readBytes(file, size = 32) {
  const fd = fs.openSync(file, "r");
  const buffer = Buffer.alloc(size);

  fs.readSync(fd, buffer, 0, size, 0);
  fs.closeSync(fd);

  return buffer;
}

function signature(file) {
  try {
    const buf = readBytes(file, 32);
    const hex = buf.toString("hex");
    const txt = buf.toString("ascii");

    // Images
    if (hex.startsWith("ffd8ff")) return "jpg";
    if (hex.startsWith("89504e470d0a1a0a")) return "png";
    if (hex.startsWith("47494638")) return "gif";
    if (txt.includes("WEBP")) return "webp";
    if (hex.startsWith("424d")) return "bmp";
    if (hex.startsWith("49492a00") || hex.startsWith("4d4d002a")) return "tiff";

    // Docs
    if (hex.startsWith("25504446")) return "pdf";
    if (hex.startsWith("d0cf11e0")) return "old-office"; // doc/xls/ppt lama
    if (hex.startsWith("504b0304")) return "zip/docx/xlsx/pptx/apk";

    // Archives
    if (hex.startsWith("52617221")) return "rar";
    if (hex.startsWith("377abcaf")) return "7z";
    if (hex.startsWith("1f8b08")) return "gz";

    // Apps
    if (hex.startsWith("4d5a")) return "exe/dll/msi";

    // Media
    if (txt.includes("ftyp")) return "mp4/m4a/mov";
    if (hex.startsWith("494433")) return "mp3";
    if (hex.startsWith("4f676753")) return "ogg";
    if (hex.startsWith("52494646")) return "wav/avi/webp";

    // Database
    if (txt.includes("SQLite format")) return "sqlite";

    return "unknown";
  } catch {
    return "unknown";
  }
}

module.exports = { signature };