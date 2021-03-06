var radioSelection = ["80.0MHz A radio", "90.0MHz B radio", "100.0MHz C radio"];

Vue.component("radio-tuner", {
  data: function() {
    return {
      selection: radioSelection,
      selected: ""
    };
  },
  template:
    '<form><p>これが「子コンポーネント」です<br>選局中: {{ selected }}</p><select v-model="selected"><option v-for="item in selection">{{ item }}</option></select></form>'
});

var sharedData = {
  selection: radioSelection,
  selected: ""
};

Vue.component("radio-tuner-shared", {
  data: function() {
    return sharedData;
  },
  template:
    '<form><p>選局中: {{ selected }}</p><select v-model="selected"><option v-for="item in selection">{{ item }}</option></select></form>'
});

Vue.component("articles", {
  props: ["id", "title", "description"],
  template:
    '<div style="width: 30%; border: 1px solid rgb(104, 104, 104); border-radius: 2px"><h3>{{ id }}. {{ title }}</h3><p>{{ description }}</p></div>'
});

Vue.component("articles-refactored", {
  props: ["article"],
  template:
    '<div style="width: 30%; border: 1px solid rgb(104, 104, 104); border-radius: 2px"><h3>{{ article.id }}. {{ article.title }}</h3><p>{{ article.description }}</p></div>'
});

Vue.component("articles-count", {
  props: ["article"],
  template:
    '<div style="width: 30%; border: 1px solid rgb(104, 104, 104); border-radius: 2px"><h3>{{ article.id }}. {{ article.title }}</h3><p>{{ article.description }}</p><button @click="$emit(\'count-up\')">follow</button></div>'
});

Vue.component("follow-up-tool", {
  props: ["amount"],
  template:
    "<div><button @click=\"$emit('count-up-amount', amount)\"> + {{ amount }} </button></div>"
});

Vue.component("custom-input", {
  props: ["inputtedValue"],
  template: `<input :value="inputtedValue" @input="$emit('onCustomInput', $event.target.value)"></input>`
});

// 6. スロットによるコンテンツ配信
Vue.component("custom-message", {
  props: ["title"],
  template: `<div style="border-radius: 5px; border: 1px dashed gray; background-color: white; box-shadow: 5px 5px 5px  gray"><h3>{{ title }}</h3><slot></slot></div> `
});

// 7. 動的なコンポーネント
Vue.component("first-tab", {
  template:
    "<p>1st tab content<br>1st tab content<br>1st tab content<br>1st tab content</p>"
});
Vue.component("second-tab", {
  template:
    "<p>2nd tab content<br>2nd tab content<br>2nd tab content<br>2nd tab content</p>"
});
Vue.component("third-tab", {
  template:
    "<p>3rd tab content<br>3rd tab content<br>3rd tab content<br>3rd tab content</p>"
});
Vue.component("fourth-tab", {
  template:
    "<p>4th tab content<br>4th tab content<br>4th tab content<br>4th tab content</p>"
});

new Vue({ el: "#components-1" });
new Vue({ el: "#components-2" });
new Vue({ el: "#components-3" });

var sampleString =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";
var sampleArticles = [
  { id: 1, title: "My journey with vue", description: sampleString },
  { id: 2, title: "Blogging with Vue", description: sampleString },
  { id: 3, title: "Why Vue is so fun", description: sampleString }
];

new Vue({
  el: "#components-4",
  data: {
    articles: sampleArticles
  }
});

new Vue({
  el: "#components-5",
  data: {
    articles: sampleArticles,
    clickCount: 0,
    censoredMessage: "ここに検閲された入力値が表示されます"
  },
  methods: {
    onCountUp: function(countupAmount) {
      this.clickCount += countupAmount;
    },
    onCustomInput: function(inputtedValue) {
      console.log("inputted");
      this.censoredMessage = "censored";
    }
  }
});

new Vue({
  el: "#components-6",
  data: {
    title: "サンプル"
  }
});

new Vue({
  el: "#components-7",
  data: {
    tabsData: [
      { el: "first-tab", title: "tab 1" },
      { el: "second-tab", title: "tab TWO" },
      { el: "third-tab", title: "tab iii" },
      { el: "fourth-tab", title: "tab Ⅳ" }
    ],
    currentTab: "first-tab"
  },
  computed: {
    currentArticleComponent: function() {
      return this.currentTab;
    }
  }
});
