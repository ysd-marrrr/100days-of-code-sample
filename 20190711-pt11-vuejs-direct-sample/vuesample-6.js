new Vue({
  el: '#app1',
  data: {
    isMainMessageVisible: true,
    isSubListVisible: true,
    randomScore: Math.random(),
    showPage: 'omote'
  },
  methods: {
    changePage: function() {
      if(this.showPage === 'omote')  {
        this.showPage = 'ura';
      } else {
        this.showPage = 'omote';
      }
    }
  }
});