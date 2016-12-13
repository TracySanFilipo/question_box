from django.conf.urls import url, include
from rest_framework import routers
from question_app import views
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.register(r'questions', views.QuestionViewSet)
router.register(r'answers', views.AnswerViewSet)
router.register(r'tags', views.TagViewSet)
router.register(r'votes', views.VoteViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'users_questions', views.UserQuestionViewSet)
router.register(r'users_answers', views.UserAnswerViewSet)
router.register(r'needy_questions', views.NeedyQuestionsViewSet)



urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': 'login'},
        name='logout'),
    url(r'^register/$', views.register, name='register'),
    url(r'^index/$', TemplateView.as_view(template_name='index.html'),
        name= 'index'),
    url(r'^questions/$', views.list_question, name='questions'),
    url(r'^ask_question/$', views.ask_question, name='ask_question'),
    url(r'^tags/$', TemplateView.as_view(template_name='tag_list.html'),
        name='tags'),
    url(r'^questions/[0-9]+/$', views.question_detail, name='question_detail'),
    url(r'^users_questions/[0-9]+/$', views.question_detail, name='question_detail'),
    url(r'^needy_questions/[0-9]+/$', views.question_detail, name='question_detail'),
    url(r'^accounts/profile$', views.profile_page, name='profile'),
    url(r'^needy_questions/$', views.needy_questions, name='needy'),


]
