import { createMemoryHistory, createRouter } from 'vue-router';

import NewGameView from './components/NewGameView.vue';
import NotFound from './components/NotFound.vue';

const routes = [
    { path: '/', component: NewGameView },
    { path: '/404', component: NotFound },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;