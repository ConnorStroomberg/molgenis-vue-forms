<template>
    <validate :state="state" :custom="{'custom-validators': field.validators}" :class="{'required-field': required }">

        <label :for="field.id">{{ field.label }}</label>

        <div class="form-group">
            <label class="custom-file">
                <input type="file"
                       @change="updateValue"
                       :class="['form-control form-control-lg', 'custom-file-input', { 'is-invalid' : state && (state.$touched || state.$submitted) && state.$invalid}]"
                       :id="field.id"
                       :name="field.id"
                       :required="required"
                       :disabled="field.disabled"
                       :readonly="field.readOnly"
                       :aria-describedby="field.id + '-description'">

                <span class="custom-file-control"></span>
            </label>

            <small v-if="field.description" :id="field.id + '-description'" class="form-text text-muted">{{ field.description }}</small>

            <field-messages :name="field.id" show="$touched || $submitted" class="form-control-feedback">
                <div class="invalid-message" slot="required">{{ field.label }} is required</div>
                <div class="invalid-message" slot="custom-validators">Your custom validator says no</div>
            </field-messages>
        </div>

    </validate>
</template>

<script>
  export default {
    name: 'file-field',
    props: ['value', 'field', 'required', 'state'],
    data () {
      return {
        localValue: this.value
      }
    },
    methods: {
      updateValue (e) {
        // TODO Is this how we store files?
        this.localValue = e.target.files || e.dataTransfer.files;
      }
    },
    watch: {
      localValue (value) {
        this.$emit('input', value)
      }
    }
  }
</script>