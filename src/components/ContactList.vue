<template>
  <ul class='contact_list'>
    <template v-for="(contactFields, index) in contacts">
      <ContactItem :contactFields="contactFields" :index="index" :key="index"/>
    </template>
    <ContactAdd/>
  </ul>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ContactItem from "./ContactItem";
  import ContactAdd from "./ContactAdd";
  export default {
    name: "ContactList",
    components: {
      ContactItem,
      ContactAdd
    },
    methods: {
    },
    computed: {
      ...mapGetters('contact' , ['contacts']),
    }
  }
</script>

<style scoped>
  .contact_list{
    display: flex;
    width: 100%;
    flex-wrap:wrap;
    justify-content: center;
    margin: 1% auto;
    list-style: none;
    padding: 0;
  }
</style>