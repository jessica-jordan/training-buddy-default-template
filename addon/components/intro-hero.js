import Component from '@ember/component';
import { computed } from '@ember/object';

import layout from '../templates/components/intro-hero';

export default Component.extend({
  layout,

  tagName: '',
  backgroundStyle: computed('this.attrs.image', function() {
    if (this.image && this.image.length) {
      return `background-image: url('${this.image}');`
    }
  })
});
