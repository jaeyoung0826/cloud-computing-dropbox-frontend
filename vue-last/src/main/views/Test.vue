<template>
<v-card>
<v-card-title>
      khu-box
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
        @click="test_item(item.file_name)"
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
  </v-data-table>
  
</v-card>
</template>




<script>
//import delete_icon from "../../components/BtnFunction"
import {mapState} from "vuex"
import axios from "axios"
import store from "../../store"
axios.defaults.headers.common = {'Authorization': `Bearer ${store.state.access}`}

export default {
  data: () => ({
    loading:true,
    step: 1,
    access:mapState.access,
    search:'',
    user_files:[],
    download_files:[],
    content: [],
    headers: [
        { text: '날짜', value: 'day', sortable: true, class: 'hidden-sm-and-down' },
        { text: '제목', value: 'file_name', sortable: true },
        { text: '중요문서', value:'star',sortable:true},
        { text: 'Actions', value: 'actions', sortable: false },
        

      ],
  }),
  created()
  {
    axios.get("http://localhost:8081/files")
    .then( res=> {this.user_files=res.data
    console.log(res.data.length)
    for(var i=0;i<res.data.length;i++)
    {

      console.log(res.data[i])
      this.content.push({day:res.data[i].modified_date.split('.')[0],file_name:res.data[i].file_name,index:i+1,star:res.data[i].is_starred})
      this.download_files[res.data[i].file_name]=res.data[i].file
      this.loading=true
    }
    
    })
    .catch(err=>{console.log(err)})
  }
  ,
  methods:
  {
    
    delete_item(item)
    {
        console.log(this.user_files[item.index-1])
        var fd = new FormData();
        fd.append('file',this.user_files[item.index-1].file);
        fd.append("file_name",this.user_files[item.index-1].name)
        fd.append("modified_date",this.user_files[item.index-1].modified_date)
        fd.append("user_id",this.user_files[item.index-1].user)
        fd.append("is_shared",this.user_files[item.index-1].is_shared)
        axios.delete("http://localhost:8081/files",fd)
        .then( res=> {console.log(res)})
        .err(err=>{console.log(err)})
    }
  }

    
};
</script>