/* global global:readonly, process:readonly */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */

function setMetaTag(name, content) {
  try {
    const { document } = global;

    if (typeof document !== 'undefined' && document.createElement && document.head && document.head.appendChild) {
      const meta = document.querySelector(`html meta[name="${encodeURI(name)}"]`) || document.createElement('meta');

      meta.setAttribute('name', name);
      meta.setAttribute('content', content);

      document.head.appendChild(meta);
    }
  } catch (err) {}
}

export default function addVersionToMetaTag() {
  setMetaTag('react-scroll-to-bottom:version', process.env.npm_package_version);
}
