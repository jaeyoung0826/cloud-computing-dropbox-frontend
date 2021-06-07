<template>
<div class="example-drag">
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active"> 
      <h3>Drop files to upload</h3>
    </div>
    <template v-if="files.length">
      <v-data-table 
        dense 
        :headers="headers" 
        :items="files" 
        item-key="name" 
        class="elevation-1"
        hide-default-footer
      > 
      <template v-slot:item.delete="{item}">
      <v-icon
    
        class="mr-2"
         @click="delete_item(item)"
         small
      >
        mdi-close-thick
        
      </v-icon>
      </template>
      </v-data-table>
      <v-btn
        class="ma-2"
        style="padding:0px;"
        color="info"
        v-on:click="uploadStart(files)"
      > 
        upload
      </v-btn>
    </template>
    <template v-else> 
      <FileUpload
        class="btn btn-primary"
        :multiple="true"
        :drop="true"
        :drop-directory="true"
        v-model="files"
        ref="upload"
        @input="onDrop($event)" 
      > 
      </FileUpload> 
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <div class="text-center p-5">
            <h4>Drop files anywhere to upload<br/>or</h4>
              <v-btn
                class="ma-2"
                style="padding:0px;"
                color="info"
              > 
                <label for="file" style="padding:0px 8px;">Select Files</label>
              </v-btn>
          </div>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import FileUpload from "vue-upload-component"
import axios from 'axios'
import store from "../../store"
import router from "../router"
axios.defaults.headers.common = {'Authorization': `Bearer ${store.state.access}`}
export default {
  components: {
    FileUpload
  },
  data: ()=> ({
    files: [], //파일 변수
    headers: [ //파일 업로드 후 테이블 영역 헤더부분
      { text: 'name', value: 'name' },
      { text: 'size', value: 'size' },
      { text: '', value: 'delete'}
    ],
  }),
  methods: {
    
    delete_item(item)
    {
      this.files.pop(item)
    },
    onDrop(item){ //파일업로드 직후 동작
      console.log(item)
    },
    async uploadStart() {
      
      
      for (var i = 0; i < this.files.length; i++) {
        var fd = new FormData();
        fd.append('file',this.files[i].file);
        fd.append("file_name",this.files[i].file.name)
        fd.append("is_shared",false)
        fd.append("is_starred",false)

    
        axios.post("http://localhost:8000/files",fd)
         .then( res=> {
           console.log(res)
           alert("업로드 완료")
           router.go(0)
         })
         .catch(err=> {
            console.log(err.file_name);
            
         })
      }
    },
  },
}
</script>

<style scoped>
example-drag .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  width:100%;
  background: #000;
}
.example-drag .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}

</style>