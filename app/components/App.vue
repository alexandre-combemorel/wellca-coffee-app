<template>
    <Page>
        <ActionBar title="Welcome to Wellca-Coffee-Vue!"/>
        <GridLayout columns="auto, auto" rows="*, auto">
            <Label class="fas" :text="icon" col="0" row="0"/>
            <Label class="message" :text="msg" col="1" row="0"/>

            <Navigation row="1" colspan="2"/>
        </GridLayout>
    </Page>
</template>

<script>
  import Navigation from './Navigation';
  export default {
    components: {
      Navigation
    },
    data() {
      return {
        msg: 'Hello World!',
        icon: String.fromCharCode('0xf015')
      }
    }
  }
</script>

<style scoped lang="scss">
Page {
  background: #242424;
}
ActionBar {
    background-color: #bdbdbd;
    color: #ffffff;
}

.message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
}
</style>
