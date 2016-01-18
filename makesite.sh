npm run build:demo
mkdir -p site
cp -a ./static/. ./site/static
cp -a ./index.html ./site/
# fix absolute links
sed -i -- "s/\/static\//\.&/g" ./site/index.html
