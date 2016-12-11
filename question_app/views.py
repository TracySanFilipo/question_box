from django.shortcuts import render, HttpResponse
from .models import Question, Answer, Tag, Vote
from rest_framework import viewsets
from .serializers import QuestionSerializer, AnswerSerializer
from .serializers import VoteSerializer, TagSerializer
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login
from rest_framework import permissions, generics
import django_filters


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # def get_queryset(self):
    #     question = question
    #     return Purchase.objects.filter(question_id=question)


# class AnswerList(generics.ListAPIView):
#     queryset = Answer.objects.all()
#     serializer_class = AnswerSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filter_fields = ('question',)
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


def register(request):
    print('greetings')
    if request.method == 'POST':
        print('greetings')
        form = UserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            login(request, new_user)
            return HttpResponseRedirect('/index/')
    form = UserCreationForm()
    context = {'form': form}
    return render(request, 'registration/register.html', context)


def ask_question(request):
    current_user = request.user
    return render(request, 'ask_question.html', {'current_user': current_user})


def list_question(request):
    current_user = request.user
    return render(request, 'question_list.html', {'current_user': current_user})
