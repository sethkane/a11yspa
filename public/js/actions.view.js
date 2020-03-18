(function (starterkit) {
    'use strict';

    starterkit.views.actions = Backbone.View.extend({

        el: '.actions',
        initialize: function(){
            console.log('---> Actions View Init');

        },
        events: {
            'click .uploadFiles': 'uploadFiles'
        },

        _disable: function(el){
            $(el).addClass('disabled').attr('disabled',true);
        },
        _enable: function(el){
            console.log(el);
            $(el).removeClass('disabled').attr('disabled',false);
        },
        _fadeIn: function(){
            //console.log('... Fade In');
            this.$el.fadeIn();
        },
        _fadeOut: function(){
            //console.log('... Fade Out');
            this.$el.fadeOut();
        },
        uploadFiles: function(idx){
            console.log('... Uploading Files')
            $('.live').text('Uploading Files');
            

            //TODO: Testing
            window.timerStart = new Date();
            attachedView.collection.each(function(model){
                model.waitingFile();
            });
            attachedCollection.models[0].uploadFile();
            // this.uploadStatusCheck();
            return false;
        },
        uploadStatusCheck: function(){
            var timer = setInterval(function(){
                console.log('... waiting');
                if(  ( mainView.model.get('uploadCount') + mainView.model.get('uploadErrors') ) >= mainView.model.get('fileCount')  ){
                    clearInterval(timer);
                    mainView.uploadCompleted();
                    // results._fadeIn();
                    // self.uploadReset();
                }
            }, 100);
        },















        
      

    });

})(starterkit);
