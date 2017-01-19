from django.shortcuts import render
from .models import Question, Answer, Tag, Vote
from rest_framework import viewsets
from .serializers import QuestionGetSerializer, AnswerSerializer
from .serializers import VoteSerializer, TagSerializer, UserSerializer
from .serializers import QuestionPostSerializer
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.contrib.auth import login
from rest_framework import permissions
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
import django_filters


class QuestionFilter(django_filters.rest_framework.FilterSet):
    no_answers = django_filters.BooleanFilter(name='answers',
                                                lookup_expr='isnull')
    class Meta:
        model = Question
        fields = ['tag', 'user', 'no_answers']


class QuestionGetViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('-created')
    serializer_class = QuestionGetSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_class = QuestionFilter
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class QuestionPostViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('-created')
    serializer_class = QuestionPostSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_class = QuestionFilter
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class AnswerFilter(django_filters.rest_framework.FilterSet):

    class Meta:
        model = Answer
        fields = ['user']


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_class = AnswerFilter
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


def register(request):
    if request.method == 'POST':
        print('greetings')
        form = UserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            login(request, new_user)
            return HttpResponseRedirect('/accounts/profile')
    form = UserCreationForm()
    context = {'form': form}
    return render(request, 'registration/register.html', context)


def ask_question(request):
    current_user = request.user
    return render(request, 'ask_question.html', {'current_user': current_user})


def list_question(request):
    current_user = request.user
    return render(request, 'question_list.html',
                  {'current_user': current_user})


def needy_questions(request):
    return render(request, 'needy_questions.html')


def profile_page(request):
    current_user = request.user
    return render(request, 'profile.html', {'current_user': current_user})


def question_detail(request):
    current_user = request.user
    return render(request, 'question_detail.html',
                  {'current_user': current_user})
