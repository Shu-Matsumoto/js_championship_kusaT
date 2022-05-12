(function () {

  var init = function () {
    var sidebarEl = document.querySelector(".sidebar");
    sidebarEl.addEventListener("click", function (evt) {
      var spriteName = evt.target.dataset.sprite;
      if (spriteName && sprites[spriteName]) {
        loadSprite(sprites[spriteName]);
      }
    });
  };

  var loadSprite = function (sprite) {
    var editorFrameEl = document.querySelector(".editor-frame");
    var pskl = editorFrameEl.contentWindow.pskl;
    if (pskl) {
      var fps = sprite.piskel.fps;
      var piskel = sprite.piskel;
      var descriptor = new pskl.model.piskel.Descriptor(piskel.name, piskel.description, true);
      pskl.utils.serialization.Deserializer.deserialize(sprite, function (piskel) {
        piskel.setDescriptor(descriptor);
        pskl.app.piskelController.setPiskel(piskel);
        pskl.app.previewController.setFPS(fps);
      });
    }
    

    // document.getElementById("file_upload").addEventListener("click", function() {
      
    // });

    window.location.href = 'https://gsacademy.jp'; // 通常の遷移

  };

  init();
})();