from rest_framework import serializers
from .models import Question, Answer, Tag, Vote
from django.contrib.auth.models import User


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text', 'score', 'question', 'user', 'created', 'url']


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ['name', 'id']


class QuestionGetSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    tag = TagSerializer(many=False, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'title', 'text', 'tag', 'user', 'url', 'created',
                  'answers']



class QuestionPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ['id', 'title', 'text', 'tag', 'user', 'url', 'created']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['user', 'answer', 'point']
