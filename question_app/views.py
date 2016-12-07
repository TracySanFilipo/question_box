from django.shortcuts import render, HttpResponse
from .models import Question, Answer, Tag, Vote
from rest_framework import viewsets
from .serializers import (QuestionSerializer, AnswerSerializer, TagSerializer,
VoteSerializer)
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/index/')
    form = UserCreationForm()
    context = {'form': form}
    return render(request, 'registration/register.html', context)
