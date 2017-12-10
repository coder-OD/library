<template>
    <section   v-loading="isLoading">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item>
                    <el-input  placeholder="书名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="findBooks">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" >新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <div v-show="!isLoading">
            <ul v-for="(item,index) in books" class="booklist" >
                <li  class="bookitem">
                    <div class="image-box">
                        <img src="https://img13.360buyimg.com/n1/s200x200_jfs/t3562/265/1153735603/36671/a287c81e/581d8914N19b0b756.jpg" alt="">
                    </div>
                    <div class="inline-box">
                        <h2>{{item.title}}-- <span>{{item.id}} </span>--{{index}}</h2>
                        <p>简介：Vue.js 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。</p>

                        <BookMessageSecret :id="item.id" :index="index"></BookMessageSecret>

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
    import jsonp from 'jsonp';
    import storejs from 'storejs';  //localstorage
    import BookMessageSecret from './BookMessageSecret.vue'
    export default {
        data(){
            return{
                books:[],
                total:0,
                start:0,    //每页显示数量为 start+20*(currentPage-1)
                isLoading:true,

                //图书收录信息
//                count: 0,
//                curtime:'',//当前时间
//                backtime:'',//归还时间
//                isGot:'',
            }
        },
        components:{
            BookMessageSecret
        },
        methods:{
          getBooklist(){
              var _this = this;
              jsonp('https://api.douban.com/v2/book/search?q=html&fields=id,title&count=5&start='+_this.start, null, function (err, data) {
                  if (err) {
                      console.error(err.message);
                  } else {
//                        console.log(data);
                      _this.books = data.books;
//                        console.log(_this.books);
                      _this.total = data.total;

                      //重新获取图书收录信息
//                      _this.storageReload(_this.books);
                  }
              });


          },
          getCurrentPage(page){
//                console.log(page);
                //page为当前页码
                this.start = 5*(page-1);
//                console.log(this.start);
              //重新获取图书信息
                this.getBooklist();

              //重新获取图书收录信息
//              this.storageReload(this.books);
            },
            findBooks(){
                console.log(1);
                //点击之后,获取输入框的值,与this.books进行对比,若存在则添加到目标数组中
            }



        },
        created(){

            this.getBooklist();
            this.isLoading = !this.isLoading;
        }
    }
</script>

<style scoped>
    .booklist{
        margin: 0;
        padding: 0;
    }
    .booklist li {
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
        /*margin-bottom: 5px;*/
    }

    .inline-box h2 span{
        color: #20a0ff;
    }
    .block{
        padding: 10px;
        float: right;
    }
    
    /*.inline-box p{*/
        /*color: #868686;*/
        /*font-size: 15px;*/
    /*}*/
    /*.inline-box span{*/
        /*padding-right: 10px;*/
        /*font-size: 15px;*/
    /*}*/
    /*.ad-book p{*/
        /*color: #868686;*/
        /*font-size: 15px;*/
    /*}*/
    /*.ad-book span{*/
        /*padding-right: 10px;*/
        /*font-size: 15px;*/
    /*}*/
    /*.ad-book strong{*/
        /*color: #fb2d44;*/
        /*padding-right: 10px;*/
    /*}*/
    /*.ad-book .right-btn{*/
        /*float: right;*/
        /*margin-right: 20px;*/
    /*}*/
</style>
