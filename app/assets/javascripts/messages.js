$(document).on("turbolinks:load", function() {
  function buildHTML(message){
    let content = message.content ? `<p class="lower-message__content" >
                                      ${message.content}
                                      </p>` : "";
    let img = message.image ? `<img src="${message.image}">` : "";

    var html = `<div class="chat-main__messages__message">
                  <div class="message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${content}
                      </p>
                      ${img}
                    </div>
                  </div>
                </div>`
    return html
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'post',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html);
      $('#new_message')[0].reset()
      $('#send_message').removeAttr('disabled');
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      return true
    })
    .fail(function(){
      alert('エラーでました')
      $('#send_message').removeAttr('disabled');
    });
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data('message-id');
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: 'api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
        //メッセージが入ったHTMLを取得
        insertHTML = buildHTML(message);
        console.log(insertHTML)
        //メッセージを追加
        $('.chat-main__messages').append(insertHTML);
        $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
        });
      })
      .fail(function() {
        console.log('error');
      });
    };
  };
  setInterval(reloadMessages, 5000);
})