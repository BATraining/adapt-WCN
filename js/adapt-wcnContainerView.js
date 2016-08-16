define([
    'backbone',
    'coreJS/adapt',
    'extensions/adapt-wcn/js/mediaelement-and-player.min'
], function(Backbone, Adapt, mep) {

    var wcnContainerView = Backbone.View.extend({

        template: "wcn-container",

        events: {
            'click .wcn-audio': 'onClickAudioButton',
            'stop': 'stopAudioWCN'
        },

        initialize: function(options) {

            this.listenTo(Adapt, 'remove', this.remove);
            this.listenTo(Adapt, "wcnAudioPlay", this.stopCurrentAudio);
            this.render();
            this.$('audio').on('ended', _.bind(this.onAudioEnded, this));
            this.model.set("_currentAudioElement", '');

            if (this.model.get('_componentLayout') === true) {
                this.$('.wcn-bodyText').css('padding', '8px 200px');
            } else {
                this.$('.wcn-bodyText').css('padding', '8px 50px');
            }
        },

        render: function() {
            var data = this.model.toJSON();
            var template = Handlebars.templates["wcn"];
            this.$el.html(template(data));
            return this;
        },

        onClickAudioButton: function(event) {
            if (event && event.preventDefault) event.preventDefault();
            var audioElement = this.model.get("_currentAudioElement");
            var $currentSelected = $(event.currentTarget);
            if (audioElement === '' && !$currentSelected.hasClass('selected')) {
                var audioElement = this.$('.wcn-item-audio audio')[0];
                this.playAudioForElement(audioElement);
                this.$('.wcn-audio').addClass('selected');
                this.$('.wcnWithAudio-sound').removeClass('icon-sound-mute');
                this.$('.wcnWithAudio-sound').addClass('icon-sound');
            } else {
                this.stopCurrentAudio();
                this.$('.wcn-audio').removeClass('selected');
                this.$('.wcnWithAudio-sound').removeClass('icon-sound');
                this.$('.wcnWithAudio-sound').addClass('icon-sound-mute');
            }
        },

        playAudioForElement: function(audioElement) {
            if (audioElement) {
                this.stopCurrentAudio();
                this.model.set("_currentAudioElement", audioElement);
                if (audioElement.play) audioElement.play();
            }
        },

        onAudioEnded: function(event) {
            this.$('.wcn-audio').removeClass('selected');
            this.$('.wcnWithAudio-sound').removeClass('icon-sound').addClass('icon-sound-mute');
            this.model.get("_currentAudioElement").currentTime = 0.0;
            this.model.set("_currentAudioElement", '');
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
                this.$('.wcn-audio').removeClass('selected');
                this.$('.wcnWithAudio-sound').addClass('icon-sound-mute');
            }
        },

        stopAudioWCN: function(){
            var that = this;
              that.$('.wcn-item-audio audio').each(function() {
                this.pause();
                this.removeEventListener('ended', that.ended);
              });
            this.$('.wcn-audio').removeClass('selected');
            this.$('.wcnWithAudio-sound').addClass('icon-sound-mute');
            this.model.get("_currentAudioElement").currentTime = 0.0;
            this.model.set("_currentAudioElement", '');
            return false;
        },
    });
    return wcnContainerView;
});

