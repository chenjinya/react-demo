# react-demo
a react demo


start:

##webpack develop
npm run dev

##webpack build
npm run build

##gulp build
rm -rf build && gulp build

##部署到服务器
cd output
sh dev.sh


生成tar包在/home/wor/orp下，测试的时候这样 部署
tar xzvf ala.tar.gz -C template/ && tar xzvf static-ala.tar.gz -C /home/work/static/static.tieba.baidu.com/
