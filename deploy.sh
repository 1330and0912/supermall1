#!/usr/bin/env sh

# ����������ʱ��ֹ�ű�

# ����
npm run build

# cd �����������Ŀ¼�� 
cd dist

git init
git add .
git commit -m 'deploy'
git remote add origin git@github.com:1330and0912/supermall1.git
git push -u origin master
cd -