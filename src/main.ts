/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { createNotivue } from 'notivue'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Styles
import 'unfonts.css'
import 'notivue/notifications.css'
import 'notivue/animations.css'

const notivue = createNotivue({
  position: 'bottom-right',
  notifications: {
    global: {
      duration: 2000,
    },
  },
})
const app = createApp(App)

registerPlugins(app)
app.use(notivue)

app.mount('#app')
