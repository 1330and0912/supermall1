#!/usr/bin/env sh

# ����������ʱ��ֹ�ű�

# ����
npm run build

# cd �����������Ŀ¼�� 
cd dist

git init
git add .
git commit -m 'deploy'
 
git push -u origin master
cd -