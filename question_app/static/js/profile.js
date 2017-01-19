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


function getQuestions(){
    var userId = $("#userId").val()
    $.ajax({
        url: '/api/get-questions?user=' + userId,
        type: 'GET',
    }).done(function(results){
        var questions = results.results
        var source = $('#question-template').html()
        var template = Handlebars.compile(source)
        var html = template(questions)
        $('#questList').append(html)

    })
}
getQuestions()


function getAnswers(){
    var userId = $("#userId").val()
    $.ajax({
        url: '/api/answers?user=' + userId,
        type: 'GET',
    }).done(function(results){
        var answers = results.results
        console.log(answers)
        var source = $("#answer-template").html()
        var template = Handlebars.compile(source)
        var html = template(answers)
        $("#answerList").append(html)
    })
}
getAnswers()

Handlebars.registerHelper('formatTime', function (posted) {
    var time = posted.replace('T', ':')
    var date = time.split(":")[0]
    var year = Number(date.split("-")[0])
    var month = Number(date.split("-")[1])
    var day = Number(date.split("-")[2])
    var months = {
        "January": 1,
        "February ": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12,
    }
    for(var i in months){
        if(month == months[i]){
            month = i
        }
    }
    return month + " " + day + " " + year
})


Handlebars.registerHelper('linkURL', function (object){
    title = Handlebars.Utils.escapeExpression(object.title)
    id = Handlebars.Utils.escapeExpression(object.id)
    text = Handlebars.Utils.escapeExpression(object.text)
    url = '/question_page/' + id + '/'
    return '<a href="' + url + '">' + '<b>' + this.title + '</b>' + '</a>'
})
