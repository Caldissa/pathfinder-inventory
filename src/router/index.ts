import { createWebHistory, createRouter } from 'vue-router'
import { auth } from '../firebase'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Attendance from '../views/Attendance.vue'
import EditRoster from '../views/EditRoster.vue'
import CreateLog from '../views/CreateLog.vue'
import ViewStats from '../views/ViewStats.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/attendance', component: Attendance },
    { path: '/attendance/create-log', component: CreateLog },
    { path: '/attendance/edit', component: EditRoster },
    { path: '/attendance/view', component: ViewStats }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, _from, next) => {
    await auth.authStateReady()
    if (!auth.currentUser && to.path != '/login') {
        return next('/login')
    }
    next()
})

export default router
