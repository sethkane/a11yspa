(function (starterkit) {
    'use strict';

    starterkit.models.main = Backbone.Model.extend({
        defaults: {
        	fileCount: 0,
        	fileErrors: 0,
        	uploadCount: 0,
        	uploadErrors: 0,
        	totalBytes: 0,
            uploadTime: 0,
        	step: 'select' /// select | metadata | review | final
        },
        convertTime: function(time){
            var value = 0
            if( time < 60000 ){
                value = time / 1000 + ' Seconds';
            } else if ( time >= 60001 && time <= 3600000 ){
                 value = time / 60000 + ' Minutes';
            } else {
                value = time / 3600000 + ' Hours';
            }
            this.set({'uploadTime': value});
        }
    });



})(starterkit);
