var addTontonButton = function(){
  setTimeout(function(){
    if (!$('.message-form textarea').length) { return; }
    if ($('#tonton').length == 0){
      $('.message-form textarea').parent().append('<label id="tonton" class="ember-view file-select-button btn tooltipstered"><img src="'+chrome.extension.getURL('images/btn-bell.png')+'"></label>')
      var contents = '<div id="tonton_list" class="modal fade" tabindex="-1" role="dialog"aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">To whom you tonton?</h4></div><div class="modal-body">'
	contents += '<img class="tontee" src="https://idobata.s3.amazonaws.com/uploads/user/icon/287/self_osscafe_plain.png" text="@yasulab トントン https://appear.in/YassLab"></img> '
	contents += '<img class="tontee" src="https://idobata.s3.amazonaws.com/uploads/user/icon/404/175ea243963b20993028f6b102b538a5.jpeg" text="@hanachin トントン https://appear.in/YassLab"></img> '
	contents += '<img class="tontee" src="https://idobata.s3.amazonaws.com/uploads/user/icon/2392/8c0ac895d8d7b8c36cb878b0d334dd29.jpeg" text="@himajin315 トントン https://appear.in/YassLab"></img> '
	contents += '<img class="tontee" src="https://idobata.s3.amazonaws.com/uploads/user/icon/2633/9X9PYqQK.png" text="@nanophate トントン https://appear.in/YassLab" ></img> '
	contents += '<img class="tontee" src="https://idobata.s3.amazonaws.com/uploads/user/icon/8271/me.png" text="@siman トントン https://appear.in/YassLab" ></img>'
	contents += '</div></div></div></div>'
      $('body').append(contents)
    }
  }, 500)
}

$(function(){
  addTontonButton();
});

$(document).on('click', '.ember-view.room, aside.sidebar.vertical-container.left, .message-form textarea', function(ev){
  addTontonButton();
});

$(document).on('click', '#tonton', function(ev){
  ev.preventDefault();
  $('#tonton_list').modal();
});

$(document).on('click', 'img.tontee', function(ev){
  $('#tonton_list').modal('hide');
    var tontonText = $(ev.target).attr('text');
  var matches = $('aside.sidebar.vertical-container.left a.active').attr('href').match(/organization\/([^\/]+)\/room\/([^\/]+)/)
  var params = {
    organization_slug: matches[1],
    room_name:         matches[2]
  }
  $.get(location.protocol + '//' + location.host + '/api/rooms', params, function(data) {
    var roomId = data.rooms[0].id
    params = {
      'message[room_id]': roomId,
      'message[source]':  tontonText
    }
    $.ajax({
      type: "POST",
      url:  location.protocol + '//' + location.host + '/api/messages',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  });
});
