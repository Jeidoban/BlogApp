from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import BlogPost

# Create your tests here.
class BlogPostTests(APITestCase):
    def test_create_post(self):
        response = self.client.post('/api/posts/', {'title': 'Some title', 'content': 'some content'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(BlogPost.objects.count(), 1)
        self.assertEqual(BlogPost.objects.get().title, 'Some title')

    def test_get_post(self):
        response = self.client.get('/api/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_post(self):
        self.client.post('/api/posts/', {'title': 'Some title', 'content': 'some content'}, format='json')
        response = self.client.put('/api/posts/', {'title': 'Some title again', 'content': 'some more content', 'pk': '1'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(BlogPost.objects.get().title, 'Some title again')

    def test_delete_post(self):
        self.client.post('/api/posts/', {'title': 'Some title', 'content': 'some content'}, format='json')
        response = self.client.delete('/api/posts/', {'pk': '1'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(BlogPost.objects.count(), 0)



