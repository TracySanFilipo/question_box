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
    var questTag = 2
    var user = $('#userId').val()
    context = {
        'title': questTitle,
        'text': questText,
        'tags': questTag,
        'creator': user,
    }
    $.ajax({
        url: '/api/questions/',
        type: "POST",
        data: context
    }).done(function(results) {
    })
}
$('#newQuestSubmit').click(askQuestion)


function getTags(){
    var dropdown = $("#selectTag")
    $.ajax({
        url: '/api/tags/',
        type: 'GET',
    }).done(function(results){
        console.log(results.results)
        var source = $('#post-template').html()
        var template = Handlebars.compile(source)
        var html = template(results)
        $('#currentTags').append(html)
    })
}
getTags()
