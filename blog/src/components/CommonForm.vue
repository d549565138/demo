<template>
    <div>
    <!-- ref不仅可以获取DOM元素还可以获取组件 
    1、给dom节点记上ref属性，可以理解为给dom节点起了个名字。
    2、加上ref之后，在$refs属性中多了这个元素的引用。
    3、通过vue实例的$refs属性拿到这个dom元素。-->
    <el-form ref="form" label-width="100px"  :model="form" :inline="inline">
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
        <!-- v-modal为双向绑定,可以获取输入框等部件的数据并更新后传回 
        v-modal为语法糖,v-model="value"等于:value="value" @input="value=$event.target.value"
        以下的item就是父组件传进来的formLabel数组,v-modal等于将输入内容赋值给form对象的[xx]属性中,
        并且父组件可以得到修改后的值
        -->
        <el-input 
            v-if="item.type === 'input'"
            :placeholder="'请输入' + item.label"
            v-model="formData[item.model]" 
            >
        </el-input>
        <el-switch
            v-if="item.type === 'switch'"
            v-model="formData[item.model]"
        ></el-switch>
        <el-date-picker
            v-if="item.type === 'date'"
            type="date"
            value-format="yyy-MM-dd"
            placeholder='选择日期'
            v-model="formData[item.model]"
        ></el-date-picker>
        <el-select
            v-if="item.type === 'select'"
            placeholder='请选择'
            v-model="formData[item.model]"
        >
        <el-option
            v-for="item in item.opts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
        </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
    </el-form>
    </div>
</template>
<script>
export default{
    name:'CommonForm',
    props:{
        formLabel:Array,
        form:Object,
        inline:Boolean
    },
    data(){
        return { 
        formData: this.form
     }
    }
}

</script>