<template>
  <div class="dramaAddTable">
    <el-button size="small" class="shopreturn" @click="shopreturn">返回</el-button>
    <el-form ref="form1" :model="form1" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="店铺名称">
            <el-input v-model="form1.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="电话">
            <el-input v-model="form1.mobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地图">
        <baidu-map class="map"
                   :center="center"
                   :zoom="zoom"
                   @ready="initMap"
                   :scroll-wheel-zoom="true"
                   @click="click_map()"
        ></baidu-map>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="店铺经度">
            <el-input v-model="form1.lat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="店铺纬度">
            <el-input v-model="form1.long"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="详细地址">
        <el-input v-model="form1.address" style="width: 400px;"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit">添加</el-button>
    <el-button @click="shopreturn">取消</el-button>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

export default {
  data () {
    return {
      form1: {
        id: 0,
        name: '',
        mobile: '',
        lat: '',
        long: '',
        address: ''
      },
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      center: { // 经纬度
        lng: 117.124954,
        lat: 40.148567
      },
      zoom: 3, // 地图展示级别、
      BMap: null, // 百度地图对象
      map: null, // 百度地图实例
    }
  },
  components: {
    BaiduMap
  },
  methods: {
    onSubmit () {
      if (this.form1.name == '') {
        this.$message('请输入店铺名称')
        return
      }
      if (this.form1.mobile == '') {
        this.$message('请输入联系电话')
        return
      }
      if (this.form1.lat == '' && this.form1.long == '') {
        this.$message('请在地图上选择位置')
        return
      }
      this.$http.post('store/add_store', this.form1).then(res => {
        if (res.errno == 0) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.$router.go(-1)
        } else {
          this.$message.error(res.errmsg)
        }
      })
    },
    shopreturn () {
      this.$router.push({
        path: '/shopIndex'
      })
    },
    click_map () {
      // 点击地图
    },
    initMap ({
      BMap,
      map
    }) {
      var that = this
      this.BMap = BMap
      this.map = map
      this.zoom = 18
      const point = new BMap.Point(this.center.lng, this.center.lat)
      const marker = new BMap.Marker(point)
      var geocoder = new BMap.Geocoder()// 用于逆解析
      // 添加标注点
      map.addOverlay(marker)
      // 点击地图监听事件
      this.map.addEventListener('click', function (e) {
        geocoder.getLocation(e.point, function (rs) {
          that.form1.address = rs.address
        })
        // 清除标记
        map.clearOverlays()
        var point2 = e.point
        that.form1.lat = point2.lat
        that.form1.long = point2.lng
        const point = new BMap.Point(point2.lng, point2.lat)
        const marker = new BMap.Marker(point)
        map.addOverlay(marker)
      })
    }
  }
}
</script>

<style>
.dramaAddTable {
  background-color: white;
  margin-top: 20px;
  margin-left: 20px;
  padding: 20px;
}

.shopreturn {
  margin: 10px;
}

.map {
  width: 50%;
  height: 400px;
}
</style>
