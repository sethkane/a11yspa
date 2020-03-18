(function (starterkit) {
    'use strict';

    starterkit.views.trash = Backbone.View.extend({

        el: '.trash',
        template: '#trash-template',
        initialize: function(){
            console.log('---> Trash List View Init');

        },
        render: function(){
        	this.$('ul').html('');
        	this.collection.reset();
        }

    });

})(starterkit);
