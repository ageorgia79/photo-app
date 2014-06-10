'use strict';
 
var Photo = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      caption: 'Awesome!!',
        url: 'http://37.media.tumblr.com/tumblr_mdgfpehkYN1r8cvzdo1_500.gif'
    },
});
 
var PhotoCollection = Backbone.Collection.extend({
    model: Photo,
    url: 'http://tiny-pizza-server.herokuapp.com/collections/photos'
});


////////////////THUMBNAIL VIEW BEGIN///////////////////////////////////////

var ThumbnailView = Backbone.View.extend({
 
    className: 'thumbnail',
 
    thumbnailTemplate: _.template($('.thumbnail-template').text()),
 
    events: {
        'click' : 'showDetailView'

    },
 
    initialize: function(){
        $('.galleryContainer').append(this.el);
        this.render();
        
    },
 
    render: function(){
      if (this.model.attributes.hasOwnProperty('url')) {
            var renderedTemplate = this.thumbnailTemplate(this.model.attributes);
          this.$el.html(renderedTemplate);

        }
        
    },
 
    showDetailView: function(){
        var detail = new DetailView({model: this.model});
          $('.galleryContainer').append(detail);
    },
});
///////////////THUMBNAIL VIEW END

var DetailView = Backbone.View.extend({

  className: 'detail',
 
    detailTemplate: _.template($('.detail-template').text()),
 
    initialize: function(){
        $('.selectedContainer').empty();
        $('.selectedContainer').append(this.el);
        this.render();
        
    },
 
    render: function(){
        var renderedTemplate = this.detailTemplate(this.model.attributes);
        this.$el.html(renderedTemplate).hide().fadeIn(1000);
        

    }
    
});


var AppView = Backbone.View.extend({
 
    initialize: function(){
        this.listenTo(coolPhotos, 'add', function(photo){
            new ThumbnailView({model: photo});
            //new DetailView({model: coolPhotos.first()});
        });
    }
});

var AppRouter = Backbone.Router.extend({

    //dont forget to create the script tag that turns the images to links//

    routes: {

        " " : "renderHome",
        "images" : "renderImages",
        "images/:format" : "renderImage",
        "images/:format/size" : "renderImageSize",
        
    },

    initialize: function(){
        console.log('AppRouter initialized')

        //do a fetch inside of the initialize on routers
    },

    renderHome: function(){
        $('.routercontainer').html('You are Home.');
    },

    renderImages: function(){
        console.log('is this working')
        $('.routercontainer').html('Images List Wow');

    },

    renderImage: function(format){
        console.log('profile route for', format)
        $('.routercontainer').html('Check out ' + format + 'cool profile');
        $('.routercontainer').append('<a href="/#images/'+format + '/size">'+ format + '/size </a>')
    },

    renderImageSize: function(format){
        console.log('favorite route for', format)
        $('.routercontainer').html('Check out '+ format + '/size');
    },
})

var coolPhotos = new PhotoCollection();

var app = new AppView();

coolPhotos.fetch();

var router = new AppRouter();

Backbone.history.start();







