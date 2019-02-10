var data = new Vue({
  el: '#content',
  data: {
    productlist: [],
    checkAll: false,
    count: 0,
    totalMoney:0
  },
//局部过滤器
  filters: {
    formatMoney: function (value) {
      return "￥" + value.toFixed(2);
    }
  },
  mounted: function () {
    this.View();
  },
  methods: {
    View: function () {
      var _this = this;
      console.log("ready to login....");
      _this.$http.get("./data.json").then(function (value) {
        console.log(value);
        console.log(value.body.result.list);
        //引入数据
        _this.productlist = value.body.result.list;
      }, function (response) {
        console.log(response);
      })
    },
//加减号
    changeMoney: function (product, way) {
      if (way > 0) {
        product.count++;
      }
      else {
        product.count--;
      }
      if (product.count < 1) {
        product.count = 1;
      }
      this.calTotalPrice();
    },

    selectedProduct: function (item) {
      if (typeof  item.checked == 'undefined') {
        this.$set(item, "checked", true);
      }
      else {
        item.checked = !item.checked;
      }

      this.calTotalPrice();
    },

    checkAllData: function () {
      this.checkAll = !this.checkAll;
      var _this = this;

      if (_this.checkAll || _this.count == 0) {
        _this.productlist.forEach(function (item, index) {
          if (typeof item.checked == 'undefined') {
            _this.$set(item, "checked", _this.checkAll);
          }
          else {
            item.checked = _this.checkAll;
          }

        });

      }
      if ( _this.count > 1) {
        _this.productlist.forEach(function (item, index) {
          if (typeof item.checked == 'undefined') {
            _this.$set(item, "checked", _this.checkAll);
          }
          else {
            item.checked = !_this.checkAll;
            _this.count = 0;
          }
        });


        _this.count++;
      }
      this.calTotalPrice();
    },

    calTotalPrice:function () {
      var _this=this;
      _this.totalMoney=0;
      this.productlist.forEach(function (item,index) {
         if(item.checked) {
           _this.totalMoney+=item.price*item.count;
         }
      });
    },

    deleteProduct:function (item) {
      var index = this.productlist.indexOf(this.item);
      this.productlist.splice(index,1);
    }
  }


});









