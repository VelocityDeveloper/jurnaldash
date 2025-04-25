export default defineNuxtRouteMiddleware((to, from) => {
    interface User {
        id: number;
        user_permissions: [];
    }
    const User = useSanctumUser<User>();

    const metaPermission = to.meta.permission as never;
    const configPermission = computed(() => User.value?.user_permissions ?? []);

    if ((metaPermission === 'edit-other-user' && configPermission.value.includes(metaPermission)) || User.value?.id === Number(to.params.id)) {
        return true
    } else if (metaPermission && configPermission && !configPermission.value.includes(metaPermission)) {
        return navigateTo('/403') // halaman tidak punya akses
    }
    
})
