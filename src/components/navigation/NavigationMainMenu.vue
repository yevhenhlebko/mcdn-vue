<template>
  <v-list nav dense>
    <div v-for="(item, index) in menu" :key="index">
      <div v-if="item.text" class="pa-1 mt-2 text-overline">{{ item.text }}</div>
      <nav-menu :menu="item.items" />
    </div>
  </v-list>
</template>

<script>
import NavMenu from './NavigationMenu'

export default {
  components: {
    NavMenu
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  }
}
</script>
