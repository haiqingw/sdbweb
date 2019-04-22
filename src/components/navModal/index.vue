<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container cf">
          <div v-for='(list,index) in myTag' class="list-title"
               @click="query(list,index)"
               :class="{active:activeIndex===index}">
            {{list.title}}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">

  export default {
    props: ['myTag', 'activeIndex', 'query'], //接受父组件 方法 数据
    data() {
      return {
        navActiveIndex: 0, //初始化默认
      }
    },
    mounted() {

    },
    methods: {}

  }
</script>
<style scoped lang="scss">

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background-color: rgba(0, 0, 0, .5);*/
    /*display: table;*/
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    /*display: table-cell;*/
    /*vertical-align: middle;*/
    padding-top: 0.91rem;
  }

  .modal-container {
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    /*box-shadow: 0 2px 8px rgba(0, 0, 0, .33);*/
    transition: all .3s ease;
    padding: 0 0.1rem 0.4rem 0.22rem;
    font-family: Helvetica, Arial, sans-serif;
    .list-title {
      color: #666;
      border-radius: 4px;
      font-size: 0.26rem;
      border: 1px solid #999;
      height: 0.57rem;
      width: 1.93rem;
      text-align: center;
      float: left;
      line-height: 0.57rem;
      margin: 0.4rem 0.2rem 0 0.2rem;
      &.active {
        color: #fe3e62;
        border: 1.5px solid #fe3e62;
      }
    }
  }

  .myTagClose {
    color: #fff;
    font-size: 0.6rem;
    margin: 0.4rem auto 0 auto;
    height: 1rem;
    width: 1rem;
    text-align: center;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    transform: translateY(-0.9rem);
    opacity: 0;
  }
</style>
