import Component from '@ember/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import layout from '../templates/components/paper-markdown-menu-item';

export default Component.extend({
  layout,
  directoryUrlPart: computed('item.id', function() {
    let matches =  this.get('item.id') ? /\/[\w-]*\//.exec(this.get('item.id')) : null;
    return (matches) ? matches[0] : null;
  }),
  isItemInSubDirectory: notEmpty('directoryUrlPart'),
  directoryName: computed('directoryUrlPart', function() {
    let directory = this.get('directoryUrlPart');
    return directory.replace("/", "").split("-").join(" ").toUpperCase();
  }),
});
