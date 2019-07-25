new Vue({
  el: "#app1",
  data: {
    message: "1行だけ",
    multiLineMessage: "複数行\nですね~",
    checked: [false, true],
    selectedNames: [],
    radioTuned: "",
    selectedRadio: "",
    favoriteRadioStation: [],
    featuredRadio: [
      { text: "70.0MHz D radio", value: "D" },
      { text: "77.0MHz E radio", value: "E" },
      { text: "82.0MHz F radio", value: "F" },
      { text: "86.0MHz G radio", value: "G" }
    ],
    selectedFeaturedRadio: []
  }
});
