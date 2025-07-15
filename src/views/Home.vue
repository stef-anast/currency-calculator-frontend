<template>
  <v-form @submit.prevent="submit">
    <h1>Convert</h1>
    <v-container class="mt-4" fluid>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="4">
          <v-text-field
            v-model="amount"
            label="Amount"
            :loading="loading"
            required
            :rules="[rules.required]"
            type="number"
            variant="outlined"
          />
        </v-col>

        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            v-model="baseCurrency"
            :items="currencies"
            label="Base Currency"
            :loading="loading"
            required
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>

        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            v-model="targetCurrency"
            :items="currencies"
            label="Target Currency"
            :loading="loading"
            required
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>

        <v-col class="d-flex" cols="12" sm="12">
          <v-text-field
            v-model="convertedAmount"
            :disabled="convertedAmount === null"
            label="Converted Amount"
            readonly
            required
            type="number"
            variant="outlined"
          />
        </v-col>
      </v-row>
      <div class="d-flex mt-4">
        <v-btn
          color="primary"
          :disabled="loading"
          variant="outlined"
          @click="clear"
        >
          clear
        </v-btn>
        <v-spacer />
        <v-btn color="primary" :disabled="loading" type="submit">
          submit
        </v-btn>
      </div>
    </v-container>
  </v-form>
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

  const amount = ref(null)
  const baseCurrency = ref(null)
  const targetCurrency = ref(null)
  const convertedAmount = ref(null)

  const rules = {
    required: value => !!value || 'Field is required.',
  }

  onMounted(async () => {
    await currencyStore.getCurrencies()
  })

  const submit = async () => {
    if (amount.value && baseCurrency.value && targetCurrency.value) {
      const value = await currencyStore.convert({
        amount: Number(amount.value),
        base: baseCurrency.value,
        target: targetCurrency.value,
      })
      convertedAmount.value = value ? Number(value).toFixed(4) : null
    }
  }

  const clear = () => {
    amount.value = null
    baseCurrency.value = null
    targetCurrency.value = null
    convertedAmount.value = null
  }
</script>
