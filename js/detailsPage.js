var newId = location.search.replace(/[^0-9]/ig, "")

// console.log(newId)
$.ajax({
  type: "get",
  url: "./index.php",
  dataType: "json",
  success: function (cake) {
    console.log(cake)

  //  var detailsArr;
  //     if (newId >= 29 && newId <= 31) {
  //       detailsArr = cake.new;
  //     } else if (newId >= 32 && newId <= 35) {
  //       detailsArr = cake.Popularity;
  //     } else if (newId >= 36 && newId <= 38) {
  //       detailsArr = cake.Birthday;
  //       console.log(detailsArr);
  //      }
  
      for (let i = 0; i < detailsArr.length; i++) {
        if (newId == detailsArr[i].id) {
          //轮播
          var lunboImg = detailsArr[i].lunbo;
          var showImg = detailsArr[i].show;
          var lunboHtml = '';
          var showHtml = '';
          for (let j = 0; j < lunboImg.length; j++) {
            lunboHtml += `<div class="swiper-slide"><img src="${lunboImg[j].img}" alt=""></div>`
          }
          for (let j = 0; j < showImg.length; j++) {
            showHtml += `<div class="swiper-slide"><img src="${showImg[j].img}" alt=""></div>`
          }
          $('.swiper-wrapper').html(lunboHtml);
          $('.details-img').html(showHtml);
          $('.introduceText').html(detailsArr[i].introduceText)
          $('.pro-title-name').text(detailsArr[i].name);
          $('.top-price').text('￥' + detailsArr[i].price);
          $('.select-card-weight').text(detailsArr[i].weight);
          $('.details-options-size').text(detailsArr[i].weight.split('/')[0]);
}

      }

    }
});