<template>
  <BNavbar class='header-navbar'>
    <BContainer>
      <BNavbarBrand>
        <BIconJournalBookmark
          class="mr-2"
          variant='light'
          font-scale='1'>
        </BIconJournalBookmark>
        <h3 class="header-title">recipes</h3>
      </BNavbarBrand>
      <BIconHeartFill class='header-favorite ml-auto mr-3'/>
      <BNavForm class="header-navform">
        <BInputGroup>
          <BInputGroupPrepend is-text>
            <BIconSearch></BIconSearch>
          </BInputGroupPrepend>
          <BFormInput
            autocomplete="off"
            class="mr-sm-2"
            placeholder="Search"
            v-model='searchTitleValue'
            debounce="500"
          ></BFormInput>
        </BInputGroup>
      </BNavForm>
    </BContainer>
  </BNavbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    searchTitleValue: '',
  }),
  watch: {
    searchTitleValue: 'searchRecipe',
  },
  methods: {
    ...mapActions(['getSearchResult', 'getCategoryResult', 'toggleShowPopularValue', 'changeSearchTitleValue']),
    searchRecipe(value) {
      if (value) {
        this.toggleShowPopularValue(false);
        this.getSearchResult(value);
        this.changeSearchTitleValue(`${value} search result`);
      } else {
        this.toggleShowPopularValue(true);
      }
    }
  }
}
</script>

<style scoped>
  .header-navbar {
    background-color: transparent;
    padding: 20px 0;
  }
  .header-favorite {
    color: lightsalmon;
    font-size: 27px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .header-favorite:hover {
    transform: scale(1.2);
  }
  .header-navform >>> .form-control{
    background-color: rgba(255, 255, 255, 0.2);
    border: 0;
    color: white;
  }
  .header-navform >>> .form-control:focus {
    box-shadow: none;
  }
  .header-navform >>> .form-control::placeholder {
    color: rgba(255, 255, 255, 0.5)
  }
  .header-navform >>> .input-group-text {
    background-color: rgba(255, 255, 255, 0.2);
    border: 0;
    color: white;
  }
  .header-navform >>> .input-group-prepend {
    margin: 0;
  }
  .header-title {
    font-size: 22px;
    display: inline;
    color: white;
    font-weight: 100;
  }
</style>