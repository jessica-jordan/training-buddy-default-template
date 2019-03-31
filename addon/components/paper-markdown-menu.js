import Component from '@ember/component';
import layout from '../templates/components/paper-markdown-menu';

export default Component.extend({
  layout,
  actions: {
    scrollTop() {
      let scrollElement = document.querySelector('#main-content');
      if(scrollElement.scrollTo) {
        scrollElement.scrollTo(0,0);
      }
    }
  }
});
