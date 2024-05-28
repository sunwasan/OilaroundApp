from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"stationlocation", views.stationLocationView)
router.register(r"userdata", views.userDataView)
router.register(r"stationimage", views.stationImageView)
# if /carprofile/ endpoint is called, it will return all car profiles
# if /carprofile/{carId} endpoint is called, it will return the car profile with the given carId
router.register(r"carprofile", views.carProfileView)
router.register(r"cardata", views.carDataView)

urlpatterns = [
    
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("carhistory/<str:car_id>/", views.get_car_history, name="get_car_history"),
    path("carhistory/<str:car_id>/<str:date>/<str:note_id>/", views.remove_car_history, name="remove_car_history"),
    path("carhistory/<str:car_id>/<str:date>/", views.remove_car_history, name="remove_car_history"),
    path("addcarhistory/", views.add_car_history, name="add_car_history"),
    

    
]