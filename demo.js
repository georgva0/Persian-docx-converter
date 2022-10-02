(function () {
  document
    .getElementById("document")
    .addEventListener("change", handleFileSelect, false);

  function handleFileSelect(event) {
    readFileInputEventAsArrayBuffer(event, function (arrayBuffer) {
      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then(displayResult)
        .done();
    });
  }

  function displayResult(result) {
    //apply Latin numerals & Arabic characters conversion for Farsi
    if (
      result.value.includes("ي") ||
      result.value.includes("ك") ||
      result.value.includes("0") ||
      result.value.includes("1") ||
      result.value.includes("2") ||
      result.value.includes("3") ||
      result.value.includes("4") ||
      result.value.includes("5") ||
      result.value.includes("6") ||
      result.value.includes("7") ||
      result.value.includes("8") ||
      result.value.includes("9")
    ) {
      let conversion = result.value
        .replaceAll("ي", "ی")
        .replaceAll("ك", "ک")
        .replaceAll("0", "۰")
        .replaceAll("1", "۱")
        .replaceAll("2", "۲")
        .replaceAll("3", "۳")
        .replaceAll("4", "۴")
        .replaceAll("5", "۵")
        .replaceAll("6", "۶")
        .replaceAll("7", "۷")
        .replaceAll("8", "۹")
        .replaceAll("9", "۲");
      document.getElementById("output").innerHTML = conversion;
    } else {
      document.getElementById("output").innerHTML = result.value;
    }

    var messageHtml = result.messages
      .map(function (message) {
        return (
          '<li class="' +
          message.type +
          '">' +
          escapeHtml(message.message) +
          "</li>"
        );
      })
      .join("");

    document.getElementById("messages").innerHTML =
      "<ul>" + messageHtml + "</ul>";
  }

  function readFileInputEventAsArrayBuffer(event, callback) {
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.onload = function (loadEvent) {
      var arrayBuffer = loadEvent.target.result;
      callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();
