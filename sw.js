/**
 * Developer Zone - Service Worker Root Bridge
 * Satisfies W3C root-scope security requirement on GitHub Pages and static hosts.
 * Loads complete PWA caching and offline logic from pwa/sw.js.
 */

importScripts('./pwa/sw.js');
