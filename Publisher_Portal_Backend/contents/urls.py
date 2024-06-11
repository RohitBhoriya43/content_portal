from django.urls import path
from contents.views.filter_content import ContentFilter
from contents.views.transaction import TransactionCreate
from contents.views.content_offer import ContentCreateAndGet

urlpatterns = [
    
    path('contents/get/', ContentCreateAndGet.as_view(),name="Get all contents"),
    path('content/create/', ContentCreateAndGet.as_view(),name="Create Contents"),
    path('content/transaction/create/', TransactionCreate.as_view(),name="Create Transaction"),
    path('content/filter/get/', ContentFilter.as_view(),name="Filter data"),
]