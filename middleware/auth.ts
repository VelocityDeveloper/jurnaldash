export default defineNuxtRouteMiddleware((to, from) => {
    interface User {
        id: string;
        user_permissions: [];
    }
    const route = useRoute()

    const User = useSanctumUser<User>();

    const metaPermission = to.meta.permission as never;
    const configPermission = computed(() => User.value?.user_permissions ?? []);

    // cek 'edit-other-user'
    if ((metaPermission === 'edit-other-user' && !configPermission.value.includes(metaPermission)) || User.value?.id !== to.params.id) {
        
        // if (User.value?.id !== to.params.id) {
            return navigateTo('/403') // halaman tidak punya akses
        // }
        
    } else if (metaPermission === 'edit-other-user') {
        return true
    }

    // Cek permissions
    if (metaPermission && configPermission && !configPermission.value.includes(metaPermission)) {
        return navigateTo('/403') // halaman tidak punya akses
    }
    
})
