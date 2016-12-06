from django.shortcuts import render
from .models import Question, Answer, Tag, Vote
from rest_framework import viewsets
from .serializers import (QuestionSerializer, AnswerSerializer, TagSerializer,
VoteSerializer)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('date')
    serializer_class = QuestionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all().order_by('date')
    serializer_class = AnswerSerializer
