vm = new Vue({
  el: '#app1',
  data: {
    list: [
      {
        id: 3,
        text: "これが",
        hash: "c97f732a06bc4fb6b2531fec20d16b7d"
      },
      {
        id: 2,
        text: "出れば",
        hash: "015c5b47939a427288a3bbd137a69b7f"
      },
      {
        id: 1,
        text: "いいですよね",
        hoge: "hage",
        hash: "11dd876aa5f24098bc42544f7faf0d59"
      }
    ],
    sampleData: {
      id: 0,
      title: "Sample Title",
      description: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    },
    petitList: ['a', 'b', 'c', 'd', 'e'],
    unSortedList: ['e', 'f', 'a', 'e', '6', '5', '4', '7', 'd', '4', '6', 'b', 'e', 'e', 'e', '6', '7'],
    listDisplay: false
  },
  computed: {
    sortedList: function() {
      return this.unSortedList.slice().sort();
    }
  },
  methods: {
    sortedMethodList: function(list) {
      return list.slice().sort();
    }
  }
});

function changeListContent() {
  for (var i=0; i < vm.petitList.length; i++) {
    Vue.set(vm.petitList, i, 'hoge');
  }

  vm.list[1] = Object.assign({}, vm.list[1], {
    id: 2000,
    text: "壊れました",
    hash: "ffffff"
  });
}