from django.db import models
from django.contrib.auth.models import User

class BlogPost(models.Model):
    created = models.DateField(auto_now_add=True) # Time is automatically set when post is created.
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title