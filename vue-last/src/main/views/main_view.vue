 <template>
 <v-app>
 <v-container>
        <v-row>
          <template>
            <v-col 
              :key="1"
              class="mt-2"
              cols="12"
            >
              <strong>image</strong>
            </v-col>

            <v-col
              v-for="j in 6"
              :key="`${1}${j}`"
              cols="6"
              md="2"
      
            >
              <v-sheet 
                height="150"
                color="grey lighten-3" 
                elevation="10"
              
              >
              </v-sheet>
            </v-col>
            
          </template>
          <template>
            <v-col
              :key="2"
              class="mt-2"
              cols="12"
            >
              <strong>img</strong>
            </v-col>

            <v-col
              v-for="j in 6"
              :key="`${2}${j}`"
              cols="6"
              md="2"
            >
            <div>
              <v-card 
                height="150"
                color="grey lighten-3"
                elevation="10"
              >
              <v-img key
              @click.right="openDialog()"
              src="https://picsum.photos/350/165?random"
              height="125"
              class="grey darken-4"
            ></v-img>
              </v-card>
            </div>
            </v-col>
            
          </template>
        </v-row>
      </v-container>
      <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
        
         <v-btn>수정하기</v-btn>
         <v-btn>삭제하기</v-btn>
         <v-btn>공유하기</v-btn>
           <v-btn icon @click="closeDialog()">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>
 </v-app>
</template>



<script>
export default {
  
  data: ()=> ({
    dialog: false,
  }),
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  }
}
</script>
