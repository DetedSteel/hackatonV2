<template>
  <div class="home">
    <StartPage />
  </div>
</template>

<script>
// @ is an alias to /src
import StartPage from '@/components/StartPage.vue'

export default {
  name: 'HomeView',
  components: {
    StartPage
  },
}
</script>
