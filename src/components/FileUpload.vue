<template>
  <div class="dropbox">
    <input
      type="file"
      :name="name"
      accept=".jpg,.jpeg,.png"
      class="input-file"
      @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
    >
    <p v-if="files">
      Ustawiono zdjęcie!
    </p>
    <p v-else>
      Dodaj zdjęcie dzika<br><small style="font-size: .8rem">(opcjonalne)</small>
    </p>
  </div>
</template>

<script>
function loadMime(file) {
  const mimes = [
    {
      mime: 'image/jpeg',
      pattern: [0xFF, 0xD8, 0xFF],
      mask: [0xFF, 0xFF, 0xFF],
    },
    {
      mime: 'image/png',
      pattern: [0x89, 0x50, 0x4E, 0x47],
      mask: [0xFF, 0xFF, 0xFF, 0xFF],
    }
    // https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
  ];

  function check(bytes, mime) {
    for (let i = 0, l = mime.mask.length; i < l; ++i) {
      if ((bytes[i] & mime.mask[i]) - mime.pattern[i] !== 0) {
        return false;
      }
    }
    return true;
  }

  const blob = file.slice(0, 4); // read the first 4 bytes of the file

  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onloadend = function(e) {
      if (e.target.readyState === FileReader.DONE) {
        const bytes = new Uint8Array(e.target.result);

        for (let i = 0, l = mimes.length; i < l; ++i) {
          if (check(bytes, mimes[i])) return resolve(mimes[i].mime);
        }

        return resolve(null);
      }
    };
    reader.readAsArrayBuffer(blob);
  });
}

export default {
  props: {
    formdata: null,
    mimes: Array,
    files: null,
    name: String
  },
  methods: {
    async filesChange(fieldName, fileList) {
      // const formData = new FormData();
      // if (!fileList.length) return;
      // Array
      //   .from(Array(fileList.length).keys())
      //   .map((x) => {
      //     formData.append(fieldName, fileList[x], fileList[x].name);
      //   });

      const mimes = [];
      for (const file of fileList) {
        mimes.push(await loadMime(file));
      }

      this.isSet = true;

      // this.$emit('update:formdata', formData);
      this.$emit('update:mimes', mimes);
      this.$emit('update:files', fileList);
    }
  }
}
</script>

<style lang="scss" scoped>
.dropbox {
  // outline: 2px dashed white; /* the dash box */
  // outline-offset: -10px;
  background: $primary;
  color: white;
  padding: 15px;
  border-radius: 10px;
  height: 60px; /* minimum height */
  position: relative;
  cursor: pointer;
  font-family: $display-stack;
  @include flex-center(vh);
  position: relative;
  box-sizing: content-box;

  &:before {
    background: none;
    border: 2px dashed #fff;
    content: "";
    display: block;
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    border-radius: 8px;
    pointer-events: none;
  }
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 60px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: $primary;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
}
</style>
