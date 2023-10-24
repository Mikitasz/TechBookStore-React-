from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import BookSerializer, CategorySerializer
from .models import Book,Category


class BookView(APIView):
    def get(self,request):
        
        output=[
            {
                'category':output.category_id,
                'name':output.name,
                "description":output.description,
                'price':output.price,
                'image':output.image.url,
                'author':output.author,
                'likes':output.likes,
                'views':output.views,
                'created_at':output.created_at,
            } for output in Book.objects.all().order_by('-created_at')[0:6]
        ]
        
        return Response(output)
    
    def post(self,request):
        serialize= BookSerializer(data=request.data)
        if serialize.is_valid(raise_exception=True):
            serialize.save()
            return Response(serialize.data)

class CategoryView(APIView):
    def get(self,request):
        output=[
            {
               
                'name':output.name,
                
            } for output in Category.objects.all()
        ]
        return Response(output)
    
    def post(self,request):
        serialize= CategorySerializer(data=request.data)
        if serialize.is_valid(raise_exception=True):
            serialize.save()
            return Response(serialize.data)
# Create your views here.