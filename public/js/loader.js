/**
 * @author Salvatore Randazzo
 */

(function ($, starterkit) {
    'use strict';

    /**
     * Loader
     * @returns {{init: Function}}
     * @constructor
     */

    var Loader = function () {
        var components = null;
        var view = '';
        var model = '';
        var collection = '';
        var viewsInstances = [];


        /**
         * Initializer
         */
        var init = function () {

            components = $('[data-view]');

            _.each(components, function (component) {
                view =  $(component).attr('data-view');
                model = $(component).attr('data-model');
                collection = $(component).attr('data-collection');

                if (starterkit.views[view] !== undefined) {


                    if (collection === undefined) {
                        viewsInstances.push(new starterkit.views[view]({
                            el: $(component),
                            model: starterkit.models[model] !== undefined ? new starterkit.models[model]() : null
                        }));
                    } else {
                        viewsInstances.push(new starterkit.views[view]({
                            el: $(component),
                            collection: starterkit.collections[collection] !== undefined ? new starterkit.collections[collection]() : null
                        }));
                    }


                } else {
                    throw new Error ('No view found for ' + view );
                }

            });


        };

        // Public
        return {
            init: init,
            viewInstances: viewsInstances
        };
    };

    // Starting the application
    window.loader = new Loader();
    window.loader.init();

})(jQuery, starterkit);
