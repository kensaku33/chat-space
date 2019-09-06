$(document).on('turbolinks:load', function(){

  $(function() {

    function appendProduct(group_users){

      var html =`
      
      `
    }

      
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      var url = (window.location.href);
      $.ajax({
        type: 'GET',
        url: url,
        data: { keyword: input },
        dataType: 'json'
      })
      console.log(input)
      
      .done(function(data){
        $("#user-search-result").empty();
        if (group_users.length !== 0) {
          group_users.forEach(function(group_users){
            appendProduct(group_users);
          });
        }
        else {
          appendErrMsgToHTML("");
        }
      })¥
    })  
  })
});