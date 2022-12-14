import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Index',
    component: () => import('./views/Index.vue'),
    children: [
      {
        path: "",
        redirect: "/home"
      },
      {
        path: "/home",
        name: "home",
        component: () => import("./views/Home.vue")
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('./views/Order.vue')
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('./views/Me.vue')
      },
      {
        path: '/address',
        name: 'address',
        component: () => import('./views/Address.vue')
      },
      {
        path: '/city',
        name: 'city',
        component: () => import('./views/City.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    isLogin ? next() : next("/login")
  }
})

export default router
