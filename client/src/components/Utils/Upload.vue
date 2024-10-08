<template>
    <div>
      <h1>Upload Material:</h1>
      <div class="dropbox" @click="triggerFileInput">
        <input ref="fileInput" type="file" multiple :name="uploadFieldName" 
               :disabled="isSaving"
               @change="filesChange($event.target.files)" 
               accept="image/*" class="input-file">
        <p v-if="isInitial && !fileCount">Drag your file(s) here to begin<br> or click to browse</p>
        <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        <p v-if="isSuccess">Upload Successful.</p>
      </div>
      
      <div v-if="fileCount > 0">
        <h3>Selected Files:</h3>
        <ul>
          <li v-for="(file, index) in selectedFiles" :key="index">{{ file.name }}</li>
        </ul>
      </div>
  
      <button @click="uploadFiles" :disabled="!selectedFiles.length || isSaving">Upload</button>
     
    </div>
  </template>
  
  <script>
  export default {
    
    data() {
      return {
        uploadFieldName: 'files',
        selectedFiles: [],
        fileCount: 0,
        isSaving: false,
        isInitial: true,
        isSuccess: false
      };
    },
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      filesChange(fileList) {
        this.selectedFiles = Array.from(fileList);
        this.fileCount = this.selectedFiles.length;
        this.isInitial = false;
        this.isSuccess = false;
      },
      async uploadFiles() {
        if (this.selectedFiles.length === 0) return;
  
        this.isSaving = true;
        const formData = new FormData();
        this.selectedFiles.forEach((file) => {
          formData.append(this.uploadFieldName, file);
        });
  
        try {
          // สมมติว่าคุณจะส่งไฟล์ไปที่ API
          // const response = await axios.post('/api/upload', formData);
  
          // Reset state after successful upload
          this.isSuccess = true;
          this.isSaving = false;
          this.fileCount = 0;
          this.selectedFiles = [];
          this.$refs.fileInput.value = "";  // Clear input field
        } catch (error) {
          console.error('Error uploading files', error);
          this.isSaving = false;
        }

        
      }
      
    }
  };
  </script>
  
  <style scoped>
  .dropbox {
    outline: 2px dashed grey;
    outline-offset: -10px;
    background: lemonchiffon;
    color: dimgray;
    padding: 10px;
    min-height: 200px;
    position: relative;
    cursor: pointer;
    text-align: center;
  }
  
  .input-file {
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: khaki;
  }
  
  .dropbox p {
    font-size: 1.2em;
    padding: 50px 0;
  }
  </style>
  