<template v-slot:extension>
 <v-card height="300" flat> 
  <v-btn
    fab
    color="cyan accent-2"
    bottom
    right
    absolute
    @click="dialog = !dialog"
  >
  
  <v-icon>mdi-plus</v-icon>
  
  </v-btn>
  <v-dialog
          v-model="dialog"
          transition="dialog-top-transition"
           max-width="600"
        >
  
      <v-file-input
    v-model="files"
    color="deep-purple accent-4"
    counter
    label="File input"
    multiple
    placeholder="Select your files"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="1000"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="deep-purple accent-4"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>

      </v-dialog>
  </v-card>         
            
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,

      }
    },
  }
</script>
