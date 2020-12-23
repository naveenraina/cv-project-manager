import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'
import Projects from '@/views/Projects.vue'
import Tasks from '@/views/Tasks.vue'
import Profile from '@/views/Profile.vue'
import Work from '@/views/Work.vue'
import Experience from '@/views/Experience.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/work',
    name: 'Work',
    component: Work
  },
  {
    path: '/experience',
    name: 'Experience',
    component: Experience
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && store.state.user.id === 0) next({ name: 'Login' })
  else next()
})

export default router
