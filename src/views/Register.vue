<template>
  <v-form @submit.prevent="submit">
    <h1>Register</h1>
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
      :rules="[rules.required, rules.minLength]"
      type="password"
    />
    <div class="d-flex mt-4">
      <v-btn color="primary" to="/login" variant="outlined"> login </v-btn>
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
    minLength: value =>
      value.length >= 5 || 'Password must be at least 5 characters long.',
  }

  const submit = async () => {
    if (email.value && password.value && password.value.length >= 5) {
      await authStore.register({
        email: email.value,
        password: password.value,
      })
    }
  }
</script>
