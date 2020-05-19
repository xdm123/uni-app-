# 我爱我家小程序uni-app重构


## 项目目录结构

┌─common                公共资源
│  ├─css         				
│  ├─js         				
│  └─wxs        				
│
├─components 									组件目录
│  └─load											加载框
│
├─pages                 			业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       			小程序首页
│  ├─citylist
│  │  └─citylist.vue    			选择城市
│  ├─message
│  │  └─message.vue    				消息
│  ├─user
│  │  └─user.vue    					我的
│  ├─webview
│  │  └─webview.vue    				打开外部网页
│  ├─sale_rent_list
│  │  └─sale_rent_list.vue    二手房租房列表
│
├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
│
├─store                 vuex状态管理仓库
│  └─index.js       		入口文件
│  ├─mutations.js				mutations
│  ├─mutations-type.js  mutations方法名文件
│
├─unpackage          		运行后打包文件存放目录
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
└─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见



