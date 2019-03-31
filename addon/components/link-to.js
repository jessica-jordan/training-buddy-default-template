import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({
  click() {
    let scrollElement = document.querySelector('#main-content');
    if(scrollElement.scrollTo) {
      scrollElement.scrollTo(0,0);
    }
  }
});
