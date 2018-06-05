/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let initGptScript;
function loadGpt() {
  if (!initGptScript && !window.googletag) {
    initGptScript = true;
    let script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = '//www.googletagservices.com/tag/js/gpt.js';
    document.head.appendChild(script);
  }
}

class NewsGptAd extends HTMLElement {
  connectedCallback() {
    var elem = this;
    var adUnitPath = this.getAttribute('ad-unit-path');
    var w = parseInt(this.getAttribute('ad-width'), 10);
    var h = parseInt(this.getAttribute('ad-height'), 10);
    var id = this.id;

    if (!adUnitPath || !w || !h || !id) {
      console.warn('news-gpt-ad missing required attribute', this);
      return;
    }

    loadGpt();
    let win = window;
    win.googletag = win.googletag || {};
    win.googletag.cmd = win.googletag.cmd || [];
    win.googletag.cmd.push(function() {
      googletag.defineSlot(adUnitPath, [w, h], id).addService(googletag.pubads());
      googletag.enableServices();
      googletag.display(elem);
    });
  }
}

customElements.define('news-gpt-ad', NewsGptAd);
