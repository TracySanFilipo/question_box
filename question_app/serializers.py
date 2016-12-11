from rest_framework import serializers
from .models import Question, Answer, Tag, Vote
from django.contrib.auth.models import User



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('text', 'score', 'question', 'creator', 'id', 'created', 'url')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'id']


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)


    class Meta:
        model = Question
        fields = ['title', 'text', 'tags', 'creator', 'url', 'created', 'id', 'answers']


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ('creator', 'answer', 'point')
