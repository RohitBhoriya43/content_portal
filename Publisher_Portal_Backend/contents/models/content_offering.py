from django.db import models


class ContentOffering(models.Model):
    title = models.CharField(max_length=200,null=True)
    description = models.TextField(null=True)
    price = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)