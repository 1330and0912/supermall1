#!/usr/bin/env sh

# 当发生错误时中止脚本

# 构建
npm run build

# cd 到构建输出的目录下 
cd dist

git init
git add .
git commit -m 'deploy'
git remote add origin git@github.com:1330and0912/supermall1.git
git push -u origin master
cd -