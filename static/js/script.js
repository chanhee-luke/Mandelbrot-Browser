//script.js for mandelbrot browser

var port_num = 5000;

function getNewImage() {
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", "/new", true);
  payload = {}
  let x = document.getElementById("xInput").value
  let y = document.getElementById("yInput").value
  let max = document.getElementById("maxInput").value
  let s = document.getElementById("sInput").value
  if (parseFloat(max) > 1000 || parseFloat(s) < 1){
    alert("This is going to take some time!");
    document.getElementById("img").src = "/static/images/loading.gif";
  }
  payload['x'] = x;
  payload['y'] = y;
  payload['max'] = max;
  payload['s'] = s;
  payload = JSON.stringify(payload);

  xhr.onload = function(e) {
      var resp = JSON.parse(xhr.responseText);
      if (resp["result"] == "success"){
          document.getElementById("img").src = "/static/images/mandel.bmp?t=" + new Date().getTime();
          document.getElementById("xval").value = x;
          document.getElementById("yval").value = y;
          document.getElementById("maxval").value = max;
          document.getElementById("sval").value = s;
          // reload image
      } else{
          // do nothing
      }
  }; xhr.send(payload);
}
