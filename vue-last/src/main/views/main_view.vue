 <template>
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
              <strong>movie</strong>
            </v-col>

            <v-col
              v-for="j in 6"
              :key="`${2}${j}`"
              cols="6"
              md="2"
            >
              <v-sheet 
                height="150"
                color="grey lighten-3"
              >
              </v-sheet>
            </v-col>
            
          </template>
        </v-row>
      </v-container>
</template>