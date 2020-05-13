cartNumJuage();
var shopCarNull = document.getElementsByClassName('shopCarNull')[0];
var shopCar = document.getElementsByClassName('shopCar')[0];
var cartUl = document.getElementsByClassName('cartUl')[0];
var placeBottom = document.getElementsByClassName('place-bottom')[0];
var deleteBut = document.getElementsByClassName('delete-but')[0];
var payPrice = document.getElementById('pay-price');

var priceSum = 0;
juage();

function juage() {
  if (JSON.parse(localStorage.getItem("contArr")) == null) {
    shopCarNull.style.display = 'block';
    shopCar.style.display = 'none';
    placeBottom.style.display = 'none';
  } else if ($(JSON.parse(localStorage.getItem("contArr"))).length == 0) {
    shopCarNull.style.display = 'block';
    shopCar.style.display = 'none';
    placeBottom.style.display = 'none';
  } else {
    shopCarNull.style.display = 'none';
    shopCar.style.display = 'block';
    placeBottom.style.display = 'block';
    var newArr = JSON.parse(localStorage.getItem("contArr"));
    var html = ''
    for (let i = 0; i < newArr.length; i++) {
      priceSum += parseInt(newArr[i].price.replace(/[^0-9]/ig, ""));
      html += `
    <li class="cartLi">
    <!-- 面板显示 -->
    <div class="cart-box">
      <div class="cart-img"><img
          src="${newArr[i].img}"></div>
      <div class="cart-pro-title">
        <p class="cart-name">${newArr[i].name}</p>
        <p class="cart-price">${newArr[i].price}</p>
      </div>
    </div>
    <!-- 数量控制按钮 -->
    <div class="cartNumber">
      <a class="actionReduce"><img src="./img/-.png"></a>
      <span class="cartCount ">${newArr[i].count}</span>
      <a class="actionAdd"><img src="./img/add.png"></a>
    </div>
  </li>`
    }
    cartUl.innerHTML = html;
    payPrice.innerHTML = '¥' + priceSum;
  }

}

deleteBut.onclick = function () {
  var contArr = null;
  localStorage.setItem("contArr", JSON.stringify(contArr));
  juage();
  cartNumJuage();
}


var actionReduce = document.getElementsByClassName('actionReduce');
var actionAdd = document.getElementsByClassName('actionAdd');
var cartPrice = document.getElementsByClassName('cart-price');
var cartCount = document.getElementsByClassName('cartCount');
var cartLi = document.getElementsByClassName('cartLi');
for (let i = 0; i < actionReduce.length; i++) {
  $('.cartUl').on('click', '.actionReduce:eq(' + i + ')', function () {

    var priceSum = 0; //重新定义价格总和
    var contArr = JSON.parse(localStorage.getItem("contArr")); //获取localStorage 并且调用

    console.log($('.cartLi').length)
    var UnitPrice = parseInt(contArr[i].price.replace(/[^0-9]/ig, "")) / contArr[i].count; //获取单价
    contArr[i].count--; //数量减一
    if (contArr[i].count <= 0) {
      $('.cartLi').eq(i).remove();
      if ($('.cartLi').length == 0) {
        shopCarNull.style.display = 'block';
        shopCar.style.display = 'none';
        placeBottom.style.display = 'none';
      }
    } else {
      console.log(contArr)
      console.log(contArr[i].count)
      contArr[i].price = '¥' + (contArr[i].count * UnitPrice); //单价*数量
      for (let i = 0; i < contArr.length; i++) { //循环当前的localStorage 抽取价格总和
        priceSum += parseInt(contArr[i].price.replace(/[^0-9]/ig, ""));
      }
      cartPrice[i].innerHTML = contArr[i].price; //写入价格
      cartCount[i].innerHTML = contArr[i].count; //写入数量
      payPrice.innerHTML = '¥' + priceSum; //写入价格总和
    }
    if (contArr[i].count <= 0) {
      contArr.splice(i, 1);
    }
    localStorage.setItem("contArr", JSON.stringify(contArr)); //将新的contArr存进localStorage
    cartNumJuage();
  });

}
for (let i = 0; i < actionAdd.length; i++) {
  $('.cartUl').on('click', '.actionAdd:eq(' + i + ')', function () {
    var priceSum = 0;
    var contArr = JSON.parse(localStorage.getItem("contArr"));
    var UnitPrice = parseInt(contArr[i].price.replace(/[^0-9]/ig, "")) / contArr[i].count; //获取单价
    contArr[i].count++; //数量加一
    contArr[i].price = '¥' + (contArr[i].count * UnitPrice); //单价*数量
    for (let i = 0; i < JSON.parse(localStorage.getItem("contArr")).length; i++) {
      priceSum += parseInt(contArr[i].price.replace(/[^0-9]/ig, ""));
    }
    cartPrice[i].innerHTML = contArr[i].price;
    cartCount[i].innerHTML = contArr[i].count;
    payPrice.innerHTML = '¥' + priceSum; //写入价格总和
    localStorage.setItem("contArr", JSON.stringify(contArr));
    cartNumJuage();
  });
}