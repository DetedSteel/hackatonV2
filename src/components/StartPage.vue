<template>
  <div>
    <section class="logist_page">
      <div class="title_page">
        <h1 class="title_txt_page">
          перевозка
          <p class="inner_txt_title">грузов</p>
          любой сложности в короткие сроки
        </h1>
        <router-link to="/roads" class="btn_page"><p>найти пути</p></router-link>
      </div>
      <div class="img_page">
        <img src="../img/mainPage/landing1.png" alt="" class="img_page_delivery" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "StartPage",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
