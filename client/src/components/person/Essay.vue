<template>
    <div class="write">
        <!-- 图片上传 -->
        <div class="write-pic">
            <Input readonly
                :value="picUrl" 
                placeholder="图片链接" />
            <Upload 
                action
                @click.native="selectPic"
                :before-upload="beforeUpload"    
            >
                <Button type="error">上传图片</Button>
            </Upload>
        </div>
        <!-- 标题 -->
        <div class="write-title">
            <Input
            v-model="articleTitle"
                placeholder="请输入博客标题" />
        </div>
        <div class="quillEditor">
            <quillEditor 
                v-model="articleContent"
                ref="myQuill" 
                :options="editorOption"
            ></quillEditor>
        </div>
        <!-- 按钮 -->

        <div class="write-btn">
            <Button type="primary" @click.native="handleWrite(1)" danger>点击提交</Button>
            <Button type="primary" @click.native="handleWrite(0)">保存草稿</Button>
            <Button type="error" v-if="articleId" @click.native="handleReEdit">取消编辑</Button>
        </div>
    </div>
</template>
<script>

// 引入富文本编辑组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'

import {upBlogPic, write} from '@/axios/index.js'

export default {
    name: 'community',
    data(){
        return {
            picUrl: '',
            articleId: '',
            articleTitle: '',
            articleContent: '',
            editorOption: {
                // theme: 'snow'// 这是默认的主题
                placeholder: '请输入主题内容',
                modules:{
                    toolbar:[
                        ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
                        ['blockquote', 'code-block'],  //引用，代码块
                        [{ 'header': 1 }, { 'header': 2 }],  // 标题，键值对的形式；1、2表示字体大小
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],  //列表
                        [{ 'script': 'sub'}, { 'script': 'super' }], // 上下标
                        [{ 'indent': '-1'}, { 'indent': '+1' }],  // 缩进
                        // [{ 'direction': 'rtl' }],    // 文本方向
                        [{ 'color': [] }, { 'background': [] }],  // 字体颜色，字体背景颜色
                        [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'align': [] }], //对齐方式
                    ],
                }
            }
        }
    },
    created(){
        let articleEdit  = sessionStorage.getItem('editArticle')
        
        if(articleEdit){
            articleEdit = JSON.parse(articleEdit)
            this.articleId = articleEdit.articleId
            this.articleContent = articleEdit.articleContent
            this.articleTitle = articleEdit.articleTitle
        }  

    },
    beforeDestroy(){
        // 当组件销毁时 删除
        sessionStorage.removeItem('editArticle')
    },
    methods:{
        // 发送请求
        handleWrite(articleDraft){
            const { userId, articleTitle, articleId, articleContent, $Message, $Modal} = this

            // 内容为空 提示用户
            if(!articleTitle) return $Message.info('请输入标题')
            if(!articleContent) return $Message.info('内容不能为空')

            // 否则发送请求
            write({
                articleTitle,
                articleContent,
                articleDraft,
                articleId,
                userId
            }).then(res =>{

                let content = '提交成功'

                // 失败
                if(res.data.code === 500) content = '提交失败，请稍后再试'

                $Modal.warning({
                    title: '提示',
                    content,
                    onOk: () =>{

                        if(content === '提交成功'){
                            // 成功
                            this.articleTitle = ''
                            this.articleContent = ''
                            this.picUrl = ''
                        }
                    }
                })
            })
        },
        // 取消编辑
        handleReEdit(){
            this.articleId = ''
            this.articleContent = ''
            this.articleTitle = ''
            this.picUrl = ''
        },
        // 选择图片的时候 需要选点击上传的位置
        // 此时是会触发 两次 但是无关紧要
        selectPic(e){
            // 没有点击文本框
            if(!this.quill.getSelection()){
                this.$Modal.warning({
                    title: '提示',
                    content: '用户需要点击图片放置的位置，才能准确上传图片！'
                })
                // 阻止弹窗
                e.preventDefault()
            }
        },
        // 上传图片
        beforeUpload(blogPic){
            

            if(this.quill.getSelection()){}

            const formData = new FormData()

            formData.append('blogPic', blogPic)

            // 发送请求
            upBlogPic(formData).then(res=>{

                const {code, realName, blogPicUrl} = res.data

                // 失败
                if(code === 500){
                    return this.$Message.error('上传失败，请稍后再试')
                }
                
                // 关闭 modal
                this.$Message.success('上传成功')
                this.picUrl = realName + blogPicUrl
                this.setBlogPic(blogPicUrl)

            })

            return false
        },
        // 上传图片成功之后 插入文本中
        setBlogPic(url){

            let quill = this.quill

            // 插入图片  res.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', url)
            // 调整光标到最后
            quill.setSelection(length + 1)

        }
    },

    mounted(){
        this.$nextTick(() =>{
            this.quill = this.$refs.myQuill.quill
        })
    },

    components:{
        quillEditor
    },
    props:{
        userId: {
            type: String,
            default: ''
        }
    }
    

}
</script>
<style lang="less" scoped>
.write{
    padding: 20px;
    > div{
        margin: 10px;
    }
    .write-pic{
        display: flex;
    }
    .write-btn{
        button{
            margin-right: 10px;
        }
    }
}
</style>