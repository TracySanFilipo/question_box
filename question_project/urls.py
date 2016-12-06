from django.conf.urls import url, include
from rest_framework import routers
from question_app import views
from django.contrib import admin


router = routers.DefaultRouter()
router.register(r'',views.)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls',
    namespace='rest_framework'))
]
