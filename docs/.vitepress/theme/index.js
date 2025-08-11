import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './custom.scss';
// import Layout from './layout.vue'
import NotFound from './not-found.vue';
import DefaultTheme from 'vitepress/theme';
import Demo from '../../global/demo/demo.vue';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { provideGlobalGridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

ModuleRegistry.registerModules([AllCommunityModule]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: 'legacy' });

export default {
  ...DefaultTheme,
  // Layout,
  NotFound,
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
    app.component('Demo', Demo);
  }
};