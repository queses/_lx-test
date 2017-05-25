<template>
  <div class="contact_form__modal">
    <h4 class="contact_form__modal__title" :class="{ 'm-t-0': !showInfo }">Связаться с агентом</h4>
    <h3 class="contact_form__modal__phone" v-if="showInfo">{{ fPhone }} <span>{{ name.split(' ')[0] }}</span></h3>
    <p v-if="showInfo">или оставьте сообщение, чтобы специалист связался с вами:</p>
    <form @submit.prevent="onSubmit('modalAgent')" data-vv-scope="modalAgent">
      <div class="form-group"
           :class="{ 'has-error': errors.has('modalAgent.name'), 'has-feedback': errors.has('modalAgent.name') }">
        <input type="text" name="name" v-validate="'required'"
               class="form-control b-c-t input_underline" placeholder="Ваше имя">
        <span class="glyphicon glyphicon-remove form-control-feedback"
              v-if="errors.has('modalAgent.name')"></span>
      </div>

      <div class="form-group"
           :class="{ 'has-error': errors.has('modalAgent.phone'), 'has-feedback': errors.has('modalAgent.phone') }">
        <input type="text" class="form-control b-c-t input_underline" v-validate="'required'"
               name="phone" placeholder="Телефон">
        <span class="glyphicon glyphicon-remove form-control-feedback"
              v-if="errors.has('modalAgent.phone')"></span>
      </div>

      <div class="form-group">
        <textarea rows="5"
                  class="form-control b-c-t input_underline"
                  placeholder="Меня интересует Ваше предложение, и я хотел бы запланировать просмотр. Пожалуйста, дайте мне знать, когда это будет возможно?"></textarea>
      </div>

      <div class="form-group text-center">
        <button type="submit" class="btn btn-warning">Связаться</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      phone: {
        type: String,
        default: '+7 (888) 888-88-88'
      },
      name: {
        type: String,
        default: 'Вася'
      },
      showInfo: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      fPhone () {
        return this.phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3-$4-$5')
      }
    },
    methods: {
      onSubmit (scope) {
        this.$validator.validateAll(scope).then(() => {
          console.log(scope + 'Submit')
        }).catch(() => {
          console.log(scope + 'Errors')
        })
      }
    }
  }
</script>

<style lang="scss">
  .contact_form {
    &__modal {
      padding: 0 30px 10px 30px;

      input, textarea {
        border-bottom: 1px solid #828282;
      }

      p {
        text-align: left;
        color: #000;
      }

      &__title {
        margin-top: 22px;
        font-weight: normal;
        text-align: center;
      }

      &__phone {
        font-weight: normal;
        text-align: left;
        margin-top: 20px;
        margin-bottom: 10px;

        span {
          font-size: 22px;
        }
      }
    }
  }
</style>
