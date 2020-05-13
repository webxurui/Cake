$.ajax({
  type: "get",
  url: "./index.php",
  dataType: "json",
  success: function (cake) {
    console.log(cake)
    var newArray = cake.new;
    var PopularityArray = cake.Popularity;
    var Birthday = cake.Birthday;
    // console.log(newArray)
    // console.log(PopularityArray)
    // console.log(Birthday)

    var newHtml = '';
    var PopularityHtml = '';
    var birthdayHtml = '';
    for (let i = 0; i < newArray.length; i++) {
      newHtml += `<div class="cont-img" data-id="${newArray[i].id}">
      <div class="cont-imgbox"><img src="${newArray[i].img}" alt=""></div>
      <div class="cont-p">
        <p class="cont-p1"><span class="cont-p1-name">${newArray[i].name}</span> <span class="cont-p1-span1">${newArray[i].price}</span><span
            class="cont-p1-span2">${newArray[i].weight}</span>
        </p>
        <p class="cont-p2">${newArray[i].introduce}</p>
      </div>
    </div>`
    }
    for (let i = 0; i < PopularityArray.length; i++) {
      PopularityHtml += `<div class="cont-img" data-id="${PopularityArray[i].id}">
      <div class="cont-imgbox"><img src="${PopularityArray[i].img}" alt=""></div>
      <div class="cont-p">
        <p class="cont-p1"><span class="cont-p1-name">${PopularityArray[i].name}</span> <span class="cont-p1-span1">${PopularityArray[i].price}</span><span
            class="cont-p1-span2">${PopularityArray[i].weight}</span>
        </p>
        <p class="cont-p2">${PopularityArray[i].introduce}</p>
      </div>
    </div>`
    }

    for (let i = 0; i < Birthday.length; i++) {

      birthdayHtml += `<div class="cont-img" data-id="${Birthday[i].id}">
      <div class="cont-imgbox"><img src="${Birthday[i].img}" alt=""></div>
      <div class="cont-p">
        <p class="cont-p1"><span class="cont-p1-name">${Birthday[i].name}</span> <span class="cont-p1-span1">${Birthday[i].price}</span><span
            class="cont-p1-span2">${Birthday[i].weight}</span>
        </p>
        <p class="cont-p2">${Birthday[i].introduce}</p>
      </div>
    </div>`
    }

    $('#cont-newBox').html(newHtml);
    $('#cont-Popularity').html(PopularityHtml);
    $('#cont-Birthday').html(birthdayHtml);
  }
});
$('.cont').on('click', '.cont-img', function (e) {
  e.preventDefault();
  console.log($(this).attr('data-id'));
  window.location.href = "./detailsPage.html?id=" + $(this).attr('data-id')
});