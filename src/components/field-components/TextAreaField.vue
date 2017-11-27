<template>
    <validate :state="state" :custom="{'custom-validators': customValidators(field)}" :class="{'required-field': required }">

        <label :for="field.id">{{ field.label }}</label>

        <div class="form-group">
            <textarea v-model.lazy="localValue"
                      :class="['form-control', { 'is-invalid' : state && (state.$touched || state.$submitted) && state.$invalid}]"
                      :id="field.id"
                      :name="field.id"
                      :required="required"
                      :disabled="field.disabled"
                      :readonly="field.readOnly"
                      :aria-describedby="field.id + '-description'"></textarea>

            <small v-if="field.description" :id="field.id + '-description'" class="form-text text-muted">{{ field.description }}</small>

            <field-messages :name="field.id" show="$touched || $submitted || $dirty" class="form-control-feedback">
                <div class="invalid-message" slot="required">{{ field.label }} is required</div>
                <div class="invalid-message" slot="custom-validators">{{ customMessage }}</div>
            </field-messages>
        </div>

    </validate>
</template>

<script>
  export default {
    name: 'text-area-field',
    props: ['value', 'field', 'required', 'state', 'validate'],
    data () {
      return {
        localValue: this.value,
        customMessage: null
      }
    },
    methods: {
      customValidators (field) {
        if (field.validators && field.validators.length > 0) {
          const result = this.validate(field)
          this.customMessage = result.message
          return result.valid
        }
        return true
      }
    },
    watch: {
      localValue (value) {
        this.$emit('input', value)
      }
    }
  }
</script>