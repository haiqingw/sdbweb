<template>
  <div>
    <!-- header -->
    <div class="return">
      <img src="@/assets/images/return.png" alt="" @click="$route.go(-1)" />
      <span>下属交易</span>
    </div>
    <!-- body -->
    <div class="affiliateTransactionsMain">
      <div class="selector selectYear" @click="selectYear">
        <div class="show_year">
          <p v-if="!isClicked">年</p>
          <p v-if="isClicked">{{ year }}</p>
        </div>
      </div>
      <!-- 按时间筛选 -->
      <mt-datetime-picker
        v-model="dateValue"
        type="date"
        ref="datePicker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :endDate="new Date()"
        @confirm="handleConfirm"
      >
      </mt-datetime-picker>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerValue: "按时间筛选",
      year:'',
      dateValue:'',
      isClicked:false 
    };
  },
  methods: {
    selectYear() {
      this.$refs.datePicker.open();
    },
    handleConfirm(value) {
      console.log(value);
      this.year = value.getFullYear();
      this.month = value.getMonth() + 1;
      this.date = value.getDate();
      this.isClicked = true;
    }
  }
};
</script>
<style lang="scss">
.affiliateTransactionsMain {
  padding-top: 40px;
}
</style>
