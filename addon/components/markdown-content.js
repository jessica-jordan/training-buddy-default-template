import Component from '@ember/component';
import layout from '../templates/components/markdown-content';

function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

export default Component.extend({
  layout,

  tagName: 'article',
  classNames: 'markdown-content',


  didInsertElement() {

    let nodeList = this.element.querySelectorAll('pre:not(.no-line-numbers) > code');

    if (nodeList) {
      nodeList.forEach((code) => {
        // do not add line numbers to bash code blocks
        if (code.classList[0] !== 'bash') {
          code.parentNode.classList.add("line-numbers");
        }
      });
    }

    let filenameNodeList = this.element.querySelectorAll('pre > code[data-filename]');

    if (filenameNodeList) {
      filenameNodeList.forEach((code) => {
        if(code.parentNode.parentNode.classList.contains('filename')) {
          //do nothing
          return;
        }

        let filename = code.attributes['data-filename'].value;

        let match = filename.match(/\.(\w+)$/);

        let ext = '';

        if (match && match[1]) {
          ext = match[1];
        }

        // create wrapper container
        const wrapper = document.createElement('div');
        wrapper.className = `filename ${ext}`;

        wrap(code.parentNode, wrapper);

        // do not add filename bar for bash code blocks
        if (filename !== 'bash') {
          const fileBanner = document.createElement('span');
          fileBanner.innerText = code.attributes['data-filename'].value;
          code.parentNode.parentNode.prepend(fileBanner);

          const ribbon = document.createElement('div');
          ribbon.className = 'ribbon';
          code.parentNode.parentNode.prepend(ribbon);
        }

        // if a repo value is provided, add repo banner at top of code block
        if (code.attributes['data-repo']) {
          let repo = code.attributes['data-repo'].value;

          // if step is provided, it will be added to repo banner
          let step = '';
          if (code.attributes['data-step']) {
            step = `Step ${code.attributes['data-step'].value}`;
          }

          const repoBanner = document.createElement('div');
          repoBanner.className = `repo-banner ${repo}`;
          repoBanner.innerHTML = `<span>${step}</span><span>${repo}</span>`;

          code.parentNode.parentNode.prepend(repoBanner);
        }
      });
    }
  },

  didRender() {
    Prism.highlightAll();
  }
});
