Vue.component("sample-component", {
  template:
    "<div><h4>This is a sample</h4><p>Vueのappを初期化(elのプロパティをつけて new Vue)する前にcomponentを登録しないと使えないよー</p></div>"
});

Vue.component("sample-props-component", {
  props: ["sampleItem"],
  template: "<li> {{ sampleItem.text }} </li>"
});

var app = new Vue({
  el: "#app1",
  data: {
    message: "宣言的レンダリングができました👏",
    message2: "隠しメッセージ",
    display: true,
    list: [
      {
        id: 3,
        text: "これが"
      },
      {
        id: 2,
        text: "出れば"
      },
      {
        id: 1,
        text: "いいですよね",
        hoge: "hage"
      }
    ],
    title3: "3. ユーザー入力の制御",
    afterTitle: "hoge"
  },
  methods: {
    changeTitle: function() {
      this.title3 = this.afterTitle;
    }
  }
});
