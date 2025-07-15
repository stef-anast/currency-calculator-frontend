<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <template #activator="{ props }">
      <v-btn v-bind="props" color="error" variant="outlined" width="100%">
        delete exchange rate
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Delete Exchange Rate</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="baseCurrency"
                :items="currencies"
                label="Base Currency"
                :loading="loading"
                required
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="targetCurrency"
                :items="currencies"
                label="Target Currency"
                :loading="loading"
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
        <v-btn color="error" variant="text" @click="submit"> delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app'
  import { useCurrencyStore } from '@/stores/currency'

  const currencyStore = useCurrencyStore()
  const appStore = useAppStore()

  const { currencies } = storeToRefs(currencyStore)
  const { loading } = storeToRefs(appStore)

  const dialog = ref(false)
  const baseCurrency = ref(null)
  const targetCurrency = ref(null)

  const rules = {
    required: value => !!value || 'Field is required.',
  }

  onMounted(async () => {
    await currencyStore.getCurrencies()
  })

  const submit = async () => {
    if (baseCurrency.value && targetCurrency.value) {
      const status = await currencyStore.deleteExchangeRate({
        base: baseCurrency.value,
        target: targetCurrency.value,
      })
      if (status === 204) {
        await currencyStore.getCurrencies()
        dialog.value = false
        baseCurrency.value = null
        targetCurrency.value = null
      }
    }
  }
</script>
