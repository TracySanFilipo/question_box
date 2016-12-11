function getCookie(name) {
   var cookieValue = null
   if (document.cookie && document.cookie !== '') {
       var cookies = document.cookie.split(';')
       for (var i = 0; i < cookies.length; i++) {
           var cookie = jQuery.trim(cookies[i])
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
               break;
           }
       }
   }
   return cookieValue
}

var csrftoken = getCookie('csrftoken')
function csrfSafeMethod(method) {
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method))
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken)
        }
    }
})

function addTag(){
    var name = $('#newtag').val()
    console.log(name)
    var context = {
        'name': name,
    }
    console.log(context)
    $.ajax({
        url: 'http://0.0.0.0:5000/api/tags/',
        type: "POST",
        data: context
    }).done(function(results) {
        console.log(results)
    })
}
$('#createTag').click(addTag)


function getTags(){
    $.ajax({
        url: '/api/tags/',
        type: 'GET',
    }).done(function(results){
        console.log(results.results)
        console.log(results.results.name)
        var source = $('#post-template').html()
        var template = Handlebars.compile(source)
        var html = template(results.results)

        $('#tagList').append(html)
    })
}
getTags()
