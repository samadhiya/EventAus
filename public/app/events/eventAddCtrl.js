angular.module('app').controller('mvEventAddCtrl', function($scope, mvEvent, mvCachedEvents, $location, $upload){
  $scope.onFileSelect = function(image){
    console.log('selected image', image);
    this.selectedImage = image[0];
  };

  $scope.add=function(){
    if(this.selectedImage){
      var event ={
        "featured" :this.featured,
        "published" : new Date(),
        "datetime_start" :new Date(this.datetime_start),
        "datetime_end" :new Date(this.datetime_end),
        "tags" :this.tags,
        "description" :this.description,
        "address" :this.address,
        "title" :this.title,
        "venue" :this.venue
      };
      $scope.upload = $upload.upload({
        url: '/api/events',
        method: 'POST',
        data:event,
        file:this.selectedImage
      }).progress(function (evt) {
        console.log("progress ",evt);
      }).success(function () {
        mvCachedEvents.refresh();
        console.log('Event created ');
        console.log(event);
        $location.path('events');
      });
    }
    else{
      $scope.error='No image selected.'
    }
  }
});

    /*var event = new mvEvent({
      "featured" :this.featured,
      "published" :new Date(this.published),
      "tags" :this.tags.split(','),
      "title" :this.title,
      "venue" :this.venue
    });
    // Redirect after save
    event.$save(function(response) {
      mvCachedEvents.refresh();
      $location.path('/events');

      // Clear form fields
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  }
});*/