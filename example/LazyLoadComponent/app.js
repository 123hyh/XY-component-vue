import Vue from 'vue';
import LazyLoadComponent from '@/LazyLoadComponent.tsx';
new Vue( {
  el: '#app',
  render: ( h ) => h( LazyLoadComponent ),
} );