new Vue({
  el: "#app1",
  data: {
    basicMessage: "1. 基本的な例",
    inputString: "試しに何か入れてみてください",
    watchInputValue: "",
    sampleString: "<strong>上のボックスに入れるとHTMLが無効になって表示されます</strong>"
  },
  computed: {
    reversedBasicMessage: function() {
      return this.basicMessage
        .split("")
        .reverse()
        .join("");
    },
    computedTime: function() {
      return Date.now();
    },
    computedInputValue: function() {
      return this.inputString
        .split("")
        .reverse()
        .join("");
    },
    sampleHtml: {
      get: function() {
        return this.sampleString
      },
      set: function(newValue) {

        this.sampleString = (newValue + '').replace(/&/g,'&amp;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;'); 
      }
    }
  },
  methods: {
    changeBasicMessage: function() {
      this.basicMessage =
        "これ、dataとcomputedで実現していて、HTML側には何もJSのコードは無いんだって";
    },
    defaultBasicMessage: function() {
      this.basicMessage = "1. 基本的な例";
    },
    methodTime: function() {
      return Date.now();
    },

  },
  watch: {
    inputString: function(val) {
      this.watchInputValue = val
      .split("")
      .reverse()
      .join("");
    }
  }
});
