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
import jsonp from 'jsonp';
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


            }
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

                }).catch(() => {

                });
            },
            backBook(){
                this.$confirm('确认归还吗?', '提示', {
                    type: 'warning'
                }).then(()=>{
                    console.log("我要还书");
                    this.isGot = !this.isGot

                }).catch(() => {

                });

            }
        },
        created(){
            this.getId();
            //获取图书数据
            this.getData();
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
