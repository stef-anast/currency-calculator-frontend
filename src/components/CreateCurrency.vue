<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <template #activator="{ props }">
      <v-btn v-bind="props" color="#004D40" variant="outlined" width="100%">
        create currency
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Create Currency</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="symbol"
                label="Symbol"
                required
                :rules="[rules.required]"
                @input="symbol = symbol.toUpperCase()"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="Name"
                required
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false"> cancel </v-btn>
        <v-btn color="#004D40" variant="text" @click="save"> create </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import { useCurrencyStore } from '@/stores/currency'

  const currencyStore = useCurrencyStore()

  const dialog = ref(false)
  const symbol = ref('')
  const name = ref('')

  const rules = {
    required: value => !!value || 'Field is required.',
  }

  const save = async () => {
    if (symbol.value && name.value) {
      const ok = await currencyStore.createCurrency({
        symbol: symbol.value,
        name: name.value,
      })
      if (ok) {
        await currencyStore.getCurrencies()
        dialog.value = false
        name.value = ''
        symbol.value = ''
      }
    }
  }
</script>
