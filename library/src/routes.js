import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/administrator/Table.vue'
import booklist from './views/administrator/BookList.vue'
import userlogin from './views/user/Userlogin.vue'
import UserBookItem from './views/user/UserBookItem.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },

    {
        path: '/',
        component: Home,
        name: '管理',
        // hidden:true,
        iconCls: 'el-icon-message',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/userlist', component: Table, name: '会员管理' },
            { path: '/booklist', component: booklist, name: '图书管理' },
        ]
    },
    //用户登录进入userlogin界面
    {
        path: '/',
        component: Home,
        name: '我的图书馆',
        // hidden:Login.userlog,
        iconCls: 'el-icon-message',//图标样式class
        children:[
            {   path:'/userlogin', component:userlogin, name:'我要借书',},
            {   path:'/userlogin/:id', component:UserBookItem, name:'书本详情', hidden:true},
        ]

    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;