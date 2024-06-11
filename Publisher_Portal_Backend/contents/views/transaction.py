from .imports import *


class TransactionCreate(APIView):
    authentication_classes=()
    permission_classes=()

    def post (self,request):
        try:
            items=request.data.get("items")
            user_id = request.data.get("user_id")
            total_price = request.data.get("totalPrice")
            transaction_obj = Transaction.objects.create(user_id=str(user_id).replace("-",""),total_price=total_price)
            transaction_obj.save()
            for item in items:
                content_obj = ContentOffering.objects.filter(id=item.get("content_id"))
                transactionItem_obj = TransactionItem.objects.create(transaction=transaction_obj,content=content_obj.first(),price=item.get("price"))
                transactionItem_obj.save()
            return set_response(True,{},"Transction successfully created",status.HTTP_201_CREATED)
        except Exception as e:
            return set_response(False,{},str(e),status.HTTP_400_BAD_REQUEST)