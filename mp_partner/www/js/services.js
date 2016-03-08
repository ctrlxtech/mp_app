angular.module('starter.services', [])

/*.service('PUSH_NOTIFICATIONS', function($http, $ionicPlatform, $cordovaDevice, $q){

var _registered = false, _inprogress = false, _push, _gcm_id, _device;

this.init = function(){
    _inprogress = true;
    $ionicPlatform.ready(function(){

        // If already registered or not signed in

        if(_registered || ['Android','iOS'].indexOf($cordovaDevice.getPlatform()) == -1) return; // Ensure that we're running on Android or iOS

        // Push Notifications Init

        var push = PushNotification.init({
            android: {
                senderID: "1234567890" // GCM Sender ID (project ID)
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "false",
                senderID: "1234567890" // GCM Sender ID (project ID)
            }
        });
		
        _push = push;

        push.on('registration', function(data){
            _gcm_id = data.registrationId;

            // Post our GCM and device information to our API
            $http.post('http://MYAPIURL.com/registerpn', {
                gcm_id: data.registrationId,
                device: $cordovaDevice.getDevice()
            }).then(
                function(res){
                    console.log("Registered on API...");
                    _registered = true;
                    _inprogress = false;
                },
                function(err){
                    console.log("error registering for PN", err);
                    _inprogress = false;
                }
            );
        });

        push.on('notification', function(data){
            // Here is what we will do if we get a push notification while using the app
            console.log("GOT PN", data);
        });

        push.on('error', function(err){
            console.log("PNR Error", err);
        });
    });



};
this.unregister = function(){
    return $q(function(resolve, reject){
        _push.unregister();
        return $http.post('http://MYAPIURL.COM/unregisterpn', {device: _device, gcm_id: _gcm_id})
            .then(
                function(success){
                    _registered = false;
                    resolve();
                },
                function(err){
                    // We didn't manage to inform the server that we unregistered
                    console.log("Error unregistering");
                    resolve();
                }
            );
    });
};
})
*/

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
