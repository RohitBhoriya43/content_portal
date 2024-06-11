from .imports import *


class ContentFilter(APIView):
    authentication_classes=()
    permission_classes=()

    def get(self,request):
        try:
            title = request.query_params.get("title","")
            min_price = request.query_params.get("min_price","")
            max_price = request.query_params.get("max_price","")
            sort_by = request.query_params.get("sort_by","created_at")
            sort_order = request.query_params.get("sort_order","desc")
            data = self.filter_data(title,min_price,max_price)

            if len(data)>0:
                content_data = ContentOffering.objects.filter(**data)
                print("first content",content_data)
                if self.check_sortby(sort_by):
                    content_obj = self.sort_order_data(content_data,sort_order,sort_by)
                    print("content_obj",content_obj)
            else:
                content_data = ContentOffering.objects.all()
                if self.check_sortby(sort_by):
                    content_obj = self.sort_order_data(content_data,sort_order,sort_by)
            

            content_serializer = ContentOfferingSerilizer(content_obj,many=True)
            return set_response(True,content_serializer.data,"",status.HTTP_200_OK)
        except Exception as e:
            return set_response(False,{},str(e),status.HTTP_400_BAD_REQUEST)
    

    def filter_data(self,title,min_price,max_price):
        data = {}

        print("max_price",max_price)

        if title:
            data.update({"title__icontains":title})
        
        if min_price:
            data.update({"price__lte":min_price})

        if max_price:
            data.update({"price__gte":max_price})

        print("filter data",data)
        return data
    
    def check_sortby(self,sort_by):

        if sort_by == "created_at" or sort_by == "price" or sort_by == "title":
            return True
        
        raise Exception("Please valid sort_by enter")
    
    def sort_order_data(self,content_data,sort_order,sort_by):

        if sort_order == "desc":
            return content_data.order_by(f"-{sort_by}")
        else:
            return content_data.order_by(f"{sort_by}")