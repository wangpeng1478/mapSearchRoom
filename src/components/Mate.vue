<template>
    <div id="iMate">
        <div class="individuality_mate">
            <div class="mate_icon">
                <span class="iconfont icon-chuzuche"></span>
            </div>
            <div>

            </div>
            <div>
                <p></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'iMate',
    props: {
      msg: String
    },
}
</script>

<style scoped>


.individuality_mate{
    position: fixed;
    left: 5vw;
    right: auto;
    bottom: 5vw;
    width: 92vw;
	height: 36vw;
	background-color: #ffffff;
	box-shadow: 0vw 0vw 1vw 0vw 
		rgba(0, 11, 10, 0.2);
	border-radius: 1vw;
}
</style>
