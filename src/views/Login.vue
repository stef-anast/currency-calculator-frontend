<template>
  <v-form @submit.prevent="submit">
    <h1>Login</h1>
    <v-text-field
      v-model="email"
      class="mt-4"
      label="E-mail"
      required
      :rules="[rules.required, rules.email]"
    />
    <v-text-field
      v-model="password"
      class="mt-4"
      label="Password"
      required
      :rules="[rules.required]"
      type="password"
    />
    <div class="d-flex mt-4">
      <v-btn color="primary" to="/register" variant="outlined">
        register
      </v-btn>
      <v-spacer />
      <v-btn color="primary" type="submit"> submit </v-btn>
    </div>
  </v-form>
</template>

<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'

  const authStore = useAuthStore()

  const email = ref('')
  const password = ref('')

  const rules = {
    required: value => !!value || 'Field is required.',
    email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
  }

  const submit = async () => {
    if (email.value && password.value) {
      await authStore.login({
        email: email.value,
        password: password.value,
      })
    }
  }
</script>
