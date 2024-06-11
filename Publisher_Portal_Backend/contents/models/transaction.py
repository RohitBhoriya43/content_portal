from django.db import models
from .content_offering import *

class Transaction(models.Model):
    
    user_id = models.CharField(max_length=255,unique=True,null=True)
    total_price = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

class TransactionItem(models.Model):
    transaction = models.ForeignKey(Transaction, null=False,on_delete=models.CASCADE)
    content = models.ForeignKey(ContentOffering, null=False,on_delete=models.CASCADE)
    price = models.FloatField(default=0.0)
