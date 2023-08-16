import { httpReq } from "./httpReq";

class HttpUtil {
  // 管理员账户登陆模块
  login = (params) => httpReq("post", "/user/adminLogin", params);
  // register = (params) => httpReq("post", "/admins/register", params);
  updatePSW =(params)=>httpReq("post",'/user/updateSelfPassword',params)
  getUserInfo =(params)=>httpReq("post",'/user/getCurrentUserInfo',params)

  // 用户模块
  getUsers = (params) =>
    httpReq(
      "post",
      `/user/listUser/?pageNum=${params.pageNum}&pageSize=${params.pageSize}`
    );
  addUser = (params) => httpReq("post", `/user/addUser/`, params);
  getUser=(params)=>httpReq("post",`/user/getUser/${params.id}`,params)
  updatePwd = (params) => httpReq("post", `/user/resetPassword`, params);
  deleteUser = (params) => httpReq("post", `/user/delUser/?id=${params.id}`);

  //服务费模块
  getServiceCharge = (params) =>
    httpReq(
      "get",
      `/serviceCharge/list/?pageNum=${params.pageNum}&pageSize=${params.pageSize}`
    );
  addServiceCharge = (params) =>
    httpReq("post", "/serviceCharge/insert", params);
  getOneServiceCharge = (params) =>
    httpReq("get", `/serviceCharge/getOne/${params.id}`);
  updateServiceCharge = (params) =>
    httpReq("post", `/serviceCharge/update/${params.id}`, params);
  deleteServiceCharge = (params) =>
    httpReq("post", `/serviceCharge/delete/${params.id}`);
  //报价单
  getPrice = (params) =>
    httpReq(
      "get",
      `/productChecklist/listAllHistory?name=${params.name}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`
    );
  // 商品类别模块
  getCategories = (params) =>
    httpReq("get", `/productClassification/listAll`, params);
  addCategory = (params) =>
    httpReq("post", `/productClassification/insert`, params);
  getOneCategory = (params) =>
    httpReq("get", `/productClassification/getOne/${params.id}`);
  updateCategory = (params) =>
    httpReq("post", `/productClassification/update/${params.id}`, params);
  deleteCategory = (params) =>
    httpReq("post", `/productClassification/delete/${params.id}`);
  downloadCategoryTemplate=(params)=>httpReq("get",`/productClassification/downloadBatchImportTemplate`,params)
  //商品信息模块
  getCommodities = (params) =>
    httpReq(
      "get",
      `/productBasic/list?classificationId=${params.classificationId}&name=${params.name}&pageNum=${params.pageNum}&pageSize=${params.pageSize}&status=${params.status}`
    );
  getOneCommodity = (params) =>
    httpReq("get", `/productBasic/getOne/${params.id}`);
  addCommodities = (params) => httpReq("post", `/productBasic/insert`, params);
  updateCommodity = (params) =>
    httpReq("post", `/productBasic/update/${params.id}`, params);
  deleteCommodities = (params) =>
    httpReq("post", `/productBasic/delete/${params.id}`);
    searchCommodities=(params)=>httpReq("get",`/productBasic/listByClassificationIdAndStatus?classificationId=${params.classificationId}&status=${params.status}`,params)
}

export default new HttpUtil();
