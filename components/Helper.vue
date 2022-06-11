<template>
  <div></div>
</template>

<script>
export default {
  name: "Helper",
  methods: {
    datetimeShow: async function (date, lang = "TH", type = "datetime") {
      var text_lang = lang == "TH" ? "th-TH" : "en-EN";
      var newDate = new Date(date);
      if (type == "datetime") {
        return await newDate.toLocaleDateString(text_lang, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
      } else {
        return await newDate.toLocaleDateString(text_lang, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    },
    dataURLtoFile: function (dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
    checkSizeFile: async function (file, size) {
      if (file.size > size * 1024 * 1024) {
        return await false;
      } else {
        return await true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>