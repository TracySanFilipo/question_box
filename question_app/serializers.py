from rest_framework import serializers
from .models import Question, Answer, Tag, Vote
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['title', 'text', 'tags', 'creator', 'url', 'created']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('text', 'score', 'question', 'creator')


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ('creator', 'answer', 'point')
