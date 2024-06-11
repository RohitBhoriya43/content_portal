from rest_framework import serializers
from contents.models import *


class ContentOfferingSerilizer(serializers.ModelSerializer):

    class Meta:
        model = ContentOffering
        fields = "__all__"

