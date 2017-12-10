<template>
    <section v-loading="isLoading">
        <div  v-show="!isLoading">
            <ul v-for="(item,index) in books" class="booklist">
                <li  class="bookitem">
                    <div class="image-box">
                        <img src="https://img13.360buyimg.com/n1/s200x200_jfs/t3562/265/1153735603/36671/a287c81e/581d8914N19b0b756.jpg" alt="">
                    </div>
                    <div class="inline-box">
                        <h2>{{item.title}}-- <span>id:{{item.id}}</span>  </h2>
                        <p>简介：Vue.js 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。</p>
                        <router-link :to="{path:'/userlogin/'+item.id}">
                            <el-button class="detail" type="primary" >查看详情</el-button>

                        </router-link>
                        <!--<span>被借{{item.send_time}}次</span>-->
                        <!--<span>借出时间：{{item.out_time}}</span>-->
                        <!--<span>归还时间：{{item.back_time}}</span>-->
                        <!--<el-button type="danger" @click.native.prevent="handleDel(index)">下架</el-button>-->
                    </div>
                </li>
            </ul>
            <div class="block">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="getCurrentPage"
                        :total="100">
                </el-pagination>
            </div>
        </div>

    </section>
</template>

<script>
//    import booklist from '../administrator/BookList.vue'
import jsonp from 'jsonp';
    export default {
        data(){
            return{
                books:[],
                total:0,
                start:0,    //每页显示数量为 start+20*(currentPage-1)
                isLoading:true,
            }
        },
        created(){
            this.getAllBook();
            this.isLoading = !this.isLoading;
        },
        methods:{
            getAllBook(){
                var _this = this;
                jsonp('https://api.douban.com/v2/book/search?q=html&fields=id,title&count=5&start='+_this.start, null, function (err, data) {
                    if (err) {
                        console.error(err.message);
                    } else {
//                        console.log(data);
                        _this.books = data.books;
//                        console.log(_this.books);
                        _this.total = data.total;
                    }
                });
            },
            getCurrentPage(page){
//                console.log(page);
                //page为当前页码
                this.start = 5*(page-1);
//                console.log(this.start);
                this.getAllBook();
            },
        }
    }
</script>

<style scoped>
    .booklist{
        margin: 0;
        padding: 0;
    }
    .booklist .bookitem {
        list-style: none;
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: row;
        padding: 10px;

        border-bottom: 2px solid #dddddd;
    }
    .booklist .bookitem:hover{
        background-color: rgba(0,0,0,0.1);
        cursor: pointer;
    }
    .booklist .image-box{
        /*width: 200px;*/
        flex: 1;
        height: 100%;
        float: left;
        background-color: transparent;
    }

    .booklist img{
        width: 70%;
        height: 100%;
        float: left;
    }
    .bookitem .inline-box{
        flex: 5;
        height: 100%;
        /*background: red;*/
        float: right;
    }
    .inline-box p{
        margin: 0;
    }
    .inline-box .detail{
        float: right;
        margin-right: 30px;
    }
    .inline-box h2 span{
        color: #269dfa;
    }
    .block{
        padding: 10px;
        float: right;
    }
</style>
