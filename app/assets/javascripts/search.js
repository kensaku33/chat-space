$(document).on('turbolinks:load', function(){
  $(function() {
    var user_list = $("#user-search-result");
    
    function appendProduct(user){
      var html =`<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name=${user.name}>追加</div>
                </div>`
    user_list.append(html);
    }

    function appendErrMsgToHTML(){
      var html =`<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーはいません</p>
                </div>`
    user_list.append(html);
    }

    $("#user-search-field").on("keyup", function(e) {
      e.preventDefault();
      var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(user) {
        $("#user-search-result").empty();
        if (user.length !== 0) {
          user.forEach(function(user){
            appendProduct(user);
          });
        }
        else {
          appendErrMsgToHTML;
        }
      })
    })
  });


  // function removeAdd(name, id){
  //   var add_user =`<div class="chat-group-user clearfix">
  //                   <p class="chat-group-user__name">${name}</p>
  //                   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${id}" data-user-name=${name}>削除</div>
  //                 </div>`
  // ('.chat-group-users.js-add-user').append(add_user)
  // }




  function addUser(name, id){
    var add_user =`<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${id}" data-user-name=${name}>削除</div>
                  </div>`
  ('.chat-group-users.js-add-user').append(add_user)
  }

  $("#user-search-result").on('click', '.chat-group-user__btn--add', function(){
    var i =  $('.chat-group-user__btn--add').index(this);
    $($('.chat-group-user')[i]).remove();
    var name = "";
    var id = 0;
    addUser(name, id);
  })




});

