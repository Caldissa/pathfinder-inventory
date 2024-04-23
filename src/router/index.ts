import { createWebHistory, createRouter } from 'vue-router'

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
    { path: '/attendance/create', component: CreateLog },
    { path: '/attendance/edit', component: EditRoster },
    { path: '/attendance/view', component: ViewStats }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach((to, _from, next) => {
//     if (to.path === '/login') {
//         return next()
//     }
//     const email = sessionStorage.getItem('ss_email')
//     const timestamp = sessionStorage.getItem('ss_date')
//     if (!email || !timestamp) {
//         return next('/login')
//     }
//     if (dayjs().diff(dayjs(timestamp), 'hour') < -23) {
//         sessionStorage.removeItem('ss_email')
//         sessionStorage.removeItem('ss_date')
//         return next('/login')
//     }
//     next()
// })

export default router
