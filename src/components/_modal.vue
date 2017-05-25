<template>
  <transition name="vodal-fade">
    <div
      v-show="show"
      tabindex="-1"
      :style="style"
      :class="['vodal', className]"
      @keyup.esc="onEsc"
    >
      <div class="vodal-mask" v-if="mask" @click="$emit('close')"></div>
      <transition :name="`vodal-${animation}`">
        <div class="vodal-dialog" v-show="show" :style="dialogStyle">
          <span class="vodal-close" v-if="closeButton" @click="$emit('close')"></span>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'vodal',
    props: {
      show: {
        type: Boolean,
        required: true
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 240
      },
      duration: {
        type: Number,
        default: 300
      },
      measure: {
        type: String,
        default: 'px'
      },
      animation: {
        type: String,
        default: 'zoom'
      },
      mask: {
        type: Boolean,
        default: true
      },
      closeButton: {
        type: Boolean,
        default: true
      },
      className: {
        type: String,
        default: ''
      },
      isGallery: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      style () {
        return {
          animationDuration: `${this.duration}ms`,
          webkitAnimationDuration: `${this.duration}ms`
        }
      },
      dialogStyle () {
        return {
          width: `${this.width + this.measure}`,
          height: `${this.height + this.measure}`,
          ...this.style
        }
      }
    },
    methods: {
      onEsc () {
        this.show && this.$emit('close')
      }
    },
    watch: {
      show (show) {
        show && this.$nextTick(() => {
          this.$el.focus()
        })

        if (show) {
          document.documentElement.className += ' ovf-hidden'
        } else {
          document.documentElement.removeAttribute('class')
        }
      }
    }
  }
</script>

<style lang="scss">
  .ovf-hidden {
    overflow: hidden;
    margin-right: 17px;
  }

  .vodal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;

    &-mask {
      @extend .vodal;
      position: absolute;
      background: rgba(0, 0, 0, .3);
    }

    &-dialog {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 101;
      /*padding: 15px;*/
      background: #fff;
      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    }

    &-close {
      position: absolute;
      cursor: pointer;
      z-index: 10;
      top: 23px;
      right: 16px;
      width: 16px;
      height: 16px;

      &:before,
      &:after {
        position: absolute;
        content: '';
        height: 2px;
        width: 100%;
        top: 50%;
        left: 0;
        margin-top: -1px;
        background: #999;
        transition: background .2s;

        &:hover {
          background: #333;
        }
      }

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }
  }

  /* -- fade -- */
  @-webkit-keyframes vodal-fade-enter {
    from {
      opacity: 0;
    }
  }

  @keyframes vodal-fade-enter {
    from {
      opacity: 0;
    }
  }

  .vodal-fade-enter-active {
    -webkit-animation: vodal-fade-enter both ease-in;
    animation: vodal-fade-enter both ease-in;
  }

  @-webkit-keyframes vodal-fade-leave {
    to {
      opacity: 0
    }
  }

  @keyframes vodal-fade-leave {
    to {
      opacity: 0
    }
  }

  .vodal-fade-leave-active {
    -webkit-animation: vodal-fade-leave both ease-out;
    animation: vodal-fade-leave both ease-out;
  }
</style>
