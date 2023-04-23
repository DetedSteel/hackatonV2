<template>
  <div class="wrapper_info">
    <div class="wrapper_info_header">
      <h1 class="header_title">подробная информация</h1>
    </div>
    <div class="wrapper_info_main">
      <div class="info_txt">
        <div v-if="cardResult" class="txt_date_time">
          <p class="txt_date">
            Дата: {{ new String(cardResult.date).slice(0, 10) }}
          </p>
          <p class="txt_time">Город отправки: {{ cardResult.startTown }}</p>
          <p class="txt_time">Город прибытия: {{ cardResult.finishTown }}</p>
        </div>
        <div v-else class="txt_date_time_round">
          <p class="txt_date">
            Начало рейса:
            {{ new Date(cardRound.startTime).toLocaleDateString() }}
          </p>
          <p class="txt_date">
            Окончание рейса:
            {{ new Date(cardRound.finishTime).toLocaleDateString() }}
          </p>
          <p v-for="info in cardRound.array" :key="info.id" class="txt_time">
            {{ cardRound.array.length - info.id }}
            {{ info.townName }}
          </p>

        </div>
        <p v-if="cardResult" class="txt_load">
          Тип погрузки: {{ cardResult.typeTransportation }}
        </p>
        <div class="info_bid">
          <p class="txt_bid">выставьте цену:</p>
          <input type="text" class="inp_bid" />
        </div>
      </div>
      <div class="info_btn">
        <router-link to="/roads" class="btn_back">назад</router-link>
        <button class="btn_accept">принять</button>
      </div>
    </div>
    <div class="map" v-if="cardResult">
      <button class="map_btn" @click="showMap(this.coord, this.coord2)">Карта маршрута</button>
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RoadInfo",
  data() {
    return {
      cardResult: {},
      cardRound: {},
      coord: '',
      coord2: ''
    };
  },
  async mounted() {
    const res = await axios.get(
      `http://172.20.21.222:1060/api/get-info-trip/${this.$route.params.id}`
    );
    const roundRes = await axios.get(
      `http://172.20.21.222:1060/api/find-data-circle-trip/${this.$route.params.id}`
    );
    const posts = await res.data;
    const roundPosts = await roundRes.data;
    this.cardRound = roundPosts;
    this.cardResult = posts;
    const coord = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${posts.startTown+' Центральный федеральный округ, Южный федеральный округ'}&apiKey=N0cvOF5A-ix8m9LeCQSMxH3iuOrVFs_M8bAwsTeqFqI`)
    this.coord = coord.data.items[0].position.lat+','+coord.data.items[0].position.lng
    const coord2 = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${posts.finishTown+' Центральный федеральный округ, Южный федеральный округ'}&apiKey=N0cvOF5A-ix8m9LeCQSMxH3iuOrVFs_M8bAwsTeqFqI`)
    this.coord2 = coord2.data.items[0].position.lat+','+coord2.data.items[0].position.lng
  },
  methods: {
    showMap(coord, coord2) {
      function calculateRouteFromAtoB(platform) {
        var router = platform.getRoutingService(null, 8),
          routeRequestParams = {
            routingMode: "fast",
            transportMode: "car",
            origin: coord, // Brandenburg Gate
            destination: coord2, // Friedrichstraße Railway Station
            return:
              "polyline,turnByTurnActions,actions,instructions,travelSummary",
          };

        router.calculateRoute(routeRequestParams, onSuccess, onError);
      }

      /**
       * This function will be called once the Routing REST API provides a response
       * @param {Object} result A JSONP object representing the calculated route
       *
       * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
       */
      function onSuccess(result) {
        var route = result.routes[0];

        /*
         * The styling of the route response on the map is entirely under the developer's control.
         * A representative styling can be found the full JS + HTML code of this example
         * in the functions below:
         */
        addRouteShapeToMap(route);
        addManueversToMap(route);
        // ... etc.
      }

      /**
       * This function will be called if a communication error occurs during the JSON-P request
       * @param {Object} error The error message received.
       */
      function onError(error) {
        alert("Can't reach the remote server");
      }

      /**
       * Boilerplate map initialization code starts below:
       */

      // set up containers for the map + panel
      var mapContainer = document.getElementById("map");

      // Step 1: initialize communication with the platform
      // In your own code, replace variable window.apikey with your own apikey
      var platform = new H.service.Platform({
        apikey: "N0cvOF5A-ix8m9LeCQSMxH3iuOrVFs_M8bAwsTeqFqI",
      });

      var defaultLayers = platform.createDefaultLayers({
        lg: "ru",
      });

      // Step 2: initialize a map - this map is centered over Berlin
      var map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
        center: { lat: 52.516, lng: 13.3779 },
        zoom: 13,
        pixelRatio: window.devicePixelRatio || 1,
      });

      // add a resize listener to make sure that the map occupies the whole container
      // Step 3: make the map interactive
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Create the default UI components
      //var ui = H.ui.UI.createDefault(map, defaultLayers);

      // Hold a reference to any infobubble opened
      var bubble;

      /**
       * Opens/Closes a infobubble
       * @param {H.geo.Point} position The location on the map.
       * @param {String} text          The contents of the infobubble.
       */
      function openBubble(position, text) {
        if (!bubble) {
          bubble = new H.ui.InfoBubble(
            position,
            // The FO property holds the province name.
            { content: text }
          );
          ui.addBubble(bubble);
        } else {
          bubble.setPosition(position);
          bubble.setContent(text);
          bubble.open();
        }
      }

      /**
       * Creates a H.map.Polyline from the shape of the route and adds it to the map.
       * @param {Object} route A route as received from the H.service.RoutingService
       */
      function addRouteShapeToMap(route) {
        route.sections.forEach((section) => {
          // decode LineString from the flexible polyline
          let linestring = H.geo.LineString.fromFlexiblePolyline(
            section.polyline
          );

          // Create a polyline to display the route:
          let polyline = new H.map.Polyline(linestring, {
            style: {
              lineWidth: 4,
              strokeColor: "rgba(0, 128, 255, 0.7)",
            },
          });

          // Add the polyline to the map
          map.addObject(polyline);
          // And zoom to its bounding rectangle
          map.getViewModel().setLookAtData({
            bounds: polyline.getBoundingBox(),
          });
        });
      }

      /**
       * Creates a series of H.map.Marker points from the route and adds them to the map.
       * @param {Object} route A route as received from the H.service.RoutingService
       */
      function addManueversToMap(route) {
        var svgMarkup =
            '<svg width="18" height="18" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<circle cx="8" cy="8" r="8" ' +
            'fill="#1b468d" stroke="white" stroke-width="1" />' +
            "</svg>",
          dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
          group = new H.map.Group(),
          i,
          j;

        route.sections.forEach((section) => {
          let poly = H.geo.LineString.fromFlexiblePolyline(
            section.polyline
          ).getLatLngAltArray();

          let actions = section.actions;
          // Add a marker for each maneuver
          for (i = 0; i < actions.length; i += 1) {
            let action = actions[i];
            var marker = new H.map.Marker(
              {
                lat: poly[action.offset * 3],
                lng: poly[action.offset * 3 + 1],
              },
              { icon: dotIcon }
            );
            marker.instruction = action.instruction;
            group.addObject(marker);
          }

          group.addEventListener(
            "tap",
            function (evt) {
              map.setCenter(evt.target.getGeometry());
              openBubble(evt.target.getGeometry(), evt.target.instruction);
            },
            false
          );

          // Add the maneuvers group to the map
          map.addObject(group);
        });
      }

      /**
       * Creates a series of H.map.Marker points from the route and adds them to the map.
       * @param {Object} route A route as received from the H.service.RoutingService
       */

      /**
       * Creates a series of H.map.Marker points from the route and adds them to the map.
       * @param {Object} route A route as received from the H.service.RoutingService
       */

      /**
       * Creates a series of H.map.Marker points from the route and adds them to the map.
       * @param {Object} route A route as received from the H.service.RoutingService
       */

      // Now use the map as required...
      calculateRouteFromAtoB(platform);
    },
  },
};
</script>

<style scoped>
.map {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
}
.map_btn {
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  background-color: #ff5f40;
  color: white;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
}
.wrapper_info {
  width: 900px;
  height: auto;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  background-color: #d9d9d9;
  border-radius: 40px;
  margin: 50px auto;
}
.wrapper_info_header {
  background-color: #ff5f40;
  border-radius: 50px 50px 0 0;
  width: 900px;
  height: 40px;
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
}
.wrapper_info_main {
  display: flex;
  flex-direction: column;
  width: 820px;
  height: auto;
  align-items: start;
  padding-left: 80px;
  justify-content: center;
  gap: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
}
.txt_date_time {
  display: flex;
  align-items: center;
  gap: 100px;
}
.txt_date_time_round {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.img_map {
  height: 300px;
  width: 500px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info_img {
  height: 300px;
  width: 740px;
  object-fit: contain;
  display: flex;
  align-items: center;
  justify-content: center;
}
.info_btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
}
.info_txt {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.info_bid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.txt_date {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
}
.txt_time {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
}
.txt_city {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
}
.txt_load {
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}
.txt_bid {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
}
.inp_bid {
  width: 300px;
  border: none;
  border-radius: 50px;
  height: 30px;
  padding: 10px 20px;
}
.btn_back {
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 50px;
  background-color: #ff5f40;
  color: white;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn_accept {
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 50px;
  background-color: #ff5f40;
  color: white;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
}
</style>
