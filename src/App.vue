<template>
  <v-app>
    <Notivue v-slot="item">
      <NotivueSwipe :item="item">
        <Notification :item="item" />
      </NotivueSwipe>
    </Notivue>

    <v-app-bar class="app-bar-background">
      <router-link
        class="ml-1 d-flex align-center"
        style="text-decoration: none; color: white"
        to="/"
      >
        <v-app-bar-nav-icon>
          <v-img
            alt="Currency Calculator Logo"
            class="mr-2 ml-2"
            height="25"
            src="/src/assets/logo.png"
            transition="scale-transition"
            width="25"
          />
        </v-app-bar-nav-icon>
        <v-app-bar-title class="ml-2">Currency Calculator</v-app-bar-title>
      </router-link>

      <v-spacer />

      <div v-if="authStore.isAuthenticated">
        <v-btn v-if="authStore.isAdmin" icon to="/edit" variant="plain">
          <v-icon class="mx-2">mdi-file-edit</v-icon>
        </v-btn>
        <v-menu location="bottom" transition="slide-y-transition">
          <template #activator="{ props }">
            <v-btn icon v-bind="props" variant="plain">
              <v-icon class="mx-2">mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item :disabled="true">
              <v-list-item-title>{{ authStore.user?.email }}</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="authStore.logout()">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <v-progress-linear
        absolute
        :active="appStore.loading"
        color="primary"
        indeterminate
      />
      <v-container class="mt-1">
        <router-view v-slot="{ Component }">
          <v-scroll-x-transition :hide-on-leave="true">
            <component :is="Component" />
          </v-scroll-x-transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { Notification, Notivue, NotivueSwipe } from 'notivue'
  import { useAppStore } from '@/stores/app'
  import { useAuthStore } from '@/stores/auth'

  const authStore = useAuthStore()
  const appStore = useAppStore()
</script>

<style>
.app-bar-background {
  background: linear-gradient(to left, #2c5364, #203a43, #0f2027) !important;
  color: white;
}
.app-bar-background .v-icon {
  color: white;
}
.notivue__notification--success {
  background: linear-gradient(to right, #11998e, #38ef7d);
}
.notivue__notification--error {
  background: linear-gradient(to right, #cb2d3e, #ef473a);
}
.notivue__notification--warning {
  background: linear-gradient(to right, #f7971e, #ffd200);
}
</style>
