define([
    'backbone',
    'coreJS/adapt',
    './adapt-wcnContainerView'
], function(Backbone, Adapt,wcnContainerView) {

      function onComponentViewPostRender (wcnComponentView) {

            var wcnComponentData = wcnComponentView.model.get('_wcn') || {};
            
            if(wcnComponentData._isEnabled !== true) return ;

            if(wcnComponentView.model.get('_component') === 'text')  {
                if(wcnComponentView.model.get('_layout') === 'full')
                  wcnComponentData._componentLayout=true;
                else
                  wcnComponentData._componentLayout=false;
                var $wcnView = new wcnContainerView({model: new Backbone.Model(wcnComponentData)}).$el;
                wcnComponentView.$el.append($wcnView);
            }
      }

        Adapt.on('componentView:postRender', function(wcnComponentView) {
              wcnCourseData=Adapt.course.get('_wcn');
              if(!wcnCourseData || !wcnCourseData._isEnabled){
                return console.log("sorry, no wcn objecet is set on the course.json file");
              }
              onComponentViewPostRender(wcnComponentView);
        });
});

