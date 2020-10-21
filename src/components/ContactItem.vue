<template>
    <div class="contact_item">
        <div  v-for="(contactField, index) in contactFields.slice(0,2)" :key="index">
            <h5>{{contactField.nameField}}: </h5>
            <h5>{{contactField.valueField}}</h5>
        </div>
        <div>
           <button @click.stop="confirmDelete = true" class="contact_add_button contact_add_close">Delete</button>
           
           <template v-if="confirmDelete">
                <div class="contact_delete" @click.stop>
                    <span class="confirm_delete__text">Delete contact?</span>
                    <div class="confirm_delete__buttons">
                        <button @click="removeContact" class="contact_delete__button yes">Yes</button>
                        <button @click="confirmDelete = false" class="contact_delete__button no">No</button>
                    </div>
                </div>
            </template>
        </div>
        <button class="contact_add_button" @click="detailPage">Detail</button>
    </div>
  
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    name: "ContactItem",
    data(){
        return{
            confirmDelete:false
        }
    },
    props: {
      contactFields: {},
      index: {}
    },
    methods:{
        ...mapMutations('contact',['deleteContact']),
        detailPage() {
            this.$router.push('/' + (this.index + 1));
        },
        removeContact(){
            this.deleteContact(this.index)
            this.confirmDelete = false
        }
    }
}
</script>

<style>
    .contact_item{
        margin: 3%;
        height: 200px;
        width: 15%;
        display: flex;
        flex-direction: column;
        position: relative;
        place-content: center;
        border:1px solid green;
    }
    .contact_item>div{
        display: flex;
        align-items: baseline;
        justify-content: center;
    }
    .contact_delete{
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        background: rgba(13, 85, 13, 0.479);
        display: flex;
        color: white;
        font-size: 1.4em;
        flex-direction: column;
        justify-content: center;
    }
    .contact_delete__button{
        border:none;
        color:white;
        margin:1%;
        font-size: 1em;
        cursor: pointer;
    }
    
     .contact_delete__button.yes{
        background: green;
    }
    .contact_delete__button.no{
        background: red;
    }
    .contact_delete__button:hover{
        opacity: 85%;
    }
</style>