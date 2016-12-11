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


function answerQuestion(id){
    var questId = id

    var answerText = $('#questAnswer' + id).val()
    var user = $('#userId').val()
    console.log(user)
    context = {
        'question': questId,
        'text': answerText,
        'creator': user,
    }
    console.log(context)
    $.ajax({
        url: '/api/answers/',
        type: "POST",
        data: context
    }).done(function(results) {
    })
}




function getQuestions(){
    $.ajax({
        url: '/api/questions/',
        type: 'GET',
    }).done(function(results){
        var source = $('#post-template').html()
        var template = Handlebars.compile(source)
        var html = template(results)
        $('#questList').append(html)
        // console.log($('#addAnswer'))

    })
}
getQuestions()


Handlebars.registerHelper('formatTime', function (date) {
    var day = date.slice(8, 10)
    var month = date.slice(5, 7)
    var year = date.slice(0, 4)
    return month + "-" + day + "-" + year

})

Handlebars.registerHelper('linkURL', function (id, url, title, text){
    title = Handlebars.Utils.escapeExpression(title)
    id = Handlebars.Utils.escapeExpression(id)
    text = Handlebars.Utils.escapeExpression(text)
    datatype = this.url.split('/')
    datatype = datatype[datatype.length-3]
    return '<a href="' + '/' + datatype + '/' + this.id + '">' + '<b>' + this.title + '</b>' + '</a>'
    return '<h2>' + this.text + '</h2>'
})


Handlebars.registerHelper('userId', function(id){
    $('').on('shown', function () {
  // do something…
})

})
