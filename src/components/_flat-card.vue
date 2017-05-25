<template>
  <router-link :to="`/object/flat/view?id=${flat.id}`" class="similar__item" :class="[modifyClass]">
    <div class="similar__item__image"
         :style="`background: url(${flat.thumbUrl}) no-repeat center center / cover;`"></div>
    <div class="similar__item__caption" :class="[captionModify]">
      <div>
        <div class="similar__item__caption-category">
          <span v-if="agentLastObject">Последний объект</span>
        </div>
        <div class="similar__item__caption-price">
          <i class="fa fa-rub" aria-hidden="true"></i> {{ flat.price }}
        </div>
        <div class="similar__item__caption-primary">
          {{ flat.streetTitle }} {{ flat.buildingNum }},
          {{ flat.stage }}/{{ flat.buildingStg }} эт.
        </div>
      </div>

      <div>
        <div class="similar__item__caption-primary">
          {{ flat.roomAm }}-ком.
          {{ flat.area }} м<sup>2</sup>
        </div>
        <div class="similar__item__caption-primary">
          &nbsp;
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      flat: {
        type: Object,
        required: true
      },
      modifyClass: {
        type: String
      },
      captionModify: {
        type: String
      },
      agentLastObject: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss">
  .similar {

    &__wrapper {
      display: flex;
      justify-content: space-between;
    }

    &__item {
      display: flex;
      background-size: cover;
      position: relative;
      transition: transform, ease, .3s;
      overflow: hidden;

      &--home {
        width: 49.8%;
        height: 200px;
        margin-bottom: 2px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &--flat {
        width: 277px;
        height: 150px;
        margin-bottom: 10px;
        border-radius: 3px;
      }

      &:hover {
        .similar__item__image {
          transform: scale(1.1, 1.1);
        }
      }

      &__image {
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 300ms, ease;
        width: 100%;
        height: 100%;
      }

      &__caption {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 8px;
        background: linear-gradient(transparent 60%, rgba(0, 0, 0, 0.75) 100%);
        z-index: 1;

        &--flat {
          border-radius: 3px;
        }

        &-category {
          color: #fff;
          font-size: 13px;
          font-weight: 600;
        }

        &-primary {
          color: #fff;
          margin-top: 1ex;
          font-size: 13px;
          line-height: 1;
        }

        &-price {
          margin-top: 5px;
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          line-height: .9;

          span {
            font-size: 15px;
            display: block;
            padding-bottom: 10px;
          }
        }
      }
    }
  }
</style>
