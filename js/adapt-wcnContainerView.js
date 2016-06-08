define([
    'backbone',
    'coreJS/adapt',
    'extensions/adapt-wcn/js/mediaelement-and-player.min'
], function(Backbone, Adapt,mep) {

    var wcnContainerView = Backbone.View.extend({

        template: "wcn-container",

        events: {
           'click .wcn-audio': 'onClickAudioButton'
        },

        initialize: function(options) {
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
            this.model.set("_currentAudioElement", '');
        },

        render: function() {
            var data = this.model.toJSON();
            var template = Handlebars.templates["wcn"];
            this.$el.html(template(data));
            return this;
        },

        onClickAudioButton: function (event) {
             if(event && event.preventDefault) event.preventDefault();
             var audioElement = this.model.get("_currentAudioElement");
             var $currentSelected = $(event.currentTarget);
             var curIndex = $(event.currentTarget).index();

              if(audioElement === '' && !$currentSelected.hasClass('selected')) {

                  var audioElement = this.$('.wcn-item-audio audio').eq(curIndex)[0];
                  this.playAudioForElement(audioElement);
                  this.$('.wcn-audio').addClass('selected');
                  this.$('.wcnWithAudio-sound').removeClass('icon-sound-mute');
                  this.$('.wcnWithAudio-sound').eq(curIndex).addClass('icon-sound');
              }
              else {
                this.stopCurrentAudio();
                this.$('.wcn-audio').removeClass('selected');
                this.$('.wcnWithAudio-sound').removeClass('icon-sound');
                this.$('.wcnWithAudio-sound').eq(curIndex).addClass('icon-sound-mute');
              }
        },

         playAudioForElement: function(audioElement) {
            if (audioElement) {
                this.stopCurrentAudio();
                this.model.set("_currentAudioElement", audioElement);
                if(audioElement.play) audioElement.play();
            }
        },

         stopCurrentAudio: function() {
            var audioElement = this.model.get("_currentAudioElement");
            if (audioElement) {
                if (!audioElement.paused && audioElement.pause) {
                    audioElement.pause();
                }
                if (audioElement.currentTime !== 0) {
                    audioElement.currentTime = 0.0;
                }
                this.model.set("_currentAudioElement", '');
            }
        }
    });
    return wcnContainerView;
});
  
