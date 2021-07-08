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
          :action=" 'https://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.user.appkey"
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
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
    prev() {
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
      console.log(file.response, 'response');
      console.log(file, 'file');
      const url = file.response ? file.response.data.url : file.url;
      if (file.status === 'done') {
        console.log(file.response.data, '图片信息');
        this.form.images.push(url);
      } else if (file.status === 'removed') {
        // const { url } = file.response.data ? file.response.data : file;
        this.form.images = this.form.images.filter((ele) => ele !== url);
      }
      this.fileList = fileList;
    },
  },
  /**
   *  当为编辑产品信息，回填数据
   */
  created() {
    console.log(this.form.images.length, '是否为编辑');
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((ele, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: ele,
      }));
    }
  },
};
</script>
