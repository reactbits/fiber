set NODE_ENV=production
mkdir lib
cpx ".\components\**\*.scss" .\lib && babel components --out-dir lib
