<template>
  <div class="address">
    <Header :isLeft="true" title="选择地址" />
    <div class="city_search">
      <div class="search">
        <span class="city" @click="$router.push('/city')">
          {{ city }}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input
          type="text"
          v-model="search_val"
          placeholder="小区/写字楼/学校等"
        />
      </div>
      <Location @click="selectAddress" :address="address" />
    </div>
    <div class="area">
      <ul class="area-list" v-for="(item, index) in areaList" :key="index">
        <li @click="selectAddress(item)">
          <h3>{{ item.name }}</h3>
          <p>{{ item.district }}{{ item.address }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Location from "@/components/Location"
export default {
  name: "Address",
  data() {
    return {
      city: "",
      search_val: '',
      areaList: []
    }
  },
  components: {
    Header,
    Location
  },

  watch: {
    search_val() {
      this.searchPlace()
    }
  },

  methods: {
    searchPlace() {
      const self = this;
      // console.log(this.search_val)
      // JSAPI 2.0 输入提示插件名称由 AMap.Autocomplete 变更为 AMap.AutoComplete 啦！
      AMap.plugin('AMap.AutoComplete', function () {
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city
        };
        // 实例化AutoComplete
        var autoComplete = new AMap.AutoComplete(autoOptions);
        // 根据关键字进行搜索
        autoComplete.search(self.search_val, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          // console.log(result);
          self.areaList = result.tips
        })
      })
    },
    selectAddress(item) {
      if (item) {
        this.$store.dispatch('setAddress', item.name + item.district + item.address)
      } else {
        this.$store.dispatch('setAddress', this.address)
      };
      this.$router.push('/home')
    }
  },

  computed: {
    address() {
      return this.$store.getters.address
    }
  },

  beforeRouteEnter(to, from, next) {
    // console.log(to);
    next(vm => {
      vm.city = to.params.city;
    });
  }
}
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}

.search .city {
  padding: 0 10px;
}

.city i {
  margin-right: 10px;
}

.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}

.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}

.area li h3 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>