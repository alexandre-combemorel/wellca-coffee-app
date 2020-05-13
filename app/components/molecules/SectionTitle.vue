<template>
  <FlexboxLayout class="section-title">
    <Title :content="content" class="section-title__title"/>
    <Label class="section-title__barre"/>
  </FlexboxLayout>
</template>

<script>
import Title from '../atoms/Title';
export default {
  props: ['content'],
  components: {
    Title
  }
}
</script>

<style scoped lang="scss">
.section-title {
  &__barre {
    flex-grow: 1;
    margin-bottom: 5;
    border-bottom-width: 1;
    border-bottom-color: white;
    transform: translateX(20);
  }
}
</style>