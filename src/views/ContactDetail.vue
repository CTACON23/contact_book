<template>
    <div class="contact_item">
        <div v-for="(field,index) in contactDetailInfo" :key="index">
            <ContactField :field="field" :index="index"/>
        </div>
        <template v-if='addFieldClicked'>
             <div class="contact_item__field_input">
                <input id='nameField' type="text" ref="nameField" @input="warningField=''">
                <label v-if="warningField==='name' || warningField==='both'" class="contact_item__warning"  for="nameValue">Field is required</label>
                <input id='valueField' type="text" ref="valueField" @input="warningField=''">
                <label v-if="warningField==='value' || warningField==='both'" class="contact_item__warning"  for="valueField">Field is required</label>
                <div class="contact_item__field_buttons">
                        <button @click="addField">Save</button>
                        <button @click="addFieldClicked=!addFieldClicked">Cancel</button>
                </div>
            </div>
        </template>
        <button v-show="!addFieldClicked" @click="addFieldClicked=!addFieldClicked">Add field</button>
        <button v-show="operations.length!=0" @click="stepBack">Step Back</button>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ContactField from '../components/ContactField'

export default {
    name:'ContactDetail',
    components:{ContactField},
    data(){
        return{
            contactDetailInfo:[],
            operations:[],
            addFieldClicked:false,
            warningField:''
        }
    },
    computed:{
        ...mapGetters('contact',['contacts','operationStack'])
    },
    mounted(){
        this.contactDetailInfo = this.contacts[this.$route.params.id-1]
        this.operations= this.operationStack
    },
    methods:{
        ...mapMutations('contact',['addFieldContact','deleteFieldContact','setOperationStack']),
       stepBack(){
           const lastOperation = this.operations[this.operations.length-1]
           const newField = {
                   id:this.$route.params.id-1,
                   nameField: lastOperation.nameField,
                   valueField: lastOperation.valueField,
                   index:lastOperation.index,
                   edit:lastOperation.edit
               }
           if(lastOperation.operationName === 'delete'){
               this.addFieldContact(newField)
           }else if(lastOperation.operationName === 'add'){
               this.deleteFieldContact(this.$route.params.id-1)
           }else if(lastOperation.operationName === 'edit'){
               this.addFieldContact(newField)
           }
           this.operations.pop()
       },
       addField(){
            if(!this.$refs.valueField.value && !this.$refs.nameField.value){
                return this.warningField = 'both'
            }else if(!this.$refs.valueField.value){
                return this.warningField = 'value'
            }else if(!this.$refs.nameField.value){
                 return this.warningField = 'name'
            }
            
            this.nameField=this.$refs.nameField.value
            this.valueField=this.$refs.valueField.value
            let newField = {
                id:this.$route.params.id-1,
                nameField:this.nameField,
                valueField:this.valueField
            }
            this.addFieldClicked = !this.addFieldClicked
            this.setOperationStack({operationName:'add'})
            this.addFieldContact(newField)
        }
       
    }
    
}
</script>

<style scoped>
    .contact_item{
        margin: 0 auto;
        height: auto;
    }
    .contact_item__field_input{
        display: flex;
        flex-direction: column;
        place-items: center;
    }
    .contact_item__field_input>*,.contact_item__field_buttons>*{
        margin: 2%;
    }
</style>