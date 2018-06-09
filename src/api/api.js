import req from './util.js'
const baseUrl = 'http://www.56whw.cn:56';
const baseUrlhpc = 'http://192.168.1.123:8080/yn_culture3';
const baseUrlwjh = 'http://192.168.8.137/yn_culture3';

/*
 * 后台用户登录: @userLogin
 * 检测用户登录是否超时: @CheckLogin
 * 退出登录:@LayoutLogin
 */
export const userLogin = params => {
    return req.get(`${baseUrl}/adminlogin`, params)
}
export const CheckLogin = params => {
    return req.get(`${baseUrl}/common/getAdmin`, params)
}
export const LayoutLogin = params => {
    return req.get(`${baseUrl}/admin/logout`, params)
}

/* 权限分配>分组管理
 * 获取分组列表: @GetGroupList
 * 增加组用户: @AddGroup
 * 编辑组用户: @EditGroup
 * 删除单个用户: @DeleteGroup
 * 批量删除组用户: @BatchDeleteGroup
 */
export const GetGroupList = params => {
    return req.post(`${baseUrl}/admingroup`, params)
}
export const AddGroup = params => {
    return req.post(`${baseUrl}/admingroup/add`, params)
}
export const EditGroup = params => {
    return req.post(`${baseUrl}/admingroup/update`, params)
}
export const DeleteGroup = params => {
    return req.post(`${baseUrl}/admingroup/delete`, params)
}
export const BatchDeleteGroup = params => {
    return req.post(`${baseUrl}/admingroup/batchDelete`, params)
}
/* 权限分配>权限管理>权限编辑
 * 获取权限列表: @GetPowerInfo
 * 获取当前分组权限: @GetCurrentPrivs
 */

export const GetPowerInfo = params => {
    return req.post(`${baseUrl}/admingroup/getPrivs`, params)
}
export const GetCurrentPrivs = params => {
    return req.post(`${baseUrl}/admingroup/getCurrentPrivs`, params)
}

/* 权限分配>权限管理
 * 获取权限列表: @GetPowerList
 * 增加权限: @AddGroupPower
 * 编辑权限: @EditGroupPower
 * 删除单个权限: @DeleteGroupPower
 * 批量删除权限: @BatchDeleteGroupPower
 */
export const GetPowerList = params => {
    return req.post(`${baseUrl}/admingrouppriv`, params)
}
export const AddGroupPower = params => {
    return req.post(`${baseUrl}/admingrouppriv/add`, params)
}
export const EditGroupPower = params => {
    return req.post(`${baseUrl}/admingrouppriv/update`, params)
}
export const DeleteGroupPower = params => {
    return req.post(`${baseUrl}/admingrouppriv/delete`, params)
}
export const BatchDeleteGroupPower = params => {
    return req.post(`${baseUrl}/admingrouppriv/batchDelete`, params)
}

/*
 * 获取用戶列表：@GetUserList
 * 添加用户请求：@AddUserInfo
 * 编辑用户请求：@EditUserInfo
 * 删除单个用户：@DeleteUser
 * 批量删除用户：@BatchDeleteUser
 * 获取组类型请求：@GetGroupType
 */
export const GetUserList = params => {
    return req.post(`${baseUrl}/adminuser`, params)
}
export const AddUserInfo = params => {
    return req.post(`${baseUrl}/adminuser/add`, params)
}
export const EditUserInfo = params => {
    return req.post(`${baseUrl}/adminuser/update`, params)
}
export const DeleteUser = params => {
    return req.post(`${baseUrl}/adminuser/delete`, params)
}
export const BatchDeleteUser = params => {
    return req.post(`${baseUrl}/adminuser/batchDelete`, params)
}
export const GetGroupType = params => {
    return req.post(`${baseUrl}/admingroup/formList`, params)
}
/* 会员管理>会员管理
 * 获取会员列表：@GetVipList
 * 添加会员请求：@AddVipInfo
 * 编辑会员请求：@EditVipInfo
 * 删除单个会员：@DeleteVip
 * 批量删除会员：@BatchDeleteVip
 */
export const GetVipList = params => {
    return req.post(`${baseUrl}/adminuserf`, params)
}
export const AddVipInfo = params => {
    return req.post(`${baseUrl}/adminuserf/add`, params)
}
export const EditVipInfo = params => {
    return req.post(`${baseUrl}/adminuserf/update`, params)
}
export const DeleteVip = params => {
    return req.post(`${baseUrl}/adminuserf/delete`, params)
}
export const BatchDeleteVip = params => {
    return req.post(`${baseUrl}/adminuserf/batchDelete`, params)
}


/*
 * 获取圈子列表：@GetCircleList
 * 添加圈子请求：@AddCircleInfo
 * 编辑圈子请求：@EditCircleInfo
 * 删除单个圈子：@DeleteCircle
 * 批量删除圈子：@BatchDeleteCircle
 * 获取标签类型： @GetTagType
 */
export const GetCircleList = params => {
    return req.post(`${baseUrl}/admintag`, params)
}
export const AddCircleInfo = params => {
    return req.post(`${baseUrl}/admintag/add`, params)
}
export const EditCircleInfo = params => {
    return req.post(`${baseUrl}/admintag/update`, params)
}
export const DeleteCircle = params => {
    return req.post(`${baseUrl}/admintag/delete`, params)
}
export const BatchDeleteCircle = params => {
    return req.post(`${baseUrl}/admintag/batchDelete`, params)
}
export const GetTagType = params => {
    return req.post(`${baseUrl}/admintagtype/formList`, params)
}

/*
 * 获取帖子列表：@GetPostList
 * 帖子状态改变：@ChangePostStatus
 * 删除单个帖子：@DeletePost
 * 批量删除标签：@BatchDeletePost
 */
export const GetPostList = params => {
    return req.post(`${baseUrl}/post/findPostsByTagId`, params)
}
export const ChangePostStatus = params => {
    return req.post(`${baseUrl}/post/status/set`, params)
}
export const DeletePost = params => {
    return req.post(`${baseUrl}/post/delete`, params)
}
export const BatchDeletePost = params => {
    return req.post(`${baseUrl}/post/batchDelete`, params)
}

/*
 * 获取标签列表：@GetLabelList
 * 添加标签请求：@AddLabelInfo
 * 编辑标签请求：@EditLabelInfo
 * 删除单个标签：@DeleteLabel
 * 批量删除标签：@BatchDeleteLabel
 * 获取标签类型： @GetTagType
 */
export const GetLabelList = params => {
    return req.post(`${baseUrl}/admintag`, params)
}
export const AddLabelInfo = params => {
    return req.post(`${baseUrl}/admintag/add`, params)
}
export const EditLabelInfo = params => {
    return req.post(`${baseUrl}/admintag/update`, params)
}
export const DeleteLabel = params => {
    return req.post(`${baseUrl}/admintag/delete`, params)
}
export const BatchDeleteLabel = params => {
    return req.post(`${baseUrl}/admintag/batchDelete`, params)
}

/*
 * 获取标签升级列表：@GetLabelList
 * 添加标签升级请求：@AddLabelInfo
 * 编辑标签升级请求：@EditLabelInfo
 * 删除单个标签升级：@DeleteLabel
 * 批量删除标签升级：@BatchDeleteLabel
 * 获取标签类型： @GetTagType
 */
export const GetLabelUpgradeList = params => {
    return req.post(`${baseUrl}/admintagupgrade`, params)
}
export const AddLabelUpgradeInfo = params => {
    return req.post(`${baseUrl}/admintagupgrade/add`, params)
}
export const EditLabelUpgradeInfo = params => {
    return req.post(`${baseUrl}/admintagupgrade/update`, params)
}
export const DeleteLabelUpgrade = params => {
    return req.post(`${baseUrl}/admintagupgrade/delete`, params)
}
export const BatchDeleteLabelUpgrade = params => {
    return req.post(`${baseUrl}/admintagupgrade/batchDelete`, params)
}
/*
* 获取所有图片上传请求：@AllUploadImage
*/

export const AllUploadImage = params => {
    return req.post(`${baseUrl}/common/uploadImage`, params)
}

/* 认证管理>身份认证
 * 获取身份认证列表：@GetIdentityList
 * 获取身份认证信息请求：@IdentityApplyUrl
 * 编辑身份认证信息请求：@IdentityUpdateUrl
 * 获取通过认证请求：@IdentityCrossApply
 * 获取驳回认证请求：@IdentityRejectApply 
 */
export const GetIdentityList = params => {
    return req.post(`${baseUrl}/nameapply`, params)
}
export const IdentityApplyUrl = params => {
    return req.post(`${baseUrl}/nameapply/show`, params)
}
export const IdentityCrossApply = params => {
    return req.post(`${baseUrl}/nameapply/add`, params)
}
export const IdentityRejectApply = params => {
    return req.post(`${baseUrl}/nameapply/reject`, params)
}

/* 认证管理>土著认证
 * 获取土著认证列表：@GetTuzhuList
 * 获取土著认证信息请求：@TuzhuApplyUrl
 * 编辑土著认证信息请求：@TuzhuUpdateUrl
 * 获取通过认证请求：@TuzhuCrossApply
 * 获取驳回认证请求：@TuzhuRejectApply 
 */
export const GetTuzhuList = params => {
    return req.post(`${baseUrl}/bapply`, params)
}
export const TuzhuApplyUrl = params => {
    return req.post(`${baseUrl}/bapply/show`, params)
}
export const TuzhuUpdateUrl = params => {
    return req.post(`${baseUrl}/bapply/update`, params)
}
export const TuzhuCrossApply = params => {
    return req.post(`${baseUrl}/bapply/add`, params)
}
export const TuzhuRejectApply = params => {
    return req.post(`${baseUrl}/bapply/reject`, params)
}

/* 认证管理>政府认证
 * 获取政府认证列表：@GetGovernmentList
 * 获取政府认证信息请求：@GovernmentApplyUrl
 * 编辑政府认证信息请求：@GovernmentUpdateUrl
 * 获取通过认证请求：@GovernmentCrossApply
 * 获取驳回认证请求：@GovernmentRejectApply 
 */
export const GetGovernmentList = params => {
    return req.post(`${baseUrl}/oapply`, params)
}
export const GovernmentApplyUrl = params => {
    return req.post(`${baseUrl}/oapply/show`, params)
}
export const GovernmentUpdateUrl = params => {
    return req.post(`${baseUrl}/oapply/update`, params)
}
export const GovernmentCrossApply = params => {
    return req.post(`${baseUrl}/oapply/add`, params)
}
export const GovernmentRejectApply = params => {
    return req.post(`${baseUrl}/oapply/reject`, params)
}

/* 认证管理>企业认证
 * 获取企业认证列表：@GetCompanyList
 * 获取企业认证信息请求：@CompanyApplyUrl
 * 编辑企业认证信息请求：@CompanyUpdateUrl
 * 获取通过认证请求：@CompanyCrossApply
 * 获取驳回认证请求：@CompanyRejectApply 
 */
export const GetCompanyList = params => {
    return req.post(`${baseUrl}/capply`, params)
}
export const CompanyApplyUrl = params => {
    return req.post(`${baseUrl}/capply/show`, params)
}
export const CompanyUpdateUrl = params => {
    return req.post(`${baseUrl}/capply/update`, params)
}
export const CompanyCrossApply = params => {
    return req.post(`${baseUrl}/capply/add`, params)
}
export const CompanyRejectApply = params => {
    return req.post(`${baseUrl}/capply/reject`, params)
}
/*
 * 获取帖子举报列表：@GetPostReportList
 * 获取单个帖子详情：@GetPostInfo
 * 通过举报：@CrossReport
 * 驳回举报：@RejectReport
 */
export const GetPostReportList = params => {
    return req.post(`${baseUrl}/report/post`, params)
}
export const GetPostInfo = params => {
    return req.post(`${baseUrl}/report/post/detail`, params)
}
export const CrossReport = params => {
    return req.post(`${baseUrl}/report/post/accept`, params)
}
export const RejectReport = params => {
    return req.post(`${baseUrl}/report/post/reject`, params)
}

/*
 * 获取店铺举报列表：@GetShopReportList
 * 获取单个店铺详情：@GetShopInfo
 * 通过举报：@CrossShopReport
 * 驳回举报：@RejectShopReport
 */
export const GetShopReportList = params => {
    return req.post(`${baseUrl}/report/store`, params)
}
export const GetShopInfo = params => {
    return req.post(`${baseUrl}/report/store/detail`, params)
}
export const CrossShopReport = params => {
    return req.post(`${baseUrl}/report/store/accept`, params)
}
export const RejectShopReport = params => {
    return req.post(`${baseUrl}/report/store/reject`, params)
}

/*
 * 获取服务举报列表：@GetServiceReportList
 * 获取单个服务详情：@GetServiceInfo
 * 通过服务举报：@CrossServiceReport
 * 驳回服务举报：@RejectServiceReport
 */
export const GetServiceReportList = params => {
    return req.post(`${baseUrl}/report/service`, params)
}
export const GetServiceInfo = params => {
    return req.post(`${baseUrl}/report/service/detail`, params)
}
export const CrossServiceReport = params => {
    return req.post(`${baseUrl}/report/service/accept`, params)
}
export const RejectServiceReport = params => {
    return req.post(`${baseUrl}/report/service/reject`, params)
}

/*
 * 获取百科举报列表：@GetBaikeReportList
 * 获取单个百科详情：@GetBaikeInfo
 * 通过百科举报：@CrossBaikeReport
 * 驳回百科举报：@RejectBaikeReport
 */
export const GetBaikeReportList = params => {
    return req.post(`${baseUrl}/report/baike`, params)
}
export const GetBaikeInfo = params => {
    return req.post(`${baseUrl}/report/baike/detail`, params)
}
export const CrossBaikeReport = params => {
    return req.post(`${baseUrl}/report/baike/accept`, params)
}
export const RejectBaikeReport = params => {
    return req.post(`${baseUrl}/report/baike/reject`, params)
}

/*
 * 获取评论举报列表：@GetCommentReportList
 * 获取单个评论详情：@GetCommentInfo
 * 通过评论举报：@CrossCommentReport
 * 驳回评论举报：@RejectCommentReport
 */
export const GetCommentReportList = params => {
    return req.post(`${baseUrl}/report/comment`, params)
}
export const GetCommentInfo = params => {
    return req.post(`${baseUrl}/report/comment/detail`, params)
}
export const CrossCommentReport = params => {
    return req.post(`${baseUrl}/report/comment/accept`, params)
}
export const RejectCommentReport = params => {
    return req.post(`${baseUrl}/report/comment/reject`, params)
}

/*
 * 获取回复举报列表：@GetCommentReportList
 * 获取单个回复详情：@GetCommentInfo
 * 通过回复举报：@CrossCommentReport
 * 驳回回复举报：@RejectCommentReport
 */
export const GetReplyReportList = params => {
    return req.post(`${baseUrl}/report/reply`, params)
}
export const GetReplyInfo = params => {
    return req.post(`${baseUrl}/report/reply/detail`, params)
}
export const CrossReplyReport = params => {
    return req.post(`${baseUrl}/report/reply/accept`, params)
}
export const RejectReplyReport = params => {
    return req.post(`${baseUrl}/report/reply/reject`, params)
}

/*
 * 获取广告列表：@GetAdvertList
 * 增加广告：@AddAdvert
 * 编辑广告：@EditAdvert
 * 删除单个广告：@DeleteAdvert
 * 批量删除广告：@BatchDeleteAdvert
 * 获取广告位：@GetAdvertPosition
 */

export const GetAdvertList = params => {
    return req.post(`${baseUrl}/adminadv`, params)
}
export const AddAdvert = params => {
    return req.post(`${baseUrl}/adminadv/add`, params)
}
export const EditAdvert = params => {
    return req.post(`${baseUrl}/adminadv/update`, params)
}
export const DeleteAdvert = params => {
    return req.post(`${baseUrl}/adminadv/delete`, params)
}
export const BatchDeleteAdvert = params => {
    return req.post(`${baseUrl}/adminadv/batchDelete`, params)
}
export const GetAdvertPosition = params => {
    return req.post(`${baseUrl}/adminadvposition/formList`, params)
}

/*
 * 获取广告位列表：@GetAdvertPositionList
 * 增加广告位：@AddAdvertPosition
 * 编辑广告位：@EditAdvertPosition
 * 删除单个广告位：@DeleteAdvertPosition
 * 批量删除广告位：@BatchDeleteAdvertPosition
 */

export const GetAdvertPositionList = params => {
    return req.post(`${baseUrl}/adminadvposition`, params)
}
export const AddAdvertPosition = params => {
    return req.post(`${baseUrl}/adminadvposition/add`, params)
}
export const EditAdvertPosition = params => {
    return req.post(`${baseUrl}/adminadvposition/update`, params)
}
export const DeleteAdvertPosition = params => {
    return req.post(`${baseUrl}/adminadvposition/delete`, params)
}
export const BatchDeleteAdvertPosition = params => {
    return req.post(`${baseUrl}/adminadvposition/batchDelete`, params)
}

/*
 * 网站栏目列表：@GetColumnList
 * 获取所有栏目列表：@GetAllColumnList
 * 增加网站栏目：@AddColumn
 * 编辑网站栏目：@EditColumn
 * 删除网站栏目：@DeleteColumn
 * 获取栏目信息：@GetColumnInfo
 * 批量删除网站栏目：@BatchDeleteColumn
 */

export const GetColumnList = params => {
    return req.post(`${baseUrl}/admincategory`, params)
}
export const GetAllColumnList = params => {
    return req.post(`${baseUrl}/admincategory/formList`, params)
}
export const GetColumnInfo = params => {
    return req.post(`${baseUrl}/admincategory/show`, params)
}
export const AddColumn = params => {
    return req.post(`${baseUrl}/admincategory/add`, params)
}
export const EditColumn = params => {
    return req.post(`${baseUrl}/admincategory/update`, params)
}
export const DeleteColumn = params => {
    return req.post(`${baseUrl}/admincategory/delete`, params)
}
export const BatchDeleteColumn = params => {
    return req.post(`${baseUrl}/admincategory/batchDelete`, params)
}

/*
 * 获取网站信息请求：@GetSiteInfo
 * 编辑网站信息请求：@EditSiteInfo
 */
export const GetSiteInfo = params => {
    return req.post(`${baseUrl}/adminconfig/formList`, params)
}
export const EditSiteInfo = params => {
    return req.post(`${baseUrl}/adminconfig/update`, params)
}
/*
 * 获取消息列表：@GetMessageList
 * 获取所有消息列表：@GetAllMessageList
 * 获取所有消息分类列表：@GetAllMessageTypeList
 * 增加消息：@AddMessage
 * 编辑消息：@EditMessage
 * 删除消息：@DeleteMessage
 * 批量删除消息：@BatchDeleteMessage
 */

export const GetMessageList = params => {
    return req.post(`${baseUrl}/adminmessage`, params)
}
export const GetAllMessageList = params => {
    return req.post(`${baseUrl}/adminmessage/formList`, params)
}
export const GetAllMessagetplList = params => {
    return req.post(`${baseUrl}/adminmessagetpl/formList`, params)
}
export const AddMessage = params => {
    return req.post(`${baseUrl}/adminmessage/add`, params)
}
export const EditMessage = params => {
    return req.post(`${baseUrl}/adminmessage/update`, params)
}
export const DeleteMessage = params => {
    return req.post(`${baseUrl}/adminmessage/delete`, params)
}
export const BatchDeleteMessage = params => {
    return req.post(`${baseUrl}/adminmessage/batchDelete`, params)
}

/*
 * 获取消息模板列表：@GetPhoneCodeList
 * 增加消息模板：@AddPhoneCode
 * 编辑消息模板：@EditPhoneCode
 * 删除单个消息模板：@DeletePhoneCode
 * 批量删除消息模板：@BatchDeletePhoneCode
 */
export const GetMessageTplList = params => {
    return req.post(`${baseUrl}/adminmessagetpl`, params)
}
export const AddMessageTpl = params => {
    return req.post(`${baseUrl}/adminmessagetpl/add`, params)
}
export const EditMessageTpl = params => {
    return req.post(`${baseUrl}/adminmessagetpl/update`, params)
}
export const DeleteMessageTpl = params => {
    return req.post(`${baseUrl}/adminmessagetpl/delete`, params)
}
export const BatchDeleteMessageTpl = params => {
    return req.post(`${baseUrl}/adminmessagetpl/batchDelete`, params)
}
/*
 * 获取手机验证码列表：@GetPhoneCodeList
 * 增加验证码：@AddPhoneCode
 * 编辑验证码：@EditPhoneCode
 * 删除单个验证码：@DeletePhoneCode
 * 批量删除验证码：@BatchDeletePhoneCode
 * 获取验证码类型：@GetCodeType
 */
export const GetPhoneCodeList = params => {
    return req.post(`${baseUrl}/adminvmcode`, params)
}
export const AddPhoneCode = params => {
    return req.post(`${baseUrl}/adminvmcode/add`, params)
}
export const EditPhoneCode = params => {
    return req.post(`${baseUrl}/adminvmcode/update`, params)
}
export const DeletePhoneCode = params => {
    return req.post(`${baseUrl}/adminvmcode/delete`, params)
}
export const BatchDeletePhoneCode = params => {
    return req.post(`${baseUrl}/adminvmcode/batchDelete`, params)
}
export const GetCodeType = params => {
    return req.post(`${baseUrl}/adminvmtype`, params)
}
/*
 * 获取邮箱验证码列表：@GetEmailCodeList
 * 增加验证码：@AddEmailCode
 * 编辑验证码：@EditEmailCode
 * 删除单个验证码：@DeleteEmailCode
 * 批量删除验证码：@BatchDeleteEmailCode
 * 获取验证码类型：@GetCodeType
 */
export const GetEmailCodeList = params => {
    return req.post(`${baseUrl}/adminvecode`, params)
}
export const AddEmailCode = params => {
    return req.post(`${baseUrl}/adminvecode/add`, params)
}
export const EditEmailCode = params => {
    return req.post(`${baseUrl}/adminvecode/update`, params)
}
export const DeleteEmailCode = params => {
    return req.post(`${baseUrl}/adminvecode/delete`, params)
}
export const BatchDeleteEmailCode = params => {
    return req.post(`${baseUrl}/adminvecode/batchDelete`, params)
}

/*  
 * 友情链接：@GetFriendShipList
 * 增加友情链接： @AddFriendShip
 * 编辑友情链接： @EditFriendShip
 * 删除友情链接:  @DeleteFriendShip
 * 批量删除友情链接: @BatchDeleteFriendShip
 */
export const GetFriendShipList = params => {
    return req.post(`${baseUrl}/friendlink/paging`, params)
}
export const AddFriendShip = params => {
    return req.post(`${baseUrl}/friendlink/add`, params)
}
export const EditFriendShip = params => {
    return req.post(`${baseUrl}/friendlink/update`, params)
}
export const DeleteFriendShip = params => {
    return req.post(`${baseUrl}/friendlink/delete`, params)
}
export const BatchDeleteFriendShip = params => {
    return req.post(`${baseUrl}/friendlink/batchDelete`, params)
}

/*
 * 百科审核列表 @GetBaikeAuditList
 * 获取单条信息 @GetBaikeAuditInfo
 * 查看百科详情 @CheckeBaikeDetail
 * 通过审核 @CrossBaikeAudit
 * 驳回审核 @RejectBaikeAudit
 */
export const GetBaikeAuditList = params => {
    return req.post(`${baseUrl}/check/baike`, params)
}
export const GetBaikeAuditInfo = params => {
    return req.post(`${baseUrl}/check/baike/detail`, params)
}
export const CheckeBaikeDetail = params => {
    return req.post(`${baseUrl}/check/baike/detailedness`, params)
}
export const CrossBaikeAudit = params => {
    return req.post(`${baseUrl}/check/baike/accept`, params)
}
export const RejectBaikeAudit = params => {
    return req.post(`${baseUrl}/check/baike/reject`, params)
}

/*
 * 修改审核列表 @GetChangeAuditList
 * 查看修改详情 @CheckeChangeDetail
 * 获取单条信息 @GetChangeAuditInfo
 * 通过审核 @CrossChangeAudit
 * 驳回审核 @RejectChangeAudit
 */
export const GetChangeAuditList = params => {
    return req.post(`${baseUrl}/check/bkupdate`, params)
}
export const GetChangeAuditInfo = params => {
    return req.post(`${baseUrl}/check/bkupdate/detail`, params)
}
export const CheckeChangeDetail = params => {
    return req.post(`${baseUrl}/check/bkupdate/detailedness`, params)
}
export const CrossChangeAudit = params => {
    return req.post(`${baseUrl}/check/bkupdate/accept`, params)
}
export const RejectChangeAudit = params => {
    return req.post(`${baseUrl}/check/bkupdate/reject`, params)
}
/*
 * 删除审核列表 @
 * 获取单条信息 @
 * 通过审核 @
 * 驳回审核 @
 */
export const GetDeleteAuditList = params => {
    return req.post(`${baseUrl}/check/bkrmapply`, params)
}
export const GetDeleteAuditInfo = params => {
    return req.post(`${baseUrl}/check/bkrmapply/detail`, params)
}
export const CrossDeleteAudit = params => {
    return req.post(`${baseUrl}/check/bkrmapply/accept`, params)
}
export const RejectDeleteAudit = params => {
    return req.post(`${baseUrl}/check/bkrmapply/reject`, params)
}

/*
 * 服务审核列表 @
 * 获取单条信息 @
 * 通过审核 @
 * 驳回审核 @
 */
export const GetServiceAuditList = params => {
    return req.post(`${baseUrl}/sVerify`, params)
}
export const GetServiceAuditInfo = params => {
    return req.post(`${baseUrl}/sVerify/show`, params)
}
export const CrossServiceAudit = params => {
    return req.post(`${baseUrl}/sVerify/add`, params)
}
export const RejectServiceAudit = params => {
    return req.post(`${baseUrl}/sVerify/reject`, params)
}
/*
 * 增加消息 @addMessage
 */
export const addMessage = params => {
    return req.post(`${baseUrl}/adminmessage/add`, params)
}