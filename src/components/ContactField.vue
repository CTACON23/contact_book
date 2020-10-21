<template>
    <div class="contact_field">
        <template>
            <h5 v-if="!isEditClicked">{{field.nameField}}: {{field.valueField}}</h5>
            <div v-else>
                <h5 v-if="field.nameField == 'name' || field.nameField == 'mobile'" >{{field.nameField}}</h5>
                <input v-else  id="nameField" type="text" :placeholder="field.nameField" ref="nameField" value="" @input="warningField=''">
                <label v-if="warningField==='name' || warningField==='both'" class="contact_item__warning"  for="nameValue">Field is required</label>
                <input id="valueField" type="text" :placeholder="field.valueField" ref="valueField" value=""  @input="warningField=''">
                <label v-if="warningField==='value' || warningField==='both'" class="contact_item__warning"  for="valueField">Field is required</label>
            </div>
            <div>
                <template v-if="!isEditClicked">
                    <button @click="isEditClicked=!isEditClicked">Edit</button>
                    <button v-show="field.nameField != 'name' && field.nameField != 'mobile'" @click="confirmChanges=!confirmChanges">Delete</button>
                </template>
                <template v-else>
                    <button @click="changeField(index)"
                            >Save</button>
                    <button @click="confirmChanges=!confirmChanges;warningField=''">Cancel</button>
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
    .contact_field{
        position: relative;
        height: 100px;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .contact_field>*{
        flex: 0 0 60%;
    }
    .contact_field>*:nth-child(2){
        flex: 0 0 40%;
    }
</style>