/**
* Get Url Pramaeter
*
* Source:
*   https://www.sitepoint.com/url-parameters-jquery/
*/
(function($){
    'use strict';

    $.getUrlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
            return null;
        }else{
            return results[1] ? decodeURIComponent(results[1]) : 0;
        }
    }
}( jQuery ));
