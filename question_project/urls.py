from django.conf.urls import url, include
from rest_framework import routers
from question_app import views
from django.contrib import admin
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.register(r'question_app/questions', views.QuestionViewSet)
router.register(r'question_app/answers', views.AnswerViewSet)
router.register(r'question_app/tags', views.TagViewSet)
router.register(r'question_app/votes', views.VoteViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls',
    namespace='rest_framework')),
    url(r'^questions/$', TemplateView.as_view(template_name='questions.html'),
    name='questions')
]
