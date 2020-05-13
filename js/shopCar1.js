cartNumJuage(); //判断顶部nav的数量 来源于cartNumJuage.js封装的函数
juage();
//判断本地localStorage是否存在数据 若存在数据则画模板 反之不做运行 执行显隐事件
function juage() {
  var newArr = JSON.parse(localStorage.getItem("contArr")); //获取本地localStorage的contArr并命名为newArr
  if (newArr == null || $(newArr).length == 0 || newArr == []) { //判断这个数组是否为空 或者长度为0 总之判断它是否存在 是否有值 执行显隐效果
    $('.shopCarNull').show();
    $('.shopCar').hide();
    $('.place-bottom').hide();
  } else {
    $('.shopCarNull').hide();
    $('.shopCar').show();
    $('.place-bottom').show();
    var html = ''
    var priceSum = 0; //定义总价为0
    $.each(newArr, function (key, value) { //newArr的each事件 获取value值
      priceSum += parseInt(value.price.replace(/[^0-9]/ig, "")); //获取每一个除掉人民币符号并强转成number类型的价格 并全部相加
      html += ` 
    <li class="cartLi">
    <!-- 面板显示 -->
    <div class="cart-box">
      <div class="cart-img"><img
          src="${value.img}"></div>
      <div class="cart-pro-title">
        <p class="cart-name">${value.name}</p>
        <p class="cart-price">${value.price}</p>
      </div>
    </div>
    <!-- 数量控制按钮 -->
    <div class="cartNumber">
      <a class="actionReduce" data-dire="reduce"><img src="./img/-.png"></a>
      <span class="cartCount ">${value.count}</span>
      <a class="actionAdd"  data-dire="add"><img src="./img/add.png"></a>
    </div>
  </li>`
    })
    $('.cartUl').html(html); //写入es6模板
    $('#pay-price').html('¥' + priceSum); //写入价格
  }
}
$('.place-bottom').on('click', '.delete-but', function () { //底部左侧叉叉的on点击事件委托 
  var contArr = []; //定义一个空数组contArr
  localStorage.setItem("contArr", JSON.stringify(contArr)); //保存进本地覆盖localStorage的本地contArr数据
  juage();
  cartNumJuage();
});
for (let i = 0; i < $('.cartLi').length; i++) {
  $('.cartUl').on('click', '.actionReduce:eq(' + i + '),.actionAdd:eq(' + i + ')', function () { //on事件委托左右加减的两个点击事件
    var contArr = JSON.parse(localStorage.getItem("contArr")); //获取localStorage 并且调用
    var UnitPrice = parseInt(contArr[i].price.replace(/[^0-9]/ig, "")) / contArr[i].count; //获取单价
    if ($(this).attr('data-dire') == 'reduce') { //判断当前点击的属性值 来确定执行哪个加减运算
      contArr[i].count--; //数量减一
    } else if ($(this).attr('data-dire') == 'add') {
      contArr[i].count++; //数量加一
    }
    if (contArr[i].count <= 0) { //判断数量是否小于1 若true 当前li删除 当前数组删除
      $('.cartLi').eq(i).remove();
      contArr.splice(i, 1);
      if ($('.cartLi').length == 0) { //判断li的长度是否为0  若true 执行显隐事件
        $('.shopCarNull').show();
        $('.shopCar').hide();
        $('.place-bottom').hide();
      }
    } else { //如果当前数量不小于0 那我们要把所有东西写进contArr 名字、图片不用改 数量已经改过 只剩价格 所以i不小于0就计算价格
      contArr[i].price = '¥' + (contArr[i].count * UnitPrice); //单价*数量
    }
    localStorage.setItem("contArr", JSON.stringify(contArr)); //将新的contArr存进localStorage
    juage();
    cartNumJuage();
  });
}