<template>


  <Message severity="error" class="mb-4 max-w-[400px] w-full mx-auto" v-if="route.query.redirect && route.query.redirect !== '/'">
    Hmmm, sepertinya anda mencoba mengakses halaman
    <em>"{{ route.query.redirect }}"</em>, silahkan login terlebih dahulu
    untuk melanjutkan.
  </Message>
  <Message severity="error" class="mb-4 max-w-[400px] w-full mx-auto" v-if="loginError">
    {{ loginError }}
  </Message>
  <form @submit.prevent="handleLogin" ref="form" class="max-w-[400px] mx-auto rounded-lg border 
  border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 p-4
  flex justify-center flex-col gap-4 w-full" >

      <div class="group flex justify-center items-center gap-2 mt-5 mb-3 mx-3">

        <div class="relative">
            <img src="~/public/favicon.ico" alt="" class="child group-hover:opacity-0 max-w-[50px] transition-opacity duration-300 ease-in-out"  :class="{'opacity-0': isLoading}">
            <img src="~/public/logo-flash.png" alt="" class="absolute top-0 child opacity-0 group-hover:opacity-100 max-w-[50px] transition-opacity duration-300 ease-in-out"  :class="{'opacity-100': isLoading}">
        </div>

        <div>
          <div class="font-bold text-xl">TOPUP</div>
          <div class="text-xs opacity-50">Velocity Developer</div>
        </div>
      </div>

      <IftaLabel>
          <InputText id="email" v-model="credentials.email" class="w-full" type="email" variant="filled"/>
          <label for="email">Email</label>
      </IftaLabel>
      <IftaLabel>
          <InputText type="password" id="password" v-model="credentials.password" class="w-full" />
          <label for="password">Password</label>
      </IftaLabel>
      <div class="flex justify-center">
        <Button label="Login" type="submit" :loading="isLoading" class="!w-full">
          <Icon name="lucide:log-in"/> 
          <span v-if="isLoading">
            memproses...
          </span>
          <span v-else>
            Login
          </span>
        </Button>
      </div>
  </form>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'blank',
    title: 'Login',
  })
  const { login } = useSanctumAuth()
  const route = useRoute()
  const isLoading = ref(false)

  const credentials = ref({
    email: '',
    password: '',
  })

  const loginError = ref('')

  async function handleLogin() {
    isLoading.value = true
    try {
      await login(credentials.value)
      loginError.value = ''
      isLoading.value = false
    }
    catch (err: any) {
      loginError.value = err.response._data.message
      isLoading.value = false
    }
  }

</script>