<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input v-model="city_val" type="text" placeholder="请输入城市名" />
      </div>
      <button
        @click="$router.push({ name: 'address', params: { city: city } })"
      >
        取消
      </button>
    </div>
    <div style="height: 100%" v-if="this.searchList.length === 0">
      <div class="location">
        <Location @click="selectCity({ name: city })" :address="city" />
      </div>
      <Alphabet
        @selectCity="selectCity"
        ref="allCity"
        :cityInfo="cityInfo"
        :keys="keys"
      />
    </div>
    <div class="search_list" v-else>
      <ul>
        <li v-for="(item, index) in searchList" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Location from "../components/Location.vue"
import Alphabet from "../components/Alphabet.vue"
export default {
  name: 'city',
  data() {
    return {
      city_val: '',
      cityInfo: null,
      keys: [],
      allCities: [],
      searchList: []
    }
  },

  components: {
    Location,
    Alphabet
  },

  watch: {
    city_val() {
      // console.log(this.city_val)
      this.searchCity()
    }
  },

  created() {
    this.getCityInfo();
  },

  computed: {
    city() {
      return (
        this.$store.getters.location.city || this.$store.getters.location.province ||
        this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province
      )
    }
  },

  methods: {
    getCityInfo() {
      this.$axios("/api/posts/cities")
        .then(res => {
          // console.log(res.data);
          this.cityInfo = res.data;
          this.keys = Object.keys(res.data);
          // console.log(this.keys);
          this.keys.pop();
          this.keys.sort();
          this.$nextTick(() => {
            this.$refs.allCity.initScroll()
          })
          // console.log(this.keys)
          this.keys.forEach(key => {
            // console.log(key)
            this.cityInfo[key].forEach(city => {
              // console.log(city)
              this.allCities.push(city)
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectCity(city) {
      // console.log(city)
      this.$router.push({ name: "address", params: { city: city.name } })
    },
    searchCity() {
      if (!this.city_val) {
        this.searchList = []
      } else {
        this.searchList = this.allCities.filter(item => {
          return item.name.indexOf(this.city_val) != -1
        })
        // console.log(this.searchList)
      }
    }
  },
}
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  border: none;
  color: #009eef;
  background: #fff;
}
.location {
  background: #fff;
  padding: 6px 10px;
  /* height: 65px;
  box-sizing: border-box; */
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
