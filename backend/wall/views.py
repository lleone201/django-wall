from rest_framework import viewsets
from .serializers import PostSerializer
from .models import Post
from rest_framework.generics import ListAPIView, RetrieveAPIView

# Create your views here.


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
