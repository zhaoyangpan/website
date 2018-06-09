<template>
  <el-table :data="formatData"  :row-style="showRow" v-bind="$attrs" style="width: 100%">
    <el-table-column v-if="columns.length===0" width="150" >
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.$index}}
      </template>
    </el-table-column>
    <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.row[column.value]}}
      </template>
    </el-table-column>
    <el-table-column prop="status_id" label="状态" width="180" show-overflow-tooltip> 
		      <template slot-scope="scope">	
		      <el-tag :type="articleStatusTag(scope.row.status_id)" close-transition>
                {{scope.row.status_id == 1 ? "启用":"禁用"}}
              </el-tag>
             </template>
		    </el-table-column>
    <el-table-column prop="image" label="栏目图片" width="200"> 
		      <template slot-scope="scope">
			    <img :src="scope.row.image" width="20" height="20"/>
			  </template>
		    </el-table-column>
    <el-table-column label="操作" width="200" align='center' fixed="right" show-overflow-tooltip> 
		      <template slot-scope="scope">
						<el-button size="small" @click="editColumn(scope.$index, scope.row)" :disabled="scope.$index == 0">编辑</el-button>
						<el-button type="danger" :disabled="scope.$index == 0" size="small" @click="deleteColumn(scope.$index, scope.row)">删除</el-button>					
					</template>
		</el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
/**
  Auth: pzy
  Created: 2018/5/4-13:59
*/
import treeToArray from './eval'
const api =require('../../api/api.js')
export default {
  name: 'treeTable',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    //状态
    articleStatusTag(item){
        let basic = "";
        switch (item) {
          case 1:
             basic = 'success';
             break;
          case 2:
             basic = 'danger';
             break;
        }
        return basic;
    },
    editColumn(index,row){
    	this.$router.push({
        path: '/EditNode',       
        query: {
            id: row.id, 
            parentId:row.parent_id,
        }
     })
    },
    //删除单个栏目
    deleteColumn(index, row){
    	console.log(index)
    	this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
			let para = { id: row.id };
			api.DeleteColumn(para).then((res) => {
				 	this.$emit('delUpdate')

					this.$message({
						message: '删除成功',
						type: 'success'
					});
					
				});
			}).catch((err) => {
        this.$message({
				message: '已取消删除',
				type: 'success'
			});
			});
    }
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style scoped>
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  .ms-tree-space::before {
      content: ""
    }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }
  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: #2196F3;
    margin-left: -18px;
  }
</style>