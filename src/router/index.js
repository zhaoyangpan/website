import Vue from 'vue'
import Router from 'vue-router'
const NotFound = resolve => require(['@/components/404.vue'], resolve)
const index = resolve => require(['@/components/index.vue'], resolve)
const home = resolve => require(['@/components/home.vue'], resolve)
const GroupManagemen = resolve => require(['@/components/PowerDistribution/GroupManagemen.vue'], resolve)
const PowerManage = resolve => require(['@/components/PowerDistribution/PowerManage.vue'], resolve)
const GroupEditTz = resolve => require(['@/components/PowerDistribution/GroupEdit/GroupEditTz.vue'], resolve)
const GroupEditAdmin = resolve => require(['@/components/PowerDistribution/GroupEdit/GroupEditAdmin.vue'], resolve)
const UserManage = resolve => require(['@/components/UserManage/UserManage.vue'], resolve)
const CircleManage = resolve => require(['@/components/CircleManage/CircleManage.vue'], resolve)
const PostManage = resolve => require(['@/components/CircleManage/PostManage/PostManage.vue'], resolve)
const LabelManage = resolve => require(['@/components/LabelManage/LabelManage.vue'], resolve)
const LabelUpgrade = resolve => require(['@/components/LabelManage/LabelUpgrade.vue'], resolve)
const TuzhuManage = resolve => require(['@/components/IdentificationManage/TuzhuManage.vue'], resolve)
const GovernmentManage = resolve => require(['@/components/IdentificationManage/GovernmentManage.vue'], resolve)
const IdentityManage = resolve => require(['@/components/IdentificationManage/IdentityMange.vue'], resolve)
const CompanyManage = resolve => require(['@/components/IdentificationManage/CompanyManage.vue'], resolve)
const ViewManage = resolve => require(['@/components/IdentificationManage/ViewManage.vue'], resolve)
// import NotFound from '@/components/404.vue'
// import index from '@/components/index.vue'
// import home from '@/components/home.vue'
// import GroupManagemen from '@/components/PowerDistribution/GroupManagemen.vue'
// import PowerManage from '@/components/PowerDistribution/PowerManage.vue'
// import GroupEditTz from '@/components/PowerDistribution/GroupEdit/GroupEditTz.vue'
// import GroupEditAdmin from '@/components/PowerDistribution/GroupEdit/GroupEditAdmin.vue'
// import UserManage from '@/components/UserManage/UserManage.vue'
// import CircleManage from '@/components/CircleManage/CircleManage.vue'
// import PostManage from '@/components/CircleManage/PostManage/PostManage.vue'
// import LabelManage from '@/components/LabelManage/LabelManage.vue'
// import LabelUpgrade from '@/components/LabelManage/LabelUpgrade.vue'
// import TuzhuManage from '@/components/IdentificationManage/TuzhuManage.vue'
// import GovernmentManage from '@/components/IdentificationManage/GovernmentManage.vue'
// import IdentityManage from '@/components/IdentificationManage/IdentityMange.vue'
// import CompanyManage from '@/components/IdentificationManage/CompanyManage.vue'
// import ViewManage from '@/components/IdentificationManage/ViewManage.vue'

//审核管理
const ServiceManage = resolve => require(['@/components/AuditManage/ServiceManage.vue'], resolve)
const ServiceAudit = resolve => require(['@/components/AuditManage/Audit/ServiceAudit.vue'], resolve)
const BaikeManage = resolve => require(['@/components/AuditManage/BaikeManage.vue'], resolve)
const BaikeAudit = resolve => require(['@/components/AuditManage/Audit/BaikeAudit.vue'], resolve)
const ChangeManage = resolve => require(['@/components/AuditManage/ChangeManage.vue'], resolve)
const ChangeAudit = resolve => require(['@/components/AuditManage/Audit/ChangeAudit.vue'], resolve)
const DeleteManage = resolve => require(['@/components/AuditManage/DeleteManage.vue'], resolve)
const DeleteAudit = resolve => require(['@/components/AuditManage/Audit/DeleteAudit.vue'], resolve)
// import ServiceManage from '@/components/AuditManage/ServiceManage.vue'
// import ServiceAudit from '@/components/AuditManage/Audit/ServiceAudit.vue'
// import BaikeManage from '@/components/AuditManage/BaikeManage.vue'
// import BaikeAudit from '@/components/AuditManage/Audit/BaikeAudit.vue'
// import ChangeManage from '@/components/AuditManage/ChangeManage.vue'
// import ChangeAudit from '@/components/AuditManage/Audit/ChangeAudit.vue'
// import DeleteManage from '@/components/AuditManage/DeleteManage.vue'
// import DeleteAudit from '@/components/AuditManage/Audit/DeleteAudit.vue'
//举报管理
const PostReportManage = resolve => require(['@/components/ReportManage/PostReportManage.vue'], resolve)
const PostReport = resolve => require(['@/components/ReportManage/Report/PostReport.vue'], resolve)
const ShopReportManage = resolve => require(['@/components/ReportManage/ShopReportManage.vue'], resolve)
const ShopReport = resolve => require(['@/components/ReportManage/Report/ShopReport.vue'], resolve)
const ServiceReportManage = resolve => require(['@/components/ReportManage/ServiceReportManage.vue'], resolve)
const ServiceReport = resolve => require(['@/components/ReportManage/Report/ServiceReport.vue'], resolve)
const BaikeReportManage = resolve => require(['@/components/ReportManage/BaikeReportManage.vue'], resolve)
const BaikeReport = resolve => require(['@/components/ReportManage/Report/BaikeReport.vue'], resolve)
const MomentReportManage = resolve => require(['@/components/ReportManage/MomentReportManage.vue'], resolve)
const MomentReport = resolve => require(['@/components/ReportManage/Report/MomentReport.vue'], resolve)
const ReplyReportManage = resolve => require(['@/components/ReportManage/ReplyReportManage.vue'], resolve)
const ReplyReport = resolve => require(['@/components/ReportManage/Report/ReplyReport.vue'], resolve)
// import PostReportManage from '@/components/ReportManage/PostReportManage.vue'
// import PostReport from '@/components/ReportManage/Report/PostReport.vue'
// import ShopReportManage from '@/components/ReportManage/ShopReportManage.vue'
// import ShopReport from '@/components/ReportManage/Report/ShopReport.vue'
// import ServiceReportManage from '@/components/ReportManage/ServiceReportManage.vue'
// import ServiceReport from '@/components/ReportManage/Report/ServiceReport.vue'
// import BaikeReportManage from '@/components/ReportManage/BaikeReportManage.vue'
// import BaikeReport from '@/components/ReportManage/Report/BaikeReport.vue'
// import MomentReportManage from '@/components/ReportManage/MomentReportManage.vue'
// import MomentReport from '@/components/ReportManage/Report/MomentReport.vue'
// import ReplyReportManage from '@/components/ReportManage/ReplyReportManage.vue'
// import ReplyReport from '@/components/ReportManage/Report/ReplyReport.vue'

//网站信息管理
const InfoManage = resolve => require(['@/components/SystemManage/InfoManage.vue'], resolve)
const AdvertManage = resolve => require(['@/components/SystemManage/AdvertManage.vue'], resolve)
const AdvertPositionManage = resolve => require(['@/components/SystemManage/AdvertPositionManage.vue'], resolve)
const ColumnManage = resolve => require(['@/components/SystemManage/ColumnManage.vue'], resolve)
const AddNode = resolve => require(['@/components/SystemManage/addColumnNode/AddNode.vue'], resolve)
const EditNode = resolve => require(['@/components/SystemManage/EditColumnNode/EditNode.vue'], resolve)
const MessageManage = resolve => require(['@/components/SystemManage/MessageManage.vue'], resolve)
const MessageTypeManage = resolve => require(['@/components/SystemManage/MessageTypeManage.vue'], resolve)
// import InfoManage from '@/components/SystemManage/InfoManage.vue'
// import AdvertManage from '@/components/SystemManage/AdvertManage.vue'
// import AdvertPositionManage from '@/components/SystemManage/AdvertPositionManage.vue'
// import ColumnManage from '@/components/SystemManage/ColumnManage.vue'
// import AddNode from '@/components/SystemManage/addColumnNode/AddNode.vue'
// import EditNode from '@/components/SystemManage/EditColumnNode/EditNode.vue'
// import MessageManage from '@/components/SystemManage/MessageManage.vue'
// import MessageTypeManage from '@/components/SystemManage/MessageTypeManage.vue'
const TuzhuIdentification = resolve => require(['@/components/IdentificationManage/identification/TuzhuIdentification.vue'], resolve)
const GovernmentIdentification = resolve => require(['@/components/IdentificationManage/identification/GovernmentIdentification.vue'], resolve)
const IdentityInfo = resolve => require(['@/components/IdentificationManage/identification/IdentityInfo.vue'], resolve)
const CompanyIdentification = resolve => require(['@/components/IdentificationManage/identification/CompanyIdentification.vue'], resolve)
const ViewIdentification = resolve => require(['@/components/IdentificationManage/identification/ViewIdentification.vue'], resolve)
const PhoneCode = resolve => require(['@/components/CodeManage/PhoneCode.vue'], resolve)
const EmailCode = resolve => require(['@/components/CodeManage/EmailCode.vue'], resolve)
const FriendShipManage = resolve => require(['@/components/SystemManage/FriendShipManage.vue'], resolve)
const ChildGroup = resolve => require(['@/components/PowerDistribution/GroupChild/ChildGroup.vue'], resolve)
// import TuzhuIdentification from '@/components/IdentificationManage/identification/TuzhuIdentification.vue'
// import GovernmentIdentification from '@/components/IdentificationManage/identification/GovernmentIdentification.vue'
// import IdentityInfo from '@/components/IdentificationManage/identification/IdentityInfo.vue'
// import CompanyIdentification from '@/components/IdentificationManage/identification/CompanyIdentification.vue'
// import ViewIdentification from '@/components/IdentificationManage/identification/ViewIdentification.vue'
// import PhoneCode from '@/components/CodeManage/PhoneCode.vue'
// import EmailCode from '@/components/CodeManage/EmailCode.vue'
// import FriendShipManage from '@/components/SystemManage/FriendShipManage.vue'
// import ChildGroup from '@/components/PowerDistribution/GroupChild/ChildGroup.vue'
//会员管理
const VipManage = resolve => require(['@/components/VipManage/VipManage.vue'], resolve)
// import VipManage from '@/components/VipManage/VipManage.vue'


Vue.use(Router)
  const routes = [
	    {
	        path: '/404',
	        component: NotFound,
	        name: '',
	        hidden: true
	    },
		{
	  		path:'/',
	  		name:'首页管理',
	  		component:index,
	  		index:'/',
	  		iconCls:'el-icon-menu',
	  		redirect:'/home'
		},
		{
	  		path:'/',
	  		name:'',
	  		component:index,
	  		iconCls:'el-icon-tickets',
	  		children: [
            { 
            path: '/home',
            component: home, 
            name: '首页管理'
            }
        ],
        hidden: true
		},
    {
    	path: '/',
	    component: index,
	    name: '权限分配',
	    iconCls: 'el-icon-tickets',//图标样式class
      children: [
            { path: '/GroupManagemen', component: GroupManagemen, name: '分组管理'},
            { path: '/ChildGroup', component: ChildGroup, name: '子组管理',hidden: true},
            { path: '/PowerManage', component: PowerManage, name: '权限管理' },
            { path: '/GroupEditAdmin', component: GroupEditAdmin, name: '权限编辑',hidden: true},
        ]
    },
    {
        path: '/',
        component: index,
        name: '用户管理',
        iconCls: 'el-icon-document',
        children: [
            { path: '/UserMange', component: UserManage, name: '用户管理' },
        ]
    },
    {
        path: '/',
        component: index,
        name: '会员管理',
        iconCls: 'el-icon-bell',
        children: [
            { path: '/VipManage', component: VipManage, name: '会员管理' },
        ]
    },
    {
        path: '/',
        component: index,
        name: '圈子管理',
        iconCls: 'el-icon-news',
        children: [
            { 
            	path: '/CircleManage', 
            	component: CircleManage, 
            	name: '圈子管理',         	
            },
            {
        		path: '/PostManage', 
            	component: PostManage, 
            	name: '帖子管理', 
            	hidden: true
        	}
        ]
    },
    {
        path: '/',
        component: index,
        name: '标签管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/LabelManage', component: LabelManage, name: '标签管理' },
            { path: '/LabelUpgrade', component: LabelUpgrade, name: '标签升级',hidden: true}
        ]
    },
    {
        path: '/',
        component: index,
        name: '认证管理',
        iconCls: 'el-icon-edit-outline',
        children: [
            { path: '/IdentityManage', component: IdentityManage, name: '身份认证' },
            { path: '/IdentityInfo', component: IdentityInfo, name: '身份信息认证',hidden: true},
            { path: '/TuzhuManage', component: TuzhuManage, name: '土著认证'},
            { path: '/TuzhuIdentification', component: TuzhuIdentification, name: '土著信息认证' ,hidden: true},
            { path: '/GovernmentManage', component: GovernmentManage, name: '政府认证' },
            { path: '/GovernmentIdentification', component: GovernmentIdentification, name: '政府信息认证' ,hidden: true},
            { path: '/CompanyManage', component: CompanyManage, name: '企业认证' },
            { path: '/CompanyIdentification', component: CompanyIdentification, name: '企业信息认证',hidden: true },
            { path: '/ViewManage', component: ViewManage, name: '景点认领认证' },
            { path: '/ViewIdentification', component: ViewIdentification, name: '景点信息认证' ,hidden: true},
        ]
     },
     {
        path: '/',
        component: index,
        name: '审核管理',
        iconCls: 'el-icon-view',
        children: [
            { path: '/BaikeManage', component: BaikeManage, name: '百科审核' },
            { path: '/ChangeManage', component: ChangeManage, name: '修改审核' },
            { path: '/ServiceManage', component: ServiceManage, name: '服务审核' },
            { path: '/DeleteManage', component: DeleteManage, name: '删除审核' },
            { path: '/ServiceAudit', component: ServiceAudit, name: '服务审核详情' ,hidden: true},
            { path: '/BaikeAudit', component: BaikeAudit, name: '百科审核详情' ,hidden: true},
            { path: '/ChangeAudit', component: ChangeAudit, name: '修改审核详情' ,hidden: true},
            { path: '/DeleteAudit', component: DeleteAudit, name: '删除审核详情' ,hidden: true},
        ]
    },
    {
        path: '/',
        component: index,
        name: '举报管理',
        iconCls: 'el-icon-phone-outline',
        children: [
            { path: '/PostReportManage', component: PostReportManage, name: '帖子举报' },
            { path: '/PostReport', component: PostReport, name: '帖子举报详情' ,hidden: true},
            { path: '/BaikeReportManage', component: BaikeReportManage, name: '百科举报' },
            { path: '/BaikeReport', component: BaikeReport, name: '百科举报详情' ,hidden: true},
            { path: '/MomentReportManage', component: MomentReportManage, name: '评论举报' },
            { path: '/MomentReport', component: MomentReport, name: '评论举报详情' ,hidden: true},
            { path: '/ReplyReportManage', component: ReplyReportManage, name: '回复举报' },
            { path: '/ReplyReport', component: ReplyReport, name: '回复举报详情' ,hidden: true},
            { path: '/ServiceReportManage', component: ServiceReportManage, name: '服务举报' },
            { path: '/ServiceReport', component: ServiceReport, name: '服务举报详情' ,hidden: true},
            { path: '/ShopReportManage', component: ShopReportManage, name: '店铺举报' },
            { path: '/ShopReport', component: ShopReport, name: '店铺举报详情' ,hidden: true},
        ]
    },   
    {
        path: '/',
        component: index,
        name: '系统管理',
        iconCls: 'el-icon-setting',
        children: [
            { path: '/MessageManage', component: MessageManage, name: '网站消息管理' },
            { path: '/MessageTypeManage', component: MessageTypeManage, name: '消息模板管理' },
            { path: '/ColumnManage', component: ColumnManage, name: '网站栏目管理' },
            { path: '/InfoManage', component: InfoManage, name: '网站信息管理' },
            { path: '/AdvertManage', component: AdvertManage, name: '网站广告管理' },
            { path: '/FriendShipManage', component: FriendShipManage, name: '友情链接管理' },
            { path: '/AdvertPositionManage', component: AdvertPositionManage, name: '网站广告位管理' },  
            { path: '/AddNode', component: AddNode, name: '增加栏目' ,hidden: true},
            { path: '/EditNode', component: EditNode, name: '编辑栏目' ,hidden: true},
        ]
    },
    {
        path: '/',
        component: index,
        name: '验证管理',
        iconCls: 'el-icon-star-off',
        children: [
            { path: '/PhoneCode', component: PhoneCode, name: '手机验证码管理' },
            { path: '/EmailCode', component: EmailCode, name: '邮箱验证码管理' },
        ]
    },
  ]
export default new Router({
	  routes,
	  strict: process.env.NODE_ENV !== 'production',
})
