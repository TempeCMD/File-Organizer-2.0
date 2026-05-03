# File Organizer 2.0
# TempeCMD

A lightweight Node.js command-line tool to organize files automatically by category.

## Features

- Organize files by type in A folder is automatically created based on its category, and files (those in the same or similar category) will automatically go there. Files with formats outside of that category will go to the "Others" folder.
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
Install this script repository using the green "<code>" button above. After clicking it, search for "Download zip" and press it to download it to your device. Make sure you've also installed NodeJS on your Windows command prompt. After downloading the zipped code, extract all its contents into a folder using 7zip or something similar.

open CMD/terminal in your windows, with nodejs has been installed before,
type npm install, then Access the folder where you saved the script code repo, by typing the original path, for example if the folder is on disk c, users, (your administrator name, for example jack), downloads, file-organizer-2.0. then the syntax of typing in cmd is: ## "C:\Users\Jack\Downloads\file-organizer-2.0" then enter, make sure the path is correctly. then type the code: "node index.js" to start the command.

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

Created by TempeCMD
2 may 2026.
