<template>
  <section class="sale-detail">
    <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="商品价格" required prop="price">
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" required prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" required prop="unit">
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" required prop="tags">
        <a-upload
          action=" https://mallapi.duyiedu.com/upload/images?appkey=youkeOO1_1624003094702"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item class="next-btn" :wrapperCol="{ span: 24 }">
        <a-button @click="prev">
          上一步
        </a-button>
        <a-button type="primary" @click="next">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </section>
</template>
<script>
/**
 * 将图片转换成base64
 */
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 13 },
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  props: ['form'],
  methods: {
    next() {
      this.$emit('next', this.form);
    },
    prev() {
      console.log('上一步');
      this.$emit('prev');
    },
    handleCancel() {
      this.previewVisible = false;
    },
    /** 点击文件链接或预览图标时的回调 */
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    /** 上传文件 */
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.imgs.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.imgs = this.form.imgs.filter((ele) => ele !== url);
      }
      this.fileList = fileList;
    },
  },
};
</script>
