function getCookie(name) {
   var cookieValue = null;
   if (document.cookie && document.cookie !== '') {
       var cookies = document.cookie.split(';');
       for (var i = 0; i < cookies.length; i++) {
           var cookie = jQuery.trim(cookies[i]);
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
           }
       }
   }
   return cookieValue;
}


var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


function askQuestion(){
    var questTitle = $('#qTitle').val()
    var questText = $('#qText').val()
    var questTag = $('#tagSelect option:selected').val()
    var user_id = $('#userId').val()
    context = {
        'title': questTitle,
        'text': questText,
        'tag': questTag,
        'user': user_id,
    }
    $.ajax({
        url: '/api/post-questions/',
        type: "POST",
        data: context
    }).done(function(results) {
    })
}
$('#newQuestSubmit').click(askQuestion)


function getTags(){
    $.ajax({
        url: '/api/tags/',
        type: 'GET',
    }).done(function(results){
        var tags = results.results
        var source = $('#tags-template').html()
        var template = Handlebars.compile(source)
        var html = template(tags)
        $('#currentTags').append(html)
    })
}
getTags()
