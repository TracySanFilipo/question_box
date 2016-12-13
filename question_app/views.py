from django.shortcuts import render, HttpResponse
from .models import Question, Answer, Tag, Vote
from rest_framework import viewsets
from .serializers import QuestionSerializer, AnswerSerializer
from .serializers import VoteSerializer, TagSerializer, UserSerializer
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login
from rest_framework import permissions, generics
import django_filters
from django.contrib.auth.models import User

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('-created')
    serializer_class = QuestionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class NeedyQuestionsViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.filter(answers__isnull=True)
    serializer_class = QuestionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class UserQuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Question.objects.none()

    def get_queryset(self):
        return self.request.user.question_user.all()


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class UserAnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


    def get_queryset(self):
        return self.request.user.answer_user.all()



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
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


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
    return render(request, 'question_list.html', {'current_user': current_user})


def needy_questions(request):
    return render(request, 'needy_questions.html')


def profile_page(request):
    current_user = request.user
    return render(request, 'profile.html', {'current_user': current_user})


def question_detail(request):
    current_user = request.user
    return render(request, 'question_detail.html', {'current_user': current_user})
