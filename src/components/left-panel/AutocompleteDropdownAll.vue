<template lang="pug">
    f7-input#autocomplete-dropdown-all(
      type='text',
      placeholder='Input username or email',  
      name='email',
     
      @input="onChange($event)"
      required='',
      validate='',
      clear-button=''
      data-error-message="Invalid email"
      )
          
</template>


<script>
export default {
  props: {
    currentTeamMembers: {
      type: Array,
      required: true
      //   validator(value) {
      //     return value
      //   }
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onChange(event) {
      const { name, value } = event.target;
      this.$emit('inputEmail', value);
    }
  },
  mounted() {
    // Fruits data demo array
    // var fruits = 'Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple'.split(
    //   ' '
    // );

    const { currentTeamMembers } = this;

    // const teamMembersList = fruits.map(
    //   item => `${item.username}`
    // );

    console.log(
      'AutocompleteDropdownAll.mounted.currentTeamMembers: ',
      currentTeamMembers
    );

    var autocompleteDropdownAll = this.$f7.autocomplete.create({
      inputEl: '#autocomplete-dropdown-all',
      openIn: 'dropdown',
      source: (query, render) => {
        console.log('currentTeamMembers: ', currentTeamMembers);

        var results = [];
        // Find matched items
        for (var i = 0; i < currentTeamMembers.length; i++) {
          if (
            currentTeamMembers[i].toLowerCase().indexOf(query.toLowerCase()) >=
            0
          )
            results.push(currentTeamMembers[i]);
        }
        // Render items by passing array with result items
        render(results);
      }
    });
  }
};
</script>
