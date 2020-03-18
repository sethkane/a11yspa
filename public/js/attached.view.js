(function (starterkit) {
    'use strict';

    starterkit.views.attached = Backbone.View.extend({

        el: '.attached',
        className: 'file',
        template: '#file-template',
        initialize: function(){
            console.log('---> File List View Init');

        },
        render: function(){
        	this.$('ul').html('');
        	this.collection.reset();
        }

    });

})(starterkit);
