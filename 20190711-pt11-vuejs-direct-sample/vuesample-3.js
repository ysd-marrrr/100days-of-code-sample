new Vue({
  el: "#app1",
  data: {
    onceMsg: "v-onceで設定されたメッセージ",
    notOnceMsg: "v-onceで設定されていないメッセージ",
    htmlMessage: "<span style=\"font-size: 300%\">HTMLを許しちゃう</span>",
    emClass: "",
    isRadioDisabled: true,
    isJavaScriptSectionDisplayed: true,
    vueImageSrc: "https://jp.vuejs.org/images/logo.png",
    imgWidth: 150,
    toggle_event_name: "click",
    imgTitle: "Vue.jsのロゴ"
  },
  methods: {
    changeMessage: function() {
      this.onceMsg = "hoge";
      this.notOnceMsg = "hoge";
    },
    changeEmphasize: function() {
      if (this.isRadioDisabled) {
        this.isRadioDisabled = false;
        this.emClass = "redbold";
      } else {
        this.isRadioDisabled = true;
        this.emClass = "";
      }
    },
    changeToggleMode: function() {
      if (this.toggle_event_name === "click") {
        this.toggle_event_name = "mouseover";
      } else {
        this.toggle_event_name = "click";
      }

      this.changeEmphasize();
    }
  }
})