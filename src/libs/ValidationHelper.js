class ValidationHelper {
  constructor(_this, form) {
    this.$f7 = _this.$f7;
    this.$$ = _this.$$;
    this.form = this.$$(form);
  }

  setMessage(inputEl, validationMessage) {
    const { $$ } = this;

    const $inputEl = $$(inputEl);

    if (!$inputEl.length) {
      return;
    }
    const $itemInputEl = $inputEl.parents('.item-input');

    let $errorEl = $inputEl.nextAll('.item-input-error-message');
    if (validationMessage) {
      if ($errorEl.length === 0) {
        $errorEl = $$('<div class="item-input-error-message"></div>');
        $errorEl.insertAfter($inputEl);
      }
      $errorEl.text(validationMessage);
    }
    if ($errorEl.length > 0) {
      $itemInputEl.addClass('item-input-with-error-message');
    }
    $itemInputEl.addClass('item-input-invalid');
    $inputEl.addClass('input-invalid');
  }

  setAllMessages(errors) {
    errors.forEach(err => {
      const { path, message } = err;

      console.log('setAllMessages.error: ', `${path}: ${message}`);

      const field = this.form.find(`input[name="${path}"]`);

      this.setMessage(field, message);
    });
  }

  validation() {
    const { $f7, $$, form } = this;

    $f7.input.validateInputs(form);

    // this.$$(form)
    //   .find('input, textarea, select')
    //   .each((index, inputEl) => {
    //     $f7.input.validate(inputEl);
    //   });

    return !$$(form)
      .find('input')
      .filter((index, el) => $$(el).hasClass('input-invalid')).length;
  }
}

export default ValidationHelper;
