<template>
  <span class="ms-popup">
    <button
      :class="['ms-popup__open', (selected.length ? 'ms-popup__open_selected' : '')]"
      :meta-selected="!!isSelected"
      @click="activate">{{ title }} <span class="ms-popup__badge badge" v-if="countSelected" v-text="countSelected"></span></button>
    <div class="ms-popup__popup" v-if="toShowPopup" v-on-clickaway="onPopupClickaway">
      <section class="ms-popup__content">
        <div class="ms-popup__input">
           <slot name="input"></slot>
        </div>
        <ul class="ms-popup-list" v-if="listElems">
          <li v-for="item of selected" class="ms-popup-list__item">
            {{ getLabel(item) }}
            <i class="fa fa-times ms-popup-list__remove" aria-hidden="true"
               @keydown.enter.prevent="removeElement(item)"
               @mousedown.prevent="removeElement(item)"
            ></i>
          </li>
        </ul>
      </section>
    </div>
  </span>
</template>

<script>
  import VMultiselectInner from '@assets/vendor/vue-multiselect/MultiselectInner'
  import {mixin as clickaway} from 'vue-clickaway'

  export default {
    components: {
      VMultiselectInner
    },
    mixins: [clickaway],
    props: {
      title: String,
      label: {
        type: String,
        default: 'title'
      },
      trackBy: {
        type: String,
        default: 'id'
      },
      selected: Array,
      buttonDisabled: {
        type: Boolean,
        default: false
      },
      listElems: {
        type: Boolean,
        default: true
      },
      customLabel: String
      // placeholder: {
      //   type: String,
      //   default: 'Начните вводить'
      // }
    },
    data () {
      return {
        toShowPopup: false,
        isSelected: false,
        isChildClosed: false,
        selectedOptions: this.value
      }
    },
    computed: {
      countSelected () {
        return this.selected.length ? this.selected.length : 0
      }
    },
    methods: {
      removeElement (option) {
        this.$emit('removed', { elem: option[this.trackBy], trackBy: this.trackBy })
      },
      activate (e, el) {
        this.toShowPopup = !this.toShowPopup
        if (this.toShowPopup) {
          // Ждем немного, пока DOM отрисует элемент
          let that = this
          setTimeout(function () {
            // that.$refs.search.activate()
            // that = undefined
            that.$emit('activated')
          }, 10)
        }
      },
      deactivate (e, el) {
        this.toShowPopup = false
      },
      onPopupClickaway () {
        // if (this.isChildClosed) {
        //   this.isChildClosed = false
        this.toShowPopup = false
        // }
      },
      getLabel (option) {
        if (this.customLabel) {
          return this.$parent[this.customLabel](option)
        }
        // else
        return option[this.label]
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/variables";

  .ms-popup {
    display: inline-block !important;
  }

  .ms-popup__open {
    display: inline-block;
    min-height: 40px;
    padding: 0 30px;
    border-radius: 5px;
    border: 1px solid #E8E8E8;
    background: #fff;
    margin: 0 2px;
    color: #35495E;
  }

  .ms-popup-list__item {
    display: block !important;
    color: #000;
  }

  .ms-popup__open_selected {
    border-color: darken($lux-green, 10%);
  }

  .ms-popup__popup {
    position: absolute;
    width: 20em;
    margin-top: 1ex;
    margin-left: 2px;
    border-radius: 5px;
    box-shadow: 1px 5px 12px 0px;
    background-color: white;
    z-index: 3;
  }

  .ms-popup__content {
    padding: 1.5ex;
  }

  .ms-popup__input {
    margin-bottom: 1ex;
  }

  .ms-popup-list {
    list-style-type: none;
    padding-left: 1ex;
    padding-right: 1ex;
  }

  .ms-popup-list__item {
    display: block;
    padding-top: 1ex;
    padding-bottom: 1ex;
  }

  .ms-popup-list__remove {
    right: 0;
    position: absolute;
    cursor: pointer;
    margin-left: 7px;
    margin-right: 2ex;
    font-weight: 100;
    width: 20px;
    line-height: 20px;
    text-align: center;
    transition: all 0.2s ease;
    border-radius: 5px;
    color: rgb(110, 110, 110);
  }

  .ms-popup-list__remove:focus,
  .ms-popup-list__remove:hover {
    color: red;
  }

  .ms-popup-list__remove:focus:after,
  .ms-popup-list__remove:hover:after {
  }

  .ms-popup__badge {
    background-color: darken($lux-green, 10%) !important;
    // background-color: darken($lux-blue, 10%) !important;
  }
</style>
