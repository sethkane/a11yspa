(function (starterkit) {
    'use strict';

    starterkit.views.metadata = Backbone.View.extend({

        el: '.metadata',
        initialize: function(){
            console.log('---> Metadata View Init');

        },
        _fadeOut: function(){
            //console.log('... Fade Out');
            this.$el.fadeOut();
        },
        _fadeIn: function(){
            //console.log('... Fade In');
            this.$el.fadeIn();
        }

    });

})(starterkit);
