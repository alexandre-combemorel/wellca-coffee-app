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
@import '~/assets/css/variables.scss';
.section-title {
  &__title {
    margin-left: $size-m;
  }
  &__barre {
    flex-grow: 1;
    margin-bottom: $size-xs+1;
    margin-left: $size-m;
    border-bottom-width: 1;
    border-bottom-color: $tertiary-color;
  }
}
</style>