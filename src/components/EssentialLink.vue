<template>
  <q-toolbar>
      <q-toolbar-title>Drawer Title</q-toolbar-title>
    </q-toolbar>
      <q-list>
        <q-item > Home </q-item>
        <q-expansion-item label="List" expand-separator>
          <q-item>
            Employee
          </q-item>
          <q-item>
            Admin
          </q-item>
        </q-expansion-item>
        <q-item> Settings </q-item>
      </q-list>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }

})
</script>
