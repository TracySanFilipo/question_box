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

}
currentURL()


function getQuestionDetail(url){
    var id = url.split('/')
    id = id[4]
    var url = '/api/get-questions/' + id + '/'
    $.ajax({
        url: url,
        type: 'GET',
    }).done(function(results){
        var answers = results.answers
        displayAnswers(answers)
        var context = {
            title: results.title,
            created: results.created,
            text: results.text,
            id: results.id,
        }
        var source = $('#question-template').html()
        var template = Handlebars.compile(source)
        var html = template(context)
        $('#questDetail').append(html)

    })
}


function answerQuestion(id){
    var questId = id
    var answerText = $('#questAnswer' + id).val()
    var user = $('#userId').val()
    context = {
        'question': questId,
        'text': answerText,
        'user': user,
    }
    $.ajax({
        url: '/api/answers/',
        type: "POST",
        data: context
    }).done(function(results) {
        location = location
    })
}


function displayAnswers(answers){
    var sourceTwo = $('#answer-template').html()
    var templateTwo = Handlebars.compile(sourceTwo)
    var htmlTwo = templateTwo(answers)
    $('#answerDetail').append(htmlTwo)

}


function voteAnswer(thisAnswerId, thisAnswerScore, amount){
   var newScore = parseInt(thisAnswerScore) + amount
   var goToId = thisAnswerId
   var newData = {"score": newScore}
   var url = '/api/answers/' + goToId + "/"
   $.ajax({
       url: url,
       type: 'PATCH',
       data: newData,
   }).done(function(results){
        var id_container = '#answer_score_' + results.id
        $(id_container).html('Score: ' + results.score)
   })
}


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
