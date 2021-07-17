from rest_framework import viewsets
from .serializers import PostSerializer
from .models import Post
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.mixins import UpdateModelMixin

# Create your views here.


class PostListView(UpdateModelMixin, ListAPIView):
    template_name = 'success.html'
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostCreateView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
