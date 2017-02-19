/**
 * Add Figure & Figcaption
 *
 * Creates a <figure> parent.
 * Gets text from title attribute
 * and sets as <figcaption> value.
 *
 * Learn on lynda.com – jQuery: Creating Plugins
 *
 * Options:
 *  figureAttrs: (object)
 *      class (string)
 *  figcaptionAttrs: (object)
 *      class (string)
 */
(function($){
    'use strict';

    $.fn.addFigureCaption = function( options ){

        var defaults = {
            figureAttrs: {
                //class: 'figure',
                //'data-x': '',
            },
            figcaptionAttrs: {
                //class: 'figure-caption',
            },
        }

        var opts = $.extend(true, {}, defaults, options);

        /**
         * Validation
         */

         var attrValueRE = /^[A-Za-z\.#][-_ A-Za-z0-9]+$/;

         $.each(opts, function validate(k, propValue){

             // check isset prop. in defaults obj
             if( defaults[k] !== undefined && typeof propValue === 'object'){

                 $.each(propValue, function validateAttrs(attr, value){

                    if( typeof attr !== 'string' || attr.match(attrValueRE) === null){
                        // invalid attribute name
                        delete propValue[attr];
                    }
                    if( typeof value !== 'string' ||
                        (value.match(attrValueRE) === null && value !== '')){
                        // invalid attribute value
                        delete propValue[attr];
                    }
                 })
             }else {
                 // set defaults
                 opts[k] = defaults[k];
             }
         });

        /**
         * Wrap into a <figure> & add <figcaption>
         */
        this.each(function(){
            var $me = $(this);

            if( $me.parent('figure').length === 0 ){

                $me.wrap($('<figure/>', opts.figureAttrs))
                   .after($('<figcaption/>', opts.figcaptionAttrs
                           ).text($me.attr('title'))
                       );
            }
        });

        return this;
    }
}( jQuery ));
