<template>
  <div class="button-demo">
    <h1>Button 组件演示</h1>
    
    <!-- 基础按钮 -->
    <div class="demo-section">
      <h2>基础按钮</h2>
      <div class="button-group">
        <Button text="Default Button" />
        <Button text="Primary Button" color="#1890ff" />
        <Button text="Success Button" color="#52c41a" />
        <Button text="Warning Button" color="#faad14" />
        <Button text="Danger Button" color="#ff4d4f" />
      </div>
    </div>

    <!-- 按钮尺寸 -->
    <div class="demo-section">
      <h2>按钮尺寸</h2>
      <div class="button-group">
        <Button text="Large" size="large" color="#1890ff" />
        <Button text="Medium" size="medium" color="#1890ff" />
        <Button text="Small" size="small" color="#1890ff" />
      </div>
    </div>

    <!-- 自定义颜色 -->
    <div class="demo-section">
      <h2>自定义颜色</h2>
      <div class="button-group">
        <Button text="Green" color="#52c41a" />
        <Button text="Orange" color="#fa8c16" />
        <Button text="Purple" color="#722ed1" />
        <Button text="Pink" color="#eb2f96" />
      </div>
    </div>

    <!-- 点击事件 -->
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
import Button from '../../src/components/Button/Button.vue'

const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
  console.log('Button clicked!', clickCount.value)
}
</script>

<style scoped>
.button-demo {
  padding: 20px;
  max-width: 800px;
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