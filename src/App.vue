<template>
  <header class="logist_header">
    <div class="logo_header">
      <img
        class="img_logo_header"
        src="./img/mainPage/delivery-svgrepo-com.svg"
        alt=""
      />
      <router-link to="/" class="logo_title">turbo</router-link>
    </div>
    <div class="profile_header">
      <router-link to="/">
        <div class="circle_profile">
          <img src="./img/mainPage/user-03-svgrepo-com(1).svg" alt="" />
        </div>
      </router-link>
    </div>
  </header>
  <router-view />
  <footer class="logist_footer">
    <div class="Logist_footer_block1">
      <img
        src="./img/mainPage/call-svgrepo-com(1).svg"
        alt=""
        class="block1_img"
      />
      <h2 class="block1_title">call</h2>
      <p class="block1_txt">+7(999)-122-12-12</p>
    </div>
    <div class="Logist_footer_block2">
      <img
        src="./img/mainPage/mail-svgrepo-com(1).svg"
        alt=""
        class="block2_img"
      />
      <h2 class="block2_title">mail</h2>
      <p class="block2_txt">example@mail.ru</p>
    </div>
    <div class="Logist_footer_block3">
      <img
        src="./img/mainPage/telegram-svgrepo-com(4).svg"
        alt=""
        class="block3_img"
      />
      <h2 class="block3_title">social network</h2>
      <p class="block3_txt">TELEGRAM @GRUZPEREVOS</p>
    </div>
    <div class="Logist_footer_block4">
      <img
        src="./img/mainPage/maps-svgrepo-com(1).svg"
        alt=""
        class="block4_img"
      />
      <h2 class="block4_title">find us</h2>
      <p class="block4_txt">Chistyy Pereulok, 42, Moscow, Russia 177452</p>
    </div>
  </footer>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.logist_header {
  width: 100%;
  height: 100px;
  background: #212529;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}
.circle_profile {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: white;
}
.logo_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.img_logo_header {
  border-right: 2px white solid;
  padding-right: 20px;
}
.logo_title {
  color: #ff5f40;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "Kanit", sans-serif;
  font-size: 32px;
  font-weight: 400;
}
.logist_page {
  display: flex;
  padding: 20px 50px;
}
.logo_title {
  color: #ff5f40;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "Kanit", sans-serif;
  font-size: 32px;
  font-weight: 400;
}
.logist_page {
  display: flex;
  padding: 20px 50px;
}
.title_page {
  font-family: "Montserrat", sans-serif;
  font-size: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: uppercase;
  gap: 30px;
}
.inner_txt_title {
  color: #ff5f40;
  font-size: 64px;
  text-transform: uppercase;
}
.img_page_delivery {
  height: 600px;
}

.btn_page {
  width: 250px;
  height: 70px;
  background-color: #ff5f40;
  border: none;
  border-radius: 50px;
  font-family: "Montserrat", sans-serif;
  font-size: 26px;
  text-transform: uppercase;
  color: white !important;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn_page:hover {
  background-color: orange;
  border: none;
  border-radius: 50px;
  font-family: "Montserrat", sans-serif;
  font-size: 26px;
  text-transform: uppercase;
  color: white;
}
.logist_footer {
  width: 100%;
  height: 300px;
  background-color: #212529;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  align-items: center;
  color: white;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
}
.Logist_footer_block1 {
  width: 25%;
  border-right: 2px white solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}
.Logist_footer_block2 {
  width: 25%;
  border-right: 2px white solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}
.Logist_footer_block3 {
  width: 25%;
  border-right: 2px white solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}
.Logist_footer_block4 {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}
</style>
