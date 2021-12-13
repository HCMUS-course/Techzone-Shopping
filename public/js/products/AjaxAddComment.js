const { eventNames } = require("../../../components/products/productModel")


  $("#comment-form input[type=submit]" ).on("click",function(event)
  {
      event.preventDefault();
      $post(`/products/id/${$('#product_id').val()}/comment`,{
            content:$('#feedback').val(),

      },function(data){
          const commentTemplate=Handlebars.compile(
            " <div class='comment-author-infos pt-25'> <span>/{{username}}</span> <em>/{{createAt}}</em> <p>/{{content}}</p> </div> "
          )
          const commentHTML=commentTemplate(data)
          $("#reviews-area").prepend(commentHTML)
      })
    //   .fail(function(data){
    //       if(data.status===401){
    //           window.location.href=`/?redirect=${window.location.href}`;
    //       }
    //   })
  })