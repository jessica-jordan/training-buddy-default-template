import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../templates/components/checklist-progress';

export default Component.extend({
  layout,

  classNames: ['checklist-progress'],

  percentageComplete: computed('checklistTasks', 'completedTasks', function() {
    let checklistTasks = get(this, 'checklistTasks');
    let completedTasks = get(this, 'completedTasks');

    let completedChecklistTasks = checklistTasks.filter((task) => {
      return completedTasks.includes(task);
    })

    return (completedChecklistTasks.length / get(this, 'checklistTasks.length')) * 100;
  }),
});
