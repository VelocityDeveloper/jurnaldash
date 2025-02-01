<template>
    <div class="default">
      <div class="flex flex-col min-h-screen justify-between bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
        
        <div class="grow bg-gradient-to-r from-rose-100 to-teal-100 dark:from-zinc-900 dark:to-zinc-800 dark:bg-zinc-950 flex flex-col justify-center">
          <div class="flex flex-col justify-center p-2">
            <slot />
          </div>
        </div>
        <div class="absolute top-0 right-0">
            <Darkmode />
        </div>

      </div>
    </div>
  </template>