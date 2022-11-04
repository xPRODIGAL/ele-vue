<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  created() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      const self = this;
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        })

        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            onComplete(result)
          } else {
            onError(result)
          }
        });

        function onComplete(data) {
          // data是具体的定位信息
          // console.log(data);
          axios.get('https://restapi.amap.com/v3/geocode/regeo', {
            params: {
              key: "753de640789136a98504fc006dc7dee3",
              location: data.position.lng + ',' + data.position.lat,
              radius: 1000,
              extensions: 'all',
              batch: false,
              roadlevel: 0
            }
          }).then(response => {
            // console.log(data)
            console.log(response)
            // console.log(response.data.regeocode.formatted_address)
            self.$store.dispatch("setLocation", response.data.regeocode.addressComponent);
            self.$store.dispatch("setAddress", response.data.regeocode.formatted_address);
          }).catch(error => {
            console.log(error)
          })
          //   var lnglat = [data.position.lng, data.position.lat];
        }

        function onError(data) {
          // 定位出错
          // console.log(data)
          self.getLngLatLocation();
        }
      })
    },
    getLngLatLocation() {
      const self = this;
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log(result);
            console.log(result.adcode);
            console.log(result.city);
            AMap.plugin('AMap.Geocoder', function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })

              var lnglat = result.rectangle.split(";")[1].split(",");

              geocoder.getAddress(lnglat, function (status, data) {
                if (status === 'complete' && data.info === 'OK') {
                  // data为对应的地理位置详细信息
                  console.log(data);
                  self.$store.dispatch("setLocation", {
                    addressComponent: {
                      city: result.city,
                      province: result.province
                    },
                    formattedAddress: data.regeocode.formattedAddress
                  });

                  self.$store.dispatch(
                    "setAddress",
                    data.regeocode.formattedAddress
                  );
                }
              })
            })
          }
        })
      })
    }
  }
}
</script>


<style>
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f1f1f1;
}
</style>
