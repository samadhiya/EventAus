angular.module('app').factory('tagCounter', function(mvEvent){
  var tagcount = 0;
  return{
    count: function (tag) {

      mvEvent.query().$promise.then(function (collection) {
        collection.forEach(function (event) {

          for(var i = 0; i< event.tags.length; i++) {
            if (tag === event.tags[i]) {
               tagcount++;
            }
          }

        })
      });
      return tagcount;
    }
  }
});