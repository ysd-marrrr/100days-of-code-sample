new Vue({
  el: "#app1",
  data: {
    onceMsg: "v-onceで設定されたメッセージ",
    notOnceMsg: "v-onceで設定されていないメッセージ"
  },
  methods: {
    changeMessage: function() {
      this.onceMsg = "hoge";
      this.notOnceMsg = "hoge";
    }
  }
})