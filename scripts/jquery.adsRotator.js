/**
* Ads Rotator
*
* Display ads randomly, on page load.
*
* Learn on lynda.com – jQuery: Creating Plugins
* MVC architecture – udacity.com
*
* options: (object)
*   adURLs [array] of (strings)
*   adDisplayNr (number)
*
*
*/

(function($){
    'use strict';

    $.fn.adsRotator = function( options ){

        /**
        * Options
        */

        var defaults = {
            adURLs: ['ads/ad-1.html', 'ads/ad-5.html'],
            adDisplayNr: 2,
            onAdLoaded: $.noop, // = function(){} Anonnimous fn.
        }

        var opts = $.extend(true, {}, defaults, options);

        /**
        * Validation
        */

        var Validate = {
            displayNr: function(){
                // make sure it's integer
                opts.adDisplayNr = Math.round(opts.adDisplayNr);

                if( !$.isNumeric(opts.adDisplayNr) || opts.adDisplayNr < 1 ||
                    opts.adDisplayNr > opts.adURLs.length ){

                        opts.adDisplayNr = opts.adURLs.length;
                    }

            }, //validateDisplayNr()

            urlCharsRE: /^[A-Za-z0-9\.:\#\-\_\/\?\&\\+\=\–\*\%]+$/,

            adURLs: function(){
                // check is function
                if( $.isFunction( opts.adURLs ) ){
                    opts.adURLs = opts.adURLs.call();
                }
                // check valid array
                if( !$.isArray(opts.adURLs) || opts.adURLs.length < 1 ){
                    opts.adURLs = defaults.adURLs;
                }
                // check for url valid chars
                $.each(opts.adURLs, function(k, url){

                    if( typeof url !== 'string' || url.match(Validate.urlCharsRE) !== null ){
                        delete opts[k];
                    }
                });
            }, // adURLs()

            all: function(){
                Validate.adURLs();
                Validate.displayNr();
            }, //all()
        };

        var $adsArea = $(this); console.log('ROTATOR');

        /**
        * Model
        */

        var Model = {

            adList: [],

            createAdList: function(){

                var selectedAd, key, i;

                for(i=0; i<opts.adDisplayNr; i++){
                    // get random index
                    key = this.getRandomKey(0, opts.adURLs.length-1);

                    // remove from adURLs
                    selectedAd = opts.adURLs.slice( key, key+1);

                    // concat two arrays, add to display list
                    this.adList = this.adList.concat( selectedAd );

                    // remove from adURLs
                    opts.adURLs.splice(key, 1);
                }
            }, //createAdList

            getRandomKey: function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        };

        /**
        * View
        */

        var View = {

            $ads: $('<div/>'),

            displayAdList: function(){

                $.each(Model.adList, function getAd(k, url){

                    $.get(url, function(data){
                        View.$ads.append(data);
                        // fire onAdLoaded
                        opts.onAdLoaded( k, url, opts.adDisplayNr );
                    }, 'html').fail( function(){ });
                });

                $adsArea.html( View.$ads )
                // .on('mouseenter', 'a', function(){
                //     // proof it creates own in memory objects
                //     console.log( Model.adList );
                // })
                ;
            }, //displayAdList()
        };

        /**
        * Controller
        */

        var Controller = {

            init: function(){
                Validate.all();
                Model.createAdList();
                View.displayAdList();
            }, // init
        };
        Controller.init();


        return this;
    }

}( jQuery ));
