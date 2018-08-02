import request from "../../box-ui/util/request";

const BannerService = {
  getList(options) {
    return request({
      method: "GET",
      url: "https://ccnubox.muxixyz.com/api/ios/banner/"
    });
  }
};

export default BannerService;
