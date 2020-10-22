<template>
    <div class="contact_item">
        <template v-if="clickedAdd">
            <div>
                <h4 class="">Name: </h4>
                <input id="nameValue" type="text"  placeholder="" v-model="nameValue" @input="warningField=''"/>
            </div>
            <label v-if="warningField==='name' || warningField === 'both'" class="contact_item__warning"  for="nameValue">Field is required</label>
            <div>
                <h4 class="">Mobile: </h4>
                <input type="text" name="mobile" placeholder="" v-model="mobileValue" @input="warningField=''"/>
            </div>
            <label v-if="warningField==='mobile' || warningField === 'both'" class="contact_item__warning"  for="nameValue">Field is required</label>
            <button class="contact_add_button" @click="addContact">Add contact</button>
            <button class="contact_add_button contact_add_close" @click="clickedAdd=!clickedAdd">Close</button>
        </template>
        <template v-else>
            <h4 class="contact_add" @click="clickedAdd=!clickedAdd">Add new contact</h4>
        </template>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name:'ContactAdd',
    data(){
        return{
            clickedAdd:false,
            nameValue:'',
            mobileValue:'',
            warningField:''
        }
    },
    methods:{
        ...mapMutations('contact', ['createContact']),
        addContact() {
            if(!this.mobileValue && !this.nameValue){
                return this.warningField = 'both'
            }else if(!this.mobileValue){
                return this.warningField = 'mobile'
            }else if(!this.nameValue){
                return this.warningField = 'both'
            }
            const newContact = [
                {
                    nameField: 'Name',
                    valueField: this.nameValue,
                },
                {
                    nameField: 'Mobile',
                    valueField: this.mobileValue,
                }
            ];
            
            this.createContact(newContact);
            this.nameValue = this.mobileValue = '';
            this.clickedAdd=!this.clickedAdd
            this.warningField = ''
        },
    }
}
</script>

<style>
    .contact_add{
        display: flex;
        height: 100%;
        flex-direction: column;
        place-content: center;
        height: 100%;
        margin: 0;
    }
    .contact_add:hover{
        background: rgba(13, 85, 13, 0.479);
        color:white;
    }
    .contact_add_button{
        width: 50%;
        margin: 1% auto;
        background:rgba(13, 85, 13, 0.479);
        border:none;
        color: white;
        cursor: pointer;
    }
    .contact_add_close{
         background:rgba(87, 10, 10, 0.9);
    }
    .contact_item__warning{
        color:red;
        position: relative;
        bottom: 8%;
        font-size: .8em;
    }
</style>