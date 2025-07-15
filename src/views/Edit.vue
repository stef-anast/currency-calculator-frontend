<template>
  <div>
    <h1>Edit</h1>
    <v-container class="mt-4" fluid>
      <h3 class="mb-1">Currencies</h3>
      <v-row align="center">
        <v-col class="d-flex justify-center" cols="12" sm="6">
          <CreateCurrency />
        </v-col>
        <v-col class="d-flex justify-center" cols="12" sm="6">
          <DeleteCurrency />
        </v-col>
      </v-row>
      <v-divider class="my-8" />
      <h3 class="mb-1">Exchange Rates</h3>
      <v-row align="center">
        <v-col class="d-flex justify-center" cols="12" sm="6">
          <SetExchangeRate />
        </v-col>
        <v-col class="d-flex justify-center" cols="12" sm="6">
          <DeleteExchangeRate />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
  import CreateCurrency from '@/components/CreateCurrency.vue'
  import DeleteCurrency from '@/components/DeleteCurrency.vue'
  import DeleteExchangeRate from '@/components/DeleteExchangeRate.vue'
  import SetExchangeRate from '@/components/SetExchangeRate.vue'
</script>
