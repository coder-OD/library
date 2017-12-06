<template>
    <div>
        <span>被借{{this.send_time}}次</span>
        <span>借出时间：{{this.out_time}}</span>
        <span>归还时间：{{this.back_time}}</span>
        <el-button type="danger" @click.native.prevent="handleDel(this.index)">下架</el-button>
    </div>
</template>

<script>

    export default {
        props:['send_time','out_time','back_time','index'],
        methods:{
            handleDel: function (index) {
                this.$confirm('确认下架这本书吗?', '提示', {
                    type: 'warning'
                }).then()
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
        }
    }
</script>

<style scoped>
     p{
        color: #868686;
        font-size: 15px;
    }
     span{
        padding-right: 10px;
        font-size: 15px;
    }
</style>
