'use strict';

/**
 * Created by marco on 13/01/2015.
 */

'use strict';
angular.module('bedManFeApp')
  .factory('Rilevazione', function ($resource) {

    return $resource('http://localhost:18080/BedManBe/webresources/rest/rilevazione/:id',{id:'@_id'}, {
      getData: {
        method:'GET',
        isArray: true
      },
      postData: {
        method:'POST'
      }
    });
  });
