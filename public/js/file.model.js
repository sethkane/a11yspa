(function (starterkit) {
    'use strict';

    starterkit.models.file = Backbone.Model.extend({

    	initialize: function(data){
    		this.set({name: data.file.name });
    		this.updateValues(data.file);
            this.rulesEngine();
    	},
        defaults: {
        	valid: true,
            status: false,
        	src: ''
        },
        updateValues: function(file){
        	this.set({rawSize: file.size });
    		this.set({size: this.convertBytes( file.size ) });
    		this.set({ext: this.getFileExt( file.name ) });
        },
        convertBytes: function(val){
            if( val <= 1000000 ){
                return Math.round(val / 1000 ) + 'KB';
            } else {
                return Math.round(val / 1000000 ) + 'MB' ;
            }
        },
        getFileExt: function(file){
            var str = file.toLowerCase();
            return str.split('.').pop();
        },
        waitingFile:function(){
            this.trigger('waitingFile');
        },
        uploadFile:function(){
            this.trigger('uploadFile');
        },
        removeFile:function(){
            this.trigger('removeFile');
        },
        rulesEngine: function(){

            var uploadLimit = 31900000000;
            var rules = {
                'rule1':{
                    'key':'ext',
                    'value': ['jpg', 'jpeg', 'gif', 'png', 'tiff', 'tif', 'xlsx'],
                    'operator': 'indexof',
                    'error':'The file type is wrong',
                },
                'rule2':{
                    'key':'rawSize',
                    'value': 300000000,
                    'operator': '<=',
                    'error':'The file is too big',
                }
            };



            for( var rule in rules ){
                var checkKey = rules[rule].key;
                var errorMsg = rules[rule].error;
                var checkOpp = rules[rule].operator;
                var checkValue = rules[rule].value;
                var type = typeof checkValue;
                // console.log('.....................');
                // console.log( checkKey, checkValue);
                // console.log( this.get(checkKey) );

                if( this.get('valid') === true ){
                    switch( type ) {
                        case 'object':
                            //console.log('Array Check');
                            if( checkValue.indexOf( this.get(checkKey) )  >=  0 ){
                                this.set({'valid':true});
                            } else {
                                this.set({'valid':false});
                                this.set({'error': errorMsg });
                            }
                            break;
                        case 'number':
                            //console.log('Check Number');
                            if( eval( this.get(checkKey) + checkOpp + checkValue)  ){
                                //console.log('Check Pass');  
                                this.set({'valid':true});
                            } else {
                                this.set({'valid':false}); 
                                this.set({'error': errorMsg });
                            }
                            break;
                    }
                }
                
            }

            if( this.get('valid') === true ){
                

                if( mainView.model.get('totalBytes')+this.get('rawSize') > uploadLimit ){
                    this.set({'valid':false});
                    this.set({'error': 'Exceeded total upload limit' });
                }
                

            }


        },


    });



})(starterkit);
