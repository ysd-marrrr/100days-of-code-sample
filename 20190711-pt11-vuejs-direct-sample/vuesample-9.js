new Vue({
  el: '#app1',
  data: {
    message: '1行だけ',
    multiLineMessage: '複数行\nですね~',
    checked: [false, true],
    selectedNames: [],
    radioTuned: '',
    selectedRadio: '',
    favoriteRadioStation: [],
    featuredRadio: [
      { text: '70.0MHz D radio', stationName: 'D radio', value: 'D' },
      { text: '77.0MHz E radio', stationName: 'E radio', value: 'E' },
      { text: '82.0MHz F radio', stationName: 'F radio', value: 'F' },
      { text: '86.0MHz G radio', stationName: 'G radio', value: 'G' }
    ],
    selectedFeaturedRadio: [],
    bindedSelection: ['v-bindで', 'valueを変更できます'],
    selectedBindMessage: '',
    selectedCheckMessage: '',
    selectedPickMessage: '',
    selectedSelectObject: {},
    lazyInputedText: '',
    notCastedValue: '',
    castedValue: '',
    notTrimedInputValue: '',
    trimedInputValue: ''
  },
  methods: {
    selectChange: function() {
      alert('typeof: ' + typeof this.selectedSelectObject);
      alert(this.selectedSelectObject['stationName']);
    }
  }
});
