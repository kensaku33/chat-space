$(function(){
  function buildHTML(message){
  var html = `<div class="message">
                ${message.content}
              </div>`
  return html
  }

  $('#new_message').on('submit',function(e){
    var formData = new FormData(this);
    console.log(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    
    .done(function(data){
      var html = buildHTML(message);
      $('.massages').append(html);
      $('.form__message').val('');
    })

    .fail(function(post){
      alert('エラーました')
    })

    .always(() => {
      $(".form__submit").removeAttr("disabled");
      });
  })
})

