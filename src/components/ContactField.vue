<template>
    <div class="contact_field">
        <template>
            <h5 v-if="!isEditClicked">{{field.nameField}}: {{field.valueField}}</h5>
            <div v-else>
                <h5 v-if="field.nameField == 'Name' || field.nameField == 'Mobile'" >{{field.nameField}}</h5>
                <input v-else  id="nameField" type="text" :placeholder="field.nameField" ref="nameField" value="" @input="warningField=''">
                <label v-if="warningField==='name' || warningField==='both'" class="contact_item__warning"  for="nameValue">Field is required</label>
                <input id="valueField" type="text" :placeholder="field.valueField" ref="valueField" value=""  @input="warningField=''">
                <label v-if="warningField==='value' || warningField==='both'" class="contact_item__warning"  for="valueField">Field is required</label>
            </div>
            <div class="contact_field_buttons">
                <template v-if="!isEditClicked">
                    <button class="contact_add_button" @click="isEditClicked=!isEditClicked">Edit</button>
                    <button class="contact_add_button contact_add_close" v-show="field.nameField != 'Name' && field.nameField != 'Mobile'"
                            @click="confirmChanges=!confirmChanges">Delete</button>
                </template>
                <template v-else>
                    <button class="contact_add_button" @click="changeField(index)"
                            >Save</button>
                    <button class="contact_add_button contact_add_close" @click="confirmChanges=!confirmChanges;warningField=''">Cancel</button>
                </template>
            </div>
        </template>
        <div v-if="confirmChanges" class="contact_delete" @click.stop>
                <span v-if="isEditClicked" class="confirm_delete__text">Discard changes?</span>
                <span v-else class="confirm_delete__text">Delete field?</span>
                <div class="confirm_delete__buttons">
                    <button v-if='isEditClicked' @click="confirmChanges=!confirmChanges;isEditClicked=!isEditClicked" class="contact_delete__button yes">Yes</button>
                    <button v-else @click="deleteField(index)" class="contact_delete__button yes">Yes</button>
                    <button @click="confirmChanges=!confirmChanges" class="contact_delete__button no">No</button>
                </div>
            </div>
    </div>
    
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name:'ContactField',
    data(){
        return{
            isEditClicked:false,
            confirmChanges:false,
            /*warningField need for validation inputs values(they must exist)*/
            warningField:'',
            operationStack: []
        }
    },
    props:{
        field:{},
        index:{}
    },
    methods:{
        ...mapMutations('contact',['deleteFieldContact','changeFieldContact','setOperationStack']),
        setOperation(operation){
            return{
                operationName: operation,
                nameField:this.field.nameField,
                valueField:this.field.valueField,
                index:this.index,
                edit:true
            }
        },
        deleteField(index){
            this.setOperationStack(this.setOperation('delete'))
            const fieldId = {id:this.$route.params.id-1,index}
            this.confirmChanges=!this.confirmChanges
            this.deleteFieldContact(fieldId)
        },
        changeField(index){
            var changedField = {
                id:this.$route.params.id-1,
                index,
                valueField:this.$refs.valueField.value
            }
            /*
                Object.keys(this.$refs).length was use for checking does it required field (name,mobile)
                Object.keys(this.$refs).length == 1 means that fiedl have only one input access (required fields),
                and u cant change name of field

            */
            if(Object.keys(this.$refs).length === 1){
                if(!this.$refs.valueField.value){
                    return this.warningField = 'value'
                }
                this.setOperationStack(this.setOperation('edit'))
                this.changeFieldContact(changedField)
            }
            if(Object.keys(this.$refs).length > 1){
                if(!this.$refs.valueField.value && !this.$refs.nameField.value){
                    return this.warningField = 'both'
                }else if(!this.$refs.valueField.value){
                    return this.warningField = 'value'
                }else if(!this.$refs.nameField.value){
                    return this.warningField = 'name'
                }
                this.setOperationStack(this.setOperation('edit'))
                changedField = {...changedField,nameField:this.$refs.nameField.value}
                this.changeFieldContact(changedField)
            }
            this.isEditClicked = !this.isEditClicked
            
        }
    }
}
</script>

<style scoped>
    .contact_field_buttons{
        display: flex;
        flex-direction: column;
    }
    .contact_field_buttons>button{
        margin: 1%;
        width: auto;
    }
    .contact_field{
        position: relative;
        height: 100px;
        margin: 2%;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .contact_field>*{
        flex: 0 0 70%;
    }
    .contact_field>*:nth-child(2){
        flex: 0 0 30%;
    }
</style>