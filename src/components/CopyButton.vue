<template>
  <div class="copy-button" @click.prevent="copyToClipboard">
    <img src="/img/copybutton.png" width=25 />
     <div class="copy-toast" :class="{'show': showToast}">
      Copied
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      showToast: false
    }
  },
  methods: {
    copyToClipboard() {
      const el = document.createElement("textarea");
      el.value = this.value;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    },
  }
};
</script>

<style>
</style>