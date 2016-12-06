from rest_framework import serializers
from .models import Question, Answer, Tag, Vote, MysterMan

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        pass
        # model = Question
        # fields = ()


class AnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        pass
        # model = Answer
        # fields = ()


class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        pass
        # model = Tag
        # fields = ()


class VoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        pass
        # model = Vote
        # fields = ()


class MysterManSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        pass
        # model = MysterMan
        # fields = ()
