from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import BlogPost
from .serializers import BlogPostSerializer
from django.http import Http404
from rest_framework import status

# Using a generic that takes care of get and post requests. Explicity defined delete and put requests.
class BlogPostList(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def get_post(self, data):
        try:
            return BlogPost.objects.get(pk=data['pk'])
        except:
            raise Http404

    def delete(self, req, format=None):
        post = self.get_post(req.data)
        post.delete()
        return Response(req.data, status=status.HTTP_200_OK)

    def put(self, req, format=None):
        post = self.get_post(req.data)
        serializer = BlogPostSerializer(post, data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
