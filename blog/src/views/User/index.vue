<template>
  <div class="manage">
    <el-dialog
          :title="operateType === 'add' ? '新增用户':'更新用户'"
          :visible.sync ='isShow'
    >
     <!-- 新增or编辑 :formLabel为传入新增or编辑需要的输入框类型和数量
     :的为父部件往子部件该传回值,@为子往父
     -->
    <common-form
    :formLabel="operateFormLabel"
    :form="operateForm"
    :inline="true"
    ref="form"
    ></common-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
    <!-- 搜索 -->
    <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
    >
    <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
    <!-- 当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。
    如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 @submit.native.prevent。 -->
    </common-form>
    </div>

    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import{ getUser } from '../../../api/data'
export default {
  components: { CommonForm,CommonTable },
  
  name: "User",
  data(){
    return{
      operateType:'add',
      isShow:false,
      operateFormLabel:[{
                        model: 'name',
                        label: '姓名',
                        type: 'input'
                    },
                    {
                        model: 'age',
                        label: '年龄',
                        type: 'input'
                    },
                    {
                        model: 'sex',
                        label: '性别',
                        type: 'select',
                        opts: [
                            {
                                label: '男',
                                value: 1
                            },
                            {
                                label: '女',
                                value: 0
                            }
                        ]
                    },
                    {
                        model: 'birth',
                        label: '出生日期',
                        type: 'date'
                    },
                    {
                        model: 'addr',
                        label: '地址',
                        type: 'input'
                    }],
      operateForm:{
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:''
                    },
      formLabel:[{
        //此为搜索框的属性, 类型为input,子组件通过v-modal为searchForm赋予属性名为modal的值,
        // (本搜索框的modal属性名为keyword),因此可以得到searchForm.keyword这个值.(即是输入框的值)
        model:'keyword',
        label:'',
        type:'input'
      }],
      searchForm:{},
      //表单通过v-modal将数值传给form,使form新增[item.modal]属性,将[item.modal]属性与table中的属性相对应,
      // 则通过后端方法表单也能得到这些对应的数据
      tableData:[],
      
      tableLabel:[
        {
          prop:'name',
          label:'姓名'
        },
        {
          prop:'age',
          label:'年龄'
        },
        {
          prop:'sexLabel',
          label:'性别'
        },
        {
          prop:'birth',
          label:'出生日期',
          width:200
        },
        {
          prop:'addr',
          label:'地址',
          width:320
        },
      ],
      config:{
        page:1,
        total:30,
      },
    }
        },
  methods:{
            confirm(){
              if(this.operateType ==='edit'){
                  this.$http.post('/user/edit',this.operateForm).then(res =>{
                    console.log(res);
                    this.isShow =false;
                    this.getList()
                  })
              }else{
                this.$http.post('/user/add',this.operateForm).then(res =>{
                    console.log(res);
                    this.isShow =false;
                    this.getList()
                  })
              }
            },
            addUser(){
              this.isShow = true
              this.operateType ='add'
              this.operateForm ={
                    name:'',
                    addr:'',
                    age:'',
                    birth:'',
                    sex:''
                                }
                      },
            getList(name = ''){
              this.config.loading =true
              name ? (this.config.page =1):'';
              console.log(name,'name');
              console.log(this.config.page,'num1')
              getUser({
                page:this.config.page,
                name:name
              }).then(({data:res}) =>{
                 console.log(res,'res');
                 console.log(name,'name');
                 console.log(this.config.page,'num2');
                this.tableData = res.list.map(item =>{
                  item.sexLabel = item.sex === 0 ?'女':'男'
                  return item
                })
                this.config.total = res.count;
                console.log(res,'res')
                this.config.loading = false
              })
                 
            },
            editUser(row){
              this.operateType = 'edit';
              this.isShow =true;
              this.operateForm= row
            },
            delUser(row){
              this.$confirm('此操作将永久删除改文件，是否继续','提示',{
                confirmButtonText:'确认',
                cancelButtonText:'取消',
                type:'warning'
              }).then(() =>{
                const id =row.id
                this.$http.get('user/del',{
                  params:{ id }
                }).then(() =>{
                  this.$message({
                    type:'success',
                    message:' 删除成功'
                  })
                  this.getList()
                })
              })
            },

          },
  created(){
    this.getList();
    
  }
  }
  
  
  
  
</script>
<style lang="less" scoped>
.manage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>