(function (starterkit) {
    'use strict';

    starterkit.views.results = Backbone.View.extend({

        el: '.results',
        initialize: function(){
            console.log('---> Results View Init');

        },
        _fadeOut: function(){
            //console.log('... Fade Out');
            this.$el.fadeOut();
        },
        _fadeIn: function(){
             this.$el.fadeIn();

        }

    });

})(starterkit);
