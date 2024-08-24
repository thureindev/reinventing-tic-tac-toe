<template>
    <button class="btn-custom" role="button">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn-custom {
    align-items: center;
    appearance: none;
    /* background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%); */
    background-color: rgb(238, 157, 37);
    background-image: radial-gradient(100% 100% at 100% 0, rgb(238, 157, 37) 0, rgb(255, 138, 95) 100%);
    border: 0;
    border-radius: 6px;
    box-shadow: rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
    height: 48px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 21px;
}

.btn-custom:focus {
    /* box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset; */
    box-shadow: rgb(255, 208, 180) 0 0 0 1.5px inset, rgba(255, 179, 0, 0.4) 0 4px 8px, rgba(255, 162, 0, 0.3) 0 7px 13px -3px, rgb(255, 128, 81) 0 -3px 0 inset;
}

.btn-custom:hover {
    box-shadow: rgb(255, 212, 119) 0 4px 8px, rgba(153, 97, 0, 0.3) 0 7px 13px -3px, rgb(255, 128, 81) 0 -3px 0 inset;
    transform: translateY(-2px);
}

.btn-custom:active {
    /* box-shadow: #3c4fe0 0 3px 7px inset; */
    box-shadow: rgb(255, 208, 180) 0 3px 7px inset;
    transform: translateY(2px);
}
</style>