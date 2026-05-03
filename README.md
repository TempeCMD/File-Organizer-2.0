# File Organizer 2.0
# TempeCMD

A lightweight Node.js command-line tool to organize files automatically by category.

## Features

- Organize files by type
- Root-only scan (safe mode)
- Ignores subfolders by default
- Undo last move
- Custom category config
- Prefix organizer folders
- Session summary report
- Path shortcuts support
- File signature detection

## Example Output

Downloads/

DL-Images  
DL-Documents  
DL-Music

## Installation

```bash
npm install
Usage

Run menu:

node index.js

Organize folder:

node index.js organize "D:\TEST"

Undo last session:

node index.js undo

Help:

node index.js help
Notes
Safe by default (does not scan subfolders)
Designed for Windows file cleanup.
Author

Created by Tempeh WNI
