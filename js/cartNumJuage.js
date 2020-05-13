function cartNumJuage() {
  var shopNum = 0;
  if (JSON.parse(localStorage.getItem("contArr")) !== null) { //判断localStorage中是否存在contArr数组 若存在则将存在的加入新定义的空contArr
    for (let i = 0; i < JSON.parse(localStorage.getItem("contArr")).length; i++) {
      var commodityNum = JSON.parse(localStorage.getItem("contArr"))[i].count;
      shopNum += commodityNum;
    }
  }
  if (shopNum > 0) {
    $('#cartNum').show();
  } else {
    $('#cartNum').hide();
  }
  $('#cartNum').html(shopNum);
}