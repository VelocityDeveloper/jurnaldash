<template>  
  <div class="flex justify-end min-h-svh w-full bg-gray-100 dark:bg-zinc-900">

    <div>
      <aside class="flex z-20 fixed top-0 md:top-4 left-[-100%] md:left-4 h-full md:h-[calc(-2.1rem+100vh)] w-[calc(100%-5rem)] md:w-[13.5rem]" :class="{'!left-0 md:!left-4':isOpen}">
        <div class="flex flex-col w-full h-full space-y-6 transition-all bg-white dark:bg-zinc-800 md:rounded-lg shadow-sm">
          <SidebarApp />
        </div>
      </aside>
      <div v-if="isOpen" @click="toggleSidebar" class="md:hidden z-10 fixed min-h-screen w-full right-0 top-0 bg-gray-900 opacity-50"></div>
    </div>

    <main class="flex-1 p-2 py-4 md:p-4 md:pl-4 transition-all w-full md:max-w-[calc(100%-14.5rem)]">

      <header class="rounded-lg shadow-sm bg-white dark:bg-zinc-800 flex items-center justify-between p-4 md:px-6 space-x-4">
          <div>
            <div class="text-xl font-bold">
              {{ $route.meta.title }}
            </div>            
          </div>
          <div class="flex justify-end">

            <Button variant="text" size="small" @click="toggleNotif">
              <Icon name="lucide:bell"/>
            </Button>
            <Popover ref="opNotif">
              <div class="w-[10rem] max-h-40 overflow-y-auto">
                  <ul class="text-sm">
                      <li v-for="notif in notifs" class="border-b py-1">
                        {{ notif.message }}
                        <br><span class="text-xs opacity-50">{{ notif.time }}</span>
                      </li>
                  </ul>
              </div>
            </Popover>

            <Button variant="text" size="small" @click="toggleMenuUser">
              <Icon name="lucide:user" class="md:mr-1"/>
              <span class="hidden md:inline">
                {{ user?.name }}
              </span>
            </Button>
            <Menu ref="menuUser" :model="itemsmenuUser" :popup="true" />

            <Button variant="text" @click="toggleSidebar" class="md:!hidden">
              <Icon name="lucide:menu"/>
            </Button>
            <Darkmode />
          </div>
      </header>

      <div class="flex-1 mt-4 md:p-6 p-4 rounded-lg shadow-sm bg-white dark:bg-zinc-800 min-h-[82vh]">
        <slot />
      </div>

    </main>

  </div>

  <Dialog v-model:visible="dialog" header="Profil Akun" :style="{ width: '40rem', minHeight: '50vh' }" :breakpoints="{ '1000px': '40rem', '768px': '90vw' }" :modal="true">
    <UserEdit />
  </Dialog>

</template>

<script setup lang="ts">
  interface User {
    name: string;
  }
  const { user, logout } = useSanctumAuth() as { user: Ref<User | null>, logout: () => void };
    
  const isOpen = ref(false)
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value
  }

  const menuUser = ref();
  const itemsmenuUser = ref([
      {
          label: user.value?.name,
          items: [
              {
                  label: 'Profil',
                  command: () => {
                      dialog.value = true;
                  }
              },
              {
                  label: 'Logout',
                  command: () => {
                      logout();
                  }
              }
          ]
      }
  ]);
  const toggleMenuUser = (event: any) => {
      menuUser.value.toggle(event);
  };
  
  const opNotif = ref();  
  const notifs = ref();
  const toggleNotif = (event: any) => {
    opNotif.value.toggle(event);
    notifs.value = [
      {
        message: 'Transaksi baru, Pulsa XL Rp. 10.000',
        time:'2025-01-01',
      },
      {
        message: 'Transaksi baru, Pulsa 3 Rp. 50.000',
        time:'2025-01-02',
      },
      {
        message: 'Transaksi baru, Topup Mobile Legends Rp. 100.000',
        time:'2025-01-03',
      },
      {
        message: 'Transaksi baru, Topup FreeFire Rp. 50.000',
        time:'2025-01-05',
      },
    ];
}

const dialog = ref(false);
</script>