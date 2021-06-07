<template>
<v-card>
<v-card-title>
      문서함
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-data-table
      :headers="headers"
      :items="content"
      :search="search"
      class="elevation-1"
      loading=true
  >
      <template v-slot:item.actions="{item}">
      <v-icon
        
        class="mr-2"
        @click="openDialog_edit(item.file_name)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
    
        class="mr-2"
         @click="delete_item(item)"
      >
        mdi-delete
      </v-icon>
       <v-icon
         @click="download_item(item)"
      >
        mdi-download
      </v-icon>
    </template>
     <template v-slot:item.star="{item}">
      <v-icon v-if="item.star"
        class="mr-2"
      >
        mdi-star
      </v-icon>
      <v-icon v-else
        class="mr-2"
      >
        mdi-star-outline
      </v-icon>
    </template>
    <template v-slot:item.Share="{item}">
      <v-icon v-if="item.Share"
        class="mr-2"
      >
        mdi-account-group
      </v-icon>
      <v-icon v-else
        class="mr-2"
      >
        mdi-account-group-outline
      </v-icon>
    </template>
  </v-data-table>
   <v-dialog
      v-model="edit_dialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">파일 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="파일명*"
                  type="text"
                  required
                  v-model="edit_file_name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['YES','NO']"
                  label="공유 여부"
                  v-model="share"
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['YES','NO']"
                  label="중요 문서"
                  v-model="star"
                  
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="edit_dialog= false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="edit_post({star,share,edit_file_name}),edit_dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-card>
</template>




<script>
//import delete_icon from "../../components/BtnFunction"
import {mapState} from "vuex"
import axios from "axios"
import store from "../../store"
import router from '../router'
axios.defaults.headers.common = {'Authorization': `Bearer ${store.state.access}`}

export default {
  data: () => ({
   star:false,
   edit_file_name:'',
   share:false,
   edit_dialog: false,
    loading:true,
    step: 1,
    access:mapState.access,
    search:'',
    origin_file_name:'',
    user_files:[],
    download_files:[],
    content: [],
    headers: [
        { text: '날짜', value: 'day', sortable: true, class: 'hidden-sm-and-down' },
        { text: '제목', value: 'file_name', sortable: true },
        { text: '공유여부', value:'Share',sortable:true},
        { text: '중요문서', value:'star',sortable:true},
        { text: 'Actions', value: 'actions', sortable: false },
        

      ],
  }),
  created()
  {
    axios.get("http://api.drive.jinsu.me/files")
    .then( res=> {this.user_files=res.data
    console.log(res.data.length)
    for(var i=0;i<res.data.length;i++)
    {

      
      this.content.push({day:res.data[i].modified_date.split('.')[0].split('T')[0]+" "+res.data[i].modified_date.split('.')[0].split('T')[1],
                      file_name:res.data[i].file_name,index:i+1,star:res.data[i].is_starred,Share:res.data[i].is_shared})
      this.download_files[res.data[i].file_name]=res.data[i].file
      this.loading=true
    }
    
    })
    .catch(err=>{console.log(err)})
  }
  ,
  methods:
  {
    edit_post(item)
    {
      axios.put("http://api.drive.jinsu.me/myfile/update/"+this.origin_file_name, 
      {file_name:item.edit_file_name, is_shared:item.share,is_starred:item.star})
      .then(res=>{console.log(res), router.go()})
      .catch(err=>{console.log(err)})
    }
    ,
    openDialog_edit(item){this.edit_dialog=true, this.origin_file_name=item},
    closeDialog_edit() { this.edit_dialog = false;},

    delete_item(item)
    {
        
        var fd = new FormData();
        fd.append('file',this.user_files[item.index-1].file);
        fd.append("file_name",this.user_files[item.index-1].name)
        fd.append("modified_date",this.user_files[item.index-1].modified_date)
        fd.append("user_id",this.user_files[item.index-1].user)
        fd.append("is_shared",this.user_files[item.index-1].is_shared)
        axios.delete("http://api.drive.jinsu.me/files",fd)
        .then( res=> {console.log(res)})
        .catch(err=>{console.log(err)})
    },
    download_item(item)
    {
      
      let item_url="http://api.drive.jinsu.me/"+item.file_name+"/download"
      axios.get(item_url,{file_name:item})
      .then(response=>{const url = window.URL.createObjectURL(new Blob([response.data.Body], { type: 'text/plain' }))
                const link = document.createElement('a')
                link.href = url
                console.log(link)
                link.setAttribute('download', item.file_name)
                document.body.appendChild(link)
                link.click()})
      .then(err=>{console.log(err)})
    }
  }

    
};
</script>