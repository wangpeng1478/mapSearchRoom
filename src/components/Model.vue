<template>
    <div class="model-wrap">
        <div class="model">
            <p class="context">您当前所在定位城市为[{{content}}]，是否切换至当前城市</p>
            <div class="model-btn">
                <p class="cancel" @click="handleModel(false)">取消</p>
                <p class="confirm" @click="handleModel(true)">确定</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        props:['content'],
        methods: {
            handleModel(res) {
                this.$emit('handelModel',res)
            },
        }
    }
</script>
<style scoped>
    .model-wrap {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .model {
        width: 88vw;
        height: 45vw;
        overflow: hidden;
        background: #fff;
        border-radius: 3vw;
        margin: auto;
        z-index: 20;
    }

    .model .context {
        height: 30vw;
        box-sizing: border-box;
        padding: 10vw 10vw 8vw;
        text-align: center;
        font-size: 4.5vw;
        box-sizing: border-box;
        border-bottom: 1px solid #e3e3e3;
    }

    .model .model-btn p {
        width: 44vw;
        float: left;
        text-align: center;
        height: 15vw;
        line-height: 15vw;
        font-size: 4vw;
    }

    .model .model-btn .cancel {
        color: #333;
        box-sizing: border-box;
        border-right: 1px solid #e3e3e3;
    }

    .model .model-btn .confirm {
        color: #ff9900;
    }
</style>