'use strict';

/**
 * @ngdoc function
 * @name bedManFeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bedManFeApp
 */
angular.module('bedManFeApp')
  .controller('MainCtrl', function ($scope, $timeout, Rilevazione) {

    $scope.ril_id = null;
    $scope.hash = '';
    var payload = {};

    // Integrazione con REST GET(all data)
    $scope.allRilevazioniData = Rilevazione.query();
    $scope.editRecord = false;
    $scope.insertedNewRecord = false;
    $scope.deletedRecord = false;

    // Funzione per il sorting
    $scope.reverse = false;
    $scope.click = function (name) {
      $scope.sort = name;
      $scope.reverse = !$scope.reverse;
    }

    // Integrazione con REST DELETE (per id rilevazione)
    //$scope.deletedRecord = false;
    $scope.removeItem = function (id) {
    Rilevazione.remove({id: id}, function(){
    $scope.deletedRecord = true;
    $scope.allRilevazioniData = Rilevazione.query();
      $timeout(function () {
        $scope.deletedRecord = false;
      }, 5000);
    }, function(){
      $scope.deletedRecord = false;
      $scope.allRilevazioniData = Rilevazione.query();
     });
    }

    // Inserisce il payload nell'array
    //$scope.insertedNewRecord = false;
    $scope.createOrUpdate = function () {
      var payload = {
        "ril_id": $scope.ril_id,
        "ril_str_str": $scope.ril_str_str,
        "ril_ric_anno": $scope.ril_ric_anno,
        "ril_ric_cartella": $scope.ril_ric_cartella,
        "ril_ass_ipca": $scope.ril_ass_ipca,
        "ril_tipo" : $scope.ril_tipo,
        "ril_val" : $scope.ril_val,
        "ril_note" : $scope.ril_note,
        "ril_data" : $scope.ril_data,
        "ril_ute_ins" : $scope.ril_ute_ins,
        "ril_data_ins" : $scope.ril_data_ins
      };
      if($scope.ril_id != null)
        payload.ril_id= $scope.ril_id;

      console.log("Valori del payload in $scope.createOrUpdate");
      console.log(JSON.stringify(payload));

      $scope.allRilevazioniData.push(payload);

      console.log("Valori array in $scope.createOrUpdate");
      console.log(JSON.stringify($scope.allRilevazioniData));
    }

    // Integrazione con REST POST (id null --> inserisce; id not null --> aggiorna)
    $scope.saveOnDB = function (data) {
      var payload = {
        "ril_id": $scope.ril_id,
        "ril_str_str": $scope.ril_str_str,
        "ril_ric_anno": $scope.ril_ric_anno,
        "ril_ric_cartella": $scope.ril_ric_cartella,
        "ril_tipo" : $scope.ril_tipo,
        "ril_val" : $scope.ril_val,
        "ril_note" : $scope.ril_note,
        "ril_data" : $scope.ril_data,
        "ril_ute_ins" : $scope.ril_ute_ins,
        "ril_data_ins" : $scope.ril_data_ins
      };
      console.log("Questo è il payload che verrà salvato:");
      console.log(JSON.stringify(payload));
      Rilevazione.postData({},  payload,
        function (data) {
          $scope.allRilevazioniData = Rilevazione.query();
          $scope.insertedNewRecord = true;
          $timeout(function () {
            $scope.insertedNewRecord = false;
          }, 5000);
        }, function(){
          $scope.allRilevazioniData = Rilevazione.query();
          $scope.errorSaving = true;
          $timeout(function () {
            $scope.errorSaving = false;
          }, 5000);
        }
      );
    }

    // Copia del record corrente nei campi della form
    //$scope.editRecord = true;
    $scope.editItem = function (data) {
      /*console.log("Copio il record nel payload...");
      var payload = {
        "ass_ipca": data.ass_ipca,
        "ass_cogn": data.ass_cogn,
        "ass_nome": data.ass_nome,
        "ass_tel": data.ass_tel,
        "ass_email": data.ass_email,
        "ass_datna": data.ass_datna,
        "ass_citta": data.ass_citta
      };
      console.log("Valori copiati nel payload in editItem");
      console.log(JSON.stringify(payload));*/

      $scope.editRecord = true;

      $scope.ril_id = data.ril_id;
      $scope.hash =  data.$$hashKey;
      $scope.ril_str_str= data.ril_str_str;
      $scope.ril_ric_anno= data.ril_ric_anno;
      $scope.ril_ric_cartella= data.ril_ric_cartella;
      $scope.ril_ass_ipca= data.ril_ass_ipca;
      $scope.ril_tipo = data.ril_tipo;
      $scope.ril_val = data.ril_val;
      $scope.ril_note = data.ril_note;
      $scope.ril_data = data.ril_data;
      $scope.ril_ute_ins = data.ril_ute_ins;
      $scope.ril_data_ins = data.ril_data_ins;

      console.log("HASH:" + $scope.hash);
      //console.log(JSON.stringify($scope.allPatientsData));
      console.log("Copio il record in $scope ...");
    }

    // Elimino il record dall'array e chiamo la procedura
    // per inserire il payload nell'array
    //$scope.editRecord = false;
    $scope.edit = function () {
      //http://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
      var i = arrayObjectIndexOf($scope.allRilevazioniData, $scope.hash, "$$hashKey");
      console.log("Indice rilevazione: "+ i);
      console.log("Valore pk: "+ $scope.ril_id);
      $scope.allRilevazioniData.splice(i, 1); //rimuovo l'elemento
      $scope.createOrUpdate(); //lo aggiungo ex-novo
      $scope.editRecord = false;
      // commento provvisoriamente
      //$scope.ass_ipca = null;
    }

    // Indice record con dato hash nell'array
    function arrayObjectIndexOf(myArray, searchTerm, property) {
      for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
      }
      return -1;
    }

  });
