<template>
  <div class="organizationMain">
    <!-- header -->
    <div class="return">
      <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
      <span>组织架构</span>
    </div>
    <!-- body -->
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="text-center">
          <vue2-org-tree
            name="test"
            :data="data"
            :horizontal="horizontal"
            :collapsable="collapsable"
            :label-class-name="labelClassName"
            :render-content="renderContent"
            @on-expand="onExpand"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getServer } from "@/api/index"
import response from '@/assets/js/response.js'
export default {
  data() {
    return {
      data: {
        id: 0,
        label: "XXX科技有限公司",
        queryData:{
          requestType: 'agent', 
          requestKeywords: 'organization', 
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone,
          viewType:'main'
        },
        children: [
          {
            id: 2,
            label: "产品研发部",
            children: [
              {
                id: 5,
                label: "研发-前端"
              },
              {
                id: 6,
                label: "研发-后端"
              },
              {
                id: 9,
                label: "UI设计"
              },
              {
                id: 10,
                label: "产品经理"
              }
            ]
          },
          {
            id: 3,
            label: "销售部",
            children: [
              {
                id: 7,
                label: "销售一部"
              },
              {
                id: 8,
                label: "销售二部"
              }
            ]
          },
          {
            id: 4,
            label: "财务部"
          },
          {
            id: 9,
            label: "HR人事"
          },
          {
            id: 4,
            label: "财务部"
          },
          {
            id: 9,
            label: "HR人事"
          },
          {
            id: 4,
            label: "财务部"
          },
          {
            id: 9,
            label: "HR人事",
            children: [
              {
                id: 5,
                label: "研发-前端"
              },
              {
                id: 6,
                label: "研发-后端"
              },
              {
                id: 9,
                label: "UI设计"
              },
              {
                id: 10,
                label: "产品经理"
              }
            ]
          }
        ]
      },
      horizontal: true,
      collapsable: false,
      expandAll: true,
      labelClassName: "bg-white"
    };
  },
  methods: {
    renderContent(h, data) {
      return data.label;
    },
    onExpand(data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    getOrganizationFn(){
      getServer().then(res => {
        console.log(res);
        console.log(response[res.data.responseStatus])
      }) 
    }
  },
  created(){
    this.getOrganizationFn();
  }
};
</script>
<style lang="scss">
.organizationMain{
  padding-top:40px;
}
.container{
  font-size:14px !important;
}
.org-tree-node-label {
  white-space: nowrap;
}
.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
}
</style>