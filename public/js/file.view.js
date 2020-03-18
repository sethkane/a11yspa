(function (starterkit) {
    'use strict';

    starterkit.views.file = Backbone.View.extend({

        tagName: 'li',
        className: 'file row',
        initialize: function(){
            //console.log('---> File View Init');
            this.listenTo(this.model, 'add', this.render);    
            this.listenTo(this.model, 'destroy', this.removeFile);    
            this.listenTo(this.model, 'uploadFile', this.uploadFile);  
            this.listenTo(this.model, 'waitingFile', this.waitingFile);  


        },
        events: {
            'click .removeFile': 'removeFile',
            'click .viewFile': 'viewImage'
        },
        viewImage: function(){
            window.open('/files/' + this.model.get('name') );
        },
        uploadFile: function(){

                var idx = attachedCollection.indexOf(this.model);
                var self = this;


                // TODO: convert ot method
                $('.attached ul').scrollTop( $('.attached ul').scrollTop() + this.$el.position().top - ($('.attached ul').height()) );


                this.$el.find('a, .status').remove();
                this.$el.find('.circularProgress').css({'display':'inline-block'});
             
                // Get form data
                var myForm = document.querySelector('form');
                var assocatedDocument = document.getElementById('assocatedDocument');
                var formData = new FormData(myForm);


                // Add file to form
                formData.append('assocatedDocument', assocatedDocument.files[0]);
                formData.append('file', this.model.get('file'));

                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/post');
              
                xhr.upload.onprogress = function (event) {
                    if (event.lengthComputable) {
                        var complete = (event.loaded / event.total * 100 | 0);
                        console.log( complete  + '% completed '  + self.model.get('name'));
                        self.$el.find('.circularProgress').attr({'class':''}).addClass('circularProgress --' +complete);
                    }
                };

                xhr.onreadystatechange = function (event) {  
                    if (xhr.readyState === 4) {  
                        if (xhr.status === 200) {  
                            self.successFile();
                            self.model.set({'status': true });
                            mainView.model.set({'uploadCount': mainView.model.get('uploadCount')+1 });


                        } else {  
                            self.errorFile();
                            actions._enable('.uploadRetry');
                            mainView.model.set({'uploadErrors': mainView.model.get('uploadErrors')+1 });
                        }  

                        idx++;
                        if( attachedCollection.models[idx] ){
                            return attachedCollection.models[idx].uploadFile();
                        } else {
                            mainView.uploadCompleted();
                        }

                    }  
                }; 

                xhr.send(formData);

        },
        waitingFile: function(){
            this.$el.find('button, .status').remove();
            this.$el.addClass('waiting');
            this.$('.action').append('<span class="status">Waiting</span>');

        },
        successFile: function(){
            this.$el.addClass('success');
            this.$('.circularProgress').hide();
            this.$('.action').append('<button class="status success tiny viewFile" aria-label="Done/View ' + this.model.get('name') + '">Done/View</button>');
        },
        errorFile: function(){
            this.$el.addClass('error');
            this.$('.circularProgress').hide();
            this.$('.action').append('<span class="status">Error</span>');
        },
        removeFile: function(){
            console.log('.... Removing File');
            $('.live').text('File ' + this.model.get('name')  + ' has been removed');
            $(this.$el).next().find('button').focus();
            this.remove();
            attachedCollection.remove(this.model);
        },
        render: function(){
            console.log('.... Rendering File');
            var data = this.model.toJSON();

            console.log(data);

           
            if( this.model.get('valid') === true ){
                var template = _.template( $('#file-template').html() );

                // TODO: I don't like the jquery selector here:
                $('.attached ul').append( this.$el.html(template(data)) );
                $('.status').focus();

            } else {
                var template = _.template( $('#trash-template').html() );
                // TODO: I don't like the jquery selector here:
                $('.trash ul').append( this.$el.html(template(data)) );
            }

            
        }
    });

})(starterkit);
