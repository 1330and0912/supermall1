<template>

	<div id="tab-bar">
		<slot></slot>
	</div>
</template>
<script>
	export default {


	};
</script>
<style scope>
	#tab-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 49px;
		display: flex;
		background-color: #f6f6f6;
		box-shadow: 0 -1px 1px rgba(100, 120, 100, 0.13);
	}
</style>
