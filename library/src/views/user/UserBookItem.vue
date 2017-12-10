<template>
   <div class="book-box">
       <div class="bookitem">
           <!--<div >{{book.id}}</div>-->
           <!--<div >{{book.author[0]}}</div>-->
           <!--<h1>sdafdsfdsf</h1>-->
           <div class="book-image">
               <img :src="book.src" alt="">
           </div>
           <div class="book-message">
               <h1>{{book.title}}{{book.id}}</h1>
               <p>作者：{{book.author[0]}}</p>
               <p>类别：<span>{{book.tags[0]}}</span><span>{{book.tags[1]}}</span><span>{{book.tags[2]}}</span></p>
               <p>简介：{{book.summary}}</p>
           </div>
       </div>
       <div class="button-box">
           <el-button type="primary" @click.native.prevent="getBook()" :disabled="isGot">我要借阅</el-button>
           <el-button type="danger"  @click.native.prevent="backBook()" :disabled="!isGot">我要归还</el-button>
       </div>
   </div>

</template>

<script>
//    import axios from 'axios';
//引入日期插件
import moment from '../../../src/common/js/moment';
moment.lang('zh-cn');
import storejs from 'storejs';



//Vue.use(moment);
import jsonp from 'jsonp';
import store from "../../vuex/store";
    export default {
        data(){
            return{
                book:{
                    id:0,
                    title:'',
                    author:[],
                    tags:[],
                    summary:'',
                    src:'',
                },
                isGot:false,
                count:0,
                curtime:'',//当前时间
                backtime:'',//归还时间
            }
        },
        computed:{

        },
        methods:{
            getId(){
                this.book.id = this.$route.params.id;
            },
            getData() {
                let _this = this;
//                _this.axios.get('/api/book/1003078').then(response=>{
//                    console.log(response);
//                },response=>{
//                    console.log(response);
//                })
                jsonp('https://api.douban.com/v2/book/'+this.book.id, null, function (err, data) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log(data);
                        _this.book.title = data.title;
                        _this.book.author = data.author;
                        _this.book.tags[0] = data.tags[0].name;
                        _this.book.tags[1] = data.tags[1].name;
                        _this.book.tags[2] = data.tags[2].name;
                        _this.book.summary = data.summary;
                        _this.book.src = data.images.large;


                    }
                });
            },
            getBook(){
                this.$confirm('确认借阅吗?', '提示', {
                    type: 'warning'
                }).then(()=>{
                    console.log("我要借书");
                    this.isGot = !this.isGot
                    this.count = this.count*1 +1;

                    this.curtime = moment().format('ll');
                    this.backtime =moment().add(60, 'days').calendar();
                    //若点击确认按钮,此时记录当前书本{id:xxxx,curtime:'',backtime:'',count:num,isGot:bollean,}
//                    console.log(this.book.id);   //string
//                    console.log(this.count);     //number
//                    console.log(this.curtime);   //string
//                    console.log(this.backtime);  //string
//                    console.log(this.isGot);     //boolean

                    //将获取的数据设置到localstorage
                    //为了识别每本书的记录, 将id作为localstorage的key值
                    storejs.set(this.book.id,{
                        count:this.count.toString(),
                        curtime:this.curtime,
                        backtime:this.backtime,


                    });
                    storejs.set(this.book.id+'book',{
                        isGot:this.isGot,
                    });
                }).catch(() => {
//                    console.log(1);
                    return;
                });
            },
            backBook(){

                this.$confirm('确认归还吗?', '提示', {
                    type: 'warning'
                }).then(()=>{
                    console.log("我要还书");
                    this.isGot = !this.isGot;

                    //需要单独修改localstorage中的isGot

                    storejs.set(this.book.id+'book',{
                        isGot: this.isGot,
                    });

                }).catch(() => {

                });

            }
        },
        created(){
            this.getId();
            //获取图书数据
            this.getData();
            //将获取的数据设置到localstorage
//            storejs('yxf',this.count.toString());
//            let storeName = storejs.get(this.id);

                this.count = storejs.get(this.book.id).count || 0;
                this.isGot = storejs.get(this.book.id+'book').isGot || false;
//            console.log(this.book.id);
//            console.log(storejs.get(this.id).count);
        }
    }
</script>

<style scoped>
    .book-box el-button{

    }
    .bookitem{
        display: flex;
        flex-direction: row;
        height: 400px;
        padding: 20px;

    }
    .bookitem .book-image{
        flex: 1;
    }
    .bookitem .book-image img{
        width: 90%;
    }
    .bookitem .book-message{
        flex: 4;
        /*background-color: pink;*/
    }
    .book-message h1{
        font-size: 35px;
    }
    .book-message p{
        line-height: 22px;
    }
    .book-message p span{
        padding-right: 10px;
    }
    .button-box{
        text-align: center;
    }
</style>
