// var id = location.search.replace(/[^0-9]/ig, "")
// console.log(id);

$.ajax({
    type: "get",
    url: "./index.php",
    // data: "data",
    dataType: "json",
    success: function (cake) {
        console.log(cake);
        // let  order = cake.
        let lunbo = cake.Iunbo;
        let show = cake.Show;
        console.log(lunbo);
        console.log(show);
     
        for (let i = 0; i < lunbo.length; i++) {
            //   if(id==publicArr[i].id){
            var arrNum = lunbo[i];
            // console.log(arrNum);
            var arrShow = show[i];
            let lunboHtml = '';
            let showHtml = '';

            for (let j = 0; j < arrNum.length; j++) {
                // console.log(arrNum[j].lunboImg);

                lunboHtml += `<div class="swiper-slide"><img src="${arrNum[j].lunboImg}" alt=""></div>`
            }
            for (let j = 0; j < arrShow.length; j++) {
                showHtml += `<div class="swiper-slide"><img src="${arrShow[j].showImg}" alt=""></div>`
            }
            $('.swiper-wrapper').html(lunboHtml);
            $('.details-img').html(showHtml);
            $('.introduceText').html(lunbo[i].introduceText)
            $('.pro-title-name').text(lunbo[i].name);
            //  $('.top-price').text('￥' + lunbo[i].price);
            $('.select-card-weight').text(lunbo[i].weight);
        // $('.details-options-size').text(lunbo[i].weight.split('/')[0]);
    }
}
    // }
});