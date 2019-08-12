new Vue({
  el: "#app1",
  data: {
    basicMessage: "1. 基本的な例",
    inputString: "試しに何か入れてみてください",
    watchInputValue: "",
    sampleString:
      "<strong>上のボックスに入れるとHTMLが無効になって表示されます</strong>",
      searchResult: "キーワードを入力して検索してね<br />入力し終わったら少し待つと検索されるよ",
      searchBox: "",
      accessHeaders: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
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
        return this.sampleString;
      },
      set: function(newValue) {
        this.sampleString = (newValue + "")
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
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
    getArticle: function() {
      this.searchResult = "検索中…";
      var vm = this;
      var searchUrl = "https://yesno.wtf/api";
      axios.get(searchUrl).then(function (r) {
        vm.searchResult = '<img src="' + r.data.image + '" >';
      }).catch(function (error) {
        vm.searchResult = "<p><strong>エラーです</strong></p>" + error;
      });
    }
  },
  watch: {
    inputString: function(val) {
      this.watchInputValue = val
        .split("")
        .reverse()
        .join("");
    },
    searchBox: function(newKeyword, oldKeyword) {
      this.searchResult = "検索中…入力が終わったら手を離してね";
      this.debouncedGetArticle();
    }
  },
  created: function() {
    this.debouncedGetArticle = _.debounce(this.getArticle, 500)
  }
});
