angular.module('app').factory('mvCachedEvents', function(mvEvent){
  var eventList;

  return{
    query: function(){
      if(!eventList){
        eventList = mvEvent.query();
      }
      return eventList;
    },
    refresh: function(){
      return eventList = 0;
    }
  }
});