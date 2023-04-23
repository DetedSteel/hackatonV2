<template>
  <div class="main_background">
    <h1>ПОИСК ПУТИ</h1>
    <select class="select" v-model="town" @change="onSelect()">
      <option v-for="item in towns" :key="item.id" :value="item.name">
        {{ item.name }}
      </option>
    </select>
    <select class="select" v-model="type">
      <option value="round">Круговой маршрут</option>
      <option value="oneWay">В одну сторону</option>
    </select>
    <div v-if="type == 'oneWay'">
      <p v-if="searchedTowns.length" class="search_res">
        Найдено путей: {{ this.searchedTowns.length }}
      </p>
      <div v-if="searchedTowns.length">
        <section
          v-for="road in searchedTowns"
          :key="road.id"
          class="wrapper_logist_page"
        >
          <div class="card">
            <div class="header_card">
              <p class="header_time">{{ road.startTown }}</p>
              <p class="header_time">{{ road.finishTown }}</p>
              <div class="header_link">
                <router-link :to="'/roads/' + road._id">
                  <img
                    src="../img/mainPage/info-circle-svgrepo-com.svg"
                    alt=""
                  />
                </router-link>
              </div>
            </div>
            <div class="main_wrapper_card">
              <div class="main_card">
                <div class="main_inf">
                  <p>{{ road.date.slice(0, 10) }}</p>
                  <p class="inf_txt">
                    Тип погрузки: {{ road.typeTransportation }}
                  </p>
                </div>
              </div>
              <div class="main_card2">
                <button class="btn_card2">ВЫСТАВИТЬ ЦЕНУ</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-else>
        <div class="empty">
          <p>пути не найдены</p>
          <p>попробуйте выбрать другой город</p>
        </div>
      </div>
    </div>
    <div v-if="type == 'round'">
      <p v-if="resultRound.length > 0" class="search_res">
        Найдено путей: {{ this.resultRound.length }}
      </p>
      <div v-if="searchedTowns.length">
        <section
          v-for="road in resultRound"
          :key="road._id"
          class="wrapper_logist_page"
        >
          <div class="card">
            <div class="header_card">
              <p class="round_list" v-for="town in road.array" :key="town.id">
                {{ town.townName
                }}<img
                  v-if="town.id != 0"
                  class="arrow"
                  src="../img/mainPage/arrow2.png"
                />
              </p>
              <div class="header_link">
                <router-link :to="'/roads/' + road._id">
                  <img
                    src="../img/mainPage/info-circle-svgrepo-com.svg"
                    alt=""
                  />
                </router-link>
              </div>
            </div>
            <div class="main_wrapper_card">
              <div class="main_card">
                <div class="main_inf">
                  <p>Начало рейса: {{ new Date(road.startTime).toLocaleDateString() }}</p>
                  <p>Окончние рейса: {{ new Date(road.finishTime).toLocaleDateString() }}</p>
                </div>
              </div>
              <div class="main_card2">
                <button class="btn_card2">ВЫСТАВИТЬ ЦЕНУ</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-if="resultRound.length == 0">
        <div class="empty">
          <p>пути не найдены</p>
          <p>попробуйте выбрать другой город</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Roads",
  data() {
    return {
      id: undefined,
      towns: [],
      result: [],
      searchedTowns: [],
      type: "round",
      town: "Радужный",
      resultRound: [],
    };
  },
  async mounted() {
    const resTown = await axios.get(
      "http://172.20.21.222:1060/api/get-all-towns"
    );
    const townData = await resTown.data;
    this.towns = townData;
    const res = await axios.get("http://172.20.21.222:1060/api/get-all-trips");
    const posts = await res.data;
    this.result = posts;
    this.searchedTowns = posts;
    this.onSelect();
  },
  methods: {
    onSelect: function () {
      this.searchedTowns = this.result.filter((item) => {
        if (item.startTown == this.town) {
          return item;
        }
      });
      this.onSelectRound();
    },
    onSelectRound: async function () {
      const res = await axios.get(
        `http://172.20.21.222:1060/api/find-circle-trip/${this.town}`
      );
      const final = await res.data;
      console.log(final)
      this.resultRound = final;
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Montserrat", sans-serif;
  margin: 0 auto;
  margin-bottom: 50px;
  padding-top: 50px;
  width: fit-content;
}
.round_list {
  position: relative;
}
.arrow {
  position: absolute;
  left: 130%;
}
.search_res {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.select {
  margin: 15px auto;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #ff5f40;
  color: white;
  border: none;
  font-family: "Montserrat", sans-serif;
  outline: none;
}
.empty {
  font-family: "Montserrat", sans-serif;
  margin-bottom: 100px;
  margin-top: 100px;
  font-size: 30px;
  background-color: #ff5f40;
  padding: 30px 50px;
  border-radius: 20px;
  text-transform: uppercase;
  text-align: center;
  color: white;
  font-weight: bold;
}
.inf_txt {
  width: 500px;
}
.main_background {
  background-image: url("../img/mainPage/LOGIST_PAGE_SEARCH.png");
  background-size: 1700px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  width: 900px;
  height: 200px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  border-radius: 50px;
  font-family: "Montserrat", sans-serif;
  margin: 20px auto;
}

.header_card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  background-color: #ff5f40;
  border-radius: 50px 50px 0 0;
  height: 40px;
}
.main_card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 160px;
}
.main_wrapper_card {
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  align-items: center;
}
.btn_card2 {
  border: none;
  background-color: #ff5f40;
  color: white;
  padding: 20px 30px;
  border-radius: 50px;
  font-family: "Montserrat", sans-serif;
}
.btn_card2:hover {
  background-color: orange;
}
a {
  text-decoration: none;
}
img {
  width: 32px;
}
</style>
