from django.contrib import admin
from .models import Post
# Register your models here.


class WallAdmin(admin.ModelAdmin):
    display = ('title', 'content', 'date', 'likes', 'poster')


admin.site.register(Post, WallAdmin)
