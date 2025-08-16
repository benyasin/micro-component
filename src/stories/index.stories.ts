import { defineComponent } from 'vue';

const IndexWelcome = defineComponent({
  name: 'IndexWelcome',
  template: '<div style="padding:24px">Welcome to Micro Components</div>',
});

export default {
  title: 'Index',
};

export const Default = () => ({
  template: '<div style="padding:24px">Welcome to Micro Components</div>',
});
