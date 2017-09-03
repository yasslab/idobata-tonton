var addTontonButton = function(){
  setTimeout(function(){
    if (!$('.message-form textarea').length) { return; }
      if ($('#tonton').length == 0){
	  $('.message-form textarea').parent().append('<label id="tonton" class="ember-view file-select-button btn tooltipstered"><img src="'+chrome.extension.getURL('images/btn-bell.png')+'"></label>')
	  var contents = '<div id="tonton_list" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">To whom you knock?</h4></div><div class="modal-body">'
	  _.each(_.range(0, $("div.fit:contains('Members')").parent().next().children().length-1), function(num){
	      username = $.trim($("li.horizontal-container .fit").eq(num).text());
	      contents += '<img class="tontee" src="'+$("li.horizontal-container").eq(num).find("img").attr("src")+'" text="@'+username+' トントン https://appear.in/'+$.trim($('footer .dropdown-toggle .fit').text())+'"></img> '
	  });
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
