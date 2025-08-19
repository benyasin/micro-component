<template>
  <div class="button-demo">
    <h1>Button 组件演示</h1>
    
    <!-- 类型（type） -->
    <div class="demo-section">
      <h2>按钮类型</h2>
      <div class="button-group">
        <Button text="Primary" type="primary" color="#1890ff" />
        <Button text="Secondary" type="secondary" />
        <Button text="Danger" type="danger" />
      </div>
    </div>

    <!-- 尺寸（size） -->
    <div class="demo-section">
      <h2>按钮尺寸</h2>
      <div class="button-group">
        <Button text="Large" size="large" color="#1890ff" />
        <Button text="Medium" size="medium" color="#1890ff" />
        <Button text="Small" size="small" color="#1890ff" />
      </div>
    </div>

    <!-- 颜色（color） -->
    <div class="demo-section">
      <h2>自定义颜色</h2>
      <div class="button-group">
        <Button text="Green" color="#52c41a" />
        <Button text="Orange" color="#fa8c16" />
        <Button text="Purple" color="#722ed1" />
        <Button text="Pink" color="#eb2f96" />
      </div>
    </div>

    <!-- 禁用（disabled） -->
    <div class="demo-section">
      <h2>禁用状态</h2>
      <div class="button-group">
        <Button text="Primary Disabled" type="primary" :disabled="true" />
        <Button text="Secondary Disabled" type="secondary" :disabled="true" />
        <Button text="Danger Disabled" type="danger" :disabled="true" />
      </div>
    </div>

    <!-- 插槽文本（slot） -->
    <div class="demo-section">
      <h2>插槽文本</h2>
      <div class="button-group">
        <Button color="#1890ff">Slot Button</Button>
      </div>
    </div>

    <!-- 点击事件（@click） -->
    <div class="demo-section">
      <h2>点击事件</h2>
      <Button
        text="Click Me"
        color="#1890ff"
        @click="handleClick"
      />
      <p v-if="clickCount > 0">按钮被点击了 {{ clickCount }} 次</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button/Button.vue'

const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
  console.log('Button clicked!', clickCount.value)
}
</script>

<style scoped>
.button-demo {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  margin-bottom: 16px;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.demo-section p {
  margin: 12px 0 0 0;
  color: #666;
  font-size: 14px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #1890ff;
}
</style>