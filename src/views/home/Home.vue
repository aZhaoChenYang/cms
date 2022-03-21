<template>
  <div class="pages_Home">
    <el-row :gutter="20">
      <template v-for="(item,index) of message">
        <el-col :span="6">
          <div class="tishi">
            <div class="ts_01">
              <div class="ts_01_l">{{ item.types }}</div>
              <div :class="item.state?'ts_01_r':'ts_01_m'">{{ item.wen }}</div>
            </div>
            <div class="ts_02">
              <div class="ts_02_l">
                <span>{{ item.num }}</span><br/>
                {{ item.mess }}
              </div>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: [{
        'types': '剧本总数',
        'num': 0,
        'mess': '剧本总数',
        'state': 1,
        'wen': '总',
        'duibi': 0,
        'fudu': 0
      },
        {
          'types': '用户数',
          'num': 0,
          'mess': '用户数',
          'state': 0,
          'wen': '总',
          'duibi': 0,
          'fudu': 0
        },
        {
          'types': '店铺数',
          'num': 0,
          'mess': '店铺数',
          'state': 1,
          'wen': '总',
          'duibi': 0,
          'fudu': 1
        }
      ],
    }
  },
  mounted () {
    this.get_info()
  },
  methods: {
    get_info () {
      this.$http.get('admin/get_home').then(res => {
        for (let v in this.message) {
          this.message[v].num = res.data[v]
        }
      })
    }
  }
}
</script>

<style lang="less">
.pages_Home {
  padding: 20px;

  .tishi {
    line-height: 20px;
    margin-bottom: 15px;
    background-color: #fff;
    text-align: left;
    color: #6B6B6B;
    font-size: 14px;

    .ts_01 {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #F0F0F0;
      padding: 10px;

      .ts_01_l {
        font-weight: 600;
      }

      .ts_01_r {
        background-color: #F54864;
        color: #fff;
        font-size: 12px;
        padding: 0px 10px;
        border-radius: 3px
      }

      .ts_01_m {
        background-color: #0392E4;
        color: #fff;
        font-size: 12px;
        padding: 0px 10px;
        border-radius: 3px
      }
    }

    .ts_02 {
      padding: 20px 15px;
      font-size: 13px;
      display: flex;
      justify-content: space-between;

      .ts_02_l {
        span {
          font-size: 28px;
        }
      }

      .ts_02_r {
        color: #0092E5;
        padding-top: 25px;
      }
    }
  }
}
</style>
