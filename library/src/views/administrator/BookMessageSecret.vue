<template>
    <div class="secret">
        <span>被借 <strong>{{count}}</strong>次</span>
        <span v-if="isGot==true">
                        <strong>已出馆</strong>
            借出时间：<strong>{{curtime}}</strong>
            归还时间：<strong>{{backtime}}</strong>
        </span>
        <span v-else><strong>已入藏</strong></span>
        <el-button class="right-btn" type="danger" @click.native.prevent="handleDel(this.index)">下架{{id}}--{{index}}</el-button>
    </div>
</template>

<script>
    import storejs from 'storejs';

    export default {
        props:['id','index'],
        methods:{
            handleDel: function (index) {
                this.$confirm('确认下架这本书吗?', '提示', {
                    type: 'warning'
                }).then()
//                console.log(this.id);
//                    .then(() => {
////                    this.listLoading = true;
//                    //NProgress.start();
//                    let para = { id: row.id };
//                    removeUser(para).then((res) => {
//                        this.listLoading = false;
//                        //NProgress.done();
//                        this.$message({
//                            message: '删除成功',
//                            type: 'success'
//                        });
//                        this.getUsers();
//                    });
//                }).catch(() => {
//
//                });
            },
            //翻页后重新调用
            storageReload(){
//                console.log("storageReload");
                //获取localstorage数据
                var _this = this;
                let storeName = storejs.get(_this.id);
                storejs.forEach(function(key, val) {
                    if(_this.id == key){    //根据id来判断数据应该映射在哪本书上
//                        console.log(key, '==', val)
                        _this.count = val.count;
                        _this.curtime = val.curtime;
                        _this.backtime = val.backtime;
                    }
//                    else {
//
//                        storejs.set(_this.id,{
//                            count:_this.count.toString(),
//                            curtime:_this.curtime,
//                            backtime:_this.backtime,
//
//
//                        });
//                    }

                })  // 遍历所有存储
                //查看书是否借出
                let isBookGot = storejs.get(_this.id+'book');
                storejs.forEach(function(key, val) {
                    if((_this.id+'book') == key){    //根据id来判断数据应该映射在哪本书上
//                        console.log(_this.id);
//                        console.log(key, '==', val)
                        _this.isGot = val.isGot;
                    }
//                    else {
//                        storejs.set(_this.id+'book',{
//                            isGot: _this.isGot,
//                        });
//
//                    }

                })  // 遍历所有存储

            }
        },
        data(){
            return{
                count: 0,
                curtime:'',//当前时间
                backtime:'',//归还时间
                isGot:'',

            }
        },
        watch:{
            id:function (a) {
                this.storageReload();
//                console.log("change");
            },
            count:function (a) {
                this.storageReload();
            },
            isGot:function (a) {
                this.storageReload();
            }
        },
        created(){
            this.storageReload();
        }
    }
</script>

<style scoped>
    .secret{
        margin-bottom: 5px;
    }
    .secret p{
        color: #868686;
        font-size: 15px;
    }
    .secret span{
        padding-right: 10px;
        font-size: 15px;
    }
    .secret strong{
        color: #fb2d44;
        padding-right: 10px;
    }
    .secret .right-btn{
         float: right;
         margin-right: 20px;
     }
</style>
