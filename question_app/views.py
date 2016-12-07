from django.shortcuts import render
from .models import Question, Answer, Tag, Vote
from rest_framework import viewsets
from .serializers import (QuestionSerializer, AnswerSerializer, TagSerializer,
VoteSerializer)
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('date')
    serializer_class = QuestionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all().order_by('date')
    serializer_class = AnswerSerializer


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            return HttpResponseRedirect('/index/')
    else:
        form = UserCreationForm()
        context = {'form': form}
        return render(request, 'registration/register.html', context)



class TasksViewSet(viewsets.ModelViewSet):
    pass
