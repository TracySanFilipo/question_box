from django.shortcuts import render
from .models import Question, Answer, Tag, Vote, MysterMan
from rest_framework import viewsets
from .serializers import (QuestionSerializer, AnswerSerializer, TagSerializer,
VoteSerializer, MysterManSerializer)
