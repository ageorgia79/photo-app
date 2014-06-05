'use strict';
 
var Photo = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      comments: 'Awesome!!',
        url: 'http://37.media.tumblr.com/tumblr_mdgfpehkYN1r8cvzdo1_500.gif'
    },
});
 
var PhotoCollection = Backbone.Collection.extend({
    model: Photo,
    url: 'http://tiny-pizza-server.herokuapp.com/collections/photos'
});


////////////////THUMBNAIL VIEW BEGIN

var ThumbnailView = Backbone.View.extend({
 
    className: 'thumbnail',
 
    thumbnailTemplate: _.template($('.thumbnail-template').text()),
 
    events: {
        'click' : 'showDetailView'
    },
 
    initialize: function(){
        $('.thumbnailContainer').append(this.el);
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
          $('.thumbnailContainer').remove();
          detail.render()
    } 

});
///////////////THUMBNAIL VIEW END

var DetailView = Backbone.View.extend({

  className: 'detail',
 
    detailTemplate: _.template($('.detail-template').text()),
 
    initialize: function(){
        $('.editContainer').append(this.el);
        this.render();
    },
 
    render: function(){
        var renderedTemplate = this.detailTemplate(this.model.attributes);
        this.$el.html(renderedTemplate).removeClass('thumbnail');
    },
});

var AppView = Backbone.View.extend({
 
    initialize: function(){
        this.listenTo(coolPhotos, 'add', function(photo){
            new ThumbnailView({model: photo});
        });
    }
});

var coolPhotos = new PhotoCollection();

var app = new AppView();

coolPhotos.fetch();