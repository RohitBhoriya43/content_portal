from .imports import *


class ContentCreateAndGet(APIView):
    authentication_classes=()
    permission_classes=()

    def get(self,request):
        try:
            content_obj = ContentOffering.objects.all().order_by("-created_at")
            if content_obj.count() <= 0:
                raise Exception("Please create a content firstly")
            content_serializer = ContentOfferingSerilizer(content_obj,many=True)
            return set_response(True,content_serializer.data,"",status.HTTP_200_OK)
        except Exception as e:
            return set_response(False,{},str(e),status.HTTP_400_BAD_REQUEST)
    def post(self,request):
        try:
            title = request.data.get("title")
            description = request.data.get("description")
            price = request.data.get("price")
            content_obj = ContentOffering.objects.create(title=title,description=description,price=price)
            content_obj.save()
            content_serializer = ContentOfferingSerilizer(content_obj)
            return set_response(True,content_serializer.data,"content create successfully",status.HTTP_201_CREATED)

        except Exception as e:
            return set_response(False,{},str(e),status.HTTP_400_BAD_REQUEST)