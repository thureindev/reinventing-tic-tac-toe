<template>
    <button class="btn-custom" role="button">
        <!-- Primary text -->
        <span class="text">
            <slot name="primary-text"></slot>
        </span>
        <!-- Alternate text -->
        <span>
            <slot name="alt-text"></slot>
        </span>
    </button>
</template>

<style scoped>
.btn-custom {
    position: relative;
    overflow: hidden;
    /* border: 1px solid #18181a; */
    border-width: 0;
    border-radius: 4px;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
        rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #469ea1 0 -3px 0 inset;
    color: #18181a;
    display: inline-block;
    font-family: "JetBrains Mono", monospace;
    font-size: 16px;
    font-weight: bold;
    line-height: 15px;
    padding: 18px 18px 17px;
    text-decoration: none;
    cursor: pointer;
    background: rgb(140, 181, 192);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.btn-custom span:first-child {
    position: relative;
    transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
    z-index: 10;
}

.btn-custom span:last-child {
    color: white;
    display: block;
    position: absolute;
    bottom: 0;
    transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
    z-index: 100;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translateY(225%) translateX(-50%);
    height: 14px;
    line-height: 13px;
}

.btn-custom:after {
    content: "";
    position: absolute;
    bottom: -50%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(31, 41, 55);
    transform-origin: bottom center;
    transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
    transform: skewY(9.3deg) scaleY(0);
    z-index: 50;
}

.btn-custom:hover:after {
    transform-origin: bottom center;
    transform: skewY(9.3deg) scaleY(2);
}

.btn-custom:hover span:last-child {
    transform: translateX(-50%) translateY(-50%);
    opacity: 1;

    font-size: 12px;
    font-weight: 400;
    transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
}

.btn-custom:focus:after {
    transform-origin: bottom center;
    transform: skewY(9.3deg) scaleY(2);
}

.btn-custom:focus span:last-child {
    transform: translateX(-50%) translateY(-50%);
    opacity: 1;

    font-size: 12px;
    font-weight: 400;
    transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
}

.btn-custom:active {
    transform: translateY(2px);
}
</style>