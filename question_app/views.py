from django.shortcuts import render
from .models import Question, Answer, Tag, Vote
from rest_framework import viewsets
from .serializers import (QuestionSerializer, AnswerSerializer, TagSerializer,
VoteSerializer)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Ability.objects.all().order_by('date')
    serializer_class = QuestionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Ability.objects.all().order_by('date')
    serializer_class = AnswerSerializer
