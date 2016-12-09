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


function askQuestion(formdata){
    var inputtagname = $('#qtitle').val()
    var inputtagname = $('#qtext').val()
    var inputtagname = $('#qtags').val()
    $.ajax({
        url: '/api/question',
        type: "POST",
        data: formdata
    }).done(function(results) {
        console.log(results)
    })
}

//
// function addTag(formdata){
//     var inputdata = formdata
//     $.ajax({
//         url: '/api/tag',
//         type: "POST",
//         data: formdata
//     }).done(function(results) {
//         console.log(results)
//     })
// }


function load_tags(){
    $.ajax({
        url: '/api/tags',
        type: "GET",
    }).done(function(results) {
        var tagdata = results
        console.log(results)
        var source = $('#newq_template').html();
        var template = Handlebars.compile(source);
        console.log(template)
        var html = template(tagdata);
        $('#currenttags').html(html)
    })
}

load_tags()


$('#newquestionsubmit').click(askQuestion)
