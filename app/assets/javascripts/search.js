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
          appendErrMsgToHTML();
        }
      })
    })
  });

  var add_user =$('.chat-group-users.js-add-user');

  function addUser(name, id){
    var html2 =`<div class="chat-group-user">
                  <input name="group[user_ids][]" type="hidden" value=${id}>
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
  add_user.append(html2)
  }

  $("#user-search-result").on('click', '.chat-group-user__btn--add', function(){
    var i =  $('.chat-group-user__btn--add').index(this);
    $($('.chat-group-user')[i]).remove();
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    addUser(name, id);
  })

  $(".chat-group-users.js-add-user").on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
});