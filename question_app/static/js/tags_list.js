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
    var name = $('#tagText').val()
    var context = {
        'name': name,
    }
    $.ajax({
        url: '/api/tags/',
        type: "POST",
        data: context
    }).done(function(results) {
    })
}
$('#createTag').click(addTag)


function getTags(){
    $.ajax({
        url: '/api/tags/',
        type: 'GET',
    }).done(function(results){
        var source = $('#tag-template').html()
        var template = Handlebars.compile(source)
        var html = template(results)

        $('#tagList').append(html)
    })
}
getTags()


function loadQuestionByTag(id){
    $.ajax({
        url: '/api/get-questions?tag=' + id,
        type: 'GET',
    }).done(function(results){
        var source = $('#question-template').html()
        var template = Handlebars.compile(source)
        var html = template(results)
        $('#tagList').empty()
        $('#tagForm').empty()
        $('#tagList').append(html)
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


Handlebars.registerHelper('linkURL', function (object){
    title = Handlebars.Utils.escapeExpression(object.title)
    id = Handlebars.Utils.escapeExpression(object.id)
    text = Handlebars.Utils.escapeExpression(object.text)
    url = '/question_page/' + id + '/'
    return '<a class="linkBack" href="' + url + '">' + '<b>' + this.title + '</b>' + '</a>'
})


function scrollQuestion(){
    $('html, body').animate({
        scrollTop: $("#questList").offset().bottom
    }, 1);
}
$("#tagTitle").click(scrollQuestion)
