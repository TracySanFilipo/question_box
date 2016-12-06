from django.db import models

# Create your models here.

class Question(models.Model):
    title = models.CharField(max_length=35)
    text = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tag)
    creator = models.ForeignKey(User)


class Answer(models.Model):
    text = models.CharField(max_length=500)
    score = models.IntegerField(default=0)
    question = models.ForeignKey(Question)
    creator = models.ForeignKey(User)
    created = models.DateTimeField(auto_now=True)


class Tag(models.Model):
    name = CharField(max_length=15)


class Vote(models.Model):
    creator = models.ForeignKey(User)
    created = models.DateTimeField(auto_now=True)
    answer = models.ForeignKey(Answer)
    point = models.IntegerField(default=0)
