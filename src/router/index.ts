/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Edit from '@/views/Edit.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/edit',
    name: 'Edit',
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const authStore = useAuthStore()
      if (authStore.isAdmin) {
        next()
      } else {
        next({ path: '/' })
      }
    },
    component: Edit,
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        next({ path: '/' })
      } else {
        next()
      }
    },
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        next({ path: '/' })
      } else {
        next()
      }
    },
    component: Register,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const authStore = useAuthStore()
    if (to.path !== '/login' && to.path !== '/register') {
      if (authStore.isAuthenticated) {
        next()
      } else {
        next({ name: 'Login' })
      }
    } else {
      next()
    }
  },
)

export default router
