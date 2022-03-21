<template>
  <div class="dramaAddTable">
    <el-button class="shopreturn" size="small" @click="shopreturn">返回</el-button>
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
      <el-button type="primary" @click="onSubmit()">修改</el-button>
      <el-button @click="shopreturn">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

export default {
  components: {
    BaiduMap
  },
  data () {
    return {
      form1: {
        id: '',
        name: '',
        mobile: '',
        lat: '',
        long: '',
        address: ''
      },
      Edit_Type: '',
      center: { // 经纬度
        lng: 0,
        lat: 0
      },
      zoom: 15, // 地图展示级别、
      BMap: null, // 百度地图对象
      map: null // 百度地图实例
    }
  },
  mounted () {
    this.Edit_Type = this.$route.query.type
    if (this.Edit_Type === 'edit') {
      this.send_data()
    }
  },
  methods: {
    send_data () {
      const editData = JSON.parse(localStorage.getItem('Edit_Data'))
      this.form1.id = editData.id
      this.form1.name = editData.name
      this.form1.mobile = editData.mobile
      this.form1.lat = editData.lat
      this.form1.long = editData.long
      this.form1.address = editData.address
      this.center.lat = editData.lat
      this.center.lng = editData.long
      localStorage.removeItem('Edit_Data')
    },
    onSubmit () {
      this.$http.post('store/up_store', this.form1).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.$router.go(-1)
      })
    },
    shopreturn () {
      this.$router.push({
        path: '/shopIndex'
      })
    },
    initMap ({
      BMap,
      map
    }) {
      var that = this
      this.BMap = BMap
      this.map = map
      this.zoom = 18
      const point = new BMap.Point(this.form1.long, this.form1.lat)
      const marker = new BMap.Marker(point)
      var geocoder = new BMap.Geocoder()// 用于逆解析
      // 添加标注点
      map.addOverlay(marker)
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

.map {
  width: 50%;
  height: 400px;
}
</style>
