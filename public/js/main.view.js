(function (starterkit) {
    'use strict';

    starterkit.views.main = Backbone.View.extend({

        el: '.main',
        initialize: function(data){
            console.log('---> Main App Init');
            attachedView.collection.bind('add', this.addingToAttached, this);
            attachedView.collection.bind('remove', this.removingFromAttached, this);
            trashView.collection.bind('add', this.addingToTrash, this);
            this.listenTo(this.model, 'change', this.updateCounts);  

        },
        events: {
            'dragover' :'addHighlight',
            'dragleave' :'removeHighlight',
            'drop' :'dropFile',
            'change .browse' : 'browseFile',
            'click .uploadRetry':'uploadRetry',
            'click .uploadNew':'uploadNew',
            'click .uploadAgain':'uploadAgain',
            'click .cancelFiles':'cancelFiles'
        },

        // ----------------------------------------- //
        // Drop zone interactions
        // ----------------------------------------- //
        addHighlight: function(){
            var el = this.$el.find('.dropzone');
            el.addClass('hover');
            return false;
        },
        browseFile: function(e){
            e.preventDefault();
            var files = e.target.files;
            for(var i = 0; i < files.length; i++){
                var model = new starterkit.models.file({file: files[i] });
                var view = new starterkit.views.file({model:  model  });
                // Valid File Goes into attached collection
                if( model.get('valid') === true ){
                    attachedCollection.add(model);
                } else {
                    trashCollection.add(model);
                }
            }
            $('.browse').val('')
        },
        cancelFiles: function(e){
            e.preventDefault();
            this.resetCounts('full');

            actions._fadeOut();
            metadata._fadeOut();

            attachedView.render();
            trashView.render();
            $('.dropzone').focus();

        },
        dropFile: function(e){
            e.preventDefault();
            var files = e.originalEvent.dataTransfer.files;
            for(var i = 0; i < files.length; i++){
                var model = new starterkit.models.file({file: files[i] });
                var view = new starterkit.views.file({model:  model  });
                // Valid File Goes into attached collection
                if( model.get('valid') === true ){
                    attachedCollection.add(model);
                } else {
                    trashCollection.add(model);
                }
            }
            this.removeHighlight();
        },
        removeHighlight: function(){
            var el = this.$el.find('.dropzone');
            el.removeClass('hover');
            return false;
        },


        // ----------------------------------------- //
        // Collection and Model Methods
        // ----------------------------------------- //
        addingToAttached: function(model){

            //TODO: Enable/Disable next
            actions._fadeIn();
            metadata._fadeIn();


            //Update File Count Update File Size Total
            this.model.set({'fileCount': this.model.get('fileCount')+1 });
            this.model.set({'totalBytes': model.get('rawSize')+this.model.get('totalBytes') });
        },
        addingToTrash: function(){

            //TODO: Enable/Disable next


            //Update File Count Update File Size Total
            this.model.set({'fileErrors': this.model.get('fileErrors')+1 });
        },
        removingFromAttached: function(model){

            //TODO: Enable/Disable next

            


            //Update File Count Update File Size Total
            this.model.set({'fileCount': this.model.get('fileCount')-1 });
            this.model.set({'totalBytes': this.model.get('totalBytes')-model.get('rawSize') });


            if(attachedView.collection.length === 0){
                actions._fadeOut();
                metadata._fadeOut();
            }

        },
        resetCounts: function(type){

            if('full'){
                this.model.set({'fileCount':0});
                this.model.set({'totalBytes':0});
            }

            this.model.set({'fileErrors':0});
            this.model.set({'uploadCount':0});
            this.model.set({'uploadErrors':0});
            this.model.set({'uploadTime':0});
            this.updateCounts();
        },
        updateCounts: function(){
            //console.log('.... Update Status');
            this.$('.status .fileErrors').html(this.model.get('fileErrors'))
            this.$('.status .fileCount').html(this.model.get('fileCount'))
            this.$('.results .uploadCount').html(this.model.get('uploadCount'))
            this.$('.results .uploadErrors').html(this.model.get('uploadErrors'))
            this.$('.results .uploadTime').html(this.model.get('uploadTime'));
            this.$('.status .totalBytes').html(this.model.get('totalBytes'));

        },
        uploadAgain: function(e){
            e.preventDefault();

            this.resetCounts('full');
            attachedView.render();
            trashView.render();
            actions._fadeIn();
            results._fadeOut();
            $('.dropzone').focus();
        },
        uploadCompleted: function(){
            window.timerEnd = new Date();
            console.log('.... Upload Completed');
            $('.live').text('Upload Completed');

            this.model.set({'uploadTime': this.model.convertTime(window.timerEnd - window.timerStart) });
            results._fadeIn();
            actions._fadeOut();
            $('.results').focus();

        },
        uploadNew: function(e){
            e.preventDefault();

            //TODO: Clear meta data fields
            this.resetCounts('full');
            attachedView.render();
            trashView.render();
            actions._fadeIn();
            results._fadeOut();
            $('.dropzone').focus();


        },
        uploadRetry: function(e){
            e.preventDefault();
            
            var self = this;
            var count = 0
            _.chain(attachedCollection.models).clone().each(function(model){
                if(model.get('status') === true ){
                    console.log('deleting model ' + model.get('name'));
                    model.destroy();
                } else {
                    count++;
                    model.uploadFile();
                }
            });

            this.resetCounts();
            self.model.set({'fileCount': count });
          


        },

    });

})(starterkit);
