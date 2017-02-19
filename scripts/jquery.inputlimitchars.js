/**
* jQuery Plugin – Set input limit of characteres.
*
* Display number of left chars while typing.
*
* Sudy on lynda.com – jQuery: Creating Plugins
*
* Instantiation:
*   Looks for input field attr. [maxlength="150"],
*   and [data-charslimit = "#counterID"]
*
* Example:
*   <textarea ... maxlength="10" data-charslimit="#counterID"></textarea>
*   <span>Maximum number allowed, left: <span id="counterID"></span></span>
*/
(function($){
    'use strict';

    $.fn.inputlimitchars = function( params ){

        var counter = function(){

            var $me = $(this), //$(e.target),
                charlen =  $me.val().length,
                $counter = $( $me.data(params.counterIDdata) ),
                maxlen = parseInt( $me.attr('maxlength'), 10 );

            if( charlen < maxlen ) {
                // display number of chars left
                $counter.text( maxlen - charlen );
            }else {
                // set maxlength value
                var value = $me.val();
                $me.val( value.slice(0, maxlen) );

                $counter.text('0');
                return false;
            }
        }

        this.each(function(k, item){

            $(item).on('keyup change', counter ).trigger('change');
        });
        // support chaining
        return this;
    }
    // look for data-charslimit attributes
    $('[data-charslimit]').inputlimitchars({ counterIDdata: 'charslimit' });

}( jQuery ));
