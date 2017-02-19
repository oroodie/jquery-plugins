/**
* jQuery Plugin – Equalize
*
* Set Equal Height for matched Elements
* Learn on lynda.com – jQuery: Creating Plugins
*
*/
(function($){
    'use strict';

    $.fn.equalize = function(){

        var maxHeight = 0,
            $items = $(this);

        function equalize(){

            maxHeight = 0;

            $items.each(function(k, item){

                var itemHeight = $(item).height('inherit').innerHeight();
                maxHeight = ( itemHeight > maxHeight ) ? itemHeight : maxHeight;
            });
            $items.innerHeight( maxHeight );
        }
        equalize();
        $(window).on('resize', equalize);

        return this;
    }
}( jQuery ));
