from django.db import models
from django.contrib.auth.models import User


class Tag(models.Model):
    name = models.CharField(max_length=200)


class Question(models.Model):
    title = models.CharField(max_length=35)
    text = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now=True)
    tag = models.ForeignKey(Tag, related_name='questions')
    user = models.ForeignKey(User)

    def __repr__(self):
        return self.title


class Answer(models.Model):
    text = models.CharField(max_length=500)
    score = models.IntegerField(default=0)
    question = models.ForeignKey(Question, related_name='answers')
    user = models.ForeignKey(User)
    created = models.DateTimeField(auto_now=True)


class Vote(models.Model):
    user = models.ForeignKey(User)
    created = models.DateTimeField(auto_now=True)
    answer = models.ForeignKey(Answer)
    point = models.IntegerField(default=0)
