set NODE_ENV=production
mkdir /q lib
cpx ".\components\**\*.scss" .\lib && babel components --out-dir lib
