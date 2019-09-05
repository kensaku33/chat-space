$(document).on("turbolinks:load", function() {
  function buildHTML(message){
    let img = ""
    if (message.image !== null) {
        img = `<img src="${message.image}">`
    }
    let content = ""
    if (message.content !== null) {
        content = `<p class="lower-message__content">
        ${message.content}
        </p>`
    }
    var html = `<div class="chat-main__messages__message">
                  <div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.name}
                      </div>
                      <div class="upper-message__date">
                      ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
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
    // console.log(url);
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
      $('.form__message').val('')
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
})