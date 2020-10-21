export default {
    namespaced:true,
    state:{
        contacts:[
            [
                {
                    nameField:'name',
                    valueField:'Andrew'
                },
                {
                    nameField: 'mobile',
                    valueField: '9998887777',
                },
                {
                    nameField: 'email',
                    valueField: 'test@mail.com',
                }
                
            ],
            [
                {
                    nameField:'name',
                    valueField:'Victoria'
                },
                {
                    nameField: 'mobile',
                    valueField: '9998887777',
                },
                {
                    nameField: 'email',
                    valueField: 'test@mail.com',
                }
                
            ],

        ],
        operationStack:[]
    },
    getters:{
        contacts:({contacts}) => contacts,
        operationStack:({operationStack}) => operationStack
    },
    mutations:{
        createContact(state,contact){
            state.contacts.push(contact)
        },
        deleteFieldContact(state,fieldId){
            if(!fieldId.index){
                state.contacts[fieldId].pop()
            }else{
                state.contacts[fieldId.id].splice(fieldId.index,1)
            }
        },
        addFieldContact(state,newField){
            console.log(newField)
            if(newField.index && !newField.edit){
                state.contacts[newField.id].splice(newField.index,0,{nameField:newField.nameField,valueField:newField.valueField})
            }else if(newField.edit){
                state.contacts[newField.id].splice(newField.index,1,{nameField:newField.nameField,valueField:newField.valueField})
            }else{
                state.contacts[newField.id].push({nameField:newField.nameField,valueField:newField.valueField})
            }
        },
        deleteContact(state,index){
            state.contacts.splice(index,1)
        },
        changeFieldContact(state,newField){
            const field = state.contacts[newField.id][newField.index]
            if(newField.nameField != undefined){
                field.nameField = newField.nameField
            }
            field.valueField = newField.valueField
        },
        setOperationStack(state,operation){
            state.operationStack.push(operation)
        }
    }
  }