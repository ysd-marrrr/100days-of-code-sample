var freezeObj = {
  text: "vueにわたす前にObject.freezeしてしまったのだー"
}

Object.freeze(freezeObj);

new Vue({
  el: "#app1",
  data: freezeObj,
  created: function() {
    console.log("Vue created.");
    console.log("Data: " + this.text);
  }
})