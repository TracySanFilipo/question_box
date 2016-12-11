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


function currentURL(){
    var url = window.location.href
    getQuestionDetail(url)
    getAnswers(url)
}
currentURL()


function getQuestionDetail(url){
    var id = url.split('/')
    id = '/' + url.slice(-2)
    $.ajax({
        url: '/api/questions' + id,
        type: 'GET',
    }).done(function(results){
        var context = {
            title: results.title,
            created: results.created,
            text: results.text,
        }
        var source = $('#post-template').html()
        var template = Handlebars.compile(source)
        var html = template(context)
        $('#questDetail').append(html)
    })
}


function getAnswers(url){
    // var id = url.split('/')
    // console.log(id)
    // id = url.slice(-2)
    // console.log(id)
    $.ajax({
        url: '/api/answers/',
        type: 'GET',
    }).done(function(results){
        console.log(results.results)
        var source = $('#post-template-two').html()
        var template = Handlebars.compile(source)
        var html = template(results)
        $('#answerDetail').append(html)
    })
}
getAnswers()


Handlebars.registerHelper('formatTime', function (date) {
    var day = date.slice(8, 10)
    var month = date.slice(5, 7)
    var year = date.slice(0, 4)
    return month + "-" + day + "-" + year

})
