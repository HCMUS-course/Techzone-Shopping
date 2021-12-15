
// $('body').bind('beforeunload',function(){
  if($('#pagination').length){
  $.get( `/api/${$("#product_id").val()}/comment`,function(data){
    $(function () {
      let container = $('#pagination');
      console.log(data);
      container.pagination({
          dataSource: data,
          pageSize: 3,
          callback: function (data, pagination) {
            console.log((data));
              var dataHtml = '';
  
              $.each(data, function (index, item) {
                  
                  dataHtml +=`<div class='comment-author-infos pt-25'> <span> ${item.username} </span> <em> ${item.createAt} </em> <p> ${item.content} </p> </div>`
              });
              console.log(dataHtml);
              $("#data-container").html(dataHtml);
          }
      })
  })
  })

}
// });


$("#review-submit").on("click", function (event) {
  event.preventDefault();
  $.post(
    `/products/id/${$("#product_id").val()}/comment`,
    {
      content: $("#feedback").val(),
    },
    function (data) {

        $(function () {
            let container = $('#pagination');
            console.log(data);
            container.pagination({
                dataSource: data,
                pageSize: 3,
                callback: function (data, pagination) {
                    var dataHtml = '';
        
                    $.each(data, function (index, item) {
                        // dataHtml += '<li>' + item.name + '</li>';
                        dataHtml +=`<div class='comment-author-infos pt-25'> <span> ${item.username} </span> <em> ${item.createAt} </em> <p> ${item.content} </p> </div>`
                    });
        
                    $("#data-container").html(dataHtml);
                }
            })
        })

      $("#review-area").empty();
      $("#review-close").click();
      $("html, body").animate(
        {
          scrollTop: $("#reviews").offset().top-100 ,
        },
        500
      );
    }
  )
  .fail(function (data) {
    if (data.status === 401) {
      window.location.href = `/?redirect=${window.location.href}`;
    }
  });
});



document.addEventListener("DOMContentLoaded", function(event) {


  const cartButtons = document.querySelectorAll('.cart-button');
  
  cartButtons.forEach(button => {
  
  button.addEventListener('click',cartClick);
  
  });
  
  function cartClick(){
  let button =this;
  button.classList.add('clicked');
  }
  
  
  
  });