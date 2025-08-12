<template>
  <div
    class="relative inline-flex items-center h-full"
    @mouseenter="show"
    @mouseleave="hide"
  >
    <slot
      name="reference"
      :close="hide"
      :show="show"
      :toggle="toggle"
      :visible="visible"
    />
    <div
      class="popover absolute z-1000 opacity-0 invisible"
      :class="{ visible, [direction]: true }"
      :style="{
        left,
        right,
        top: `calc(100% - ${padding})`,
        paddingTop: padding
      }"
    >
      <div
        v-if="visible"
        class="popover-main rounded-12px overflow-y-auto light:shadow light:border-1px light:border-line light:bg-bg dark:bg-cardBg"
        :class="{ 'shadow border-1px border-line': shadow }"
        :style="{ borderRadius: rounded }"
      >
        <slot :close="hide" :show="show" :toggle="toggle" :visible="visible" />
      </div>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    left?: string;
    right?: string;
    padding?: string;
    rounded?: string;
    visible?: boolean;
    direction?: "left" | "right";
    shadow?: boolean;
  }>(),
  {
    visible: undefined,
    direction: "left",
    padding: "0px"
  }
);
const emit = defineEmits<{
  (event: "show"): void;
  (event: "hide"): void;
  (event: "update:visible", visible: boolean): void;
}>();

const visible = ref(props.visible ?? false);

watchEffect(() => {
  visible.value = props.visible ?? visible.value;
});

function show() {
  if (props.visible === undefined) {
    visible.value = true;
    emit("show");
  }
  emit("update:visible", true);
}

function hide() {
  if (props.visible === undefined) {
    visible.value = false;
    emit("hide");
  }
  emit("update:visible", false);
}

function toggle() {
  visible.value ? hide() : show();
}

onUnmounted(() => {
  hide();
});
</script>

<script lang="ts">
export default {
  inheritAttrs: false
};
</script>

<style scoped lang="less">
.popover {
  transform: perspective(1px) scale(0.75); // perspective 解决文案跳动问题
  transform-origin: 50% 0;
  transition: transform 0.2s cubic-bezier(0.5, 0, 0, 1.25),
    opacity 0.15s ease-out;

  &.visible {
    @apply opacity-100 perspect-1px scale-1 visible;
    transform: perspective(1px) scale(1);
    box-shadow: 0 6px 18px 0 #92a0ab33;
    border-radius: 12px;
  }
  &.left {
    left: 8px;
  }
  &.right {
    right: 0;
  }

  .popover-main {
    max-height: calc(100vh - 175px);
  }
}

body.black {
  .popover {
    &.visible {
      box-shadow: 0 6px 18px 0 #00000066;

    }
  }
}
</style>
