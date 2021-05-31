<template>
  <v-content>
  <v-btn v-on:click="check">SIGN UP</v-btn>
  </v-content>
</template>




<script>
import {mapState,mapActions} from "vuex"
export default {
  data: () => ({
    step: 1,
    access:mapState.access
  }),
  methods:
  {
    ...mapActions(["check"]),
  }
   
    
};
</script>