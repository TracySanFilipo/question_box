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
    var url = '/api/questions/' + id
    $.ajax({
        url: url,
        type: 'GET',
    }).done(function(results){
        console.log(results.answers)
        var answers = results.answers
        displayAnswers(answers)
        var context = {
            title: results.title,
            created: results.created,
            text: results.text,
            id: results.id,
        }
        var source = $('#post-template').html()
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
    console.log(context)
    $.ajax({
        url: '/api/answers/',
        type: "POST",
        data: context
    }).done(function(results) {
        location = location
    })
}


function displayAnswers(answers){
    var sourceTwo = $('#post-template-two').html()
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


Handlebars.registerHelper('formatTime', function (date) {
    var day = date.slice(8, 10)
    var month = date.slice(5, 7)
    var year = date.slice(0, 4)
    return month + "-" + day + "-" + year

})
