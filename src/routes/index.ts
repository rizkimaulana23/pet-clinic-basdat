import { createRouter, createWebHistory } from "vue-router";
import Vaksin from "@/pages/vaksin/Vaksin.vue";
import Dashboard from "@/pages/dashboard/Dashboard.vue";
import Obat from "@/pages/obat/Obat.vue";
import Hewan from "@/pages/hewan/Hewan.vue";
import JenisHewan from "@/pages/jenis-hewan/JenisHewan.vue";
import Klien from "@/pages/klien/Klien.vue";
import Kunjungan from "@/pages/kunjungan/Kunjungan.vue";
import Perawatan from "@/pages/perawatan/Perawatan.vue";
import Vaksinasi from "@/pages/vaksinasi/Vaksinasi.vue";
import Login from "@/pages/login/Login.vue";
import Register from "@/pages/register/Register.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";
import Welcome from "@/pages/Welcome.vue";
import RegisterFrontDesk from "@/pages/register/RegisterFrontDesk.vue";
import RegisterDokter from "@/pages/register/RegisterDokter.vue";
import RegisterIndividu from "@/pages/register/RegisterIndividu.vue";
import RegisterPerawat from "@/pages/register/RegisterPerawat.vue";
import RegisterPerusahaan from "@/pages/register/RegisterPerusahaan.vue";
import UpdatePassword from "@/pages/dashboard/UpdatePasswordButton.vue";
import UpdateProfile from "@/pages/dashboard/UpdateProfile.vue";
import CreateJenisHewan from "@/pages/jenis-hewan/CreateJenisHewan.vue";
import UpdateJenisHewan from "@/pages/jenis-hewan/UpdateJenisHewan.vue";
import CreateHewan from "@/pages/hewan/CreateHewan.vue";
import CreateVaksin from "@/pages/vaksin/CreateVaksin.vue";
import UpdateVaksin from "@/pages/vaksin/UpdateVaksin.vue";
import DetailKlien from "@/pages/klien/DetailKlien.vue";
import { isAuthenticated } from "@/services/authentication.service";
import { canAccessRoute } from "@/services/authorization.services";

const routes = [
    {
        path: '/',
        component: BlankLayout,
        children: [
            { path: '', component: Welcome },
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            { path: 'register/front-desk', component: RegisterFrontDesk },
            { path: 'register/dokter', component: RegisterDokter },
            { path: 'register/individu', component: RegisterIndividu },
            { path: 'register/perawat', component: RegisterPerawat },
            { path: 'register/perusahaan', component: RegisterPerusahaan },
        ]
    },
    {
        path: '/',
        component: DefaultLayout,
        children: [
            { path: 'dashboard', component: Dashboard,  
                meta: { 
                    requiresAuth: true,
                    permissions: ['dashboard:view']
                } 
            },
            { path: 'dashboard/update-password', component: UpdatePassword },
            { path: 'dashboard/update-profile', component: UpdateProfile },

            { path: 'obat', component: Obat },
            { path: 'hewan', component: Hewan },
            { path: 'hewan/create', component: CreateHewan },

            { path: 'jenis-hewan', component: JenisHewan },
            { path: 'jenis-hewan/create', component: CreateJenisHewan },
            { path: 'jenis-hewan/:id/update', component: UpdateJenisHewan },

            { path: 'klien', component: Klien },
            { path: 'klien/:id', component: DetailKlien },
            { path: 'kunjungan', component: Kunjungan },
            { path: 'perawatan', component: Perawatan },
            { path: 'vaksin', component: Vaksin },
            { path: 'vaksin/create', component: CreateVaksin },
            { path: 'vaksin/:id/update', component: UpdateVaksin },

            { path: 'vaksinasi', component: Vaksinasi },

            { 
                path: '/unauthorized', 
                component: () => import('@/pages/Unauthorized.vue'),
                meta: { requiresAuth: true }
            }
        ]
    },

    
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isUserAuthenticated = isAuthenticated();
  
  const routePermissions = to.meta.permissions as string[] || [];
  const hasPermission = !routePermissions.length || canAccessRoute(routePermissions);

  if (requiresAuth && !isUserAuthenticated) {
    next('/login');
  } else if (requiresAuth && !hasPermission) {
    next('/unauthorized');
  } else if (to.path === '/login' && isUserAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router