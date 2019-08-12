new Vue({
  el: '#app1',
  data: {
    clickCounter: 0,
    greetingMessage: '',
    sampleMessage: 'ここにメッセージが出ます'
  },
  methods: {
    greet: function(event) {
      this.greetingMessage = 'Hello Vue.js!';
      alert(event.target.tagName);
    },
    changeMessage: function(text) {
      this.sampleMessage = text;
    },
    keyWarning: function() {
      var loopCount = 10;
      for(var i = 0; i < loopCount; i++) {
        alert((i + 1) + '回目のこらー！');
      }
    }
  }
});