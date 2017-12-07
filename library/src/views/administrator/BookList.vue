<template>
    <section>
        <div>
            <ul v-for="(item,index) in books" class="booklist">
                <li  class="bookitem">
                    <div class="image-box">
                        <img src="https://img13.360buyimg.com/n1/s200x200_jfs/t3562/265/1153735603/36671/a287c81e/581d8914N19b0b756.jpg" alt="">
                    </div>
                    <div class="inline-box">
                        <h2>{{item.title}}</h2>
                        <p>简介：Vue.js 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。</p>
                        <!--<span>被借{{item.send_time}}次</span>-->
                        <!--<span>借出时间：{{item.out_time}}</span>-->
                        <!--<span>归还时间：{{item.back_time}}</span>-->
                        <!--<el-button type="danger" @click.native.prevent="handleDel(index)">下架</el-button>-->
                        <BookMessageSecret
                            :send_time="item.send_time"
                            :out_time="item.out_time"
                            :back_time="item.back_time"
                            :index="index"
                        ></BookMessageSecret>
                    </div>
                </li>
            </ul>
        </div>

    </section>
</template>

<script>
    import jsonp from 'jsonp';
import BookMessageSecret from './BookMessageSecret.vue'
    export default {
        data(){
            return{
                books:[],
            }
        },
        components:{
            BookMessageSecret
        },
        methods:{
          getBooklist(id){
            var _this = this;
              jsonp('https://api.douban.com/v2/book/search?q=html&fields=id,title', null, function (err, data) {
                  if (err) {
                      console.error(err.message);
                  } else {
//                      console.log(data);
                      _this.books = data.books;
                  }
              });
          },


        },
        created(){

            this.getBooklist(this.id)
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
        height: 200px;
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
    /*.inline-box p{*/
        /*color: #868686;*/
        /*font-size: 15px;*/
    /*}*/
    /*.inline-box span{*/
        /*padding-right: 10px;*/
        /*font-size: 15px;*/
    /*}*/
</style>
