<template>

<svg :class="svgClass" aria-hidden="true" v-on="$listeners">

<use :xlink:href="iconName"/>

</svg>

</template>

<script>

export default {

name: 'SvgIcon',

props: {

iconClass: {

type: String,

required: true

},

className: {//按需加入，传过来可以给他定义属于自己的class名字

type: String,

default: ''

}

},

computed: {

iconName() {

return `#icon-${this.iconClass}`

},

svgClass() {

if (this.className) {

return 'svg-icon ' + this.className

} else {

return 'svg-icon'

}

}

},

mounted(){},

methods:{},

}

</script>

<style scoped>

.svg-icon {

/* width: 1em;//svg的大小，根据需要改变

height: 1em; */

width: 100%;

height: 4.375rem;

vertical-align: -0.15em;

fill: currentColor;

overflow: auto;

}

</style>
