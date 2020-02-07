import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/admin/Admin.vue'
import ProductForm from '../views/admin/products/Form.vue'
import ShowProduct from '../views/admin/products/Show.vue'
import AllProducts from '../views/admin/products/Products.vue'
import Categories from '../views/admin/categories/Categories.vue'
import Login from '../views/admin/auth/Login.vue'
import Register from '../views/admin/auth/Register.vue'
import UnderConstruction from '../views/admin/UnderConstruction.vue'
import AdminHome from '../views/admin/AdminHome.vue'
import Site from '../views/site/Site.vue'
import SiteProducts from '../views/site/Product.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Site',
        component: Site,
        children: [
            {
                path: '/home',
                name: 'site.products',
                component: SiteProducts,
            },
            {
                path: '/login',
                name: 'login',
                component: Login,
                meta: {
                    permission: "no-auth"
                },
            },
            {
                path: '/register',
                name: 'register',
                component: Register,
                meta: {
                    permission: "no-auth"
                },
            },
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            permission: "admin"
        },
        children: [
            {
                path: '',
                name: 'admin.home',
                component: AdminHome
            },
            {
                path: 'categories',
                name: 'categories',
                component: Categories
            },
            {
                path: 'products/add',
                name: 'products.add',
                component: ProductForm
            },
            {
                path: 'products/update/:id',
                name: 'products.update',
                component: ProductForm
            },
            {
                path: 'products/all',
                name: 'products.all',
                component: AllProducts
            },
            {
                path: 'products/:id',
                name: 'products.show',
                component: ShowProduct
            },
            {
                path: 'settings',
                name: 'admin.underConstruction',
                component: UnderConstruction
            }
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('access_token');
    if (to.matched.some(m => m.meta.permission === 'admin')) {
        if (token) next();
        else next('login');
    } else if (to.matched.some(m => m.meta.permission === 'no-auth')) {
        if (!token) next();
        else next('/');
    } else {
        next();
    }
});

export default router
