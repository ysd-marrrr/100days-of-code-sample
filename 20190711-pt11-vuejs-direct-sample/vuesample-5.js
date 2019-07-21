new Vue({
  el: '#app1',
  data: {
    isActive: true,
    isDanger: true,
    defaultStyleSet: {
      active: true,
      'text-info': true
    },
    activeClass: 'active',
    dangerClass: 'text-danger',
    activeColor: 'aqua',
    dangerColor: 'orange',
    bindedStyle: {
      'background-color': 'orange',
      'font-size': '200%'
    }
  },
  computed: {
    computedStyleSet: function() {
      return {
        active: this.isActive && !this.isDanger,
        'text-danger': this.isDanger
      }
    }
  }
});
